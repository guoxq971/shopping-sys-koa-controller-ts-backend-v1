import { tool } from "../utils/tool";
const baseFieds = {
  pageNum: { label: "页码", rules: ["required"] },
  pageSize: { label: "页数", rules: ["required"] },
};
const idFieds = {
  id: { label: "id", rules: ["required"] },
};

const validate2 = (body, fields) => {
  let msg = "";
  // console.log("validate2 fields", fields);
  Object.keys(fields).forEach((key) => {
    fields[key].rules.forEach((item) => {
      if (item === "required") {
        // console.log("body[key]", body[key]);
        if (tool.isEmpty(body[key])) {
          msg = `${fields[key].label}不能为空`;
        }
      } else if (item === "number") {
        if (!tool.is.isNumber(body[key])) {
          msg = `${fields[key].label}必须为number类型`;
        }
      }
    });
  });
  return msg;
};

export const validate = {
  init(body, fields) {
    // console.log("body", body);

    return validate2(body, fields);
  },
};

//分页校验
export const listValidate = async (ctx, next) => {
  const body = ctx.request.body;
  let msg = validate.init(body, baseFieds);
  if (msg) throw new Error(msg);
  await next();
};
//id校验
export const idValidate = async (ctx, next) => {
  const body = ctx.request.body;
  let msg = validate.init(body, idFieds);
  if (msg) throw new Error(msg);
  await next();
};
