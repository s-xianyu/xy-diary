<template>
  <view class="happy">
    <view class="happy-item"
          v-for="(item, index) in happyList"
          :key="index" @click="toPath(item)">
      <s-car class="content" :border="false">
        <s-background class="box">
          <div class="box">
            <text class="box-label">{{item.label}}</text>
            <view class="box-mark">
              <text class="box-mark-text">{{item.mark}}</text>
            </view>
          </div>
        </s-background>
      </s-car>
    </view>
    <view class="happy-item">
      <view class="empty">敬请<br>期待</view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      happyList: [
        {
          label: '2048',
          mark: '游戏',
          path: '2048'
        }
      ]
    }
  },
  methods: {
    toPath (item) {
      uni.navigateTo({
        url: `/pages/home/happy/${item.path}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.happy{
  padding: 30rpx;
  @include flexCenter;
  flex-wrap: wrap;
  gap:30rpx;
  &-item{
    flex:1;
    .content{
      display: block;
      .box{
        position: relative;
        height: 300rpx;
        @include flexCenter;
        &-label{
          font-size: 72rpx;
          font-weight: bold;
          letter-spacing: 10rpx;
          font-family: fantasy;
        }
        &-mark{
          width: 80rpx;
          height: 80rpx;
          position: absolute;
          top: 0;
          right: 0;
          font-weight: bold;
          background: $uni-color;
          font-size: 30rpx;
          border-radius: 100% 0% 0% 100% / 0% 50% 50% 100%;
          &-text{
            display: block;
            transform: rotate(45deg) translate(10px, 3px);
            color: #ffffff;
          }
        }
      }
    }
    .empty{
      height: 300rpx;
      background: #e5e4e4;
      border-radius: 20rpx;
      @include flexCenter;
      font-size: 72rpx;
    }
  }
}
</style>
