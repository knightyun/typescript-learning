// 导出其他模块变量
import { oStr } from './other';

export type mType = string | number;

export function mFn(arg: mType): mType {
  return arg;
}

export const mNum: mType = 123;

export const mStr: mType = oStr;