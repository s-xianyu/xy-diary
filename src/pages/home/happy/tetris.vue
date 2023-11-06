<template>
  <view class="tetris">
    <view class="tetris-title">
      <view>分数：{{score[0]}}</view>
      <view class="blockMinMap">
        <view v-for="(line, i) in blocks[nextBlock[0]][nextBlock[1]]" :key="'minimap-line-'+i" class="line">
          <view v-for="(b, j) in line" :key="'minimap-line-'+i+'-block-'+j" :class="{'block':b==1}"></view>
        </view>
      </view>
      <view>等级：{{parseInt(score[0]/score[1])}}</view>
    </view>
    <view class="gameView" :style="{height:gameViewHeight+'px'}">
      <view v-for="(line, i) in getTrueMap()" :key="'map-line-'+i" class="line">
        <view v-for="(b, j) in line" :key="'map-line-'+i+'-block-'+j" :class="{'block':b>0}"
              :style="{width:getGameViewBlockSize()+'px', height:getGameViewBlockSize()+'px'}"
        ></view>
      </view>
    </view>
    <view class="btn deep-class" id="buttonView">
      <view class="btn-left">
        <view @tap="rotateBlock()">〇</view>
      </view>
      <view class="btn-right">
        <view class="btn-right-box">
          <view class="icon" @tap="rotateBlock()">
            <u-icon name="play-circle-fill" size="48"></u-icon>
          </view>
          <view class="icon" @tap="moveRight()">
            <u-icon name="play-circle-fill" size="48"></u-icon>
          </view>
          <view class="icon" @tap="moveDown()">
            <u-icon name="play-circle-fill" size="48"></u-icon>
          </view>
          <view class="icon" @tap="moveLeft()">
            <u-icon name="play-circle-fill" size="48"></u-icon>
          </view>
        </view>
      </view>
    </view>
    <view class="over" v-if="gameOver">
      <p>Game over!</p>
      <span>分数: {{score[0]}}</span>
      <view class="over-btn" @click="initGame">再来一次</view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      // 地图大小
      mapSize: [18, 10],
      // 下降时间:开始，结束，每升一级减少等待时间
      downSpeed: [1500, 200, 100],
      // 分数：现在分数，多少分升一级, step
      score: [0, 10, 1],
      // 地图
      map: [],
      // 7种方块，及其朝向
      blocks: [
        [[[0, 1, 1], [1, 1, 0]], [[1, 0], [1, 1], [0, 1]]],
        [[[1, 1, 0], [0, 1, 1]], [[0, 1], [1, 1], [1, 0]]],
        [[[1, 1, 1, 1]], [[1], [1], [1], [1]]],
        [[[1, 1], [1, 1]]],
        [[[0, 1, 0], [1, 1, 1]], [[0, 1], [1, 1], [0, 1]], [[1, 1, 1], [0, 1, 0]], [[1, 0], [1, 1], [1, 0]]],
        [[[0, 0, 1], [1, 1, 1]], [[1, 1], [0, 1], [0, 1]], [[1, 1, 1], [1, 0, 0]], [[1, 0], [1, 0], [1, 1]]],
        [[[1, 0, 0], [1, 1, 1]], [[0, 1], [0, 1], [1, 1]], [[1, 1, 1], [0, 0, 1]], [[1, 1], [1, 0], [1, 0]]]
      ],
      // 方块开始位置
      startPosition: [0, 4],
      // 方块现在位置
      blockPosition: [0, 0],
      // 当前方块限制：方块种类，方块朝向
      nowBlock: [0, 0],
      // 下一个方块限制: 方块种类，方块朝向
      nextBlock: [0, 0],
      // 游戏窗口高度:
      gameViewHeight: 450,
      // 游戏结束
      gameOver: false,
      // 游戏循环体
      gameUpdateFunc: null
    }
  },
  mounted () {
    this.refreshNextBlock()
    this.refreshNextBlock()
  },
  destroyed () {
    clearInterval(this.gameUpdateFunc)
  },
  onLoad () {
    this.initGame()
  },
  methods: {
    // 初始化游戏
    initGame () {
      this.initMap() // 初始化游戏地图
      this.score[0] = 0 // 初始化分数
      this.refreshNextBlock() // 刷新下一个方块
      this.refreshNextBlock() // 刷新下一个方块
      this.gameOver = false // 游戏结束标志初始化为false
      clearInterval(this.gameUpdateFunc) // 清除游戏更新定时器
      this.gameUpdateFunc = null // 游戏更新定时器重置为null
      this.$nextTick(() => { // 等待DOM更新
        this.tryGetGameHeight() // 尝试获取游戏区域高度
        this.gameUpdate() // 更新游戏
      })
    },
    gameUpdate () {
      this.gameOver = false
      this.gameUpdateFunc = setInterval(() => {
        // 游戏循环体
        this.moveDown()
        // 更新
        clearInterval(this.gameUpdateFunc)
        // 游戏未结束时触发
        if (!this.gameOver) {
          this.gameUpdate()
        } else {
          this.gameOver = true
          // uni.showModal({
          //   showCancel: false,
          //   confirmText: '再来一局',
          //   title: '游戏结束',
          //   content: '最终分数:' + this.score[0],
          //   success: (res) => {
          //     if (res.confirm) {
          //       this.initGame()
          //     }
          //   }
          // })
        }
      }, Math.max(
        (this.downSpeed[0] - this.downSpeed[2] * parseInt(this.score[0] / this.score[1])),
        this.downSpeed[1]
      ))
    },
    moveDown () {
      // 获取底部砖块情况
      if (this.gameOver) return
      const bottomPosition = []
      const theBlock = this.blocks[this.nowBlock[0]][this.nowBlock[1]]
      for (let i = 0; i < theBlock[0].length; i++) {
        bottomPosition.push(0)
      }
      for (let i = 0; i < theBlock.length; i++) {
        for (let j = 0; j < theBlock[i].length; j++) {
          if (theBlock[i][j] > 0) {
            bottomPosition[j] = Math.max(bottomPosition[j], i)
          }
        }
      }
      // console.log(bottomPosition)
      let canMove = true
      for (let i = 0; i < bottomPosition.length; i++) {
        if (this.blockPosition[0] + bottomPosition[i] + 1 >= this.mapSize[0]) {
          canMove = false
          break
        } else if (this.map[
          this.blockPosition[0] + bottomPosition[i] + 1
        ][
          this.blockPosition[1] + i
        ] > 0) {
          canMove = false
          break
        }
      }
      if (canMove) {
        this.blockPosition[0] += 1
        this.$forceUpdate()
      } else {
        // 如果当前Y坐标依旧是0，游戏结束
        if (this.blockPosition[0] <= 0) {
          this.gameOver = true
        } else { // 触底不能移动, 锁死方块,将方块的值赋予map
          for (let i = 0; i < theBlock.length; i++) {
            for (let j = 0; j < theBlock[i].length; j++) {
              // console.log(this.blockPosition[0]+i, this.blockPosition[1]+j)
              // console.log(this.map.length, this.map[0].length)
              this.map[this.blockPosition[0] + i][this.blockPosition[1] + j] =
                Math.max(theBlock[i][j],
                  this.map[this.blockPosition[0] + i][this.blockPosition[1] + j])
            }
          }
          this.$forceUpdate()
          // 判断当前是否有无可能消除行
          this.checkMapScore()
          // 更新下个方块
          this.refreshNextBlock()
        }
      }
    },
    rotateBlock () {
      if (this.gameOver) return
      const nextStyle = (this.nowBlock[1] + 1) % this.blocks[this.nowBlock[0]].length
      // 判断当前的状态是否存在位置
      let canChange = true
      const changeBlock = this.blocks[this.nowBlock[0]][nextStyle]
      if (this.blockPosition[1] + changeBlock[0].length > this.mapSize[1]) {
        // x超出
        canChange = false
      } else if (this.blockPosition[0] + changeBlock.length > this.mapSize[0]) {
        // y超出
        canChange = false
      } else {
        for (let i = 0; i < changeBlock.length; i++) {
          for (let j = 0; j < changeBlock[i].length; j++) {
            // 旋转后部分和原始map重合
            if (changeBlock[i][j] > 0 &&
              this.map[this.blockPosition[0] + i][this.blockPosition[1] + j] > 0) {
              canChange = false
              break
            }
          }
        }
      }
      if (canChange) {
        this.nowBlock[1] = nextStyle
        this.$forceUpdate()
      }
    },
    moveLeft () {
      // 判断是否可以左移
      if (this.gameOver) return
      const theBlock = this.blocks[this.nowBlock[0]][this.nowBlock[1]]
      const leftPosition = []
      for (let i = 0; i < theBlock.length; i++) {
        leftPosition.push(-1)
        for (let j = 0; j < theBlock[i].length; j++) {
          if (leftPosition[i] === -1 && theBlock[i][j] > 0) {
            leftPosition[i] = j
          }
        }
      }
      // console.log(leftPosition)
      let canMove = true
      for (let i = 0; i < leftPosition.length; i++) {
        if (this.blockPosition[1] + leftPosition[i] === 0) {
          canMove = false
          break
        } else if (this.map[
          this.blockPosition[0] + i
        ][
          this.blockPosition[1] + leftPosition[i] - 1
        ] > 0) {
          canMove = false
          break
        }
      }
      if (canMove) {
        this.blockPosition[1] -= 1
        this.$forceUpdate()
      }
    },
    moveRight () {
      // 判断是否可以左移
      if (this.gameOver) return
      const theBlock = this.blocks[this.nowBlock[0]][this.nowBlock[1]]
      const rightPosition = []
      for (let i = 0; i < theBlock.length; i++) {
        rightPosition.push(0)
        for (let j = 0; j < theBlock[i].length; j++) {
          if (theBlock[i][j] > 0) {
            rightPosition[i] = j
          }
        }
      }
      // console.log(rightPosition)
      let canMove = true
      for (let i = 0; i < rightPosition.length; i++) {
        if (this.blockPosition[1] + rightPosition[i] + 1 >= this.mapSize[1]) {
          canMove = false
          break
        } else if (this.map[
          this.blockPosition[0] + i
        ][
          this.blockPosition[1] + rightPosition[i] + 1
        ] > 0) {
          canMove = false
          break
        }
      }
      if (canMove) {
        this.blockPosition[1] += 1
        this.$forceUpdate()
      }
    },
    checkMapScore () {
      const newMap = []
      // 计算score并消去满足的行
      for (let i = 0; i < this.map.length; i++) {
        let lineSum = 0
        for (let j = 0; j < this.map[i].length; j++) {
          lineSum += Math.min(this.map[i][j], 1)
        }
        // console.log(i, lineSum)
        if (lineSum >= this.map[i].length) {
          this.score[0] += this.score[2]
        } else {
          newMap.push(JSON.parse(JSON.stringify(this.map[i])))
        }
      }
      // 补充缺失的行
      while (newMap.length < this.map.length) {
        const aline = []
        for (let i = 0; i < this.map[0].length; i++) aline.push(0)
        newMap.unshift(aline)
      }
      this.map = newMap
      this.$forceUpdate()
    },
    initMap () {
      this.map = []
      for (let i = 0; i < this.mapSize[0]; i++) {
        this.map.push([])
        for (let j = 0; j < this.mapSize[1]; j++) {
          this.map[i].push(0)
        }
      }
    },
    tryGetGameHeight () {
      this.$nextTick(() => {
        this.gameViewHeight = uni.getSystemInfoSync().windowHeight - 170
      })
    },
    getGameViewBlockSize () {
      const padding = 40
      return Math.min(
        parseInt((this.gameViewHeight - padding) / this.mapSize[0]),
        parseInt((uni.getSystemInfoSync().windowWidth - padding) / this.mapSize[1])
      )
    },
    refreshNextBlock () {
      this.nowBlock = this.nextBlock
      const nextBlock = [
        parseInt(Math.random() * this.blocks.length),
        0
      ]
      nextBlock[1] = parseInt(this.blocks[nextBlock[0]].length * Math.random())
      this.nextBlock = nextBlock
      this.blockPosition = JSON.parse(JSON.stringify(this.startPosition))
      // console.log(this.blockPosition)
      this.$forceUpdate()
    },
    getTrueMap () {
      // 实际map是原始map+当前方块位置
      if (this.map.length !== this.mapSize[0] || this.mapSize[1] !== this.map[0].length) {
        return this.map
      }
      const trueMap = JSON.parse(JSON.stringify(this.map))
      const theBlock = this.blocks[this.nowBlock[0]][this.nowBlock[1]]
      // console.log(theBlock)
      for (let i = 0; i < theBlock.length; i++) {
        for (let j = 0; j < theBlock[i].length; j++) {
          // console.log(i+this.blockPosition[0], j+this.blockPosition[1])
          trueMap[i + this.blockPosition[0]][j + this.blockPosition[1]] = Math.max(
            theBlock[i][j],
            trueMap[i + this.blockPosition[0]][j + this.blockPosition[1]]
          )
        }
      }
      // console.log(trueMap)
      return trueMap
    }
  }
}
</script>

<style lang="scss" scoped>
.tetris {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  &-title{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 5% 5px;
    background-color: #cec1b3;
    color: #776e65;
    height:58px;
  }
}

.blockMinMap{
  display: flex;
  flex-direction: column;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
}

.blockMinMap .line, .gameView .line{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.blockMinMap .line view{
  width: 12px;
  height: 12px;
}

.gameView .line view{
  border: 1px solid #cec1b3;
  width: 40upx;
  height: 40upx;
}

.blockMinMap .line .block{
  border: 1px solid $uni-color-bg;
  background-color: $uni-color;
  width: 10px;
  height: 10px;
}

.gameView .line .block{
  border: 1px solid $uni-color-bg;
  background-color: $uni-color;
  /* width: 40upx;
  height: 40upx; */
}

.gameView{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn{
  width: 100%;
  max-width: 1000rpx;
  position: fixed;
  bottom:0;
  left:50%;
  transform: translate3d(-50%, 0, 0px);
  padding: 20rpx 0;
  background-color: #cec1b3;
  &-box{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    &-left{
      flex:1;
      @include flexCenter;
      view {
        font-size: 100rpx;
        font-weight: bolder;
      }
    }
  }
  @include flexCenter;
  &-left{
    flex:1;
    @include flexCenter;
    view {
      font-size: 100rpx;
      font-weight: bolder;
      color: $uni-color;
    }
  }
  &-right{
    flex:1;
    @include flexCenter;
    &-box{
      width: 180rpx;
      height:180rpx;
      border-radius: 50%;
      background: $uni-color-bg;
      position: relative;
      .icon{
        position: absolute;
        color: $uni-color;
        &:active{
          opacity:.6;
        }
        &:nth-child(1){
          top: 16rpx;
          left: 50%;
          transform: translateX(-50%) rotate(-90deg);
        }
        &:nth-child(2){
          top: 50%;
          right: 16rpx;
          transform: translateY(-50%) rotate(0deg);
        }
        &:nth-child(3){
          bottom: 16rpx;
          left: 50%;
          transform: translateX(-50%) rotate(90deg);
        }
        &:nth-child(4){
          top: 50%;
          left: 16rpx;
          transform: translateY(-50%) rotate(-180deg);
        }
      }
    }
  }
  &-right{
    flex:1;
    @include flexCenter;
  }
}
.over {
  position: fixed;
  top:0;
  left:0;
  bottom:0;
  right:0;
  @include flexCenter;
  flex-direction: column;
  background: rgba(238, 228, 218, 0.73);
  z-index: 1000;
  color: #8f7a66;
  p {
    font-size: 60rpx;
    font-weight: bold;
    margin-bottom: 30rpx;
  }
  span{
    margin-bottom: 20rpx;
  }
  &-btn{
    padding: 20rpx;
    border-radius: $uni-radius;
    cursor: pointer;
    text-align: center;
    color: #f9f6f2;
    background: #8f7a66;
  }
}
</style>
