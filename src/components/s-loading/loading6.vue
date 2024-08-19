<template>
  <view class="container loading6">
    <view class="shape shape1"></view>
    <view class="shape shape2"></view>
    <view class="shape shape3"></view>
    <view class="shape shape4"></view>
    <view class="shape shape5"></view>
    <view class="shape shape6"></view>
    <view class="shape shape7"></view>
    <view class="shape shape8"></view>
    <view class="shape shape9"></view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  @include wh(108rpx, 108rpx);
  font-size: 0;
  line-height: 0;
  .shape {
    @include wh(28rpx, 28rpx);
    margin: 4rpx;
    display: inline-block;
    background-color: #1890ff;
    border-radius: 100%;
    &.shape1 {
      animation: loading6 1.2936954752987861s 0.49369547529878605s infinite ease;
    }
    &.shape2 {
      animation: loading6 1.1179345313666302s 0.31793453136663014s infinite ease;
    }
    &.shape3 {
      animation: loading6 1.2162857392113406s 0.41628573921134054s infinite ease;
    }
    &.shape4 {
      animation: loading6 1.4175666707536085s 0.6175666707536087s infinite ease;
    }
    &.shape5 {
      animation: loading6 0.7864192947721284s -0.013580705227871637s infinite ease;
    }
    &.shape6 {
      animation: loading6 0.7830867306191144s -0.01691326938088558s infinite ease;
    }
    &.shape7 {
      animation: loading6 0.9176038638513707s 0.11760386385137073s infinite ease;
    }
    &.shape8 {
      animation: loading6 1.3392149878100392s 0.5392149878100394s infinite ease;
    }
    &.shape9 {
      animation: loading6 0.6202095403206561s -0.17979045967934387s infinite ease;
    }
  }
}
@keyframes loading6 {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.5);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
  }
}
</style>
