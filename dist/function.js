"use strict";
/******************************
 * 函数
 *
 ******************************/
/**
 * 函数类型定义
 */
function fn5(arg) {
    return arg === "";
}
// 匿名函数
var fn6 = function (arg) {
    return arg === "";
};
// 箭头函数
fn6 = function (arg) { return arg === ""; };
/**
 * 可选参数
 */
function fn7(arg1, arg2) {
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
function fn9(arg) {
    if (arg === void 0) { arg = 'abc'; }
    return arg === '';
}
fn9(); // false
fn9(''); // true
// 默认值参数可以放到必输参数前面，但是必须传入 undefined 才能获取到默认值，不传报错
function fn10(arg1, arg2) {
    if (arg1 === void 0) { arg1 = 'abc'; }
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
function fn11(arg1) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return arg1 === args[0];
}
fn11('a', 'b', 123);
fn11('a');
function fn12(x) {
    if (typeof x === 'object') {
        return x[0];
    }
    else {
        return x;
    }
}
// 都能通过类型检查
fn12([1, 2, 3]);
fn12('abc');
// 没在重载定义中的类型会报错
// fn12(undefined); // Error
