import { Test } from "tslint";
import { dbQuery } from "../config/db2";
import { goodsListDto, goodsListVo } from "../interFaces/Goods";
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
  `id, picFirst, title, price, quantity, description, status, createTime, updateTime, isDel`
);
/* 添加的字段 */
const insertFields = tool.humpToUnderlineByStr(
  `picFirst, title, price, quantity, description, status`
);
export const GoodsService = {
  /* 列表 */
  async list(listDto: goodsListDto) {
    try {
      let where = whereConditionl;
      if (listDto.title) where += ` and title LIKE '%${listDto.title}%' `;
      if (listDto.description)
        where += ` and description LIKE '%${listDto.description}%' `;
      if (listDto.price) where += ` and price LIKE %${listDto.price}% `;
      if (listDto.quantity) where += ` and quantity LIKE %${listDto.quantity}% `;
      if (listDto.isDel) where += ` and is_del = ${listDto.isDel} `;
      if (listDto.status) where += ` and status = ${listDto.status} `;
      let listSql = "";
      let totalSql = "";
      let total: any[] = [];

      listSql = `
        select ${selectField} 
        from sys_goods 
        ${where}
        order by create_time desc
        limit ${(listDto.pageNum - 1) * listDto.pageSize},${listDto.pageSize}
        `;
      totalSql = `
        select count(*) as total
        from sys_goods 
        ${where}
        `;
      let res: goodsListVo[] = await dbQuery(listSql);
      total = await dbQuery(totalSql);

      return {
        total: total.length ? Number(total[0].total) : 0,
        list: tool.dataFormat(res),
      };
    } catch (err) {
      console.log("goods service list ==>", err);
      return Promise.reject(new ErrorException(err.sqlMessage));
    }
  },

  /* 查询 */
  async getById(id: string) {
    try {
      const selectField = tool.humpToUnderlineByStr(
        `picFirst, title, price, quantity, description, status, createTime, updateTime`
      );
      let where = whereConditionl;
      if (id) {
        where += `and id = '${id}'`;
      }
      let sql = "";

      sql = `
          select ${selectField} 
          from sys_goods 
          ${where}
          `;

      let res: goodsListVo[] = await dbQuery(sql);

      return tool.formDataByArray(res);
    } catch (err) {
      console.log("goods service getById ==>", err);
      return Promise.reject(new ErrorException(err.sqlMessage));
    }
  },

  /* 添加 */
  async add(picFirst, title, price, quantity, description, status) {
    try {
      let sql = `
      INSERT INTO sys_goods 
      (${insertFields}, id) 
      VALUES 
      ('${picFirst}', '${title}', '${price}', ${quantity}, '${description}', ${status}, '${tool.uuid()}')
      `;
      let res = await dbQuery(sql);
      if (!res.affectedRows) {
        return Promise.reject(new ErrorException(MSG_errAdd));
      }
      return true;
    } catch (err) {
      console.log("goods service add ==>", err);
      return Promise.reject(new ErrorException(err.sqlMessage));
    }
  },

  /* 更新 */
  async update(id, picFirst, title, price, quantity, description, status) {
    try {
      let sql = `
      UPDATE sys_goods 
      SET 
      pic_first = '${picFirst}',
      title = '${title}',
      price = '${price}',
      quantity = ${quantity},
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
      console.log("goods service update ==>", err);
      return Promise.reject(new ErrorException(err.sqlMessage));
    }
  },

  /* 更新 状态*/
  async update4status(id: string, status: number) {
    try {
      let sql = `
      UPDATE sys_goods 
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
      console.log("goods service update ==>", err);
      return Promise.reject(new ErrorException(err.sqlMessage));
    }
  },

  /* 软删除 */
  async del(id) {
    try {
      let sql = `
      UPDATE sys_goods 
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
      console.log("goods service del ==>", err);
      return Promise.reject(new ErrorException(err.sqlMessage));
    }
  },

  /* 判断是否存在 */
  async isEmptyById(id) {
    if (!id) {
      return Promise.reject(new ErrorException(MSG_emptyById));
    }
    let result: goodsListVo[] = await GoodsService.getById(id);
    if (result.length === 0) {
      return Promise.reject(new ErrorException(MSG_empty));
    }
    return result[0];
  },
};
