/* UserState */
export interface UserState {
  token: string;
  userInfo: { userName: string; avatar: string };
}

export interface SettingState {
  settingInfo: {
    birthData: string;
    dutyTime: string;
    closingTime: string;
    retirement: string;
    monthlyPay: string;
    savingsPay: string;
    expensesPay: string;
    retirementMoney: string;
    dayMoney: string;
    vacation: string[];
    payIndex: number;
    payDay: number;
  };
  prizeInfo: {
    list: string[];
  };
  fishInfo: {
    count: number;
  };
}
