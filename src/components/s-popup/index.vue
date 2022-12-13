<template>
  <u-popup :value.sync="visible"
           mode="center"
           :width="width"
           :z-index="zIndex"
           @close="close"
           :mask-close-able="maskCloseAble"
           border-radius="30">
    <s-car>
      <view class="header">{{title}}</view>
      <view class="con">
        <slot/>
      </view>
      <view class="btn">
        <view v-if="showClose" class="btn-close" @click="close">取消</view>
        <view class="btn-commit" @click="commit">决定了鸭</view>
      </view>
    </s-car>
  </u-popup>
</template>

<script>
import sCar from '../s-car/index.vue'
export default {
  components: {
    sCar
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    maskCloseAble: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: '70%'
    },
    title: {
      type: String,
      default: '请选择'
    },
    zIndex: {
      type: [String, Number],
      default: 10075
    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    commit () {
      this.close()
      this.$emit('commit')
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  @include wh(100%, 80rpx);
  font-size: 38rpx;
  @include flexCenter;
}
.con{
  background: #fff;
}
.btn{
  background: #fff;
  @include wh(100%, auto);
  @include flexCenter;
  padding: 40rpx 30rpx;
  gap: 20rpx;
  &-close,
  &-commit{
    @include flexCenter;
    @include wh(100%, 80rpx);
    border-radius: 50rpx;
    border: 2px solid $uni-font;
    background: $uni-color;
    color: $uni-font;
    font-size: 36rpx;
  }
  &-close{
    background: #fff;
  }
}
</style>
