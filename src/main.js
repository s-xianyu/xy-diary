import Vue from 'vue'
import App from './App'
import '@/utils/loading'

// 此处为演示vuex使用，非uView的功能部分
import store from '@/store'

// 引入全局uView
import uView from 'uview-ui'
// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js'

// http接口API抽离，免于写url或者一些固定的参数
import httpApi from '@/common/http.api.js'

Vue.config.productionTip = false

App.mpType = 'app'

// 引入uView提供的对vuex的简写法文件
const vuexStore = require('@/store/$u.mixin.js')
Vue.mixin(vuexStore)
Vue.use(uView)
const app = new Vue({
  store,
  ...App
})
Vue.use(httpInterceptor, app)
Vue.use(httpApi, app)
app.$mount()
