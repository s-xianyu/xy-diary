<template>
  <view class="lottery">
    <view class="lottery-hint">中午不知道吃什么的时候，可以写下附近喜欢吃的小店，开启随机转一转，不为吃饭而烦恼。</view>
    <LuckyWheel
      ref="myLucky"
      :width="lotterySize"
      :height="lotterySize"
      :blocks="blocks"
      :prizes="prizes"
      :buttons="buttons"
      @start="startCallBack"
      @end="endCallBack"/>
    <view class="btn">
      <view class="btn-setting" @click="settingVisible = true">设置</view>
      <view class="btn-setting" @click="resetVisible = true">重置</view>
    </view>
    <!-- 表单设置项 转盘内容区设置 -->
    <s-popup :visible.sync="settingVisible"
             :show-close="true"
             :mask-close-able="false"
             width="80%"
             @commit="settingCommit"
             title="设置菜单">
      <scroll-view :scroll-top="scrollTop" scroll-y="true"  class="popup">
        <view class="form">
          <u-form :model="form" ref="uForm">
            <u-form-item
              label-width="150"
              label="抽奖按钮">
              <input
                type="text"
                maxLength="4"
                v-model="formButton"
                placeholder="请输入抽奖按钮文案">
            </u-form-item>
            <u-form-item
              v-for="(value, key) in form"
              :key="key"
              label-width="150"
              :label="`位置${filterIndex(key)}`">
              <input
                type="select"
                v-model="form[`${key}`]"
                maxlength="10"
                :placeholder="`请输入位置${filterIndex(key)}`" />
              <template slot="right">
                <u-icon name="trash-fill" @click="delForm(key)"></u-icon>
              </template>
            </u-form-item>
          </u-form>
        </view>
      </scroll-view>
      <view class="add">
        <view class="add-btn" @click="addForm">加一项鸭</view>
      </view>
    </s-popup>
    <!-- 中午吃啥呀提示框 -->
    <s-popup :visible.sync="lotteryVisible"
             title="中午去吃"
             width="80%">
      <view class="hint">
        <view class="hint-lottery">{{ lotteryTitle }}</view>
      </view>
    </s-popup>
    <!-- 重置确认框 -->
    <s-popup :visible.sync="resetVisible"
             title="确认重置"
             :show-close="true"
             @commit="resetInfo"
             width="80%">
      <view class="hint">
        <view class="hint-title">重置后，你所保留的内容会消失！</view>
      </view>
    </s-popup>
  </view>
</template>

<script>
// #ifdef MP-WEIXIN
import LuckyWheel from '@lucky-canvas/uni/lucky-wheel' // 大转盘
// #endif
import sPopup from '@/components/s-popup/index.vue'
export default {
  components: {
    // #ifdef MP-WEIXIN
    LuckyWheel,
    // #endif
    sPopup
  },
  data () {
    return {
      scrollTop: 0, // 滚动视口
      lotteryPrizes: [
        '蒸羊羔',
        '蒸熊掌',
        '蒸鹿尾儿',
        '烧花鸭',
        '烧雏鸡儿',
        '烧子鹅',
        '卤煮咸鸭',
        '酱鸡'
      ], // 默认转盘内容
      settingVisible: false, // 转盘设置弹框
      form: {}, // 表单内容
      formButton: '', // 按钮内容
      lotteryVisible: false, // 中间弹框
      lotteryTitle: '暂无内容',
      resetVisible: false
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage () {
    return {
      title: '一起来选择下班吃啥呀',
      path: `/pages/home/lottery?prizes=${JSON.parse(this.vuex_lottery.prizes)}&nutton=${JSON.parse(this.vuex_lottery.button)}`
    }
  },
  onShareTimeline () {
    return {
      title: '咸鱼日记'
    }
  },
  async onLoad (options) {
    // 分享内容后保存到缓存
    const prizes = options.prizes && JSON.parse(options.prizes)
    const button = options.button && JSON.parse(options.button)
    if (prizes?.length) {
      this.$u.vuex('vuex_lottery.prizes', prizes)
    }
    if (button) {
      this.$u.vuex('vuex_lottery.button', button)
    }
    this.setForm()
  },
  computed: {
    lotterySize () {
      let size = '700rpx'
      // #ifdef H5
      size = '350px'
      // #endif
      return size
    },
    blocks () {
      return [{ padding: '13px', background: this.colors.color }]
    },
    colors () {
      const { color, fontColor } = this.$variables
      const color8 = this.getHexColor(this.$u.colorToRgba(color, 0.8))
      const color6 = this.getHexColor(this.$u.colorToRgba(color, 0.6))
      const color3 = this.getHexColor(this.$u.colorToRgba(color, 0.3))
      return {
        fontColor,
        color,
        color8,
        color6,
        color3
      }
    },
    buttons () {
      const text = this.insertStr(
        this.vuex_lottery.button || '开始抽奖',
        2,
        '\n'
      )
      const colors = this.colors
      return [
        { radius: '50px', background: colors.color },
        { radius: '45px', background: colors.color3 },
        {
          radius: '40px',
          background: colors.color8,
          pointer: true,
          fonts: [
            { text: text, top: '-20px', fontColor: colors.fontColor }
          ]
        }
      ]
    },
    // 转盘内容
    prizes () {
      const prizes = this.vuex_lottery.prizes
      const colors = this.colors
      const list = prizes.map((item, index) => {
        const color = index % 2 === 0 ? colors.color6 : colors.color3
        return {
          fonts: [
            {
              text: item,
              fontColor: colors.fontColor,
              top: '10%'
            }
          ],
          background: color
        }
      })
      return list
    }
  },
  methods: {
    /**
     * 获取下标
     * @param name
     * @returns {*}
     */
    filterIndex (name) {
      return name.split('_')[1]
    },
    /**
     * 转化颜色
     * @param color
     * @returns {string}
     */
    getHexColor (color) {
      const values = color
        .replace(/rgba?\(/, '')
        .replace(/\)/, '')
        .replace(/[\s+]/g, '')
        .split(',')
      const a = parseFloat(values[3] || 1)
      const r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255)
      const g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255)
      const b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255)
      return '#' +
    ('0' + r.toString(16)).slice(-2) +
    ('0' + g.toString(16)).slice(-2) +
    ('0' + b.toString(16)).slice(-2)
    },
    /**
     * 抽奖按钮中间添加\n换行使用
     * @param source
     * @param start
     * @param newStr
     * @returns {*}
     */
    insertStr (source, start, newStr) {
      return source.slice(0, start) + newStr + source.slice(start)
    },
    /**
     * 设置表单内容
     * 添加、重置更新当前表单
     */
    setForm () {
      const lotteryPrizes = this.vuex_lottery.prizes
      const prizes = lotteryPrizes?.length ? lotteryPrizes : this.lotteryPrizes
      this.form = {}
      prizes.forEach((item, index) => {
        this.$set(this.form, `name_${index}`, item)
      })
      this.formButton = this.vuex_lottery.button
      this.$u.vuex('vuex_lottery.prizes', prizes)
    },
    /**
     * 点击抽奖按钮触发回调
     */
    startCallBack () {
      // 先开始旋转
      this.$refs.myLucky.play()
      // 使用定时器来模拟请求接口
      setTimeout(() => {
        // 假设后端返回的中奖索引是0
        const index = Math.floor(Math.random() * this.prizes.length)
        // 调用stop停止旋转并传递中奖索引
        this.$refs.myLucky.stop(index)
      }, 3000)
    },
    /**
     * 抽奖结束触发回调
     * @param prize
     */
    endCallBack (prize) {
      // 奖品详情
      const { fonts } = prize
      this.lotteryVisible = true
      this.lotteryTitle = fonts[0].text || '暂无内容'
    },
    /**
     * 重置菜单
     */
    resetInfo () {
      this.$u.vuex('vuex_lottery.prizes', this.lotteryPrizes)
      this.$u.vuex('vuex_lottery.button', '今天吃啥')
      this.setForm()
      this.$toast.none('已重置')
    },
    /**
     * 保存菜单项
     */
    settingCommit () {
      const { form, formButton } = this
      // 保存按钮内容
      this.$u.vuex('vuex_lottery.button', formButton)
      const arr = []
      for (const key in form) {
        arr.push(form[key])
      }
      this.$u.vuex('vuex_lottery.prizes', arr)
    },
    /**
     * 删除一项菜单
     * @param key
     */
    delForm (key) {
      this.$delete(this.form, key)
    },
    /**
     * 添加一项菜单
     */
    addForm () {
      const index = Object.keys(this.form).length
      if (index < 18) {
        this.$set(this.form, `name_${index}`, '')
        this.$nextTick(() => {
          this.scrollTop += 500
        })
      } else {
        this.$toast.none('不能再加了，好吃的太多了')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lottery{
  padding: 50rpx 0 0;
  @include wh(100%, calc(100vh - 88rpx));
  @include flexCenter;
  flex-direction: column;
  justify-content: flex-start;
  &-hint{
    padding: 0 30rpx 40rpx;
    font-size: 34rpx;
    color: $uni-font;
    text-indent: 2em;
  }
  .btn{
    @include flexCenter;
    justify-content: space-between;
    @include wh(100%, auto);
    padding: 50rpx 30rpx;
    &-setting{
      @include flexCenter;
      @include wh(250rpx, 90rpx);
      border-radius: 50rpx;
      border: 2px solid $uni-font;
      background: $uni-color;
      color: $uni-font;
      font-size: 40rpx;
    }
  }
  .popup{
    width: auto;
    max-height: calc(100vh - 650rpx);
    .form{
      padding: 0 30rpx;
    }
  }
  .add{
    @include flexCenter;
    &-btn{
      @include wh(100%, 60rpx);
      @include flexCenter;
    }
  }
  .hint{
    &-lottery{
      @include wh(100%, 200rpx);
      font-size: 45rpx;
      font-weight: bold;
      @include flexCenter;
      letter-spacing: .1em;
      color: $uni-color;
      letter-spacing: .1em;
      text-shadow: -1px -1px 1px #111111, 2px 2px 1px $uni-font;
    }
    &-title{
      @include wh(100%, 200rpx);
      @include flexCenter;
      font-size: 34rpx;
      color:$uni-font;
    }
  }
}
</style>
