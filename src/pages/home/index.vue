<template>
  <view class="home">
    <template v-if="!pageLoading">
      <!-- 头部展示时间 -->
      <s-car :border="true">
        <view class="header">
          <view></view>
          <view class="header-title">摸鱼时间</view>
          <view class="header-setting" @click="toUrl('/pages/setting/index')">
            <text>设置</text>
            <u-icon name="arrow-right-double" />
          </view>
        </view>
        <view class="box">
          <view class="box-year">
            <text class="text">{{ date.Y.value }}</text>
            <text class="dot">年</text>
            <text class="text">{{ date.M.value }}</text>
            <text class="dot">月</text>
            <text class="text">{{ date.D.value }}</text>
            <text class="dot">天</text>
          </view>
          <view class="box-data">
            <text class="text">{{ date.hh.value }}</text>
            <text class="dot">:</text>
            <text class="text">{{ date.mm.value }}</text>
            <text class="dot">:</text>
            <text class="text">{{ date.ss.value }}</text>
          </view>
        </view>
      </s-car>
      <!-- 间距 -->
      <s-space />
      <!-- 退休时间 -->
      <s-car :border="true">
        <view class="header">
          <view class="header-title">退休时间：{{ workDate.retirement.value }}</view>
        </view>
        <view class="box">
          <template v-if="workDate.retirementMoney.value">
            <view>距退休还剩</view>
            <view class="box-retirement">
              <text class="text">{{ workDate.Y.value }}</text>
              <text class="dot">年</text>
              <text class="text">{{ workDate.M.value }}</text>
              <text class="dot">月</text>
              <text class="text">{{ workDate.D.value }}</text>
              <text class="dot">天</text>
              <text class="text">{{ workDate.hh.value }}</text>
              <text class="dot">时</text>
              <text class="text">{{ workDate.mm.value }}</text>
              <text class="dot">分</text>
              <text class="text">{{ workDate.ss.value }}</text>
              <text class="dot">秒</text>
            </view>
            <view>还能到手的薪资为</view>
            <view class="box-retirement">
              <text class="box-retirement-money">￥{{ workDate.retirementMoney.value }}</text>
            </view>
          </template>
          <view v-else class="box-text">
            <text>终于熬到退休啦！</text>
            <image class="image" src="https://s21.ax1x.com/2024/08/19/pAPljC4.png"></image>
          </view>
        </view>
      </s-car>
      <!-- 间距 -->
      <s-space />
      <!-- 今日收入 -->
      <s-car :border="true">
        <view class="header fl">
          <view class="header-title">今日收入</view>
        </view>
        <view class="box">
          <view class="box-days">
            <view class="money">
              <template v-if="workDate.retirementMoney.value">
                <view>今日到手薪资</view>
                <view>
                  ￥
                  <text>{{ workDate.dayMoney.value }}</text>
                </view>
              </template>
              <view v-else class="no">{{
                workDate.retirementMoney.value && vacation.day.value ? "今日休息" : "退休没工资了哦"
              }}</view>
              <image class="image" src="https://s21.ax1x.com/2024/08/19/pAPG6zQ.png"></image>
            </view>
          </view>
        </view>
      </s-car>
      <s-space />
      <s-car :border="false">
        <view class="box" @click="toUrl('/pages/life/index')">
          <view class="life">
            <view class="life-title">人生倒计时</view>
            <view class="icon">
              <u-icon name="arrow-right" size="14" />
            </view>
          </view>
        </view>
      </s-car>
      <s-space />
      <view class="row">
        <view v-for="(item, index) in rowList" :key="index" class="row-item" @click="toUrl(`/pages/${item.path}/index`)">
          <s-car :border="false">
            <view class="content">
              <view class="content-label">{{ item.label }}</view>
              <view class="content-main">
                <view class="icon">
                  <u-icon name="arrow-right" size="14" />
                </view>
                <view class="img">
                  <image :src="item.img" class="img-i"></image>
                </view>
              </view>
            </view>
          </s-car>
        </view>
      </view>
      <!-- 间距 -->
      <s-space />
      <!-- 每日一言 -->
      <s-car :border="true">
        <view class="header">
          <view class="header-title">每日一言</view>
          <view class="header-setting" @click="throttle(getHitokoto, 2000, true)">
            <text>换一句</text>
          </view>
        </view>
        <view class="box">
          <view class="box-hitokoto">
            <view class="box-hitokoto-title">
              <text>{{ hitokotoInfo.hitokoto || "" }}</text>
            </view>
            <view class="box-hitokoto-who">
              <text>-- {{ hitokotoInfo.from_who || hitokotoInfo.creator || "" }}</text>
              <text>《{{ hitokotoInfo.from || "--" }}》</text>
            </view>
          </view>
        </view>
      </s-car>
      <u-gap bg-color="#0000" height="20" />
      <!-- 休息日 -->
      <s-car :border="false">
        <view class="box" @click="vacation.visible.value = true">
          <view class="box-vacation">
            <view class="box-vacation-title">{{ vacation.title.value }}</view>
            <view v-if="vacation.day.value">
              <text class="box-vacation-number">{{ vacation.day.value }}</text>
              <text>天</text>
            </view>
          </view>
        </view>
      </s-car>
      <u-gap bg-color="#0000" height="20" />
      <!-- 发薪日 -->
      <s-car :border="false">
        <view class="box" @click="pay.visible.value = true">
          <view class="box-vacation">
            <view class="box-vacation-title">
              {{ pay.payDay.value === 0 ? "今天发工资啦！" : "距离发薪日还有" }}
            </view>
            <view v-if="pay.payDay.value">
              <text class="box-vacation-number">{{ pay.payDay.value }}</text>
              <text>天</text>
            </view>
          </view>
        </view>
      </s-car>
    </template>
    <s-loading v-else />
    <!-- 休息日选择框 -->
    <s-popup v-model:show="vacation.visible.value" title="请选择休息日" @commit="vacation.commit">
      <view class="popup">
        <view class="check">
          <view
            v-for="(item, index) in vacation.vacationList.value"
            :key="index"
            :class="{ active: item.checked }"
            class="check-item"
            @click.stop="item.checked = !item.checked"
          >
            <text>{{ item.name }}</text>
            <view class="icons">
              <u-icon v-if="item.checked" class="icons-i" name="checkmark-circle-fill" size="18"></u-icon>
              <u-icon v-else class="icons-i" name="checkmark-circle" size="18"></u-icon>
            </view>
          </view>
        </view>
      </view>
    </s-popup>
    <!-- 休息日选择框 -->
    <u-picker
      :columns="pay.payColumns.value"
      :default-index="[pay.payIndex.value - 1]"
      :show="pay.visible.value"
      close-on-click-overlay
      title="选择发薪日期"
      @cancel="pay.visible.value = false"
      @close="pay.visible.value = false"
      @confirm="pay.commit"
    ></u-picker>
  </view>
</template>
<script lang="ts" setup>
import sSpace from "@/components/s-space/index.vue";
import { useDate } from "@/pages/home/hooks/useDate";
import { useWorkDate } from "@/pages/home/hooks/useWorkDate";
import { throttle } from "uview-plus";
import { getHitokotoApi } from "@/api/modules/user";
import { useVacation } from "@/pages/home/hooks/useVacation";
import { usePay } from "@/pages/home/hooks/usePay";
import type { Home } from "@/pages/home/interface";
const pageLoading = ref(false);
const date = useDate();
const workDate = useWorkDate();
const vacation = useVacation();
const pay = usePay();
const rowList = ref([
  { label: "吃饭时间到", img: "https://s21.ax1x.com/2024/08/19/pAPlx29.png", path: "lottery" },
  { label: "下班做啥呀", img: "https://s21.ax1x.com/2024/08/19/pAPlv8J.png", path: "happy" }
]);
onLoad(() => getHitokoto());
onShareAppMessage(() => ({ title: "牛马工具" }));
const toUrl = (url: string) => uni.navigateTo({ url });
const hitokotoInfo = ref<Home.HitokotoInfo>({
  hitokoto: "",
  from: "",
  from_who: "",
  creator: ""
});
const getHitokoto = () => {
  getHitokotoApi()
    .then(({ data }) => {
      hitokotoInfo.value = data;
    })
    .finally(() => {
      pageLoading.value = false;
    });
};
</script>
<style lang="scss" scoped>
.home {
  padding: 30rpx;
  font-size: 28rpx;
  .header {
    @include wh(100%, 80rpx);
    @include flexCenter;
    position: relative;
    &.fl {
      justify-content: flex-start;
    }
    &-title {
      margin-left: 24rpx;
      margin-top: -10rpx;
      font-size: 38rpx;
      font-family: xy;
      color: $uni-font;
    }
    &-setting {
      font-family: xy;
      @include wh(150rpx, 80rpx);
      @include flexCenter;
      position: absolute;
      top: 0;
      right: 0;
      .navigator-wrap {
        display: flex;
      }
      text {
        color: $uni-font;
        margin-top: -10rpx;
      }
    }
  }
  .row {
    @include flexCenter;
    gap: 15px;
    &-item {
      flex: 1;
      .content {
        background: #fff;
        @include flexCenter;
        flex-direction: column;
        padding: 30rpx 0 0;
        color: $uni-font;
        &-label {
          @include wh(80%, 60rpx);
          background: $uni-color;
          border-radius: 40rpx;
          @include flexCenter;
          font-size: 40rpx;
          font-family: xy;
          position: relative;
          z-index: 2;
        }
        &-main {
          @include wh(100%, auto);
          @include flexCenter;
          justify-content: space-between;
          padding: 20rpx 0;
          .icon {
            @include wh(40rpx, 40rpx);
            margin-left: 50rpx;
            margin-top: 10rpx;
            background: $uni-color;
            border: 4rpx solid $uni-font;
            border-radius: 50%;
            @include flexCenter;
          }
          .img {
            margin-right: -1rpx;
            margin-bottom: -50rpx;
            &-i {
              @include wh(150rpx, 150rpx);
            }
          }
        }
      }
    }
  }
  .box {
    @include wh(100%, auto);
    padding: 40rpx 0;
    @include flexCenter;
    flex-direction: column;
    background: #fff;
    position: relative;
    color: $uni-font;
    &-year {
      .text {
        font-size: 50rpx;
        margin: 0 10rpx;
        color: $uni-font;
      }
      .dot {
        font-size: 40rpx;
        color: rgba($color: $uni-font, $alpha: 0.3);
      }
    }
    &-data {
      margin-top: 20rpx;
      font-size: 40rpx;
      color: rgba($color: $uni-font, $alpha: 0.3);
      .text {
        font-size: 40rpx;
        margin: 0 20rpx;
        color: $uni-font;
        display: inline-block;
        @include wh(80rpx, 80rpx);
        border-radius: 20rpx;
        background: $uni-color;
        text-align: center;
        line-height: 80rpx;
      }
    }
    &-text {
      @include wh(100%, auto);
      @include flexCenter;
      font-size: 40rpx;
      font-weight: bold;
      padding: 30rpx 0;
      position: relative;
      .image {
        display: inline-block;
        @include bis("https://s21.ax1x.com/2024/08/19/pAPljC4.png");
        @include wh(320rpx, 320rpx);
        position: absolute;
        top: 0;
        right: -60rpx;
        opacity: 0.3;
      }
    }
    &-retirement {
      margin: 20rpx 0;
      .text {
        font-size: 36rpx;
        color: $uni-font;
        margin: 0 6rpx;
      }
      .dot {
        color: rgba($color: $uni-font, $alpha: 0.3);
      }
      &-money {
        font-size: 36rpx;
      }
    }
    &-days {
      @include wh(91%, auto);
      @include flexCenter;
      justify-content: space-between;
      .money {
        @include wh(100%, auto);
        @include flexCenter;
        align-items: flex-start;
        flex-direction: column;
        min-height: 140rpx;
        font-size: 30rpx;
        color: rgba($color: $uni-font, $alpha: 0.3);
        position: relative;
        .image {
          display: inline-block;
          @include wh(140rpx, 140rpx);
          position: absolute;
          top: 0;
          right: 0;
        }
        .no {
          font-size: 40rpx;
          font-weight: bold;
        }
        text {
          font-size: 50rpx;
          color: $uni-font;
        }
      }
    }
    &-hitokoto {
      @include wh(91%, auto);
      min-height: 130rpx;
      @include flexCenter;
      flex-direction: column;
      justify-content: space-between;
      &-title {
        @include flexCenter;
        text {
          text-align: left;
        }
      }
      &-who {
        @include wh(100%, auto);
        text-align: right;
      }
    }
    &-vacation {
      @include wh(91%, auto);
      @include flexCenter;
      justify-content: space-between;
      font-size: 34rpx;
      &-number {
        font-size: 38rpx;
        font-weight: bold;
        margin-right: 8rpx;
      }
    }
    .life {
      @include wh(92%, auto);
      @include flexCenter;
      justify-content: space-between;
      &-title {
        font-size: 34rpx;
      }
      &-arrow {
        @include flexCenter;
      }
    }
  }
  .popup {
    padding: 30rpx;
    .check {
      &-item {
        @include flexCenter;
        justify-content: space-between;
        @include wh(100%, 70rpx);
        font-size: 14px;
        &.active {
          color: $uni-color;
        }
        .icons {
          border-radius: 50%;
          position: relative;
          :deep(.u-icon__icon) {
            color: #c8c9cc;
          }
          :deep(.uicon-checkmark-circle-fill) {
            color: $uni-color !important;
          }
        }
      }
    }
    .picker {
      @include flexCenter;
      &-box {
        @include flexCenter;
        @include wh(200rpx, auto);
      }
    }
  }
  :deep(.u-toolbar__wrapper__confirm) {
    color: $uni-color !important;
  }
}
</style>
