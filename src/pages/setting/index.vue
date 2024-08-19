<template>
  <view class="setting">
    <template v-if="!pageLoading">
      <s-car>
        <view class="img">
          <image src="https://s21.ax1x.com/2024/08/19/pAPljC4.png" style="width: 300px; height: 300px; opacity: 0.2"></image>
        </view>
        <view class="box">
          <up-form>
            <up-form-item class="u-border-bottom" label="出生日期" label-width="80">
              <picker :value="form.birthData" mode="date" style="width: 100%" @change="change($event, 'birthData')">
                <view class="uni-input">{{ form.birthData }}</view>
              </picker>
            </up-form-item>
            <up-form-item :value="form.dutyTime" class="u-border-bottom" label="上班时间" label-width="80">
              <picker
                :value="form.dutyTime"
                end="21:00"
                mode="time"
                start="06:00"
                style="width: 100%"
                @change="change($event, 'dutyTime')"
              >
                <view class="uni-input">{{ form.dutyTime }}</view>
              </picker>
            </up-form-item>
            <up-form-item :value="form.closingTime" class="u-border-bottom" label="下班时间" label-width="80">
              <picker
                :value="form.closingTime"
                end="21:00"
                mode="time"
                start="06:00"
                style="width: 100%"
                @change="change($event, 'closingTime')"
              >
                <view class="uni-input">{{ form.closingTime }}</view>
              </picker>
            </up-form-item>
            <up-form-item :value="retirementIndex" class="u-border-bottom" label="退休年龄" label-width="80">
              <picker :range="ageList" :value="retirementIndex" style="width: 100%" @change="change($event, 'retirement')">
                <view class="uni-input">{{ form.retirement }}</view>
              </picker>
            </up-form-item>
            <up-form-item class="u-border-bottom" label="平均月薪" label-width="80">
              <up-input v-model="form.monthlyPay" border="none" placeholder="请输入平均月薪" type="digit" />
            </up-form-item>
            <up-form-item class="u-border-bottom" label="现有积蓄" label-width="80">
              <up-input v-model="form.savingsPay" border="none" placeholder="请输入现有积蓄" type="digit" />
            </up-form-item>
            <up-form-item label="每月开销" label-width="80">
              <up-input v-model="form.expensesPay" border="none" placeholder="请输入每月开销" type="digit" />
            </up-form-item>
          </up-form>
        </view>
      </s-car>
      <view class="btn">
        <view class="btn-commit" @click="commit">决定了鸭</view>
      </view>
    </template>
    <s-loading v-else />
    <up-toast ref="uToast" />
  </view>
</template>
<script lang="ts" setup>
import { useSettingStore } from "@/stores/modules/setting";
import { deepClone } from "uview-plus";
const uToast = ref();
let { settingInfo } = useSettingStore();
const form = reactive(deepClone(settingInfo));
const ageList = Object.freeze(["35", "40", "45", "50", "55", "60", "65"]);
const pageLoading = ref(true);
const retirementIndex = computed(() => {
  return ageList.findIndex(item => item === form.retirement) || 0;
});
onShow(() => {
  setTimeout(() => {
    pageLoading.value = false;
  }, 500);
});

const change = (e: any, name: string) => {
  if (name === "retirement") {
    form[name] = ageList[e.detail.value];
  } else {
    form[name] = e.detail.value;
  }
};
const commit = () => {
  settingInfo.birthData = form.birthData;
  settingInfo.dutyTime = form.dutyTime;
  settingInfo.closingTime = form.closingTime;
  settingInfo.retirement = form.retirement;
  settingInfo.monthlyPay = form.monthlyPay;
  settingInfo.savingsPay = form.savingsPay;
  settingInfo.expensesPay = form.expensesPay;
  uToast.value.show({
    message: "数据已经更新啦！",
    type: "success",
    complete() {
      uni.navigateBack();
    }
  });
};
</script>

<style lang="scss" scoped>
.setting {
  position: relative;
  padding: 30rpx;
  :deep(uni-input),
  :deep(.uni-input) {
    line-height: 36px;
    height: 36px;
  }
  .img {
    @include wh(100rpx, 80rpx);
    position: relative;
  }
  .box {
    background: #ffffff;
    padding: 0 30rpx;
  }
  .btn {
    @include wh(100%, auto);
    @include flexCenter;
    padding-top: 40rpx;
    &-commit {
      @include flexCenter;
      @include wh(80%, 110rpx);
      border-radius: 50rpx;
      border: 2px solid $uni-font;
      background: $uni-color;
      color: $uni-font;
      font-size: 40rpx;
    }
  }
}
</style>
