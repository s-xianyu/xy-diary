<template>
  <view class="profile">
    <view class="list">
      <view class="list-item"
            v-for="(item, index) in profileList"
            @click="openPopup(item, index)"
            :key="index">
        <s-car class="content" :border="false">
          <view class="box">
            <view class="box-label">{{item.label}}</view>
            <view class="box-title">{{item.title}}</view>
            <view class="box-img">
              <image :src="require(`@/static/image/home/${item.img}`)"></image>
            </view>
          </view>
        </s-car>
      </view>
    </view>
    <view class="footer">
      <view class="organizer">
        <view>Organizer by @咸鱼日记</view>
        <view>Author:  cmy and s-xianyu</view>
      </view>
    </view>
    <!-- 发薪日选择框 -->
    <s-popup :visible.sync="visible"
             :title="popupObj.label">
      <view class="popup">
        <view class="popup-item" v-if="popupObj.index === 0">
          <view>暂时还没有东西看哦</view>
        </view>
        <view class="popup-item" v-else-if="popupObj.index === 1">
          <view>
            <image
              style="width:200rpx; height:200rpx"
              src="@/static/image/home/weChat.png"></image>
          </view>
        </view>
        <view class="popup-item" v-else-if="popupObj.index === 2">
          <view>咸鱼日记诞生记</view>
        </view>
        <view class="popup-item" v-else>
          <view>微信：s-xianyu</view>
          <view>备注：咸鱼日记</view>
        </view>
      </view>
    </s-popup>
  </view>
</template>
<script>
import sCar from '@/components/s-car/index.vue'
import sPopup from '@/components/s-popup/index.vue'
export default {
  components: {
    sCar,
    sPopup
  },
  data () {
    return {
      profileList: [
        { label: '世界那么大', title: '我要去看看', img: '9.png' },
        { label: '欢迎投喂', title: '请我吃糖', img: '7.png' },
        { label: '关于日记', title: '咸鱼日记诞生记', img: '6.png' },
        { label: '联系我', title: '欢迎合作', img: '2.png' }
      ],
      visible: false,
      popupObj: {
        index: 0,
        label: '选择',
        item: {}
      }
    }
  },
  async onShow () {
    console.log('xy-diary')
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage () {
    return {
      title: '咸鱼日记'
    }
  },
  onShareTimeline () {
    return {
      title: '咸鱼日记'
    }
  },
  methods: {
    openPopup (item, index) {
      this.visible = true
      this.popupObj = {
        index,
        label: item.label,
        item
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.profile{
  padding: 30rpx 15rpx;
  .list{
    @include flexCenter;
    flex-wrap: wrap;
    &-item{
      width: 50%;
      box-sizing: border-box;
      .content{
        margin: 0 15rpx 30rpx;
        display: block;
        .box{
          background: #ffffff;
          @include flexCenter;
          flex-direction: column;
          &-label{
            @include wh(80%, 60rpx);
            background: $uni-color;
            border-radius: 40rpx;
            @include flexCenter;
            margin: 30rpx 0 10rpx;
            font-size: 40rpx;
            font-family: xy;
            position: relative;
            z-index: 2;
            color:$uni-font;
          }
          &-title{
            font-size: 34rpx;
            color: rgba($color: $uni-font, $alpha: .3);
          }
          image{
            @include wh(200rpx, 200rpx);
          }
        }
      }
    }
  }
  .footer{
    margin-top:20rpx;
    .organizer{
      @include wh(100%, auto);
      @include flexCenter;
      flex-direction: column;
      font-size: 28rpx;
      color: rgba($color: $uni-font, $alpha: .3);
    }
  }
  .popup{
    padding: 30rpx;
    &-item{
      @include flexCenter;
      flex-direction: column;
    }
  }
}
</style>
