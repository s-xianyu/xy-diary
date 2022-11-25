<template>
  <u-popup :value.sync="visible"
           mode="center"
           :width="width"
           @close="close"
           border-radius="30">
    <s-car>
      <view class="header">{{title}}</view>
      <view class="con">
        <slot/>
      </view>
      <view class="btn">
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
    width: {
      type: [String, Number],
      default: '70%'
    },
    title: {
      type: String,
      default: '请选择'
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
  padding: 40rpx 0;
  &-commit{
    @include flexCenter;
    @include wh(80%, 80rpx);
    border-radius: 50rpx;
    border: 2px solid $uni-border-color;
    background: $uni-color;
    color: $uni-font;
    font-size: 36rpx;
  }
}
</style>
