import dayjs from "dayjs";
import type { Home } from "../interface/index";
export const useDate = () => {
  const state = reactive<Home.Date>({
    D: dayjs().format("DD"),
    M: dayjs().format("MM"),
    Y: dayjs().format("YYYY"),
    hh: dayjs().format("HH"),
    mm: dayjs().format("mm"),
    ss: dayjs().format("ss"),
    time: dayjs().format("YYYY-MM-DD HH:mm:ss")
  });
  const setInter = ref();
  const getDate = () => {
    setInter.value = setInterval(() => {
      state.time = dayjs().format("YYYY-MM-DD HH:mm:ss");
      state.Y = dayjs().format("YYYY");
      state.M = dayjs().format("MM");
      state.D = dayjs().format("DD");
      state.hh = dayjs().format("HH");
      state.mm = dayjs().format("mm");
      state.ss = dayjs().format("ss");
    }, 1000);
  };
  onShow(() => getDate());
  onHide(() => clearInterval(setInter.value));
  return {
    ...toRefs(state)
  };
};
