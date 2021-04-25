/************************************************************
 * 声明文件（全局库）
 *
 ************************************************************/

// 声明 全局变量
declare var dNum: number;

// 声明 只读变量（常量）
declare const dStr: string;

// 声明 块级作用域变量（如果存在块）
declare let dBol: boolean;

// 全局函数
declare function dFn(arg: number): number;

// 申明也可以包含具体实现
declare function dFn1(arg: number): number {
  return arg;
};

// 带有命名空间的变量
// 一般建议全局库都使用命名空间包装，放在命名冲突
declare namespace DName {
  // 在声明文件中用命名空间时，直接写变量申明，
  // 不用再加 declare 或 export（区别于 ts 文件）
  let dNum: number;

  // 使用嵌套的命名空间
  namespace DName1 {
    let dNum1: number;
  }

  function fn(arg: number, arg2: number): number { return arg + arg2; }
}

// 声明函数重载
declare function dFn2(arg: string): boolean;
declare function dFn2(arg: number): string;

// 声明接口
declare interface IDeclare {
  str: string;
  num?: number;
  readonly bol: boolean;
}

// 声明类型
declare type DType = string | number;

// 声明类
declare class DCS {
  protected dVar: string;

  constructor(arg: string) {
    this.dVar = arg;
  }
}
