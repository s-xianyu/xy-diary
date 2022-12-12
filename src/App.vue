<script>
import pageAnimation from './components/s-animation/index'
// 测试2
export default {
  mixins: [pageAnimation],
  data () {
    return {
      userInfo: {}
    }
  },
  async onLaunch () {
    console.log('onLaunch')
  },
  onHide () {
    console.log('App Hide')
  },
  onLoad () {

  },
  onUnload () {
    console.log('onUnload')
  }
}
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-ui/index";
body{
  //background: linear-gradient(50%, #999, #444);
  // background: linear-gradient(180deg, #999 0%, #555 100%);
}
page{
  background-color: $uni-color-bg;
  min-height: calc(100vh - 100rpx);
}
</style>
