/************************************************************
 * 模块 - 导出
 *
 ************************************************************/

// 当前文件有 export 内容，所以当前文件会被当成一个模块，
// 内部申明的变量不能直接被全局访问；
const modStr: string = "abc";

const expBol: boolean = true;

// 可以导出多种类型
export const expStr: string = "export";

export interface IExp {
  num: number;
}

export class CExp {
  str: string = "abc";
}

// 先申明后导出
export { expBol };

// 可以直接引导出引入的变量，进行重命名或拓展
// 也可以自己引入自己的变量
export { expBol as expBol2 } from "./export";

// 被直接导出的导入变量，当前模块代码无法访问
// expBol2; // Error
