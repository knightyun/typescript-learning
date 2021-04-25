/************************************************************
 * 使用 npm 包
 *
 * 模拟外部项目使用该项目的导出模块
 ************************************************************/

// 因为该项目配置了自身作为依赖项，所以可以导入自身的模块
import { dType, dFn, dNum, _oStr } from 'typescript-learning';


console.log(dFn(dNum)); // 123

console.log(dFn(_oStr)); // 'abc'

let num1: dType = 456;

console.log(dFn(num1)); // 456
