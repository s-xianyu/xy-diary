import type { Home } from "../interface/index";
import { useSettingStore } from "@/stores/modules/setting";
const { settingInfo } = useSettingStore();
export const useVacation = () => {
  const state = reactive<Home.Vacation>({
    day: 0,
    title: "",
    visible: false,
    vacationList: [
      { name: "星期一", checked: false, day: 1 },
      { name: "星期二", checked: false, day: 2 },
      { name: "星期三", checked: false, day: 3 },
      { name: "星期四", checked: false, day: 4 },
      { name: "星期五", checked: false, day: 5 },
      { name: "星期六", checked: false, day: 6 },
      { name: "星期日", checked: false, day: 0 }
    ],
    vacation: settingInfo.vacation
  });
  const getDate = () => {
    state.vacationList.map(item => {
      item.checked = state.vacation.includes(item.name);
    });
    const index = state.vacationList.findIndex(item => item.day === new Date().getDay());
    const list = [...state.vacationList, ...state.vacationList];
    list.splice(0, index);
    state.day = list.findIndex(item => item.checked);
    if (state.day > 0) {
      state.title = "距离放假还有";
      state.title = "距离放假还有";
    } else if (state.vacation.length === 7 || state.day === 0) {
      state.title = "今天休息日，开心";
    } else {
      state.title = "可怕，不休息的吗";
    }
    settingInfo.vacation = state.vacation;
  };
  const commit = () => {
    state.vacation = state.vacationList.filter(item => item.checked).map(item => item.name);
    getDate();
  };
  onShow(() => getDate());
  return {
    ...toRefs(state),
    commit
  };
};
