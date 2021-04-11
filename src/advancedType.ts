/************************************************************
 * 高级类型
 * 
 ************************************************************/

/**
 * 交叉类型
 * 
 * 多个类型合并为一个类型，合并类型需同时满足多种类型
 * 类似类型的 与（&）运算
 */
interface IStr {
  str: string,
}

interface INum {
  num: number,
}

// 合并后的交叉类型
type StrAndNumType = IStr & INum;

const obj6: StrAndNumType = {
  // 缺少属性会报错
  str: 'abc',
  num: 123,

  // 多余属性也会报错
  // bol: true,
};


/**
 * 联合类型
 * 
 * 类似类型的 或（|）运算，需至少满足多种类型的一种
 */
type StrOrNumType = IStr | INum;

let strOrNum: StrOrNumType;

// 满足联合类型中任意一种 即可通过
strOrNum = { str: 'abc' };
strOrNum = { num: 123 };


/**
 * 类型保护
 * 
 * 在运行时 检查以确保某个作用域类型 的表达式
 */

// 如果函数入参是联合类型，那么内部访问该参数时，用任意一种类型访问参数都会报错，
// 因为 ts 判断联合类型时只要有一个类型不满足，就不会通过，所以导致每个都不通过；
function fn22(arg: number | number[]): number {
  // if (arg > 0) {
  //   return arg + 1; // Error

  // } else if ( arg.length > 0) { // Error
  //   return arg.pop(); // Error

  // } else {
  //   return 0;
  // }

  // 为了避免这种情况的报错，需要使用 类型断言
  if (arg as number > 0) {
    return arg as number + 1;

  } else if ( (<number[]>arg).length > 0) {
    return (<number[]>arg).pop() as number;

  } else {
    return 0;
  }
}

// 由于多次书写类型断言很麻烦，所以 ts 出现了 类型保护 的机制:

/**
 * typeof 类型保护：
 */
function fn23(arg: number | number[]): number {
  // ts 会识别 typeof 语句，并将当前 if 区块中的 arg 都当成 number，
  // 类似于加上了隐式的类型断言
  if (typeof arg === 'number' && arg > 0) {
    return arg + 1;
  
  // 其他 if 区块也能识别为指定类型
  } else if (typeof arg === 'object' && arg.length > 0) {
    return arg.pop() as number;
  
  } else {
    return 0;
  }
}

/** 
 * truthiness 类型保护
 */
function fn24(arg: number[] | null): void {
  if (typeof arg === 'object') {
    // 不能直接使用数组的特性，即使使用了 typeof，因为 null 也是 'object' 类型，
    // 并且 null 不能使用 for...of...
    // for (let i of arg) { i; } // Error

    // 使用 truthiness 类型保护可以进一步限制变量为 数组类型，
    // !!arg 或者 Boolean() 等涉及布尔运算的操作都能触发这种类型保护；
    if (arg) {
      for (let i of arg) { i; }
    }
  }
}

/**
 * 等式类型保护
 */
function fn25(a: string | number, b: string | boolean): void {
  // 直接使用参数的方法会报错，因为可能是 number 类型
  // a.toUpperCase(); // Error
  // b.toUpperCase(); // Error

  // 使用了等式判断后，ts 会自动取二者的交集类型，即 string，就可以正常调用方法了，
  // 也可以使用类似 a === null 的直接与基本类型对比的判断触发类型保护；
  if (a === b) {
    a.toUpperCase();
    b.toUpperCase();
  }
}

/**
 * instanceof 类型保护
 */
function fn26(arg: Number | String): void {
  //（x instanceof y) 用于检查 x 的原型链中是否包含 y.prototype

  // 直接调用方法会报错，Number 类型不存在该方法
  // arg.toUpperCase(); // Error

  // instanceof 表达式会触发类型保护，限制 arg 为 String 类型
  if (arg instanceof String) {
    arg.toUpperCase();
  }
}

fn26('abc');
// fn26(true); // Error

/**
 * 自定义类型保护
 * 
 * 首先自定义一个函数来判断参数类型，返回值类型具有固定格式：
 * param is type
 * 其中 param 必须是参数，type 是类型
 */
function isStr(arg: string | number): arg is string {
  // 内部可以使用其他 类型保护
  return typeof arg === 'string';

  // 也可以直接使用类型断言
  // return (arg as string).toUpperCase !== undefined;
}

function fn27(arg: string | number): void {
  // 像使用其他类型保护一样引用 自定义函数，触发类型保护
  if (isStr(arg)) {
    arg.toUpperCase();
  } else {
    arg += 1;
  }
}


/**
 * 类型别名
 * 
 * 为一些基本类型或复杂类型定义一个别名
 */

type MyString = string;
type StrOrNum = string | number;
type StrAndNum = string & number;
type callback = (arg: string) => boolean

// 像使用基本类型一样使用类型别名
let myString: MyString;

// 类型别名可以是 泛型
type TypeArr<T> = T[];
const strArr: TypeArr<string> = ['a'];

// 类型别名可以 自己引用自己（嵌套）
type NestObj = {
  str: string,
  obj?: NestObj,
}
const nestObj: NestObj = {
  str: 'abc',
  obj: { str: 'def' },
}


/**
 * 字面量类型
 * 
 * 使用该类型的变量值需要等于字面值
 */
type OneOrTwo = 'one' | 'two' | 3 | true;

let num: OneOrTwo;

num = 'one';
num = 'two';
num = 3;
num = true;

// 取类型中不存在的值会报错
// num = 'three'; // Error
