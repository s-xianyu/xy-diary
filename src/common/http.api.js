/*
 * @Author: your name
 * @Date: 2021-11-23 22:56:56
 * @LastEditTime: 2021-11-26 14:01:11
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /uni-module/src/common/http.api.js
 */
// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
const install = (Vue, vm) => {
  // 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
  vm.$u.api = {
    // 登录获取token
    getCodeInfo: (params = {}) => vm.$u.get('http://www.net.cn/static/customercare/yourip.asp', params),
    getHitokoto: (params = {}) => vm.$u.get('https://international.v1.hitokoto.cn/', params)
  }
}

export default {
  install
}
