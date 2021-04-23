/************************************************************
 * 使用 npm 包
 *
 * 模拟外部项目使用该项目的导出模块
 ************************************************************/

// 因为该项目配置了自身作为依赖项，所以可以导入自身的模块
import { mType, mFn, mNum, mStr } from 'typescript-learning';


console.log(mFn(mNum)); // 123

console.log(mFn(mStr)); // 'abc'

let num1: mType = 456;
console.log(mFn(num1)); // 456
