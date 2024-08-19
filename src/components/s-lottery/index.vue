<template>
  <view :style="turntableStyle" class="turntable">
    <view class="turntable-box">
      <view :style="[rotateStyle]" class="whelm">
        <div v-for="item in prizesList" :key="item.index" :style="[item.whelm]" class="whelm-item" />
      </view>
      <view class="prize">
        <view :style="[rotateStyle]" class="prize-list">
          <div v-for="item in prizesList" :key="item.index" :style="[item.prize]" class="prize-list-item">
            <div>
              {{ item.name }}
            </div>
          </div>
        </view>
        <view class="prize-point" @click="prizeRoll" />
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
const CIRCLE_ANGLE = Object.freeze(360); // 圆盘的直径
const BIGSIZE = Object.freeze(24); // 字体大小
const circle = Object.freeze(8); // 圆盘的边数
const duration = Object.freeze(5000); // 旋转时间
const angleList = ref<number[]>([]); // 记录每个奖的位置
const isRotating = ref(false); // 是否正在转
const index = ref(5); // 中奖位置下标
const rotateAngle = ref<number | null>(null); // 旋转角度
const props = withDefaults(
  defineProps<{
    width: number;
    prizesList: any[];
  }>(),
  {
    width: 670,
    height: 670
  }
);
const emit = defineEmits(["change"]);
const turntableStyle = computed(() => {
  return {
    width: `${props.width}rpx`,
    height: `${props.width}rpx`
  };
});
const rotateStyle = computed(() => {
  if (!rotateAngle.value) return {}; // 重置取消旋转动画
  return {
    transform: `rotate(${rotateAngle.value}deg)`,
    transition: `transform ${duration}ms ease-in-out`
  };
});
const prizesList = computed(() => {
  angleList.value = []; // 重置
  rotateAngle.value = null; // 重置
  const list = props.prizesList;
  const num = list.length;
  // 计算单个奖项所占的角度
  const average = CIRCLE_ANGLE / num; //60
  const half = average / 2; //30
  const rightBig = Number(num == 2 ? "50" : "0");
  const heightBig = num <= 3 ? "100" : "50";
  const topBig = num == 3 ? "-50" : "0";
  const skewMain = num <= 2 ? 0 : (-(num - 4) * 90) / num;
  // 循环计算给每个奖项添加style属性
  list.forEach((item, i) => {
    // 每个奖项旋转的位置为 当前 i * 平均值 + 平均值 / 2
    const angle = -(i * average + half);
    const bigAge = num > 2 ? (i * 360) / num : "0";
    // 增加 style 这个是给每一个奖项增加的样式
    item.prize = {
      transform: `rotate(${-angle}deg)`,
      width: `${(100 / num) * 2}%`,
      marginLeft: `-${100 / num}%`,
      fontSize: `${BIGSIZE - num}px`
    };
    item.whelm = {
      transform: `rotate(${bigAge}deg) skewY(${skewMain}deg)`,
      right: `${rightBig * i}%`,
      height: `${heightBig}%`,
      top: `${topBig}%`,
      width: `${num == 1 ? 100 : 50}%`,
      background: item.color
    };
    // 记录每个奖项的角度范围
    angleList.value.push(angle);
  });
  return list;
});
const prizeRoll = () => {
  if (isRotating.value) return false;
  index.value = Math.floor(Math.random() * prizesList.value.length);
  rotating();
};
const rotating = () => {
  isRotating.value = true;
  // 计算角度
  rotateAngle.value =
    (rotateAngle.value ?? 0) + circle * CIRCLE_ANGLE + angleList.value[index.value] - ((rotateAngle.value ?? 0) % CIRCLE_ANGLE);
  // 旋转结束后，允许再次触发
  setTimeout(() => {
    isRotating.value = false;
    emit("change", prizesList.value[index.value].name);
  }, duration + 500);
};
defineExpose({
  isRotating
});
</script>
<style lang="scss">
.turntable {
  background: $uni-color;
  border-radius: 50%;
  margin: 0 auto;
  padding: 20rpx;
  &-box {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    .whelm {
      background: #fce585;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      position: relative;
      overflow: hidden;
      &-item {
        position: absolute;
        top: 0;
        right: 0;
        transform-origin: 0% 100%;
        border: 1px solid #facd89;
        border-right: 0;
        border-top: 0;
        box-sizing: border-box;
        &:nth-child(2n) {
          position: absolute;
          background: #fdf2c2;
        }
      }
    }
    .prize {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      &-list {
        width: 100%;
        height: 100%;
        position: relative;
        &-item {
          position: absolute;
          left: 50%;
          height: 50%;
          padding-top: 36rpx;
          box-sizing: border-box;
          text-align: center;
          transform-origin: 50% 100%;
          font-weight: bolder;
        }
      }
      &-point {
        position: absolute;
        left: 50%;
        background: $uni-color;
        width: 160rpx;
        height: 160rpx;
        top: 50%;
        margin-left: -80rpx;
        margin-top: -80rpx;
        border-radius: 50%;
        &:after {
          position: absolute;
          left: 50%;
          top: -60rpx;
          width: 0;
          height: 0;
          margin-left: -40rpx;
          border: 40rpx solid;
          border-color: transparent transparent $uni-color;
          content: "";
        }
      }
    }
  }
}
</style>
