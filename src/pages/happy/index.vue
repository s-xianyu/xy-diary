<template>
  <view class="happy">
    <view v-for="item in happyList" :key="item.path" class="happy-item" @click="toPath(item)">
      <s-car :border="false" class="content">
        <s-background class="box">
          <div class="box">
            <text class="box-label">{{ item.label }}</text>
            <view class="box-mark">
              <text class="box-mark-text">{{ item.mark }}</text>
            </view>
          </div>
        </s-background>
      </s-car>
    </view>
    <view class="happy-item">
      <view class="empty">敬请<br />期待</view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import sCar from "@/components/s-car/index.vue";
import sBackground from "@/components/s-background/index.vue";
const happyList = Object.freeze([
  // #ifdef H5
  {
    label: "2048",
    mark: "游戏",
    path: "2048"
  },
  // #endif
  {
    label: "功德+1",
    mark: "养生",
    path: "fish"
  }
]);
onShareAppMessage(() => ({ title: "牛马工具" }));
const toPath = (item: { path: string }) => uni.navigateTo({ url: item.path });
</script>

<style lang="scss" scoped>
.happy {
  padding: 30rpx;
  @include flexCenter;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 30rpx;
  &-item {
    width: calc(50% - 16rpx);
    .content {
      display: block;
      .box {
        position: relative;
        height: 300rpx;
        @include flexCenter;
        &-label {
          font-size: 44rpx;
          font-weight: bold;
          letter-spacing: 10rpx;
          font-family: geetype;
        }
        &-mark {
          width: 80rpx;
          height: 80rpx;
          position: absolute;
          top: 0;
          right: 0;
          font-weight: bold;
          background: $uni-color;
          font-size: 30rpx;
          border-radius: 100% 0% 0% 100% / 0% 50% 50% 100%;
          &-text {
            display: block;
            transform: rotate(45deg) translate(10px, 3px);
            color: #ffffff;
          }
        }
      }
    }
    .empty {
      height: 300rpx;
      background: #e5e4e4;
      border-radius: 20rpx;
      @include flexCenter;
      font-size: 72rpx;
    }
  }
}
</style>
