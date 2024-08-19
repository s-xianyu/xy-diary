import { createSSRApp } from "vue";
import App from "./App.vue";
// pinia store
import pinia from "@/stores";
// 引入uview-plus
import uviewPlus from "uview-plus";
import sLoading from "@/components/s-loading/index.vue";

export const createApp = () => {
  const app = createSSRApp(App);
  app.component("SLoading", sLoading);
  app.use(uviewPlus);
  app.use(pinia);
  return {
    app
  };
};
