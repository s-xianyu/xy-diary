<template>
  <view class="empty" :style="{height: height + 'px'}">
    <image class="empty-img" src="@/static/image/home/5.png"></image>
    <text class="empty-text" v-html="text"/>
    <slot/>
  </view>
</template>

<script>
export default {
  name: 'index',
  props: {
    height: {
      type: [Number, String],
      default: 500
    },
    text: {
      type: String,
      default: '暂无数据'
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>

.empty{
  @include flexCenter;
  flex-direction: column;
  &-img{
    @include wh(360rpx, 360rpx);
  }
  &-text{
    color: $uni-color;
    font-size: 30rpx;
    text-align: center;
  }
}
</style>
