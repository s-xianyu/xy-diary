<template>
  <view class="setting">
    <template v-if="!pageLoading">
      <s-car>
        <view class="img">
          <image
            style="width: 300px; height: 300px;opacity: .2"
            src="../../static/image/home/4.png"></image>
        </view>
        <view class="box">
          <u-form :model="form" ref="uForm">
            <u-form-item label-width="150" label="出生日期">
              <picker mode="date" :value="form.birthData" :start="startDate" :end="endDate" @change="birthDataChange">
                <view class="uni-input">{{form.birthData}}</view>
              </picker>
            </u-form-item>
            <u-form-item label-width="150" label="上班时间">
              <picker mode="time" :value="form.dutyTime" start="06:00" end="21:00" @change="dutyTimeChange">
                <view class="uni-input">{{form.dutyTime}}</view>
              </picker>
            </u-form-item>
            <u-form-item label-width="150" label="下班时间">
              <picker mode="time" :value="form.closingTime" start="06:00" end="21:00" @change="closingTimeChange">
                <view class="uni-input">{{form.closingTime}}</view>
              </picker>
            </u-form-item>
            <u-form-item label-width="150" label="退休年龄">
              <picker :value="retirementIndex" :range="array" @change="retirementChange">
                <view class="uni-input">{{form.retirement}}</view>
              </picker>
            </u-form-item>
            <u-form-item label-width="150" label="平均月薪">
              <input type="digit" v-model="form.monthlyPay" placeholder="请输入平均月薪" />
            </u-form-item>
            <u-form-item label-width="150" label="现有积蓄">
              <input type="digit" v-model="form.savingsPay" placeholder="请输入现有积蓄" />
            </u-form-item>
            <u-form-item label-width="150" label="每月开销">
              <input type="digit" v-model="form.expensesPay" placeholder="请输入每月开销" />
            </u-form-item>
          </u-form>
        </view>
      </s-car>
      <view class="btn">
        <view class="btn-commit" @click="commitForm">决定了鸭</view>
      </view>
    </template>
    <s-loading v-else/>
    <u-toast ref="uToast" />
  </view>
</template>

<script>
import sCar from '@/components/s-car/index.vue'
export default {
  components: {
    sCar
  },
  data () {
    return {
      pageLoading: true,
      form: {},
      array: [35, 40, 45, 50, 55, 60, 65]
    }
  },
  computed: {
    startDate () {
      return this.getDate('start')
    },
    endDate () {
      return this.getDate('end')
    },
    retirementIndex () {
      return this.array.findIndex(i => i === this.form.retirement) || 0
    }
  },
  onShow () {
    this.form = this.vuex_user
    setTimeout(() => {
      this.pageLoading = false
    }, 500)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage () {
    return {
      title: '咸鱼日记'
    }
  },
  onShareTimeline () {
    return {
      title: '咸鱼日记'
    }
  },
  methods: {
    getDate (type) {
      const date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()

      if (type === 'start') {
        year = year - 60
      } else if (type === 'end') {
        year = year + 2
      }
      month = month > 9 ? month : '0' + month
      day = day > 9 ? day : '0' + day
      return `${year}-${month}-${day}`
    },
    setInfo (type, detail) {
      this.form[type] = detail.value
    },
    birthDataChange ({ detail }) {
      this.setInfo('birthData', detail)
    },
    dutyTimeChange ({ detail }) {
      this.setInfo('dutyTime', detail)
    },
    closingTimeChange ({ detail }) {
      this.setInfo('closingTime', detail)
    },
    retirementChange ({ detail }) {
      detail.value = this.array[detail.value]
      this.setInfo('retirement', detail)
    },
    commitForm () {
      this.$u.vuex('vuex_user', this.form)
      this.$refs.uToast.show({
        title: '数据已经更新啦！',
        type: 'success',
        callback: () => {
          this.$u.onBack('/pages/home/index')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.setting{
  position: relative;
  padding: 30rpx;
  .img{
    @include wh(100rpx, 80rpx);
    position: relative;
  }
  .box{
    background:#ffffff;
    padding: 0 30rpx;
  }
  .btn{
    @include wh(100%, auto);
    @include flexCenter;
    padding-top: 40rpx;
    &-commit{
      @include flexCenter;
      @include wh(80%, 110rpx);
      border-radius: 50rpx;
      border: 2px solid $uni-border-color;
      background: $uni-color;
      color: $uni-font;
      font-size: 40rpx;
    }
  }
}
</style>
