// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token
// 同时，我们也可以在此使用getApp().globalData，如果你把token放在getApp().globalData的话，也是可以使用的
const install = (Vue, vm) => {
  Vue.prototype.$u.http.setConfig({
    // baseUrl: 'http://192.168.5.166:2021', // mockApi地址
    // 如果将此值设置为true，拦截回调中将会返回服务端返回的所有数据response，而不是response.data
    // 设置为true后，就需要在this.$u.http.interceptor.response进行多一次的判断，请打印查看具体值
    // originalData: true,
    // 设置自定义头部content-type
    originalData: true, // 是否在拦截器中返回服务端的原始数据
    showLoading: false, // 是否显示请求中的loading
    loadingText: '加载中...', // 加载中文字
    loadingTime: 30000, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
    loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    header: {
      'content-type': 'application/json;charset=UTF-8'
    }
  })
  // 请求拦截，配置Token等参数
  Vue.prototype.$u.http.interceptor.request = (config) => {
    config.header.token = vm.vuex_user.token
    // const Token = vm.$u.getStorageSync('Token');
    // 方式一，存放在vuex的token，假设使用了uView封装的vuex方式，见：https://uviewui.com/components/globalVariable.html
    // common.header.token = vm.token;
    // 方式二，如果没有使用uView封装的vuex方法，那么需要使用$store.state获取
    // common.header.token = vm.$store.state.token;
    // 方式三，如果token放在了globalData，通过getApp().globalData获取
    // common.header.token = getApp().globalData.username;
    // 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的，所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
    // const token = uni.getStorageSync('token');
    // common.header.token = token;

    return config
  }
  // 响应拦截，判断状态码是否通过
  Vue.prototype.$u.http.interceptor.response = (res) => {
    // originalData = true
    // 如果把originalData设置为了true，这里得到将会是服务器返回的所有的原始数据
    // 判断可能变成了res.statueCode，或者res.data.code之类的，请打印查看结果
    // 表格数据导出
    // if (res.header && res.header['content-type'].includes('excel')) {
    //   return res.data;
    // }
    if (res.statusCode === 200) {
      // 如果把originalData设置为了true，这里return回什么，this.$u.post的then回调中就会得到什么
      return res.data
    } else {
      const message = /.*[\u4e00-\u9fa5]+.*$/.test(res.data.message) ? res.data.message : '服务异常请重试'
      vm.$toast.error(message)
      return false
    }
  }
}

export default {
  install
}
