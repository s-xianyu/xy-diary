export type progressType = "aqua" | "copper" | "candy" | "neon" | "shine" | "zigzag" | "diamond" | "hearts" | "sparkle";
export namespace Life {
  export interface Info {
    list: {
      title: string;
      num: number;
      percent: number;
      suffix: string;
      type: progressType;
    }[];
  }
}
