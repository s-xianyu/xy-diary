<template>
  <view class="profile">
    <view class="list">
      <view v-for="(item, index) in profileList" :key="index" class="list-item" @click="openPopup(item, index)">
        <s-car :border="false" class="content">
          <view class="box">
            <view class="box-label">{{ item.label }}</view>
            <view class="box-title">{{ item.title }}</view>
            <view class="box-img">
              <image :src="item.img"></image>
            </view>
          </view>
        </s-car>
      </view>
    </view>
    <view class="footer">
      <view class="organizer">
        <view>Organizer by @牛马工具</view>
        <view>Author: cmy and s-xianyu</view>
        <view>备案: 浙ICP备2024227245号</view>
      </view>
    </view>
    <!-- 发薪日选择框 -->
    <s-popup v-model:show="popupObj.visible" :title="popupObj.label">
      <view class="popup">
        <view v-if="popupObj.index === 0" class="popup-item">
          <view>暂时还没有东西看哦</view>
        </view>
        <view v-else-if="popupObj.index === 1" class="popup-item">
          <image src="https://s21.ax1x.com/2024/08/19/pAPtnMQ.png" style="width: 200rpx; height: 200rpx"></image>
        </view>
        <view v-else-if="popupObj.index === 2" class="popup-item">
          <view>牛马工具诞生记</view>
        </view>
        <view v-else class="popup-item">
          <view>微信：s-xianyu</view>
          <view>备注：牛马工具</view>
        </view>
      </view>
    </s-popup>
  </view>
</template>
<script lang="ts" setup>
const profileList = ref([
  { label: "世界很大🍁", title: "我要去看看", img: "https://s21.ax1x.com/2024/08/19/pAPG6zQ.png" },
  { label: "欢迎投喂🍩", title: "请我吃糖", img: "https://s21.ax1x.com/2024/08/19/pAPlzvR.png" },
  { label: "关于日记🎈", title: "牛马工具诞生记", img: "https://s21.ax1x.com/2024/08/19/pAPGgMj.png" },
  { label: "联系本鱼🐟", title: "欢迎合作", img: "https://s21.ax1x.com/2024/08/19/pAPlO5F.png" }
]);
const popupObj = ref({
  visible: false,
  label: "选择",
  index: 0,
  item: {}
});
onShareAppMessage(() => ({ title: "牛马工具" }));
const openPopup = (item, index) => {
  if (index === 2) {
    uni.navigateTo({
      url: "/pages/profile/about/index"
    });
  } else {
    popupObj.value.visible = true;
    popupObj.value.index = index;
    popupObj.value.item = item.item;
    popupObj.value.label = item.label;
  }
};
</script>

<style lang="scss" scoped>
.profile {
  padding: 30rpx 15rpx;
  .list {
    @include flexCenter;
    flex-wrap: wrap;
    &-item {
      width: 50%;
      box-sizing: border-box;
      .content {
        margin: 0 15rpx 30rpx;
        display: block;
        .box {
          background: #ffffff;
          @include flexCenter;
          flex-direction: column;
          &-label {
            @include wh(80%, 60rpx);
            background: $uni-color;
            border-radius: 40rpx;
            @include flexCenter;
            margin: 30rpx 0 10rpx;
            font-size: 40rpx;
            font-family: xy;
            position: relative;
            z-index: 2;
            color: $uni-font;
          }
          &-title {
            font-size: 30rpx;
            color: rgba($color: $uni-font, $alpha: 0.3);
          }
          image {
            @include wh(200rpx, 200rpx);
          }
        }
      }
    }
  }
  .footer {
    margin-top: 20rpx;
    .organizer {
      @include wh(100%, auto);
      @include flexCenter;
      flex-direction: column;
      font-size: 28rpx;
      color: rgba($color: $uni-font, $alpha: 0.3);
    }
  }
  .popup {
    padding: 30rpx;
    &-item {
      @include flexCenter;
      flex-direction: column;
      font-size: 30rpx;
    }
  }
}
</style>
