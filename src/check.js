/************************************************************
 * JavaScript 检查
 *
 ************************************************************/

/**
 * 文件检查
 */

// 默认不会检查 js 文件，添加检查需要在文件顶部添加下面这行注释，不检查是：// @ts-nocheck
// @ts-check
let num = 13;

// 这样下面就会报错，不能将字符串类型分配给数字
// num = 'abc'; // Error


/**
 * 行检查
 */

// 添加下面这行注释可以忽略下面一行代码的检查
// @ts-ignore
num = 'abc';


/**
 * JS 类型申明
 */

// 不过 js 文件中不能直接写 ts 独有的特性，比如下面的代码会提示语法错误：
// let str: string = 'abc'; // Error

// 但是可以使用下面这种格式（JSDoc）申明类型

/** @type {string} */
let str;

str = 'abc';
// str = 123; // Error

/** @type {string | number} */
let strOrNum;

strOrNum = 'abc';
strOrNum = 123;

/**
 * 申明函数的各个类型检查
 * @param {number} arg1 - arg1
 * @param {number} arg2 - arg2
 * @returns {number}
 */
function fn(arg1, arg2) {
  return arg1 + arg2;
}

fn(123, 456);
// fn(123, '456'); // Error