import ErrorException from "../middlewares/error";
import { tool } from "../utils/tool";
import { validate } from "./BaseValidate";

const fields = {
  picFirst: { label: "首图", rules: ["required"] },
  name: { label: "店铺名字", rules: ["required"] },
  capital: { label: "资金", rules: ["required"] },
  description: { label: "描述", rules: ["required"] },
  status: { label: "状态", rules: ["required", "number"] },
};

export const addValidate = async (ctx, next) => {
  const body = ctx.request.body;
  let msg = validate.init(body, fields);
  if (msg) throw new Error(msg);
  await next();
};
