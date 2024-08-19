import { http } from "uview-plus";

// post请求，获取菜单
export const getHitokotoApi = () => http.get("https://international.v1.hitokoto.cn/");
