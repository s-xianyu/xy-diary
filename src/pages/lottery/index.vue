<template>
  <view class="lottery">
    <view class="lottery-hint">当不知道吃什么的时候，可以写下附近喜欢吃的小店，开启随机转一转，不为吃饭而烦恼。</view>
    <s-lottery ref="turntable" :prizes-list="list" @change="change" />
    <view :class="{ pointer: isRotating }" class="lottery-btn">
      <view class="lottery-btn-setting" @click="addRef?.openSetting">我的菜单</view>
      <view class="lottery-btn-setting" @click="randomMenu">随机菜单</view>
      <view class="lottery-btn-setting" @click="resetVisible = true">重置</view>
    </view>
    <!-- 重置确认框 -->
    <s-popup v-model:show="resetVisible" :show-close="true" title="确认重置" width="80%" @commit="resetInfo">
      <view class="toast">
        <view class="toast-title">重置后，你所保留的内容会消失！</view>
      </view>
    </s-popup>
    <!-- 今天吃啥呀提示框 -->
    <s-popup v-model:show="lotteryVisible" title="今天去吃" width="80%">
      <view class="toast">
        <view class="toast-lottery">{{ lotteryContent }}</view>
      </view>
    </s-popup>
    <AddPopup ref="addRef" />
  </view>
</template>
<script lang="ts" setup>
import sLottery from "@/components/s-lottery/index.vue";
import AddPopup from "@/pages/lottery/components/addPopup.vue";
import { menu } from "@/config/menu";
import { deepClone } from "uview-plus";
import { useSettingStore } from "@/stores/modules/setting";
const { prizeInfo } = useSettingStore();
const turntable = ref<InstanceType<typeof sLottery> | null>(null);
const addRef = ref<InstanceType<typeof AddPopup> | null>(null);
const resetVisible = ref(false);
const lotteryVisible = ref(false);
const lotteryContent = ref("");
const isRotating = computed(() => turntable.value?.isRotating); // 转盘是否旋转中
onShareAppMessage(() => ({ title: "牛马工具" }));
// 转盘列表
const list = computed(() => {
  return prizeInfo.list.map((item, index) => ({
    name: item,
    index
  }));
});
// 重置
const resetInfo = () => {
  prizeInfo.list = deepClone(menu).splice(0, 8);
};
// 随机菜单
const randomMenu = () => {
  prizeInfo.list = Array.from({ length: 8 }, (val, i) => i).map(() => {
    return menu[Math.floor(Math.random() * menu.length)];
  });
};
// 转盘转一转
const change = (name: string) => {
  lotteryContent.value = name;
  lotteryVisible.value = true;
};
</script>

<style lang="scss" scoped>
.lottery {
  @include wh(100%, calc(100vh - 88rpx));
  @include flexCenter;
  flex-direction: column;
  justify-content: flex-start;
  &-hint {
    padding: 50rpx 30rpx 40rpx;
    font-size: 34rpx;
    color: $uni-font;
    text-indent: 2em;
  }
  &-btn {
    @include flexCenter;
    justify-content: space-between;
    box-sizing: border-box;
    @include wh(100%, auto);
    padding: 50rpx 30rpx;
    gap: 20rpx;
    &-setting {
      @include flexCenter;
      @include wh(250rpx, 90rpx);
      border-radius: 50rpx;
      border: 2px solid $uni-font;
      background: $uni-color;
      color: $uni-font;
      font-size: 40rpx;
    }
  }
}
.toast {
  &-lottery {
    @include wh(100%, 200rpx);
    font-size: 45rpx;
    font-weight: bold;
    @include flexCenter;
    letter-spacing: 0.1em;
    color: $uni-color;
    letter-spacing: 0.1em;
    text-shadow:
      -1px -1px 1px #111111,
      2px 2px 1px $uni-font;
  }
  &-title {
    @include wh(100%, 200rpx);
    @include flexCenter;
    font-size: 34rpx;
    color: $uni-font;
  }
}
</style>
