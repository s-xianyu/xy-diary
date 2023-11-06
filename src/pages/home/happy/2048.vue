<template>
  <view name='TOSb' class="wrapper" @touchmove="handletouchmove" @touchstart="handletouchstart" @touchend="handletouchend">
    <view class="header">
      <view class="header-left">
        <text>2048</text>
      </view>
      <view class="header-right">
        <view class="header-right-score">
          <view class="score">
            <text class="score-title">当前分数</text>
            <text class="score-num">{{score}}</text>
          </view>
          <view class="score">
            <text class="score-title">历史最高分</text>
            <text class="score-num">{{bestScore}}</text>
          </view>
        </view>
        <view class="header-right-btn">
          <view class="btn" @click="newGame">新游戏</view>
          <view class="btn" @click="back">返回</view>
        </view>
      </view>
    </view>
    <view class="over" v-if="over">
      <p>Game over!</p>
      <view class="btn" @click="newGame">再来一次</view>
    </view>
    <view class="box">
      <view class="row" v-for="(row, index) in list" :key="index">
        <view class="col" :class="'n-'+col" v-for="(col, colIndex) in row" :key="colIndex">{{col != null ? col : ''}}</view>
      </view>
    </view>
  </view>

</template>

<script>
export default {
  name: 'TOSb',
  data () {
    return {
      size: 4,
      score: 0,
      list: [],
      intiNum: [2, 4],
      pr: 0.9,
      bestScore: uni.getStorageSync('bestScore') || 0,
      over: false,
      direction: [{
        x: 0,
        y: -1
      }, {
        x: 0,
        y: 1
      }, {
        x: -1,
        y: 0
      }, {
        x: 1,
        y: 0
      }],
      flag: 0,
      text: '',
      lastX: 0,
      lastY: 0
    }
  },
  methods: {
    init () {
      this.newGame()
      // document.addEventListener('keyup', this.keyDown)
    },
    newGame () {
      this.score = 0
      this.over = false
      this.list = Array.from(Array(this.size)).map(() => Array(this.size).fill(undefined))
      this.setRandom()
    },

    back () {
      const pages = getCurrentPages() // eslint-disable-line
      if (pages.length === 1) {
        window.history.back()
      } else {
        uni.navigateBack()
      }
    },

    handletouchstart: function (event) {
      // console.log(event)
      this.lastX = event.touches[0].pageX
      this.lastY = event.touches[0].pageY
    },
    handletouchend: function (event) {
      this.flag = 0
      this.text = '没有滑动'
    },
    handletouchmove: function (event) {
      // console.log(event)
      if (this.flag !== 0) {
        return
      }
      const currentX = event.touches[0].pageX
      const currentY = event.touches[0].pageY
      const tx = currentX - this.lastX
      const ty = currentY - this.lastY
      let text = ''
      this.mindex = -1
      // 左右方向滑动
      if (Math.abs(tx) > Math.abs(ty)) {
        if (tx < 0) {
          text = '向左滑动'
          this.flag = 1
          this.move(0)
          //  this.getList();  //调用列表的方法
        } else if (tx > 0) {
          text = '向右滑动'
          this.flag = 2
          this.move(2)
        }
      } else { // 上下方向滑动
        if (ty < 0) {
          text = '向上滑动'
          this.flag = 3
          this.move(1)
          //  this.getList();  //调用列表的方法
        } else if (ty > 0) {
          text = '向下滑动'
          this.flag = 4
          this.move(3)
        }
      }

      // 将当前坐标进行保存以进行下一次计算
      this.lastX = currentX
      this.lastY = currentY
      this.text = text
      this.setRandom()
    },
    // 插入新格子
    setRandom () {
      if (this.hasAvailableCells()) {
        const [x, y] = this.randomAvailableCells()
        this.list[x][y] = this.randomValue()
      }
    },
    // 移动算法，i表示旋转次数
    move (i) {
      const arr = this.rotate(Array.from(this.list), i).map((item, index) => {
        return this.moveLeft(item)
      })
      this.list = this.rotate(arr, this.size - i)
      this.setLocalstorage()
      if (!this.isAvailable()) {
        this.over = true
      }
    },
    // 获取数值
    randomValue () {
      return Math.random() < this.pr ? this.intiNum[0] : this.intiNum[1]
    },
    // 获取随机一个空格子坐标
    randomAvailableCells () {
      const cells = this.availableCells()
      if (cells.length) {
        return cells[Math.floor(Math.random() * cells.length)]
      }
    },
    setLocalstorage () {
      const score = uni.getStorageSync('bestScore') // localStorage.getItem('bestScore')
      if (score) {
        if (this.score > score) {
        // localStorage.setItem('bestScore', this.score)
          uni.setStorageSync('bestScore', this.score)
          this.bestScore = this.score
        }
      } else {
        // localStorage.setItem('bestScore', this.score)
        uni.setStorageSync('bestScore', this.score)
        this.bestScore = this.score
      }
    },
    // 单行左移
    moveLeft (list) {
      const _list = [] // 当前行非空格子
      // const flg = false
      for (let i = 0; i < this.size; i++) {
        if (list[i]) {
          _list.push({
            x: i,
            merged: false,
            value: list[i]
          })
        }
      }
      _list.forEach(item => {
        const farthest = this.farthestPosition(list, item)
        const next = list[farthest - 1]
        if (next && next === item.value && !_list[farthest - 1].merged) {
          // 合并
          list[farthest - 1] = next * 2
          list[item.x] = undefined
          item = {
            x: farthest - 1,
            merged: true,
            value: next * 2
          }
          this.score += next * 2
        } else {
          if (farthest !== item.x) {
            list[farthest] = item.value
            list[item.x] = undefined
            item.x = farthest
          }
        }
      })
      return list
    },
    // 逆时针旋转
    rotate (arr, n) {
      n = n % 4
      if (n === 0) return arr
      console.log('arr', arr)
      let tmp = Array.from(Array(this.size)).map(() => Array(this.size).fill(undefined))
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          tmp[this.size - 1 - i][j] = arr[j][i]
        }
      }
      if (n > 1) tmp = this.rotate(tmp, n - 1)
      return tmp
    },
    // 左边最远空格的x位置
    farthestPosition (list, cell) {
      let farthest = cell.x
      while (farthest > 0 && !list[farthest - 1]) {
        farthest = farthest - 1
      }
      return farthest
    },
    isAvailable () {
      return this.hasAvailableCells() || this.hasMergedCells()
    },
    // 所有空格子的坐标
    availableCells () {
      const cells = []
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          if (!this.list[i][j]) {
            cells.push([i, j])
          }
        }
      }
      return cells
    },
    // 是否存在空格子
    hasAvailableCells () {
      return !!this.availableCells().length
    },
    hasMergedCells () {
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          const cell = this.list[i][j]
          if (cell) {
            for (let dir = 0; dir < 4; dir++) {
              const vector = this.direction[dir]
              if (this.withinBounds(i + vector.x, j + vector.y)) {
                const other = this.list[i + vector.x][j + vector.y]
                if (other && other === cell) {
                  return true
                }
              }
            }
          }
        }
      }
      return false
    },
    withinBounds (x, y) {
      return x > 0 && y > 0 && x < this.size && y < this.size
    }

  },
  created () {
    this.init()
  }
  // onLoad() {
  // 初始化数组
  // this.init()
  // }
}
</script>

<style scoped lang="scss">
.wrapper {
  background-color: $uni-color-bg;
  width: 100%;
  height: 100vh;
  @include flexCenter;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  padding: 30rpx;
  .header {
    width: 100%;
    gap: 20rpx;
    @include flexCenter;
    justify-content: space-between;
    color: #776e65;
    &-left{
      flex: 1;
      background-color: $uni-color;
      padding: 70rpx 0;
      @include flexCenter;
      border-radius: $uni-radius;
      font-size: 48rpx;
      font-weight: bolder;
    }
    &-right{
      flex:2;
      height: 100%;
      @include flexCenter;
      flex-direction: column;
      justify-content: space-between;
      &-score{
        @include flexCenter;
        width: 100%;
        gap: 20rpx;
        .score{
          flex:1;
          @include flexCenter;
          flex-direction: column;
          background: #cec1b3;
          border-radius: $uni-radius;
          padding: 10rpx;
          &-title{
            font-size: 26rpx;
          }
          &-num{
            font-size: 40rpx;
          }
        }
      }
      &-btn{
        width: 100%;
        @include flexCenter;
        gap: 20rpx;
        .btn {
          flex:1;
          padding: 10rpx;
          border-radius: $uni-radius;
          cursor: pointer;
          text-align: center;
          color: #f9f6f2;
          background: #8f7a66;
        }
      }
    }
  }
  .over {
    position: absolute;
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
    .btn{
      padding: 20rpx;
      border-radius: $uni-radius;
      cursor: pointer;
      text-align: center;
      color: #f9f6f2;
      background: #8f7a66;
    }
  }
  .box {
    margin-top:100rpx;
    width: 100%;
    height: 700rpx;
    padding: 30rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    border-radius: $uni-radius;
    background: #bbada0;
    .row {
      width: 100%;
      height: 23%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .col {
        width: 23%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 48rpx;
        border-radius: 6rpx;
        background: #cec1b3;
        &.n-2 { background: #f8f3e8; }
        &.n-4 { background: #ede0c8; }
        &.n-8 { background: #f26179; }
        &.n-16 { background: #f59563; }
        &.n-32 { background: #f67c5f; }
        &.n-64 { background: #f65e36; }
        &.n-128 { background: #edcf72; }
        &.n-256 { background: #edcc61; }
        &.n-512 { background: #9c0; }
        &.n-1024 { background: #3365a5; }
        &.n-2048 { background: #09c; }
        &.n-4096 { background: #a6bc; }
        &.n-8192 { background: #93c; }
      }
    }
  }
}
</style>
