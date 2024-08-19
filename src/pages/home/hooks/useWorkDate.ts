import dayjs from "dayjs";
import type { Home } from "@/pages/home/interface";
import { useSettingStore } from "@/stores/modules/setting";
const { settingInfo } = useSettingStore();
export const useWorkDate = () => {
  const state = reactive<Home.Retirement>({
    Y: 0,
    M: 0,
    D: 0,
    hh: 0,
    mm: 0,
    ss: 0,
    retirement: settingInfo.retirement,
    retirementMoney: 0,
    dayMoney: ""
  });
  const setInter = ref();
  const getDate = () => {
    const Y = dayjs(settingInfo.birthData).format("YYYY");
    const M = dayjs(settingInfo.birthData).format("MM");
    const D = dayjs(settingInfo.birthData).format("DD");
    state.retirement = Number(Y) + Number(settingInfo.retirement) + "-" + M + "-" + D;
    setInter.value = setInterval(() => {
      const currentTime = dayjs().valueOf();
      const retireTime = dayjs(state.retirement).valueOf();
      const diffTime = (retireTime - currentTime) / 1000;
      const dayCardinal = Number((365 / 12).toFixed(2));
      state.Y = Math.floor((diffTime / 60 / 60 / 24 / dayCardinal / 12) % 365);
      state.M = Math.floor((diffTime / 60 / 60 / 24 / dayCardinal) % 12);
      state.D = Math.floor((diffTime / 60 / 60 / 24) % dayCardinal) - 4;
      state.hh = Math.floor((diffTime / 60 / 60) % 24);
      state.mm = Math.floor((diffTime / 60) % 60);
      state.ss = Math.floor(diffTime % 60);
      // 总时长毫秒数 / 7 * 5 按7休2计算
      const durationTime = ((retireTime - currentTime) / 1000 / 7) * 5;
      // 计算一天薪资 每月薪资 / 21.75
      const dayMoney = Number(settingInfo.monthlyPay) / 21.75;
      // 每秒薪资 一天薪资 / 24 * 60 * 60
      const mmMoney = dayMoney / (24 * 60 * 60);
      const totalMoney = Number((durationTime * mmMoney).toFixed(4));
      state.retirementMoney = totalMoney > 0 ? totalMoney : 0;
      const currentTimeYMD = dayjs().format("YYYY-MM-DD");
      const closingTime = dayjs(`${currentTimeYMD} ${settingInfo.closingTime}`).valueOf();
      const dutyTime = dayjs(`${currentTimeYMD} ${settingInfo.dutyTime}`).valueOf();
      // 总时长毫秒数
      const duration = (closingTime - dutyTime) / 1000;
      const money = dayMoney / duration;
      // 不到上班时间0
      if (currentTime < dutyTime) {
        state.dayMoney = "0";
      }
      // 上班时间已结束
      if (currentTime >= closingTime) {
        state.dayMoney = (Number(settingInfo.monthlyPay) / 21.75).toFixed(4);
      }
      if (currentTime > dutyTime && currentTime < closingTime) {
        state.dayMoney = (((currentTime - dutyTime) / 1000) * money).toFixed(4);
      }
    }, 1000);
  };
  onShow(() => getDate());
  onHide(() => clearInterval(setInter.value));
  return {
    ...toRefs(state)
  };
};
