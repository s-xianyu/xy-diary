<template>
  <view class="fish">
    <view class="count">
      <view class="count-num">{{vuex_fish.count || 0}}</view>
      <view class="count-label">{{tabList[tabIndex].type}}</view>
    </view>
    <view class="box">
      <div class="box-tip">
        <view
          class="box-tip-item"
          v-for="item in tipsList"
          :key="item.index">{{item.label}}</view>
      </div>
      <div class="box-fish"
           :class="{active: fishActive}"
           @click="clickMuyu">
        <image style="width: 380rpx;height: 300rpx;" src="../../../static/video/svg.png"></image>
<!--        <svg class="woodenFish" width="157pt" height="126pt" viewBox="0 0 247 197" version="1.1" xmlns="http://www.w3.org/2000/svg" style="transform: scale(1);">-->
<!--          <g id="#eeeeeeff">-->
<!--            <path fill="#eeeeee" opacity="1" d=" M 109.12 6.53 C 124.09 4.27 139.37 2.82 154.47 4.79 C 173.07 7.14 191.38 14.02 206.02 25.89 C 217.01 34.77 225.17 46.63 231.55 59.13 C 237.81 72.25 241.16 86.53 243.92 100.74 C 225.49 104.75 206.58 105.76 187.77 106.20 C 186.21 100.02 183.12 93.94 177.74 90.25 C 172.00 85.96 163.98 84.19 157.26 87.18 C 145.99 91.69 139.62 105.22 142.63 116.85 C 145.12 127.39 154.97 136.11 166.05 135.69 C 176.18 134.97 184.61 126.81 187.19 117.22 C 192.74 116.73 198.32 116.63 203.89 116.32 C 217.57 115.26 231.14 113.14 244.82 111.98 C 245.52 121.28 246.13 130.75 244.11 139.94 C 242.32 149.02 239.23 158.07 233.39 165.39 C 224.88 176.55 212.15 183.64 199.01 187.98 C 187.42 191.86 175.20 193.41 163.05 194.29 C 140.40 195.87 117.64 195.62 94.99 194.19 C 74.79 192.81 54.55 190.78 34.79 186.17 C 27.91 184.54 21.07 182.47 14.77 179.21 C 8.58 175.93 4.23 169.71 2.72 162.92 C -0.48 151.41 3.00 139.09 9.20 129.21 C 14.61 119.75 27.61 116.88 30.81 105.83 C 35.50 90.01 37.28 73.40 42.87 57.82 C 47.56 45.36 54.34 33.26 64.82 24.75 C 77.25 14.19 93.24 9.04 109.12 6.53 Z"></path>-->
<!--          </g>-->
<!--        </svg>-->
      </div>
    </view>
    <view class="footer">
      <view
        v-if="!isImmerse"
        class="footer-btn"
        @click="toggleImmerse(true)">沉浸模式</view>
      <view
        v-else
        class="footer-btn"
        @click="toggleImmerse(false)">取消沉浸</view>
      <view
        v-if="!isAuto"
        class="footer-btn"
        @click="toggleAuto(true)">自动敲鱼</view>
      <view
        v-else
        class="footer-btn"
        @click="toggleAuto(false)">取消自动</view>
      <view class="footer-btn" @click="reload">重置</view>
    </view>
  </view>
</template>

<script>
const audio = uni.createInnerAudioContext()
const bgm = uni.createInnerAudioContext()
export default {
  data () {
    return {
      tabIndex: 0,
      tabList: [
        {
          type: '功德',
          tips: '功德 +1 佛主保佑你'
        },
        {
          type: '抗疫',
          tips: '阳性 -1 健健康康'
        }
      ],
      tipsList: [],
      isImmerse: false,
      isAuto: false,
      interval: null,
      fishActive: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.bgmPlay()
    }, 1000)
  },
  destroyed () {
    clearInterval(this.interval)
    bgm.destroy()
    audio.destroy()
  },
  methods: {
    bgmPlay () {
      if (!bgm.src) {
        bgm.sessionCategory = 'ambient'
        bgm.loop = true
        bgm.src = 'https://schbrain-static-online.schbrain.com/resources/bgm.mp3'
      }
      bgm.play()
    },
    bgmPause () {
      bgm.pause()
    },
    audioPlay () {
      audio.stop()
      if (!audio.src) {
        audio.sessionCategory = 'ambient'
        audio.src = '/static/video/sound.mp3'
      }
      audio.play()
    },
    toggleImmerse (flag) {
      this.isImmerse = flag
      if (flag) {
        this.bgmPause()
      } else {
        this.bgmPlay()
      }
    },
    toggleAuto (flag) {
      this.isAuto = flag
      if (flag) {
        this.interval = setInterval(() => {
          this.clickMuyu()
        }, 2000)
      } else {
        clearInterval(this.interval)
      }
    },
    clickMuyu () {
      const count = (this.vuex_fish.count || 0) + 1
      this.fishActive = true
      this.tipsList.push({
        label: this.tabList[this.tabIndex].tips,
        index: count
      })
      this.$u.vuex('vuex_fish.count', count)
      this.audioPlay()
      setTimeout(() => {
        this.fishActive = false
        // 删除tipsList列表保留5条
        if (this.tipsList.length > 5) {
          this.tipsList.shift()
        }
      }, 300)
    },
    reload () {
      this.$u.vuex('vuex_fish.count', 0)
    }
  }
}
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
.fish{
  font-family: geetype;
  background-color: #000;
  height: 100vh;
  width: 100%;
  @include flexCenter;
  flex-direction: column;
  .count{
    @include flexCenter;
    flex-direction: column;
    flex:2;
    &-num{
      font-size: 140rpx;
      color: #fff;
    }
    &-label{
      font-size: 60rpx;
      color: #444;
    }
  }
  .audio{
    display: none;
  }
  .box{
    width: 100%;
    flex:5;
    @include flexCenter;
    flex-direction: column;
    position: relative;
    &-tip{
      width: 100%;
      height: 200rpx;
      position: absolute;
      bottom: 75%;
      right: 20rpx;
      @include flexCenter;
      align-items: flex-end;
      flex-direction: column;
      &-item{
        position: absolute;
        font-size: 30rpx;
        margin: 0 20rpx;
        animation: textMove 1.5s;
        opacity: 0;
      }
    }
    &-fish{
      width: 100%;
      height: 100%;
      @include flexCenter;
      flex-direction: column;
      &.active{
        transform: scale(0.95);
        transition: all 0.1s cubic-bezier(0.5, 0.35, 0.15, 1.4);
      }
    }
  }
  .footer{
    flex:1;
    @include flexCenter;
    &-btn{
      font-size: 40rpx;
      color: #fff;
      margin: 0 20rpx;
      cursor: pointer;
      border-radius: 20rpx;
      border:1px solid #fff;
      padding: 10rpx 20rpx;
      &:active{
        background-color: #fff;
        color: #000;
      }
    }
  }
}
</style>
