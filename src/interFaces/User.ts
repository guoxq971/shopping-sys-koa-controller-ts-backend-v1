import { paramsDtoIF } from "./Base";

// 入参
export interface userListDto extends paramsDtoIF {
  //用户名
  name?: string;
  // 备注
  remark?: string;
  // 资金
  capital?: string;
  // 状态
  status?: number;
  // 是否删除
  isDel?: number;
}

// 出参
export interface userListVo {
  // id
  id?: string;
  //用户名
  name?: string;
  // 备注
  remark?: string;
  // 密码
  password?: string;
  // 状态
  status?: number;
  // 是否删除
  isDel?: number;

  createTime: string;
  updateTime: string;
}
