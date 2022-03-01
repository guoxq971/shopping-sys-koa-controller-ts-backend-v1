import { paramsDtoIF } from "./Base";

// 入参
export interface goodsListDto extends paramsDtoIF {
  //首图
  picFirst?: string;
  // 标题
  title?: string;
  // 价格
  price?: string;
  // 数量
  quantity?: number;
  // 介绍
  description?: string;
  // 状态
  status?: number;
  // 删除
  isDel?: number;
}

export interface goodsListVo {
  // id
  id?: string;
  // 首图
  picFirst: string;
  // 标题
  title: string;
  // 价格
  price: string;
  // 数量
  quantity: number;
  // 介绍
  description: string;
  // 状态
  status: number;

  createTime: string;
  updateTime: string;
}
