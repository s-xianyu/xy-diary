<template>
  <view class="car">
    <view :class="{ props }" class="car-box">
      <slot />
    </view>
  </view>
</template>

<script lang="ts" setup>
interface Props {
  border: boolean;
  headerHeight: number;
}
const props = withDefaults(defineProps<Props>(), {
  border: false,
  headerHeight: 80
});
</script>

<style lang="scss" scoped>
.car {
  position: relative;
  &:before {
    content: "";
    display: inline-block;
    background: $uni-color;
    border: 4rpx solid $uni-font;
    border-radius: 30rpx;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  &-box {
    background: $uni-color;
    border: 4rpx solid $uni-font;
    border-radius: 30rpx;
    position: relative;
    right: 20rpx;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
    @include wh(calc(100% - 24rpx), auto);
    overflow: hidden;
    &.border:after {
      content: "";
      display: flex;
      border-top: 4rpx solid $uni-font;
      position: absolute;
      left: -4rpx;
      right: 0;
      top: 80rpx;
      z-index: 3;
    }
  }
}
</style>
