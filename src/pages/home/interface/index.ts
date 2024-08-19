export namespace Home {
  // 初始时间
  export interface Date {
    Y: string; // 年
    M: string; // 月
    D: string; // 日
    hh: string; // 时
    mm: string; // 分
    ss: string; // 秒
    time: string; // 当前时间
  }
  // 退休时间
  export interface Retirement {
    retirement: string; // 退休时间
    retirementMoney: number; // 退休金额
    dayMoney: string; // 每日工资
    Y: number; // 退休时间 - 年
    M: number; // 退休时间 - 月
    D: number; // 退休时间 - 日
    hh: number; // 退休时间 - 时
    mm: number; // 退休时间 - 分
    ss: number; // 退休时间 - 秒
  }
  export interface HitokotoInfo {
    hitokoto: string; // 句子
    from: string; // 来源
    from_who: string; // 来源
    creator: string; // 创建者
  }
  export interface Vacation {
    day: number; // 当前日期
    title: string; // 标题
    visible: boolean; // 显示状态
    // 假期列表
    vacationList: {
      name: string; // 假期名称
      checked: boolean; // 是否选中
      day: number;
    }[];
    vacation: string[]; // 当前选中假期列表
  }
  export interface Pay {
    payIndex: number; // 薪资日下标
    payDay: number; // 薪资日
    visible: boolean; // 显示状态
    payColumns: string[][]; // 薪资日列表
  }
}
