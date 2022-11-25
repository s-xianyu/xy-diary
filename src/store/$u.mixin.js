/*
 * @Author: ss shangs@schbrain.com
 * @Date: 2022-07-15 14:08:02
 * @LastEditors: ss shangs@schbrain.com
 * @LastEditTime: 2022-08-08 10:59:21
 * @FilePath: /v2-uni-app/src/store/$u.mixin.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { mapState } from 'vuex'
import store from '@/store'
import variables from '../static/style/variables.scss'

// 尝试将用户在根目录中的store/login.js的vuex的state变量，全部加载到全局变量中
let $uStoreKey = []
try {
  $uStoreKey = store.state ? Object.keys(store.state) : []
} catch (e) {

}

module.exports = {
  beforeCreate () {
    // 将vuex方法挂在到$u中
    // 使用方法为：如果要修改vuex的state中的user.name变量为"史诗" => this.$u.vuex('login.name', '史诗')
    // 如果要修改vuex的state的version变量为1.0.1 => this.$u.vuex('version', '1.0.1')
    this.$u.vuex = (name, value) => {
      this.$store.commit('$uStore', {
        name, value
      })
    }
    /**
     * 退出登录
     */
    this.$u.outLogin = () => {
      this.$u.vuex('vuex_user', {})
    }
    /**
     * 返回
     * @param url 返回的url。可忽略
     */
    this.$u.onBack = (url) => {
      setTimeout(() => {
        const pages = getCurrentPages() // eslint-disable-line
        if (pages.length === 1) {
          uni.reLaunch({ url: url || '/' })
        } else {
          uni.navigateBack()
        }
      }, 300)
    }
  },
  computed: {
    // 将vuex的state中的所有变量，解构到全局混入的mixin中
    ...mapState($uStoreKey),
    $variables: () => variables
  }
}
