/************************************************************
 * 使用声明
 *
 ************************************************************/

/**
 * 声明引入指令
 */

// 该指令表示对依赖的引用；
// 解析包的机制与 import 类似，可以当作用于导入 声明包；
// 一般在声明文件中使用该指令，可以使用相对或非相对引用，
/// <reference types="./demo" />
// 上面的指令会寻找 ./demo.d.ts 或 ./demo/index.d.ts 声明文件

// 下面的指令表示引用 node 的声明包：
/// <reference types="node" />
// 该指令回去寻找 node_modules/@types/node/index.d.ts 声明文件

// 如果需要使用某些内置的类型，则需要使用 lib 指令，
// 比如使用 es2017 中的字符串新属性，则引入：
/// <reference lib="es2017.string" />


/** 
 * 使用引入的声明文件中定义的变量
 */

// 访问全局变量
dNum = 1;

// 声明和使用也可以同时在一个文件
declare let dNum1: number;
dNum1 = 2;

// 访问全局声明函数
dFn(dNum);

// 访问命名空间中的变量（把命名空间当成对象访问），
// 以及命名空间中的命名空间
DName.fn(DName.dNum, DName.DName1.dNum1);

// 访问函数重载
dFn2('abc');
dFn2(123);

// 访问声明接口
const dObj: IDeclare = {
  str: 'abc',
  bol: true,
}

// 访问声明类型
let dVar: DType = 'abc';
dVar = 123;

// 访问声明类
class DCS1 extends DCS {
  constructor(arg: string) {
    super(arg);
  }
}
const dcs1 = new DCS1('abc');

