<template>
  <view class="wrapper" name="TOSb" @touchend="handletouchend" @touchmove="handletouchmove" @touchstart="handletouchstart">
    <view class="header">
      <view class="header-left">
        <text>2048</text>
      </view>
      <view class="header-right">
        <view class="header-right-score">
          <view class="score">
            <text class="score-title">当前分数</text>
            <text class="score-num">{{ score }}</text>
          </view>
          <view class="score">
            <text class="score-title">历史最高分</text>
            <text class="score-num">{{ bestScore }}</text>
          </view>
        </view>
        <view class="header-right-btn">
          <view class="btn" @click="newGame">新游戏</view>
          <view class="btn" @click="back">返回</view>
        </view>
      </view>
    </view>
    <view v-if="over" class="over">
      <p>Game over!</p>
      <view class="btn" @click="newGame">再来一次</view>
    </view>
    <view class="box">
      <view v-for="(row, index) in list" :key="index" class="row">
        <view v-for="(col, colIndex) in row" :key="colIndex" :class="'n-' + col" class="col">{{ col != null ? col : "" }}</view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
const size = ref(4);
const score = ref(0);
const list = ref();
const intiNum = ref([2, 4]);
const pr = ref(0.9);
const mindex = ref(0);
const bestScore = ref(uni.getStorageSync("bestScore") || 0);
const over = ref(false);
const direction = ref([
  {
    x: 0,
    y: -1
  },
  {
    x: 0,
    y: 1
  },
  {
    x: -1,
    y: 0
  },
  {
    x: 1,
    y: 0
  }
]);
const flag = ref(0);
const text = ref("");
const lastX = ref(0);
const lastY = ref(0);
onMounted(() => init());
const init = () => {
  newGame();
};
const newGame = () => {
  score.value = 0;
  over.value = false;
  list.value = Array.from(Array(size.value)).map(() => Array(size.value).fill(""));
  setRandom();
};
const back = () => {
  const pages = getCurrentPages();
  if (pages.length === 1) {
    window.history.back();
  } else {
    uni.navigateBack();
  }
};
const handletouchstart = event => {
  // console.log(event)
  lastX.value = event.touches[0].pageX;
  lastY.value = event.touches[0].pageY;
};
const handletouchend = () => {
  flag.value = 0;
  text.value = "没有滑动";
};
const handletouchmove = (event: Event | any) => {
  // console.log(event)
  if (flag.value !== 0) {
    return;
  }
  const currentX = event.touches[0].pageX;
  const currentY = event.touches[0].pageY;
  const tx = currentX - lastX.value;
  const ty = currentY - lastY.value;
  let t = "";
  mindex.value = -1;
  // 左右方向滑动
  if (Math.abs(tx) > Math.abs(ty)) {
    if (tx < 0) {
      t = "向左滑动";
      flag.value = 1;
      move(0);
      //  getList();  //调用列表的方法
    } else if (tx > 0) {
      t = "向右滑动";
      flag.value = 2;
      move(2);
    }
  } else {
    // 上下方向滑动
    if (ty < 0) {
      t = "向上滑动";
      flag.value = 3;
      move(1);
      //  getList();  //调用列表的方法
    } else if (ty > 0) {
      t = "向下滑动";
      flag.value = 4;
      move(3);
    }
  }

  // 将当前坐标进行保存以进行下一次计算
  lastX.value = currentX;
  lastY.value = currentY;
  text.value = t;
  setRandom();
};
// 插入新格子
const setRandom = () => {
  if (hasAvailableCells()) {
    const s: any = randomAvailableCells();
    list.value[s[0]][s[1]] = randomValue();
  }
};
// 移动算法，i表示旋转次数
const move = i => {
  const arr = rotate(Array.from(list.value), i).map(item => {
    return moveLeft(item);
  });
  list.value = rotate(arr, size.value - i);
  setLocalstorage();
  if (!isAvailable()) {
    over.value = true;
  }
};
// 获取数值
const randomValue = () => {
  return Math.random() < pr.value ? intiNum.value[0] : intiNum.value[1];
};
// 获取随机一个空格子坐标
const randomAvailableCells = () => {
  const cells = availableCells();
  if (cells.length) {
    return cells[Math.floor(Math.random() * cells.length)];
  }
};
const setLocalstorage = () => {
  const s = uni.getStorageSync("bestScore"); // localStorage.getItem('bestScore')
  if (s) {
    if (score.value > s) {
      // localStorage.setItem('bestScore', score)
      uni.setStorageSync("bestScore", score.value);
      bestScore.value = score.value;
    }
  } else {
    // localStorage.setItem('bestScore', score)
    uni.setStorageSync("bestScore", score.value);
    bestScore.value = score.value;
  }
};
// 单行左移
const moveLeft = list => {
  const _list: any[] = []; // 当前行非空格子
  // const flg = false
  for (let i = 0; i < size.value; i++) {
    if (list[i]) {
      _list.push({
        x: i,
        merged: false,
        value: list[i]
      });
    }
  }
  _list.forEach(item => {
    const farthest = farthestPosition(list, item);
    const next = list[farthest - 1];
    if (next && next === item.value && !_list[farthest - 1].merged) {
      // 合并
      list[farthest - 1] = next * 2;
      list[item.x] = undefined;
      item = {
        x: farthest - 1,
        merged: true,
        value: next * 2
      };
      score.value += next * 2;
    } else {
      if (farthest !== item.x) {
        list[farthest] = item.value;
        list[item.x] = undefined;
        item.x = farthest;
      }
    }
  });
  return list;
};
// 逆时针旋转
const rotate = (arr, n) => {
  n = n % 4;
  if (n === 0) return arr;
  let tmp = Array.from(Array(size.value)).map(() => Array(size.value).fill(""));
  for (let i = 0; i < size.value; i++) {
    for (let j = 0; j < size.value; j++) {
      tmp[size.value - 1 - i][j] = arr[j][i];
    }
  }
  if (n > 1) tmp = rotate(tmp, n - 1);
  return tmp;
};
// 左边最远空格的x位置
const farthestPosition = (list, cell) => {
  let farthest = cell.x;
  while (farthest > 0 && !list[farthest - 1]) {
    farthest = farthest - 1;
  }
  return farthest;
};
const isAvailable = () => {
  return hasAvailableCells() || hasMergedCells();
};
// 所有空格子的坐标
const availableCells = () => {
  const cells: number[][] = [];
  for (let i = 0; i < size.value; i++) {
    for (let j = 0; j < size.value; j++) {
      if (!list.value[i][j]) {
        cells.push([i, j]);
      }
    }
  }
  return cells;
};
// 是否存在空格子
const hasAvailableCells = () => {
  return !!availableCells().length;
};
const hasMergedCells = () => {
  for (let i = 0; i < size.value; i++) {
    for (let j = 0; j < size.value; j++) {
      const cell = list.value[i][j];
      if (cell) {
        for (let dir = 0; dir < 4; dir++) {
          const vector = direction.value[dir];
          if (withinBounds(i + vector.x, j + vector.y)) {
            const other = list.value[i + vector.x][j + vector.y];
            if (other && other === cell) {
              return true;
            }
          }
        }
      }
    }
  }
  return false;
};
const withinBounds = (x, y) => {
  return x > 0 && y > 0 && x < size.value && y < size.value;
};
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: $uni-color-bg;
  height: calc(100vh - 150rpx);
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
    &-left {
      flex: 1;
      background-color: $uni-color;
      padding: 70rpx 0;
      @include flexCenter;
      border-radius: $uni-radius;
      font-size: 48rpx;
      font-weight: bolder;
    }
    &-right {
      flex: 2;
      height: 100%;
      @include flexCenter;
      flex-direction: column;
      justify-content: space-between;
      &-score {
        @include flexCenter;
        width: 100%;
        gap: 20rpx;
        .score {
          flex: 1;
          @include flexCenter;
          flex-direction: column;
          background: #cec1b3;
          border-radius: $uni-radius;
          padding: 10rpx;
          &-title {
            font-size: 26rpx;
          }
          &-num {
            font-size: 40rpx;
          }
        }
      }
      &-btn {
        width: 100%;
        @include flexCenter;
        gap: 20rpx;
        .btn {
          flex: 1;
          padding: 10rpx;
          border-radius: $uni-radius;
          cursor: pointer;
          text-align: center;
          color: #f9f6f2;
          background: #8f7a66;
          font-size: 30rpx;
        }
      }
    }
  }
  .over {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
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
    .btn {
      padding: 20rpx;
      border-radius: $uni-radius;
      cursor: pointer;
      text-align: center;
      color: #f9f6f2;
      background: #8f7a66;
      font-size: 30rpx;
    }
  }
  .box {
    margin-top: 100rpx;
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
        &.n-2 {
          background: #f8f3e8;
        }
        &.n-4 {
          background: #ede0c8;
        }
        &.n-8 {
          background: #f26179;
        }
        &.n-16 {
          background: #f59563;
        }
        &.n-32 {
          background: #f67c5f;
        }
        &.n-64 {
          background: #f65e36;
        }
        &.n-128 {
          background: #edcf72;
        }
        &.n-256 {
          background: #edcc61;
        }
        &.n-512 {
          background: #9c0;
        }
        &.n-1024 {
          background: #3365a5;
        }
        &.n-2048 {
          background: #09c;
        }
        &.n-4096 {
          background: #a6bc;
        }
        &.n-8192 {
          background: #93c;
        }
      }
    }
  }
}
</style>
