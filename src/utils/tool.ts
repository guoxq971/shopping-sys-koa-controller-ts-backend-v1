import moment = require("moment");
import { is } from "./is";
import md5 = require("md5");
export const tool = {
  logfn: logfn,
  user_encode: user_encode,
  is: is,
  isEmpty: isEmpty,
  uuid: uuid,
  formDataByArray: formDataByArray,
  curTime: moment().format("yyyy-MM-DD HH:mm:ss"),
  humpToUnderlineByStr,
  underlineToHump,
  timeFormat,
  dataFormat,
};

/* 日志打印 */
function logfn(type, err, curType) {
  console.log(`${curType} ${type} ==>`, err);
}
/* 用户密码加密 32位数*/
const user_salt = "!!@##@xq666!@#!";
export function user_encode(pwd) {
  return md5(`${pwd}${user_salt}`);
}

// 判单是否为空 true=空 false=不为空
export function isEmpty(data) {
  if (data === undefined || data === "" || data === null) {
    return true;
  } else {
    return false;
  }
}

function uuid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  function S5() {
    return (((1 + Math.random()) * 0x100000) | 0).toString(16).substring(1);
  }

  let id = `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;

  return id;
}

const fields_time = ["create_time", "createTime", "update_time", "updateTime"];

// 数据转换
function formDataByArray(data: any) {
  let list = [];
  data.forEach((item) => {
    if (Array.isArray(item)) {
      formDataByArray(item);
    } else {
      let obj = objFormat(item);
      // @ts-ignore
      list.push(obj);
    }
  });

  return list;
}

// 数据转换
function dataFormat(data: any) {
  let list = [];
  let obj = {};
  let r = "array";
  if (Array.isArray(data)) {
    r = "array";
    data.forEach((item) => {
      if (Array.isArray(item)) {
        dataFormat(item);
      } else {
        let obj = objFormat(item);
        // @ts-ignore
        list.push(obj);
      }
    });
  } else {
    r = "object";
    obj = objFormat(data);
  }

  return r === "object" ? obj : list;
}

// 对象转换
function objFormat(_obj: any) {
  //  转换时间
  for (let key of fields_time) {
    if (_obj[key]) {
      _obj[key] = timeFormat(_obj[key]);
    }
  }

  // 下划线转驼峰
  let obj = {};
  for (let key in _obj) {
    let k = underlineToHump(key);
    obj[k] = _obj[key];
  }

  return obj;
}

// 日期转换
function timeFormat(value: any): any {
  return tool.curTime;
}

// 驼峰转下划线
function humpToUnderlineByStr(str): string {
  let arr = str.split(",");
  let arr2 = [] as string[];
  arr.forEach((str) => {
    str.replace(/\s/g, "");
    let str2 = humpToUnderline(str);
    arr2.push(str2);
  });
  return arr2.toString();
}

// 下划线转驼峰
function underlineToHump(s) {
  var a = s.split("_");
  var result = a[0];
  for (var i = 1; i < a.length; i++) {
    result = result + a[i].slice(0, 1).toUpperCase() + a[i].slice(1);
  }
  return result;
}

// 驼峰转下划线
function humpToUnderline(str): string {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}
