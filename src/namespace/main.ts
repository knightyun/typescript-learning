/************************************************************
 * 命名空间
 *
 ************************************************************/

// ts 1.5 之后，内部模块（module x {}）改为 命名空间（namespace x {}），
// 外部模块 改为 模块（import/export）


/**
 * 使用
 */

// 当前文件中或与其他文件中的全局变量中，存在重复的变量名申明会报错
// let num; // Error
let num7: number;
// let num7; // Error

// 通过命名空间解决这个问题
namespace Name1 {
  let num: number = 1;
}
namespace Name2 {
  // 同时，其他文件中也能这样重新申明同名变量；
  let num: number = 1;
}

// 但是变量和接口名可以重复，分别表示不同的结构
let CommonName;
interface CommonName {};

// 类、接口、命名空间也可以名称相同，都表示为同一个类型结构
class CommonName1 {};
interface CommonName1 {};
namespace CommonName1 {};


/**
 * 命名空间 嵌套
 */
namespace Name3 {
  namespace Name3_1 {
    let num: number = 1;
  }

  namespace Name3_2 {
    let num: number = 2;
  }

  // 变量之间互不影响
  let num: number = 3;
}

// 内部嵌套的命名空间外部无法访问
// Name3_1; // Error


/**
 * 命名空间 别名
 */
namespace Name4 {
  export namespace Name4_1 {
    export namespace Name4_2 {
      export const num: number = 1;
    }
  }
}

// 取别名的格式为：import xxx = name1.name2 ...
import Name42 = Name4.Name4_1.Name4_2;

// 访问别名中的变量就像访问对象
let num10: number = Name42.num;


/**
 * 外部命名空间
 */
declare namespace Name5 {
  export type num = number;
}
declare let num11: Name5.num;
