import type { Home } from "@/pages/home/interface";
import { useSettingStore } from "@/stores/modules/setting";
import dayjs from "dayjs";
const { settingInfo } = useSettingStore();

export const usePay = () => {
  const state = reactive<Home.Pay>({
    payIndex: settingInfo.payIndex,
    payDay: settingInfo.payDay,
    visible: false,
    payColumns: [Array.from({ length: 30 }, (val, i) => i + 1 + "日")]
  });
  const getData = () => {
    const Y = Number(dayjs().format("YYYY"));
    const M = Number(dayjs().format("MM"));
    const D = Number(dayjs().format("DD"));
    // 下次发薪月份
    const MM = state.payIndex >= D ? Number(M) : Number(M) + 1;
    const newYearValue = MM > 12 ? Y + 1 : Y;
    const newMonthValue = MM > 12 ? 1 : MM;
    const endTime = dayjs(`${newYearValue}-${newMonthValue}-${state.payIndex}`).valueOf();
    const startTime = dayjs(`${dayjs().format("YYYY-MM-DD")}`).valueOf();
    state.payDay = Math.floor((endTime - startTime) / (1000 * 60 * 60 * 24));
    settingInfo.payDay = state.payDay;
    settingInfo.payIndex = state.payIndex;
  };
  const commit = ({ indexs }: { indexs: number[] }) => {
    state.payIndex = indexs[0] + 1;
    state.visible = false;
    getData();
  };
  onShow(() => getData());
  return {
    ...toRefs(state),
    commit
  };
};
