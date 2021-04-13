/************************************************************
 * 模块 - 导入
 *
 ************************************************************/

// ts 文件中不带顶级的 import 或 export，
// 则内部申明的变量默认全局可访问;
num; // from advanceType.ts
num1; // from basicType.ts

// 无法直接访问具有 export 申明的 export.ts 文件（模块）中的变量
// modStr; // Error

// 导入需要加上路径，文件名后缀可省略
import { expStr, IExp, CExp, expBol, expBol2 } from "./export";

// 导入具有默认导出的模块，可以对默认内容重命名
import renamedBol from "./defaultExport";

// 导入模块所有内容到一个变量（对象）中
import * as exportObj from "./export";

// 直接导入文件（没有包含 export），使引入文件中的所有全局变量
// 在当前文件可访问，例如：globalVar1
import "./global";

// 导入 export = xxx 形式的导出模块
import bol1 = require("./defaultExport");


let str: string = expStr;
str = globalVar1;

let bol: boolean = expBol;
bol = expBol2;
bol = renamedBol;
bol = exportObj.expBol2;
bol = bol1;

let obj1: IExp = {
  num: 123,
};
class CS1 extends CExp {}

// 动态导入模块
// 首先申明 require 函数，或者直接安装申明文件：npm i -D @types/node
// declare function require(name: string): any;
let bol2: boolean;

if (Math.random() > 0.5) {
  bol2 = require('./global');
} else {
  bol2 = false;
}

bol = bol2;