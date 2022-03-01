import { paramsDtoIF } from "./Base";

// 入参
export interface shopListDto extends paramsDtoIF {
  //首图
  picFirst?: string;
  // 店铺名字
  name?: string;
  // 资金
  capital?: number;
  // 介绍
  description?: string;
  // 状态
  status?: number;
  // 删除
  isDel?: number;
}

export interface shopListVo extends shopListDto {
  // id
  id?: string;
  createTime?: string;
  updateTime?: string;
}
