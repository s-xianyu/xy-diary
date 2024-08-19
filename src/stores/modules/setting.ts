import { defineStore } from "pinia";
import type { SettingState } from "@/stores/interface";
import piniaPersistConfig from "@/stores/helper/persist";
import { menu } from "@/config/menu";
import { deepClone } from "uview-plus";

export const useSettingStore = defineStore({
  id: "xy-diary-setting",
  state: (): SettingState => ({
    settingInfo: {
      birthData: "1990-01-01",
      dutyTime: "09:00",
      closingTime: "18:30",
      retirement: "50",
      monthlyPay: "10000",
      savingsPay: "100000",
      expensesPay: "5000",
      retirementMoney: "1",
      dayMoney: "0",
      vacation: ["星期六", "星期日"],
      payIndex: 10,
      payDay: 0
    },
    prizeInfo: {
      list: deepClone(menu).splice(0, 8)
    },
    fishInfo: {
      count: 0
    }
  }),
  getters: {},
  actions: {},
  persist: piniaPersistConfig("xy-diary-setting")
});
