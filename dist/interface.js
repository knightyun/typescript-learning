"use strict";
/************************************************************
 * Interface（接口）
 *
 ************************************************************/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 属性类型接口
 */
// 限制某个对象的属性类型（这里是入参）
function fn1(obj) {
    return obj.str;
}
fn1({ str: "abc" });
// 应用接口类似于申明类型
function fn2(obj) {
    return obj.str;
}
fn2({ str: "abc", num: 123 });
// 属性类型校验，应为 string
// fn2({ str: 123 }); // Error
// 属性存在性校验，必须存在 str，不存在 abc
// fn2({ abc: 'abc' }); // Error
var obj1 = { str: "abc", bol: true };
// 修改只读属性会报错
// obj1.bol = false; // Error
// 由于使用索引签名，传入额外的属性不会报错
var obj2 = { str: "abc", other: "none" };
var fnObj = {
    // 普通方法
    fn1: function (arg) {
        return arg === "";
    },
    // 简写格式
    // fn1(arg: string) { return arg === ''; }
    // 箭头函数格式
    // fn1: (arg) => arg === '',
};
// 函数传参可以少于函数签名定义的参数，但不能异于，
// 比如：arg1: number, arg3: boolean
var fn3 = function (arg1) {
    return arg1 !== "";
};
// 使用类型断言的两种写法
fn3 = function (arg1) {
    return arg1 !== "";
};
fn3 = function (arg1) {
    return arg1 !== "";
};
// 或者使用箭头函数
fn3 = function (arg1) {
    return arg1 !== "";
};
// 类似于直接申明函数时指定参数和返回类型
function fn4(arg1) {
    return arg1 !== "";
}
var arr1 = ["a", "b", "c"];
// 访问数字类型索引
arr1[0]; // 'a'
// 访问字符类型索引
arr1["length"]; // 3
var arr3 = [1, 2, 3];
// 实现接口的类
var Person = /** @class */ (function () {
    function Person(obj) {
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.age = obj.age;
    }
    return Person;
}());
var obj3 = {
    // 少写任何一个都会报错
    attr1: "123",
    attr2: 123,
};
var obj4 = {
    attr1: "123",
    attr2: 123,
    attr3: true,
};
// 函数类型
var fn5 = function () { };
// 属性
fn5.attr1 = "def";
// 方法
fn5.fn1 = function (arg) { return arg; };
/**
 * 接口继承类
 */
var CSPub = /** @class */ (function () {
    function CSPub() {
        // 公共属性
        this.pub = "aaa";
    }
    return CSPub;
}());
var CSPri = /** @class */ (function () {
    function CSPri() {
        // 私有属性
        this.pri = "bbb";
    }
    CSPri.prototype.getPri = function () {
        return this.pri;
    };
    return CSPri;
}());
var CSPro = /** @class */ (function () {
    function CSPro() {
        // 受保护属性
        this.pro = "ccc";
    }
    return CSPro;
}());
// 继承了只有公共成员的类的接口，可以被任意 其他类 实现
// 通常用于复用类的约束
var CSI1 = /** @class */ (function () {
    function CSI1() {
        this.pub = "aaa";
        this.attr1 = "ddd";
    }
    return CSI1;
}());
// 具有私有成员或受保护成员的接口，只能由 继承类 实现
// 通常用于拓展对类的子类的约束
var CSI2 = /** @class */ (function (_super) {
    __extends(CSI2, _super);
    function CSI2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.attr1 = "ddd";
        return _this;
    }
    return CSI2;
}(CSPri));
var CSI3 = /** @class */ (function (_super) {
    __extends(CSI3, _super);
    function CSI3() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pro = "ccc";
        _this.attr1 = "ddd";
        return _this;
    }
    return CSI3;
}(CSPro));
// 被其他类直接实现都会报错：
// class CSI2 implements IClassPri {
//   pri = 'bbb';
//   attr1 = 'ddd';
// }
// class CSI4 implements IClassPro {
//   pro = 'ccc';
//   attr1 = 'ddd';
// }
