<template>
  <view class="fish">
    <view class="count">
      <view class="count-num">{{ fishInfo.count || 0 }}</view>
      <view class="count-label">{{ tabList[tabIndex].type }}</view>
    </view>
    <view class="box">
      <div class="box-tip">
        <view v-for="item in tipsList" :key="item.index" class="box-tip-item">{{ item.label }}</view>
      </div>
      <div :class="{ active: fishActive }" class="box-fish" @click="changFish">
        <image src="https://s21.ax1x.com/2024/08/19/pAPJhXd.png" style="width: 380rpx; height: 300rpx"></image>
        <!--        <svg class="woodenFish" width="157pt" height="126pt" viewBox="0 0 247 197" version="1.1" xmlns="http://www.w3.org/2000/svg" style="transform: scale(1);">-->
        <!--          <g id="#eeeeeeff">-->
        <!--            <path fill="#eeeeee" opacity="1" d=" M 109.12 6.53 C 124.09 4.27 139.37 2.82 154.47 4.79 C 173.07 7.14 191.38 14.02 206.02 25.89 C 217.01 34.77 225.17 46.63 231.55 59.13 C 237.81 72.25 241.16 86.53 243.92 100.74 C 225.49 104.75 206.58 105.76 187.77 106.20 C 186.21 100.02 183.12 93.94 177.74 90.25 C 172.00 85.96 163.98 84.19 157.26 87.18 C 145.99 91.69 139.62 105.22 142.63 116.85 C 145.12 127.39 154.97 136.11 166.05 135.69 C 176.18 134.97 184.61 126.81 187.19 117.22 C 192.74 116.73 198.32 116.63 203.89 116.32 C 217.57 115.26 231.14 113.14 244.82 111.98 C 245.52 121.28 246.13 130.75 244.11 139.94 C 242.32 149.02 239.23 158.07 233.39 165.39 C 224.88 176.55 212.15 183.64 199.01 187.98 C 187.42 191.86 175.20 193.41 163.05 194.29 C 140.40 195.87 117.64 195.62 94.99 194.19 C 74.79 192.81 54.55 190.78 34.79 186.17 C 27.91 184.54 21.07 182.47 14.77 179.21 C 8.58 175.93 4.23 169.71 2.72 162.92 C -0.48 151.41 3.00 139.09 9.20 129.21 C 14.61 119.75 27.61 116.88 30.81 105.83 C 35.50 90.01 37.28 73.40 42.87 57.82 C 47.56 45.36 54.34 33.26 64.82 24.75 C 77.25 14.19 93.24 9.04 109.12 6.53 Z"></path>-->
        <!--          </g>-->
        <!--        </svg>-->
      </div>
    </view>
    <view class="footer">
      <view class="footer-btn" @click="toggleImmerse(!isImmerse)">{{ isImmerse ? "取消沉浸" : "沉浸模式" }}</view>
      <view class="footer-btn" @click="toggleAuto(!isAuto)">{{ isAuto ? "取消自动" : "自动敲鱼" }}</view>
      <view class="footer-btn" @click="visible = true">重置</view>
    </view>
    <s-popup v-model:show="visible" title="确认清空吗？" @commit="fishInfo.count = 0">
      <div class="message">重置后，功德值会清空，请谨慎操作!</div>
    </s-popup>
  </view>
</template>
<script lang="ts" setup>
import { useSettingStore } from "@/stores/modules/setting";
interface Tips {
  label: string;
  index: number;
}
const { fishInfo } = useSettingStore();
const audio: any = uni.createInnerAudioContext();
const bgm: any = uni.createInnerAudioContext();
const tabIndex = ref(0);
const tipsList = ref<Tips[]>([]);
const isImmerse = ref(false);
const isAuto = ref(false);
const interval = ref();
const fishActive = ref(false);
const visible = ref(false);
const tabList = [
  {
    type: "功德",
    tips: "功德 +1 佛主保佑你"
  },
  {
    type: "抗疫",
    tips: "阳性 -1 健健康康"
  }
];
onShareAppMessage(() => ({ title: "功德+1" }));
onShow(() => {
  setTimeout(() => {
    bgmPlay();
  }, 1000);
  toggleAuto(isAuto.value);
});
onHide(() => {
  bgm.pause();
  clearInterval(interval.value);
});
onUnload(() => {
  clearInterval(interval.value);
  bgm.destroy();
  audio.destroy();
});
const bgmPlay = () => {
  if (!bgm.src) {
    bgm.sessionCategory = "ambient";
    bgm.loop = true;
    bgm.src = "https://schbrain-static-online.schbrain.com/resources/bgm.mp3";
  }
  bgm.play();
};
const bgmPause = () => bgm.pause();
const audioPlay = () => {
  audio.stop();
  if (!audio.src) {
    audio.sessionCategory = "ambient";
    audio.src = "https://admin.daishuyule.cn/agreement/image/sound.mp3";
  }
  audio.play();
};
const toggleImmerse = (flag: boolean) => {
  isImmerse.value = flag;
  if (flag) {
    bgmPause();
  } else {
    bgmPlay();
  }
};
const toggleAuto = (flag: boolean) => {
  isAuto.value = flag;
  if (flag) {
    interval.value = setInterval(() => {
      changFish();
    }, 2000);
  } else {
    clearInterval(interval.value);
  }
};
const changFish = () => {
  const count = (fishInfo.count ?? 0) + 1;
  fishActive.value = true;
  tipsList.value.push({
    label: tabList[tabIndex.value].tips,
    index: count
  });
  fishInfo.count = count;
  setTimeout(() => {
    fishActive.value = false;
    if (tipsList.value.length > 5) {
      tipsList.value.shift();
    }
  }, 300);
  audioPlay();
};
</script>

<style lang="scss" scoped>
@keyframes textMove {
  from {
    top: 100%;
    opacity: 1;
  }
  to {
    top: 18%;
    opacity: 0;
  }
}
@keyframes countTipMove {
  from {
    top: -200rpx;
    opacity: 1;
  }
  to {
    top: 0;
    opacity: 0;
  }
}
.fish {
  font-family: geetype;
  background-color: #000;
  height: calc(100vh - 88rpx);
  /* #ifdef MP-WEIXIN */
  height: 100vh;
  /* #endif */
  width: 100%;
  @include flexCenter;
  flex-direction: column;
  .count {
    @include flexCenter;
    flex-direction: column;
    flex: 2;
    &-num {
      font-size: 140rpx;
      color: #fff;
    }
    &-label {
      font-size: 60rpx;
      color: #444;
    }
  }
  .audio {
    display: none;
  }
  .box {
    width: 100%;
    flex: 5;
    @include flexCenter;
    flex-direction: column;
    position: relative;
    &-tip {
      width: 100%;
      height: 200rpx;
      position: absolute;
      bottom: 75%;
      right: 20rpx;
      @include flexCenter;
      align-items: flex-end;
      flex-direction: column;
      &-item {
        position: absolute;
        font-size: 30rpx;
        margin: 0 20rpx;
        animation: textMove 1.5s;
        opacity: 0;
        color: #444;
      }
    }
    &-fish {
      //width: 100%;
      height: 100%;
      @include flexCenter;
      flex-direction: column;
      &.active {
        transform: scale(0.95);
        transition: all 0.1s cubic-bezier(0.5, 0.35, 0.15, 1.4);
      }
    }
  }
  .footer {
    flex: 1;
    @include flexCenter;
    &-btn {
      font-size: 40rpx;
      color: #fff;
      margin: 0 20rpx;
      cursor: pointer;
      border-radius: 20rpx;
      border: 1px solid #fff;
      padding: 10rpx 20rpx;
      &:active {
        background-color: #fff;
        color: #000;
      }
    }
  }
  .message {
    font-size: 40rpx;
    text-align: center;
    padding: 50rpx 20rpx;
  }
}
</style>
