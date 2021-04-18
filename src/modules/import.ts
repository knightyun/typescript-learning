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

// 导入类型变量的语法
import type { StrOrNum } from './export';

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

let str2: StrOrNum = 'abc';


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


/**
 * 模块解析过程
 */

// 导入模块示例：
// import * from 'test';

// 相对导入：
//   带有路径标识，例如：'./test', '/test', '../test'；
// 非相对导入：
//   不带路径标识，例如：'test', 'test/test', '@test/test';

// 相对导入：
// import * from './test'; 的解析模块文件顺序：
//
//  ./test.ts
//  ./test.tsx
//  ./test.d.ts
//  ./test/package.json （如果文件有指定 "types" 属性，则取它的值对应的文件）
//  ./test/index.ts
//  ./test/index.tsx
//  ./test/index.d.ts

// 非相对导入：
// import * from 'test'; 的解析模块文件顺序
//
//  ./node_modules/test.ts
//  ./node_modules/test.tsx
//  ./node_modules/test.d.ts
//  ./node_modules/test/package.json （如果文件有指定 "types" 属性，则取它的值对应的文件）
//  ./node_modules/test/index.ts
//  ./node_modules/test/index.tsx
//  ./node_modules/test/index.d.ts
//  ...（依次寻找上一级目录的 node_modules 文件夹）

// 配置文件中指定如何 解析非相对模块：
// {
//   "compilerOptions": {
//     "baseUrl": ".",
//     "paths": {
//       "test": [
//         "test/test", // 这里路径是相对于上面的 "baseUrl" 属性值
//         "test1/test1", // 可以指定多个回退路径，文件不存在会依次解析下一个
//         "*" // 模块名称与文件相同（当前路径下）可以直接使用通配符
//       ]
//     }
//   }
// }
