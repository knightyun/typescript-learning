// 导入其他模块变量
import { oType, oStr } from './other';

export type dType = string | number;

export function dFn(arg: dType): dType {
  return arg;
}

export const dNum: dType = 123;

// 导出来着其他模块的变量
export const _oStr: oType = oStr;

// 直接使用全局变量（有命名空间需要加上）
// export const _gStr: gType = gStr;