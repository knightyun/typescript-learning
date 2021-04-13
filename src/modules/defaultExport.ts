/**
 * 默认导出
 * 
 * 一个模块只能有一个默认导出
 */
const bol: boolean = true;

// export default bol;

// 不能这样简写（申明即导出）
// export default const bol = true; // Error

// 但是 类、函数、接口 等可以申明即导出
// export default class CS {}
// export default function() {}
// export default interface IF {}

// 字面值也可以直接默认导出
// export default true
// export default 'abc';
// export default 123;
// export default { num: 123 };

// ts 也提供了兼容 CommonJS 和 AMD 的写法
export = bol;

// 不过需要特定的形式来导入
// import bol = require('./defaultExport');
