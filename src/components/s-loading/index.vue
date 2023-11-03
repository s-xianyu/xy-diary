<template>
  <view class="loading">
    <loading1 v-if="loadingType === 1"></loading1>
    <loading2 v-if="loadingType === 2"></loading2>
    <loading3 v-if="loadingType === 3"></loading3>
    <loading4 v-if="loadingType === 4"></loading4>
    <loading5 v-if="loadingType === 5"></loading5>
    <loading6 v-if="loadingType === 6"></loading6>
  </view>
</template>

<script>
import Loading1 from './loading1.vue'
import Loading2 from './loading2.vue'
import Loading3 from './loading3.vue'
import Loading4 from './loading4.vue'
import Loading5 from './loading5.vue'
import Loading6 from './loading6.vue'
export default {
  name: 's-loading',
  components: { Loading1, Loading2, Loading3, Loading4, Loading5, Loading6 },
  props: {
    loadingType: {
      type: [Number, String],
      default: 2
    }
  }
}
</script>

<style>
.loading{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background:rgba(255,255,255,.3);
}
</style>
