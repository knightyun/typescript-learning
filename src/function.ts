/************************************************************
 * 函数
 *
 ************************************************************/

/**
 * 函数类型定义
 */
function fn5(arg: string): boolean {
  return arg === "";
}

// 匿名函数
let fn6 = function (arg: string): boolean {
  return arg === "";
};

// 箭头函数
fn6 = (arg: string): boolean => arg === "";


/**
 * 可选参数
 */
function fn7(arg1: string, arg2?: string): boolean {
  return arg2 ? arg2 === "" : arg1 === "";
}

// 可选参数必须放到必输参数后面
// function fn8(arg2?: string, arg1: string): boolean {
//   return arg2 ? arg2 === "" : arg1 === "";
// }

fn7('a');
fn7('a', 'b');
// 参数多了会报错
// fn7('a', 'b', 'c');


/**
 * 参数默认值
 * 
 * 加默认值的参数会成为 可选参数
 */
function fn9(arg: string = 'abc'): boolean {
  return arg === '';
}

fn9(); // false
fn9(''); // true

// 默认值参数可以放到必输参数前面，但是必须传入 undefined 才能获取到默认值，不传报错
function fn10(arg1 = 'abc', arg2: string): boolean {
  return arg1 === arg2;
}

// fn10(''); // Error
fn10('', 'abc'); // false
fn10(undefined, 'abc'); // true


/**
 * 剩余参数
 * 
 * 剩余的参数可以一个没有或多个，即被当成可选参数
 */
function fn11(arg1: string, ...args: (string | number)[]): boolean {
  return arg1 === args[0];
}

fn11('a', 'b', 123);
fn11('a');


/**
 * 重载
 * 
 * 函数根据传参的不同会有不同的返回类型
 */

// 重载手段是为一个函数提供多个类型定义
// 检查类型时是从上至下查找第一个匹配的定义，所以务必把最精确的定义放最前面
function fn12(x: number[]): number;
function fn12(x: string): string;
function fn12(x: boolean): boolean;
function fn12(x: any): any { // 这里并不是重载的一部分，真正重载的只有上面两个
  if (typeof x === 'object') {
    return x[0];
  } else {
    return x;
  }
}

// 都能通过类型检查
fn12([1, 2, 3]);
fn12('abc');

// 没在重载定义中的类型会报错
// fn12(undefined); // Error