<template>
  <view class="richText">
    <view v-for="(item, index) in richText" :key="index" :class="item.class">
      <rich-text :nodes="item.label" />
    </view>
  </view>
</template>
<script lang="ts" setup>
const richText = ref<any>([
  { label: "小程序名称：牛马工具", class: "h3" },
  { label: "版本：1.0.10", class: "h3" },
  { label: "发布日期：2024年8月16日", class: "h3" },
  { label: "开发团队：cmy and s-xianyu", class: "h3" },
  { label: "介绍", class: "h4" },
  {
    label: "欢迎使用“牛马工具”小程序！这是一款专注于提供退休规划和个人财务管理服务的小程序，旨在帮助您更好地规划未来的退休",
    class: "p"
  },
  { label: "主要功能", class: "h4" },
  { label: "1.退休时间计算：输入您的出生日期和预计退休年龄，即可计算出具体的退休日期。", class: "p" },
  { label: "2.退休年龄计算：基于您的当前年龄，计算出你的退休时间。", class: "p" },
  { label: "3.退休储蓄估算：根据您的当前收入水平，计算出到退休时可累积的大致财富总额。", class: "p" },
  { label: "4.每薪资计算：基于当前薪资水平及上下班时间，计算出今日您已获得的薪资。", class: "p" },
  { label: "5.每月发薪日计算：输入工资发放日期，自动计算距离发薪日期还有。", class: "p" },
  { label: "6.每周剩余放假天数计算：根据当前日期和您的工作日程，计算本周距离放假还剩几天。", class: "p" },
  { label: "使用指南", class: "h4" },
  { label: "1.启动小程序：通过微信搜索“牛马工具”或扫描二维码进入小程序。", class: "p" },
  { label: "2.选择功能：在首页中选择您需要使用的功能。", class: "p" },
  { label: "3.输入参数：在设置根据提示输入相应的个人信息或选项。", class: "p" },
  { label: "4.查看结果：首页会自动计算出结果以供查看。", class: "p" },
  { label: "5.保存记录（缓存机制）：根据输入内容会自定缓存到本地，下次打开不用自动输入配置信", class: "p" },
  {
    label:
      "隐私说明 小程序不会收集您的任何信息进上班，所以信息均存放于手机缓存里，清除小程序缓存，您所提交保存的信息均会初始化到默认。",
    class: "p"
  },
  { label: "联系我们", class: "h4" },
  { label: "如果您有任何问题或建议，请随时联系我们：", class: "p" },
  { label: "客服邮箱：s22539634@aliyun.com", class: "p" },
  { label: "微信公众号：咸鱼呀日记", class: "p" }
]);
</script>

<style lang="scss" scoped>
.richText {
  line-height: 50rpx;
  margin: 30rpx;
  font-size: 14px;
  color: $uni-font;
  .h2 {
    font-size: 18px;
    font-weight: bolder;
  }
  .h3 {
    font-weight: bolder;
  }
  .h4 {
    padding: 20rpx;
    font-weight: bolder;
  }
}
</style>
