<template>
  <view class="home">
    <template v-if="!pageLoading">
      <!-- 头部展示时间 -->
      <s-car :border="true">
        <view class="header">
          <view></view>
          <view class="header-title">摸鱼时间</view>
          <navigator url="/pages/setting/index" class="header-setting">
            <text>设置</text>
            <u-icon :color="$variables.fontColor" name="arrow-right-double"/>
          </navigator>
        </view>
        <view class="box">
          <view class="box-year">
            <text>{{ date.Y }}</text>年
            <text>{{ date.M }}</text>月
            <text>{{ date.D }}</text>天
          </view>
          <view class="box-data">
            <text>{{ date.hh }}</text>:
            <text>{{ date.mm }}</text>:
            <text>{{ date.ss }}</text>
          </view>
        </view>
      </s-car>
      <!-- 间距 -->
      <view class="gap">
        <view></view>
        <view></view>
      </view>
      <!-- 退休时间 -->
      <s-car :border="true">
        <view class="header">
          <view class="header-title">退休时间：{{retirement}}</view>
        </view>
        <view class="box">
          <template v-if="vuex_user.retirementMoney > 0">
            <view>距退休还剩</view>
            <view class="box-retirement">
              <text>{{ workDate.Y }}</text>年
              <text>{{ workDate.M }}</text>月
              <text>{{ workDate.D }}</text>天
              <text>{{ workDate.hh }}</text>时
              <text>{{ workDate.mm }}</text>分
              <text>{{ workDate.ss }}</text>秒
            </view>
            <view>还能到手的薪资为</view>
            <view class="box-retirement">
              <text>￥{{ vuex_user.retirementMoney }}</text>
            </view>
          </template>
          <view class="box-text" v-else>
            <text>终于熬到退休啦！</text>
            <image class="image" src="../../static/image/home/4.png"></image>
          </view>
        </view>
      </s-car>
      <!-- 间距 -->
      <view class="gap">
        <view></view>
        <view></view>
      </view>
      <!-- 今日收入 -->
      <s-car :border="true">
        <view class="header fl">
          <view class="header-title">今日收入</view>
        </view>
        <view class="box">
          <view class="box-days">
            <view class="money">
              <template v-if="vuex_user.retirementMoney > 0">
                <view>今日到手薪资</view>
                <view>￥<text>{{ vuex_user.dayMoney }}</text></view>
              </template>
              <view class="no" v-else>退休没工资了哦</view>
              <image class="image" src="../../static/image/home/9.png"></image>
            </view>
          </view>
        </view>
      </s-car>
      <view class="gap">
        <view></view>
        <view></view>
      </view>
      <view class="row">
        <navigator
          :url="`/pages/home/${ item.path }`"
          class="row-item"
          v-for="(item, index) in rowList"
          :key="index">
          <s-car :border="false">
            <view class="content">
              <view class="content-label">{{ item.label }}</view>
              <view class="content-main">
                <view class="icon">
                  <u-icon name="arrow-right" :color="$variables.fontColor" size="28"/>
                </view>
                <view class="img">
                  <image
                    class="img-i"
                    :src="require(`@/static/image/home/${ item.img }`)"></image>
                </view>
              </view>
            </view>
          </s-car>
        </navigator>
      </view>
      <!-- 间距 -->
      <view class="gap">
        <view></view>
        <view></view>
      </view>
      <!-- 每日一言 -->
      <s-car :border="true">
        <view class="header">
          <view class="header-title">每日一言</view>
          <view class="header-setting" @click="$u.throttle(getHitokoto, 2000, true)">
            <text>换一句</text>
          </view>
        </view>
        <view class="box" :class="boxClassName">
          <view class="box-bg">
            <image class="bg" :src="imgurl"></image>
          </view>
          <view class="box-hitokoto">
            <view class="box-hitokoto-title">
              <text>{{hitokoto.hitokoto || ''}}</text>
            </view>
            <view class="box-hitokoto-who">
              <text>-- {{hitokoto.from_who || hitokoto.creator || ''}}</text>
              <text>《{{hitokoto.from || '--'}}》</text>
            </view>
          </view>
        </view>
      </s-car>
      <u-gap height="20" bg-color="#0000"/>
      <!-- 休息日 -->
      <s-car :border="false">
        <view class="box" @click="vacationVisible = true">
          <view class="box-vacation">
            <view class="box-vacation-title">{{ vacationObj.title }}</view>
            <view class="box-vacation-number" v-if="vacationObj.day > 0">
              <text>{{ vacationObj.day }}</text>天
            </view>
          </view>
        </view>
      </s-car>
      <u-gap height="20" bg-color="#0000"/>
      <!-- 发薪日 -->
      <s-car :border="false">
        <view class="box" @click="payVisible = true">
          <view class="box-vacation">
            <view class="box-vacation-title">
              {{ vuex_user.payDay === 0 ? '今天发工资啦！' : '距离发薪日还有' }}
            </view>
            <view class="box-vacation-number"  v-if="vuex_user.payDay > 0">
              <text>{{ vuex_user.payDay }}</text>天
            </view>
          </view>
        </view>
      </s-car>
    </template>
    <s-loading v-else/>
    <!-- 休息日选择框 -->
    <s-popup :visible.sync="vacationVisible"
             @commit="vacationCommit"
             title="请选择休息日">
      <view class="popup">
        <view class="check">
          <view class="check-item"
                v-for="(item, index) in vacationList"
                @click.stop="toggleCheck(item)"
                :key="index">
            <text>{{item.name}}</text>
            <viewv class="icons" :class="{check: item.checked}">
              <u-icon v-if="item.checked" class="icons-i" name="checkbox-mark" size="14"></u-icon>
            </viewv>
          </view>
        </view>
      </view>
    </s-popup>
    <!-- 发薪日选择框 -->
    <s-popup :visible.sync="payVisible"
             @commit="payCommit"
             title="请选择发薪日">
      <view class="popup">
        <view class="picker">
          <text>每月</text>
          <picker class="picker-box"
                  :value="payIndex"
                  :range="payList"
                  range-key="label"
                  @change="payChange">
            <view class="uni-input">{{ payTitle }}</view>
          </picker>
          <text>日发薪</text>
        </view>
      </view>
    </s-popup>
  </view>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      pageLoading: true,
      title: '首页',
      date: {},
      retirement: '',
      workDate: {},
      setInterval: null,
      hitokoto: {},
      vacationVisible: false,
      vacationList: [
        { name: '星期一', checked: false },
        { name: '星期二', checked: false },
        { name: '星期三', checked: false },
        { name: '星期四', checked: false },
        { name: '星期五', checked: false },
        { name: '星期六', checked: false },
        { name: '星期日', checked: false }
      ],
      vacationObj: {
        day: 0,
        title: '距离放假还有'
      },
      payVisible: false,
      payList: [],
      payTitle: 0,
      imgurl: '',
      rowList: [
        { label: '吃饭时间到', img: '1.png', path: 'lottery' },
        { label: '下班做啥呀', img: '3.png', path: 'happy' }
      ]
    }
  },
  async onLoad () {
    this.getHitokoto()
    for (let i = 1; i < 31; i++) {
      this.payList.push({
        label: i + '日',
        value: i
      })
    }
    this.payTitle = this.vuex_user.payTitle
    this.vacationList = this.vacationList.map(item => {
      item.checked = this.vuex_user.vacationList.includes(item.name)
      return item
    })
    this.getWeek() // 获取放假日
  },
  async onShow () {
    await this.getData()
    await this.getRetirement() // 获取退休日
    await this.getPayData() // 获取发薪日
    this.setInterval = setInterval(() => {
      this.getData()
    }, 1000)
  },
  onHide () {
    clearTimeout(this.setInterval)
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
  computed: {
    payIndex () {
      return this.payList.findIndex(i => i.value === this.payTitle)
    },
    boxClassName () {
      let className = 'h5'
      // #ifdef MP-WEIXIN
      className = 'mp-weixin'
      // #endif
      return className
    }
  },
  methods: {
    /**
     * 一言获取
     * @returns {Promise<void>}
     */
    async getHitokoto () {
      this.hitokoto = await this.$u.api.getHitokoto().finally(() => {
        this.pageLoading = false
      })
      // #ifdef MP-WEIXIN
      const { imgurl } = await this.$u.api.getBiturl().finally(() => {
        this.pageLoading = false
      })
      this.imgurl = imgurl || ''
      // #endif
    },
    /**
     * 获取退休日
     */
    getRetirement () {
      const info = this.vuex_user
      const Y = moment(info.birthData).format('YYYY')
      const M = moment(info.birthData).format('MM')
      const D = moment(info.birthData).format('DD')
      this.retirement = (Number(Y) + Number(info.retirement) + '-' + M + '-' + D)
    },
    /**
     * 星期处理
     */
    getWeek () {
      const index = new Date().getDay() - 1
      const list = [...this.vacationList, ...this.vacationList]
      list.splice(0, index)
      const day = this.vacationObj.day = list.findIndex(item => item.checked)
      const title = day > 0 ? '距离放假还有' : (this.vuex_user.vacationList.length === 7 || day === 0) ? '今天休息日，开心' : '可怕，不休息的吗'
      this.vacationObj = {
        day,
        title
      }
    },
    /**
     * 定时器获取数据
     */
    getData () {
      this.getSelfData()
      this.getWorkData()
      this.getRetirementMoney()
      this.getDaysMoney()
    },
    /**
     * 当前时间
     */
    getSelfData () {
      const Y = moment().format('YYYY')
      const M = moment().format('MM')
      const D = moment().format('DD')
      const hh = moment().format('HH')
      const mm = moment().format('mm')
      const ss = moment().format('ss')
      this.date = {
        Y,
        M,
        D,
        hh,
        mm,
        ss,
        time: `${Y}-${M}-${D} ${hh}:${mm}:${ss}`
      }
    },
    /**
     * 计算退休时间
     */
    getWorkData () {
      const new_date = new Date(this.date.time.replace(/-/g, '/'))
      const old_date = new Date(`${this.retirement} 00:00:00`.replace(/-/g, '/'))
      const diffTime = (old_date.getTime() - new_date.getTime()) / 1000
      const dayCardinal = (365 / 12).toFixed(2)
      const ss = Math.floor(diffTime % 60)
      const mm = Math.floor(diffTime / 60 % 60)
      const hh = Math.floor(diffTime / 60 / 60 % 24)
      const D = Math.floor(diffTime / 60 / 60 / 24 % dayCardinal) - 4
      const M = Math.floor(diffTime / 60 / 60 / 24 / dayCardinal % 12)
      const Y = Math.floor(diffTime / 60 / 60 / 24 / dayCardinal / 12 % 365)
      this.workDate = {
        Y, M, D, hh, mm, ss
      }
    },
    /**
     * 计算退休总薪资
     */
    getRetirementMoney () {
      const et = `${this.retirement} 00:00:00`
      const st = this.date.time
      const endTime = new Date(et.replace(/-/g, '/')).getTime()
      const startTime = new Date(st.replace(/-/g, '/')).getTime()
      // 总时长毫秒数 / 7 * 5 按7休2计算
      const durationTime = (endTime - startTime) / 1000 / 7 * 5
      // 计算一天薪资 每月薪资 / 21.75
      const dayMoney = this.vuex_user.monthlyPay / 21.75
      // 每秒薪资 一天薪资 / 24 * 60 * 60
      const mmMoney = dayMoney / (24 * 60 * 60)
      const money = (durationTime * mmMoney).toFixed(4)
      this.$u.vuex('vuex_user.retirementMoney', money)
    },
    /**
     * 计算今日收入薪资
     */
    getDaysMoney () {
      const Y = moment().format('YYYY')
      const M = moment().format('MM')
      const D = moment().format('DD')
      const et = `${Y}-${M}-${D} ${this.vuex_user.closingTime}`
      const st = `${Y}-${M}-${D} ${this.vuex_user.dutyTime}`
      const endTime = new Date(et.replace(/-/g, '/')).getTime()
      const startTime = new Date(st.replace(/-/g, '/')).getTime()
      // 总时长毫秒数
      const durationTime = (endTime - startTime) / 1000
      const dayMoney = this.vuex_user.monthlyPay / 21.75
      const money = dayMoney / durationTime
      const selfTime = new Date(this.date.time.replace(/-/g, '/')).getTime()
      // 不到上班时间0
      if (selfTime < startTime) {
        this.$u.vuex('vuex_user.dayMoney', 0)
      }
      // 上班时间已结束
      if (selfTime >= endTime) {
        const m = (this.vuex_user.monthlyPay / 21.75).toFixed(4)
        this.$u.vuex('vuex_user.dayMoney', m)
      }
      // 上班区间
      if (selfTime > startTime && selfTime < endTime) {
        const m = ((selfTime - startTime) / 1000 * money).toFixed(4)
        this.$u.vuex('vuex_user.dayMoney', m)
      }
    },
    /**
     * 计算发薪日倒计时
     */
    getPayData () {
      const { Y, M, D } = this.date
      const { payTitle } = this.vuex_user
      // 判断 小于 当前时间，把月份 + 1
      let selfDay = Number(payTitle) >= D ? M : Number(M) + 1
      let selfYear = this.$u.deepClone(Y)
      if (selfDay > 12) {
        selfDay = 1
        selfYear = Number(selfYear) + 1
      }
      const et = `${selfYear}-${selfDay}-${this.vuex_user.payTitle} 00:00:00`
      const st = `${Y}-${M}-${D} 00:00:00`
      const endTime = new Date(et.replace(/-/g, '/')).getTime()
      const startTime = new Date(st.replace(/-/g, '/')).getTime()
      const day = Math.floor((endTime - startTime) / (1000 * 60 * 60 * 24))
      this.$u.vuex('vuex_user.payDay', day)
    },
    toggleCheck (item) {
      item.checked = !item.checked
    },
    /**
     * 休息日确认
     */
    vacationCommit () {
      const name = this.vacationList.filter(item => item.checked).map(item => item.name)
      this.$u.vuex('vuex_user.vacationList', name)
      this.getWeek()
    },
    /**
     * 选择发薪日
     * @param detail
     */
    payChange ({ detail }) {
      this.payTitle = Number(detail.value) + 1
    },
    /**
     * 发薪日确认
     */
    payCommit () {
      this.$u.vuex('vuex_user.payTitle', this.payTitle)
      this.payVisible = false
      this.getPayData()
    }
  }
}
</script>
<style lang="scss" scoped>
.home{
  padding: 30rpx;
  .header{
    @include wh(100%, 80rpx);
    @include flexCenter;
    padding: 0 20rpx;
    position: relative;
    &.fl{
      justify-content: flex-start;
    }
    &-title{
      margin-left:24rpx;
      margin-top: -10rpx;
      font-size: 38rpx;
      font-family: xy;
      color: $uni-font;
    }
    &-setting{
      font-family: xy;
      @include wh(150rpx, 80rpx);
      @include flexCenter;
      position: absolute;
      top:0;
      right:0;
      text{
        color: $uni-font;
        margin-top:-10rpx;
      }
    }
  }
  .row{
    @include flexCenter;
    gap: 15px;
    &-item{
      flex: 1;
      .content{
        background: #fff;
        @include flexCenter;
        flex-direction: column;
        padding: 30rpx 0 0;
        color:$uni-font;
        &-label{
          @include wh(80%, 60rpx);
          background: $uni-color;
          border-radius: 40rpx;
          @include flexCenter;
          font-size: 40rpx;
          font-family: xy;
          position: relative;
          z-index: 2;
        }
        &-main{
          @include wh(100%, auto);
          @include flexCenter;
          justify-content: space-between;
          padding: 20rpx 0;
          .icon{
            @include wh(40rpx, 40rpx);
            margin-left: 50rpx;
            margin-top:10rpx;
            background: $uni-color;
            border:4rpx solid $uni-font;
            border-radius: 50%;
            @include flexCenter;
          }
          .img{
            margin-right:-1rpx;
            margin-bottom:-50rpx;
            &-i{
              @include wh(150rpx,150rpx);
            }
          }
        }
      }
    }
  }
  .box{
    @include wh(100%, auto);
    padding: 40rpx 0;
    @include flexCenter;
    flex-direction: column;
    background:#fff;
    position: relative;
    color: $uni-font;
    &.h5{
      background: rgba($color: $uni-color, $alpha: .3)
    }
    &.mp-weixin{
      background: #0000;
    }
    &-bg{
      background: #ffffff;
      position: absolute;
      top:0;
      left:0;
      right:0;
      z-index: -1;
      .bg{
        opacity: .5;
      }
    }
    &-year{
      font-size: 40rpx;
      color: rgba($color: $uni-font, $alpha: .3);
      text{
        font-size: 50rpx;
        margin:0 10rpx;
        color:$uni-font;
      }
    }
    &-data{
      margin-top:20rpx;
      font-size: 40rpx;
      color: rgba($color: $uni-font, $alpha: .3);
      text{
        font-size: 40rpx;
        margin:0 20rpx;
        color:$uni-font;
        display: inline-block;
        @include wh(80rpx, 80rpx);
        border-radius: 20rpx;
        background:$uni-color;
        text-align: center;
        line-height: 80rpx;
      }
    }
    &-text{
      @include wh(100%, auto);
      @include flexCenter;
      font-size: 40rpx;
      font-weight: bold;
      padding: 30rpx 0;
      position: relative;
      .image{
        display: inline-block;
        @include bis('@/static/image/home/4.png');
        @include wh(320rpx, 320rpx);
        position: absolute;
        top:0;
        right:-60rpx;
        opacity: .3;
      }
    }
    &-retirement{
      font-size: 30rpx;
      color: rgba($color: $uni-font, $alpha: .3);
      margin-bottom: 20rpx;
      text{
        font-size: 36rpx;
        color: $uni-font;
        margin:0 6rpx;
      }
    }
    &-days{
      @include wh(100%, auto);
      padding: 0 30rpx;
      @include flexCenter;
      justify-content: space-between;
      .money{
        @include wh(100%, auto);
        @include flexCenter;
        align-items: flex-start;
        flex-direction: column;
        min-height: 140rpx;
        font-size: 30rpx;
        color: rgba($color: $uni-font, $alpha: .3);
        position: relative;
        .image{
          display: inline-block;
          @include wh(140rpx, 140rpx);
          position: absolute;
          top:0;
          right:0;
        }
        .no{
          font-size: 40rpx;
          font-weight: bold;
        }
        text{
          font-size: 50rpx;
          color:$uni-font;
        }
      }
    }
    &-hitokoto{
      @include wh(100%, auto);
      min-height: 130rpx;
      padding: 0 30rpx;
      @include flexCenter;
      flex-direction: column;
      justify-content: space-between;
      &-title{
        @include flexCenter;
        text{
          text-align: left;
        }
      }
      &-who{
        @include wh(100%,auto);
        text-align: right;
      }
    }
    &-vacation{
      @include wh(100%, auto);
      margin: -10rpx 0;
      @include flexCenter;
      padding: 0 30rpx;
      justify-content: space-between;
      font-size: 34rpx;
      &-number{
        text{
          font-size: 38rpx;
          font-weight: bold;
          margin-right: 8rpx;
        }
      }
    }
  }
  .gap{
    @include flexCenter;
    justify-content: space-between;
    padding: 0 70rpx;
    & > view{
      @include wh(30rpx, 20rpx);
      background:$uni-color;
      border-color: $uni-font;
      border-style: solid;
      border-width: 0 4rpx 0 4rpx;
    };
  }
  .popup{
    padding: 30rpx;
    .check{
      &-item{
        @include flexCenter;
        justify-content: space-between;
        @include wh(100%, 70rpx);
        .icons{
          border: 2rpx solid #c8c9cc;
          border-radius: 50%;
          @include wh(30rpx, 30rpx);
          position: relative;
          &-i{
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-50%, -50%);
          }
          &.check{
            background: $uni-color;
            border-color:$uni-color;
            .icons-i{
              color:#fff;
            }
          }
        }
      }
    }
    .picker{
      @include flexCenter;
      &-box{
        @include flexCenter;
        @include wh(200rpx, auto);
      }
    }
  }
}
</style>
