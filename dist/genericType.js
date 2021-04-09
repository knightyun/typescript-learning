"use strict";
/******************************
 * 泛型
 *
 * 用于创建可复用的支持多种类型的组件
 ******************************/
/**
 * 背景
 */
// 函数返回类型与传参类型一致
function fn13(arg) {
    return arg;
}
fn13(123);
// 如果传参支持多种类型，就需要写多个重载定义，如果使用 any，
// 虽然能包含所有情况，但不能保证参数和返回值类型一致；
function fn14(arg) {
    return arg + '';
}
fn14(123);
fn14('abc');
/**
 * 类型变量
 */
// 使用 类型变量 可以解决这个问题
// 变量 T 用于捕获并存储用户传入的类型
// 这里的函数 fn15 便是泛型（泛型函数），即适用于多个类型的函数
function fn15(arg) {
    return arg;
}
// 使用泛型时在类型变量的位置传入类型值
fn15(123);
// 通常是使用时省略，直接利用编译器的 类型推断 来判断类型
fn15('abc');
;
fn15({ a: 123, b: 'abc' });
/**
 * 使用
 */
// 由于 T 表示任意类型，所以不能直接访问某些属性
function fn16(arg) {
    // return arg.toString();
    return arg;
}
// 如果是复合类型，则可以使用某些固有属性
function fn17(arg) {
    return arg.toString();
}
// 类型变量也可以使用其中字母或者单词（通常使用 T）
function fn18(arg) {
    return arg;
}
var fn19 = function (arg) {
    return arg;
    // 和接口申明不一致会报错
    // return arg + '';
};
var obj5 = {
    a: 123,
    b: [1, 2, 3],
    c: function (arg) { return arg + 1; }
};
/**
 * 泛型类
 */
var CS5 = /** @class */ (function () {
    function CS5(attr) {
        this.attr = attr;
    }
    CS5.prototype.fn = function () {
        return this.attr;
    };
    return CS5;
}());
var cs5 = new CS5(123);
cs5.fn(); // 123
function fn20(arg) {
    return arg.length;
}
fn20('abc'); // 3
// 报错，因为数字没有 length 属性
// fn20(123); // Error
// 泛型约束中使用类型参数
// 表示第二个参数需要是第一个参数对象的属性
function fn21(obj, key) {
    return obj[key];
}
fn21({ a: 1 }, 'a');
// b 不是第一个参数对象的属性
// fn21({ a: 1 }, 'b'); // Error
