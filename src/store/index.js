import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let lifeData = {}

try {
  // 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
  lifeData = uni.getStorageSync('lifeData')
} catch (e) {

}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
const saveStateKeys = [
  'vuex_user',
  'vuex_lottery',
  'vuex_fish'
]

// 保存变量到本地存储中
const saveLifeData = function (key, value) {
  // 判断变量名是否在需要存储的数组中
  if (saveStateKeys.indexOf(key) !== -1) {
    // 获取本地存储的lifeData对象，将变量添加到对象中
    let tmp = uni.getStorageSync('lifeData')
    // 第一次打开APP，不存在lifeData变量，故放一个{}空对象
    tmp = tmp || {}
    tmp[key] = value
    // 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
    uni.setStorageSync('lifeData', tmp)
  }
}
const store = new Vuex.Store({
  state: {
    // 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
    // 加上vuex_前缀，是防止变量名冲突，也让人一目了然
    vuex_user: lifeData.vuex_user ? lifeData.vuex_user : {
      name: '李白',
      birthData: '1990-01-01',
      dutyTime: '09:00',
      closingTime: '18:30',
      retirement: 50,
      monthlyPay: '10000',
      savingsPay: '100000',
      expensesPay: '5000',
      retirementMoney: 0,
      dayMoney: 0,
      vacationList: ['星期六', '星期日'],
      payTitle: 10,
      payDay: 0
    },
    vuex_lottery: lifeData.vuex_lottery ? lifeData.vuex_lottery : {
      prizes: [],
      button: '今天吃啥'
    },
    // 如果vuex_version无需保存到本地永久存储，无需lifeData.vuex_version方式
    vuex_version: '1.0.0',
    vuex_fish: lifeData.vuex_fish ? lifeData.vuex_fish : {
      count: ''
    }
  },
  mutations: {
    $uStore (state, payload) {
      // 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
      const nameArr = payload.name.split('.')
      let saveKey = ''
      const len = nameArr.length
      if (len >= 2) {
        let obj = state[nameArr[0]]
        for (let i = 1; i < len - 1; i++) {
          obj = obj[nameArr[i]]
        }
        // obj[nameArr[len - 1]] = payload.value
        Vue.set(state[nameArr[0]], nameArr[[len - 1]], payload.value)
        saveKey = nameArr[0]
      } else {
        // 单层级变量，在state就是一个普通变量的情况
        // state[payload.name] = payload.value
        Vue.set(state, payload.name, payload.value)
        saveKey = payload.name
      }
      // 保存变量到本地，见顶部函数定义
      saveLifeData(saveKey, state[saveKey])
    }
  }
})

export default store
