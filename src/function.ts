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

// 箭头式类型定义
// 箭头前为参数类型，后为返回值类型
let fn61: (arg: string) => boolean;
fn61 = (arg) => arg === '';


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
 * 重载（overload）
 * 
 * 函数根据传参的不同会有不同的返回类型
 */

// 重载手段是为一个函数提供多个类型定义
function fn12(x: number[]): number;
function fn12(x: string): string;
function fn12(x: boolean): boolean;
function fn12(x: any): any {
  // 上面一行只是函数的实现签名，为了兼容上面两个重载签名，不能被直接调用，
  // 同时它也并不算作一个重载，真正的重载签名只有最上面的三个
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
