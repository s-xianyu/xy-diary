<template>
  <view class="loading">
    <loading1 v-if="props.loadingType === 1"></loading1>
    <loading2 v-if="props.loadingType === 2"></loading2>
    <loading3 v-if="props.loadingType === 3"></loading3>
    <loading4 v-if="props.loadingType === 4"></loading4>
    <loading5 v-if="props.loadingType === 5"></loading5>
    <loading6 v-if="props.loadingType === 6"></loading6>
  </view>
</template>

<script lang="ts" setup>
import Loading1 from "./loading1.vue";
import Loading2 from "./loading2.vue";
import Loading3 from "./loading3.vue";
import Loading4 from "./loading4.vue";
import Loading5 from "./loading5.vue";
import Loading6 from "./loading6.vue";
interface Props {
  loadingType: number;
}
const props = withDefaults(defineProps<Props>(), {
  loadingType: 2
});
</script>

<style>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.3);
}
</style>
