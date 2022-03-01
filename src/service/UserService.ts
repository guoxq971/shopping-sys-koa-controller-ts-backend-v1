import { dbQuery } from "../config/db2";
import { userListDto, userListVo } from "../interFaces/User";
import ErrorException, {
  MSG_del,
  MSG_empty,
  MSG_emptyById,
  MSG_errAdd,
  MSG_errUpdate,
} from "../middlewares/error";
import { tool } from "../utils/tool";
import {
  whereConditionByDelAndStatus,
  whereConditionByDel,
  whereConditionBySttus,
  whereConditionl,
} from "./BaseService";
/* list 查询的字段 */
const selectField = tool.humpToUnderlineByStr(
  `id, name, password, capital, remark, isDel, status, createTime, updateTime`
);
/* add 添加的字段 */
const insertFields = tool.humpToUnderlineByStr(
  `name, password, capital, remark, status`
);

const logfn = (type, err) => console.log(`user service ${type} ==>`, err);

export const UserService = {
  /* 列表 */
  async list(listDto: userListDto) {
    try {
      let where = whereConditionl;
      if (listDto.name) where += `and name LIKE '%${listDto.name}%'`;
      if (listDto.capital) where += `and capital LIKE '%${listDto.capital}%'`;
      if (listDto.remark) where += `and remark LIKE '%${listDto.remark}%'`;
      if (listDto.isDel) where += `and is_del = ${listDto.isDel}`;
      if (listDto.status) where += `and status = ${listDto.status}`;

      let listSql = "";
      let totalSql = "";
      let total: any[] = [];

      listSql = `
        select ${selectField} 
        from sys_user 
        ${where}
        order by create_time desc
        limit ${(listDto.pageNum - 1) * listDto.pageSize},${listDto.pageSize}
        `;
      totalSql = `
        select count(*) as total
        from sys_user 
        ${where}
        `;
      let res: userListVo[] = await dbQuery(listSql);
      total = await dbQuery(totalSql);

      return {
        total: total.length ? Number(total[0].total) : 0,
        list: tool.dataFormat(res),
      };
    } catch (err) {
      logfn("list", err);
      return Promise.reject(new ErrorException(err.sqlMessage));
    }
  },

  /* 查询 根据 id */
  async getById(id: string) {
    try {
      let where = whereConditionl;
      if (id) {
        where += `and id = '${id}'`;
      }
      let sql = "";

      sql = `
          select ${selectField} 
          from sys_user 
          ${where}
          `;

      let res: userListVo[] = await dbQuery(sql);

      return tool.formDataByArray(res);
    } catch (err) {
      logfn("getById", err);
      return Promise.reject(new ErrorException(err.sqlMessage));
    }
  },

  /* 查询 根据 用户名密码*/
  async login(name: string, password: string) {
    try {
      let where = whereConditionl;
      where += `and name = '${name}'`;
      where += `and password = '${tool.user_encode(password)}'`;
      let sql = "";

      sql = `
          select ${selectField} 
          from sys_user 
          ${where}
          `;

      let res: userListVo[] = await dbQuery(sql);

      return tool.formDataByArray(res);
    } catch (err) {
      logfn("login", err);
      return Promise.reject(new ErrorException(err.sqlMessage));
    }
  },

  /* 添加 */
  async add(name, password, capital, remark, status) {
    try {
      let sql = `
      INSERT INTO sys_user 
      (${insertFields}, id) 
      VALUES 
      ('${name}', '${tool.user_encode(
        password
      )}', ${capital}, ${remark}, ${status}, '${tool.uuid()}')
      `;
      let res = await dbQuery(sql);
      if (!res.affectedRows) {
        return Promise.reject(new ErrorException(MSG_errAdd));
      }
      return true;
    } catch (err) {
      logfn("add", err);
      return Promise.reject(new ErrorException(err.sqlMessage));
    }
  },

  /* 更新 */
  async update(id, name, password, capital, remark, status) {
    try {
      let sql = `
      UPDATE sys_user 
      SET 
      name = '${name}',
      ${password ? `password = '${tool.user_encode(password)}',` : ""}
      capital = ${capital},
      remark = '${remark}',
      remark = '${remark}',
      status = ${status}
      WHERE id = '${id}'
      `;
      let res = await dbQuery(sql);
      if (!res.affectedRows) {
        return Promise.reject(new ErrorException(MSG_errUpdate));
      }
      return true;
    } catch (err) {
      logfn("update", err);
      return Promise.reject(new ErrorException(err.sqlMessage));
    }
  },

  /* 更新 状态*/
  async update4status(id: string, status: number) {
    try {
      let sql = `
      UPDATE sys_user 
      SET 
      status = ${status}
      WHERE id = '${id}'
      `;
      let res = await dbQuery(sql);
      if (!res.affectedRows) {
        return Promise.reject(new ErrorException(MSG_errUpdate));
      }
      return true;
    } catch (err) {
      logfn("update4status", err);
      return Promise.reject(new ErrorException(err.sqlMessage));
    }
  },

  /* 软删除 */
  async del(id) {
    try {
      let sql = `
      UPDATE sys_user 
      SET 
      is_del = 1
      WHERE id = '${id}'
      `;
      let res = await dbQuery(sql);
      if (!res.affectedRows) {
        return Promise.reject(new ErrorException(MSG_del));
      }
      return true;
    } catch (err) {
      logfn("del", err);
      return Promise.reject(new ErrorException(err.sqlMessage));
    }
  },

  /* 判断是否存在 */
  async isEmptyById(id) {
    if (!id) {
      return Promise.reject(new ErrorException(MSG_emptyById));
    }
    let result: userListVo[] = await UserService.getById(id);
    if (result.length === 0) {
      logfn("isEmptyById", MSG_empty);
      return Promise.reject(new ErrorException(MSG_empty));
    }
    return result[0];
  },
};
