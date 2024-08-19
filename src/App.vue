<script lang="ts" setup>
import { mpUpdate } from "@/utils/mpUpdate";

onLaunch(() => {
  // #ifdef MP
  mpUpdate();
  // #endif
});
</script>
<style lang="scss">
@import "uview-plus/index.scss";
</style>
