// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
const install = (Vue, vm) => {
  // 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
  vm.$u.api = {
    getHitokoto: (params = {}) => vm.$u.get('https://international.v1.hitokoto.cn/', params),
    getBiturl: (params = {}) => vm.$u.get('https://api.ixiaowai.cn/mcapi/mcapi.php?return=json', params),
    getGqapi: (params = {}) => vm.$u.get('https://api.ixiaowai.cn/gqapi/gqapi.php?return=json', params)
    // getBiturl2: (params = {}) => vm.$u.get('/api/mcapi/mcapi.php?return=json', params),
    // getYlapi: (params = {}) => vm.$u.get('/api/ylapi/index.php/?code=json', params)
  }
}

export default {
  install
}
