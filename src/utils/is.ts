import { isEmpty } from "./tool";

const _proto_ = (type) => {
  return Object.prototype.toString.call(type);
};

export const isUndefined = (val) => {
  return _proto_(val) == "[object Undefined]";
};
export const isNull = (val) => {
  return _proto_(val) == "[object Null]";
};
export const isFunction = (val) => {
  return _proto_(val) == "[object Function]";
};
export const isNumber = (val) => {
  return _proto_(val) == "[object Number]";
};
export const isSymbol = (val) => {
  return _proto_(val) == "[object Symbol]";
};
export const isBooleam = (val) => {
  return _proto_(val) == "[object Booleam]";
};
export const isString = (val) => {
  return _proto_(val) == "[object String]";
};
export const isObject = (val) => {
  return _proto_(val) == "[object Object]";
};
export const isArray = (val) => {
  return _proto_(val) == "[object Array]";
};

export const is = {
  isEmpty: isEmpty,
  isUndefined,
  isNull,
  isFunction,
  isNumber,
  isSymbol,
  isBooleam,
  isString,
  isObject,
  isArray,
};
