<!--
 * @Author: ss shangs@schbrain.com
 * @Date: 2022-07-15 14:02:06
 * @LastEditors: ss shangs@schbrain.com
 * @LastEditTime: 2022-08-08 11:12:13
 * @FilePath: /v2-uni-app/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script>
// 测试2
export default {
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
  min-height:100vh;
}
</style>
