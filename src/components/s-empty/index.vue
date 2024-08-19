<template>
  <view :style="{ height: props.height + 'px' }" class="empty">
    <image class="empty-img" src="https://s21.ax1x.com/2024/08/19/pAPlLUU.png"></image>
    <text class="empty-text" v-html="props.text" />
    <slot />
  </view>
</template>

<script lang="ts" setup>
interface Props {
  height: number | string;
  text: string;
}
const props = withDefaults(defineProps<Props>(), {
  height: 500,
  text: "暂无数据"
});
</script>

<style lang="scss" scoped>
.empty {
  @include flexCenter;
  flex-direction: column;
  &-img {
    @include wh(360rpx, 360rpx);
  }
  &-text {
    color: $uni-color;
    font-size: 30rpx;
    text-align: center;
  }
}
</style>
