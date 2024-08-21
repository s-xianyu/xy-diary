<template>
  <view class="life">
    <view class="life-item" v-for="(item, index) in life.list.value" :key="index">
      <view class="title">
        <text>{{ item.title }}</text>
        <text class="color">{{ item.num }}</text>
        <text>{{ item.suffix }}</text>
      </view>
      <view class="content">
        <s-progress :width="item.percent" :type="item.type" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import sProgress from "@/components/s-progress/index.vue";
import { useLife } from "./hooks/useLife";
const life = useLife();
</script>

<style scoped lang="scss">
.life {
  margin: 0 auto;
  width: calc(92% - 60rpx);
  padding: 30rpx;
  background: #ffffff;
  border-radius: 20rpx;
  &-item {
    margin-bottom: 30rpx;
    .title {
      font-size: 30rpx;
      margin-bottom: 20rpx;
      color: #666;
      .color {
        color: $uni-color;
        margin: 0 14rpx;
        font-size: 34rpx;
      }
    }
    .content {
      box-sizing: border-box;
    }
  }
}
</style>
