// 顶部写声明入口文件的描述格式：
//
// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>
//
// 例如：
//
// Type definitions for demo 0.1.0
// Project: demo-project
// Definitions by: Knight Huang <https://github.com/knightyun>


/************************************************************
 * 声明文件
 *
 * ts 中声明文件都以 .d.ts 作为后缀
 ************************************************************/

// 声明 全局变量
declare var dNum: number;

// 声明可以带有初始值
// declare var dNum: number = 1;

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
declare namespace DName {
  // 内部变量不会与全局冲突
  // 直接写变量申明，不用再加 declare
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

