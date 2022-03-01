import { dbQuery } from "../config/db2";
import { shopListDto, shopListVo } from "../interFaces/Shop";
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
/* 查询的字段 */
const selectField = tool.humpToUnderlineByStr(
  `id, picFirst, name, capital, description, status, createTime, updateTime, isDel`
);
/* 添加的字段 */
const insertFields = tool.humpToUnderlineByStr(
  `picFirst, name, capital, description, status`
);
/* getById */
const findField = tool.humpToUnderlineByStr(
  `picFirst, name, capital, description, status, createTime, updateTime`
);
const curType = "shop service";
const logfn = (type, err) => tool.logfn(type, err, curType);

export const ShopService = {
  /* 列表 */
  async list(listDto: shopListDto) {
    try {
      let where = whereConditionl;
      if (listDto.name) where += ` and name LIKE '%${listDto.name}%' `;
      if (listDto.description)
        where += ` and description LIKE '%${listDto.description}%' `;
      if (listDto.capital) where += ` and capital LIKE %${listDto.capital}% `;
      if (listDto.isDel) where += ` and is_del = ${listDto.isDel} `;
      if (listDto.status) where += ` and status = ${listDto.status} `;
      let listSql = "";
      let totalSql = "";
      let total: any[] = [];

      listSql = `
        select ${selectField} 
        from sys_shop 
        ${where}
        order by create_time desc
        limit ${(listDto.pageNum - 1) * listDto.pageSize},${listDto.pageSize}
        `;
      totalSql = `
        select count(*) as total
        from sys_shop 
        ${where}
        `;
      let res: shopListVo[] = await dbQuery(listSql);
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

  /* 查询 */
  async getById(id: string) {
    try {
      let where = whereConditionl;
      if (id) {
        where += `and id = '${id}'`;
      }
      let sql = "";

      sql = `
          select ${findField} 
          from sys_shop 
          ${where}
          `;

      let res: shopListVo[] = await dbQuery(sql);

      return tool.formDataByArray(res);
    } catch (err) {
      logfn("getById", err);
      return Promise.reject(new ErrorException(err.sqlMessage));
    }
  },

  /* 添加 */
  async add(picFirst, name, capital, description, status) {
    try {
      let sql = `
      INSERT INTO sys_shop 
      (${insertFields}, id) 
      VALUES 
      ('${picFirst}', '${name}', '${capital}', '${description}', ${status}, '${tool.uuid()}')
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
  async update(id, picFirst, name, capital, description, status) {
    try {
      let sql = `
      UPDATE sys_shop 
      SET 
      pic_first = '${picFirst}',
      name = '${name}',
      capital = '${capital}',
      description = '${description}',
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
      UPDATE sys_shop 
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
      UPDATE sys_shop 
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
    let result: shopListVo[] = await ShopService.getById(id);
    if (result.length === 0) {
      return Promise.reject(new ErrorException(MSG_empty));
    }
    return result[0];
  },
};
