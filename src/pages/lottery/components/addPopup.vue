<template>
  <!-- 表单设置项 转盘内容区设置 -->
  <s-popup
    v-model:show="settingVisible"
    :mask-close-able="false"
    :show-close="true"
    title="设置菜单"
    width="85%"
    z-index="100000"
    @commit="settingSave"
  >
    <scroll-view :scroll-top="scrollTop" class="popup" scroll-y="true">
      <view class="form">
        <u-form ref="uForm" :model="form">
          <u-form-item
            v-for="(value, key) in form"
            :key="key"
            :label="`位置${filterIndex(key)}`"
            class="u-border-bottom"
            label-width="80"
          >
            <u-input
              v-model="form[`${key}`]"
              :placeholder="`请输入位置${filterIndex(key)}`"
              border="none"
              maxlength="10"
              type="select"
            />
            <template #right>
              <u-icon name="trash-fill" @click="delForm(key)"></u-icon>
            </template>
          </u-form-item>
        </u-form>
      </view>
    </scroll-view>
    <view class="add u-border-top">
      <view class="add-btn" @click="addForm">加一项鸭</view>
    </view>
  </s-popup>
</template>
<script lang="ts" setup>
import { deepClone } from "uview-plus";
import { useSettingStore } from "@/stores/modules/setting";
const { prizeInfo } = useSettingStore();
const settingVisible = ref(false);
const form = ref({});
const scrollTop = ref(0);
watch(
  () => settingVisible.value,
  newVal => {
    if (newVal) {
      form.value = {};
      setForm();
    }
  }
);
// 设置表单
const setForm = () => {
  for (const key in deepClone(prizeInfo.list)) {
    form.value[`${key}_name`] = deepClone(prizeInfo.list)[key];
  }
};
// 打开设置弹窗
const openSetting = () => {
  settingVisible.value = true;
};
// 过滤表单key
const filterIndex = (name: string) => {
  return Number(name.split("_")[0]) + 1;
};
// 添加表单
const addForm = () => {
  const index = Object.keys(form.value).length;
  form.value[`${index}_name`] = "";
  nextTick(() => {
    scrollTop.value += 500;
  });
};
// 删除表单
const delForm = (key: number) => {
  delete form.value[key];
};
// 保存表单
const settingSave = () => {
  prizeInfo.list = Object.values(form.value);
};
defineExpose({
  openSetting
});
</script>

<style lang="scss" scoped>
.popup {
  width: auto;
  max-height: calc(100vh - 650rpx);
  .form {
    padding: 0 30rpx;
  }
}
.add {
  @include flexCenter;
  padding-top: 20rpx;
  margin-bottom: -20rpx;
  &-btn {
    @include wh(100%, 60rpx);
    @include flexCenter;
    font-size: 30rpx;
  }
}
</style>
