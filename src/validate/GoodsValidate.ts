import ErrorException from "../middlewares/error";
import { tool } from "../utils/tool";
import { validate } from "./BaseValidate";

const addFields = {
  picFirst: { label: "首图", rules: ["required"] },
  title: { label: "标题", rules: ["required"] },
  price: { label: "价格", rules: ["required"] },
  quantity: { label: "数量", rules: ["required", "number"] },
  description: { label: "描述", rules: ["required"] },
  status: { label: "状态", rules: ["required", "number"] },
};

export const addValidate = async (ctx, next) => {
  const body = ctx.request.body;
  let msg = validate.init(body, addFields);
  if (msg) throw new Error(msg);
  await next();
};
