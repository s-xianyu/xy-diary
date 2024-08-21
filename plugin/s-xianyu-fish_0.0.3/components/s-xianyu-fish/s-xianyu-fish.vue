<template>
  <view class="fish">
    <view class="count">
      <view class="count-num">{{ count || 0 }}</view>
      <view class="count-label">{{ tabList[tabIndex].type }}</view>
    </view>
    <view class="box">
      <div class="box-tip">
        <view v-for="item in tipsList" :key="item.index" class="box-tip-item">{{ item.label }}</view>
      </div>
      <div :class="{ active: fishActive }" class="box-fish" @click="changFish">
        <image src="https://s21.ax1x.com/2024/08/19/pAPJhXd.png" style="width: 380rpx; height: 300rpx"></image>
      </div>
    </view>
    <view class="footer">
      <view class="footer-btn" @click="toggleImmerse(!isImmerse)">{{ isImmerse ? "取消沉浸" : "沉浸模式" }}</view>
      <view class="footer-btn" @click="toggleAuto(!isAuto)">{{ isAuto ? "取消自动" : "自动敲鱼" }}</view>
      <view class="footer-btn" @click="visible = true">重置</view>
    </view>
    <s-popup v-model:show="visible" title="确认清空吗？" @commit="count = 0">
      <div class="message">重置后，功德值会清空，请谨慎操作!</div>
    </s-popup>
  </view>
</template>
<script lang="ts" setup>
interface Tips {
  label: string;
  index: number;
}
const count = ref(0);
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
    bgm.src = "../static/bgm.mp3";
  }
  bgm.play();
};
const bgmPause = () => bgm.pause();
const audioPlay = () => {
  audio.stop();
  if (!audio.src) {
    audio.sessionCategory = "ambient";
    audio.src = "../static/sound.mp3";
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
  count.value = (count.value ?? 0) + 1;
  fishActive.value = true;
  tipsList.value.push({
    label: tabList[tabIndex.value].tips,
    index: count.value
  });
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
  font-family: geetype; // 字体包, 自行放置
  background-color: #000;
  height: calc(100vh - 88rpx);
  /* #ifdef MP-WEIXIN */
  height: 100vh;
  /* #endif */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .count {
    display: flex;
    align-items: center;
    justify-content: center;
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
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    &-tip {
      width: 100%;
      height: 200rpx;
      position: absolute;
      bottom: 75%;
      right: 20rpx;
      display: flex;
      justify-content: center;
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
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      &.active {
        transform: scale(0.95);
        transition: all 0.1s cubic-bezier(0.5, 0.35, 0.15, 1.4);
      }
    }
  }
  .footer {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
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
