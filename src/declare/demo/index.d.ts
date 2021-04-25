// 顶部写声明入口文件的描述格式：
//
// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>
//
// 例如：
//
// Type definitions for demo 0.1.0
// Project: https://demo-project.com
// Definitions by: Knight Huang <https://github.com/knightyun>


/************************************************************
 * 声明文件（模块库）
 *
 * ts 中声明文件都以 .d.ts 作为后缀
 * 常用的声明文件模板见：../templates/*
 * 
 * 因为要导入的库一般是编译后的代码（例如 ts 编译后的是 js 代码），
 * 不会包含 ts 代码中的类型、签名 * 等信息，
 * 所以需要使用声明文件来提供声明，以便编译时识别类型信息，或者在
 * 编辑器中写代码时动态校验或提示代码相关信息；
 * 
 * 如果项目代码本身就是用 ts 写的，则无需再专门分别写声明文件，
 * 配置 "declaration": true 可以在 ts 编译 js 时自动生成声明文件，
 * 默认生成的声明文件与原文件并列，配置 "declarationDir": "" 则
 * 可以将声明文件全部生成到指定目录下，目录结构与源文件一致；
 ************************************************************/

// 首先，不要在声明文件中使用 path 引入指令：
// /// <reference path="./other/index.d.ts" />
// 应该使用 types 指令替代（表示该 npm 包依赖于其他全局库，即声明了全局变量的库），
// 可以使用相对或者非相对引入：
/// <reference types="./global" />
// 上面的指令会寻找 ./global.d.ts 或 ./global/index.d.ts 声明文件

// 下面的指令表示引用 typescript 的声明包：
// 该指令会去寻找 node_modules/@types 或
// node_modules/typescript 目录下的声明文件
/// <reference types="typescript" />

// 如果需要使用某些内置的类型，则需要使用 lib 指令，
// 比如使用 es2017 中的字符串新属性，则引入：
/// <reference lib="es2017.string" />


// 使用全局库中声明的全局类型时，直接使用即可，
// 如果使用了命名空间，则需要在变量前添加命名空间访问路径；
export declare type dType = DType;

export declare function dFn(arg: dType): dType;

export declare const dNum: dType;
// 虽然语法上可以指定默认值，但是实际值还是取的 index.ts 中对应的值，
// index.ts 中没有赋值则是 undefined；
// export declare const dNum: dType = 321;

// 如果依赖于模块库，则需要使 import：
import { oType } from './other';
export declare const _oStr: oType;


// 如果要使用默认导出，且配置了 "esModuleInterop": true，
// 且 index.ts 也使用了默认导出，则可以使用下面的语法：
//   export default function mfn(arg: number): number;
//
// 否则只能使用下面的兼容语法替代（index.ts 无需使用 export default）：
//   declare function mfn(arg: number): number;
//   export = mfn;

// 如果当前库是 UMD 模块，要暴露全局变量 demo，就使用下面的语法：
// export as namespace demo;
