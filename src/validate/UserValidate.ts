import ErrorException from "../middlewares/error";
import { tool } from "../utils/tool";
import { validate } from "./BaseValidate";

const addFields = {
  name: { label: "用户名", rules: ["required"] },
  password: { label: "密码", rules: ["required"] },
  capital: { label: "资金", rules: ["required", "number"] },
  remark: { label: "备注", rules: ["required"] },
  status: { label: "状态", rules: ["required", "number"] },
};
/* 拿到对应key的 fields */
const filterFields = (arrs: any[]) => {
  const keys = Object.keys(addFields);
  let arr = {};
  keys.forEach((key) => {
    if (arrs.includes(key)) {
      let item: any = addFields[key];
      arr[key] = item;
    }
  });
  return arr;
};

export const updateValidate = async (ctx, next) => {
  const body = ctx.request.body;
  const fields = filterFields(["name", "capital", "remark", "status"]);
  let msg = validate.init(body, fields);
  if (msg) throw new Error(msg);
  await next();
};
export const addValidate = async (ctx, next) => {
  const body = ctx.request.body;
  const fields = addFields;
  let msg = validate.init(body, fields);
  if (msg) throw new Error(msg);
  await next();
};

export const loginValidate = async (ctx, next) => {
  const body = ctx.request.body;
  const fields = filterFields(["name", "password"]);
  let msg = validate.init(body, fields);
  if (msg) throw new Error(msg);
  await next();
};
