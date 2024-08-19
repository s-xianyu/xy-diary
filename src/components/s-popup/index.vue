<template>
  <u-popup
    :close-on-click-overlay="props.maskCloseAble"
    :custom-style="{
      width: '80%'
    }"
    :show="props.show"
    :z-index="props.zIndex"
    mode="center"
    round="30"
    width="80%"
    @close="close"
  >
    <s-car>
      <view class="header">{{ props.title }}</view>
      <view class="con">
        <slot />
      </view>
      <view class="btn">
        <view v-if="props.showClose" class="btn-close" @click="close">取消</view>
        <view class="btn-commit" @click="commit">决定了鸭</view>
      </view>
    </s-car>
  </u-popup>
</template>

<script lang="ts" setup>
import sCar from "../s-car/index.vue";
interface Props {
  show: boolean;
  maskCloseAble: boolean;
  showClose: boolean;
  width: number | string;
  title: string;
  zIndex: number | string;
}
const props = withDefaults(defineProps<Props>(), {
  show: false,
  maskCloseAble: true,
  showClose: false,
  width: "80%",
  title: "请选择",
  zIndex: 10075
});
const emit = defineEmits(["update:show", "commit"]);
const close = () => {
  emit("update:show", false);
};
const commit = () => {
  emit("commit");
  close();
};
</script>

<style lang="scss" scoped>
.header {
  @include wh(100%, 80rpx);
  font-size: 38rpx;
  @include flexCenter;
}
.con {
  background: #fff;
}
.btn {
  background: #fff;
  @include wh(91%, auto);
  @include flexCenter;
  padding: 40rpx 30rpx;
  gap: 20rpx;
  &-close,
  &-commit {
    @include flexCenter;
    @include wh(100%, 80rpx);
    border-radius: 50rpx;
    border: 2px solid $uni-font;
    background: $uni-color;
    color: $uni-font;
    font-size: 36rpx;
  }
  &-close {
    background: #fff;
  }
}
</style>
