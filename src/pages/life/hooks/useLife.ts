import type { Life } from "../interface/index";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";
dayjs.extend(dayOfYear);
export const useLife = () => {
  const state = reactive<Life.Info>({
    list: [
      {
        title: "今日已过去",
        num: dayjs().hour(),
        percent: Number(((dayjs().hour() / 24) * 100).toFixed(1)),
        suffix: "小时",
        type: "aqua"
      },
      {
        title: "这周已过去",
        num: dayjs().day() - 1,
        percent: Number((((dayjs().day() - 1) / 7) * 100).toFixed(1)),
        suffix: "天",
        type: "copper"
      },
      {
        title: "本月已过去",
        num: dayjs().date() - 1,
        percent: Number((((dayjs().date() - 1) / 30) * 100).toFixed(1)),
        suffix: "天",
        type: "candy"
      },
      {
        title: "今年已过去",
        num: dayjs().dayOfYear(),
        percent: Number(((dayjs().dayOfYear() / 365) * 100).toFixed(1)),
        suffix: "天",
        type: "neon"
      }
    ]
  });
  const getDate = () => {
    console.log(state.list);
  };
  onShow(() => getDate());
  return {
    ...toRefs(state)
  };
};
