<template>
  <view class="gap">
    <view class="gap-dot"></view>
    <view class="gap-dot"></view>
  </view>
</template>
<style lang="scss" scoped>
.gap {
  @include flexCenter;
  justify-content: space-between;
  padding: 0 70rpx;
  &-dot {
    @include wh(30rpx, 20rpx);
    background: $uni-color;
    border-color: $uni-font;
    border-style: solid;
    border-width: 0 4rpx 0 4rpx;
  }
}
</style>
