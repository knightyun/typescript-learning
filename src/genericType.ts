/************************************************************
 * 泛型
 * 
 * 用于创建可复用的支持多种类型的组件
 ************************************************************/

/**
 * 背景
 */

// 函数返回类型与传参类型一致
function fn13(arg: number): number {
  return arg;
}

fn13(123);

// 如果传参支持多种类型，就需要写多个重载定义，如果使用 any，
// 虽然能包含所有情况，但不能保证参数和返回值类型一致；
function fn14(arg: any): any {
  return arg + '';
}

fn14(123);
fn14('abc');


/**
 * 类型变量
 */

// 使用 类型变量 可以解决这个问题
// 变量 T 用于捕获并存储用户传入的类型
// 这里的函数 fn15 便是泛型（泛型函数），即适用于多个类型的函数
function fn15<T>(arg: T): T {
  return arg;
}

// 使用泛型时在类型变量的位置传入类型值
fn15<number>(123);

// 通常是使用时省略，直接利用编译器的 类型推断 来判断类型
fn15('abc');

// 但是一些复杂类型情况下，编译器可能不能自动推断出类型，
// 这时就任然需要使用 <> 来指定类型
interface IObj2 {
  a: number;
  b: string;
};

fn15<IObj2>({ a: 123, b: 'abc' });


/**
 * 使用
 */

// 由于 T 表示任意类型，所以不能直接访问某些属性
function fn16<T>(arg: T): T {
  // return arg.toString();
  return arg
}

// 如果是复合类型，则可以使用某些固有属性
function fn17<T>(arg: T[]): string {
  return arg.toString();
}

// 类型变量可以使用其中字母或者单词（通常使用 T）
// 也可以存在多个变量
function fn18<M, My, other>(arg: M): M {
  let one: My;
  let two: other;

  return arg;
}

// 存在多个类型变量时依次指定
fn18<string, number, boolean>('abc');


/**
 * 泛型接口
 */

// 接口里的泛型
interface IGeneric {
  <T>(arg: T): T;
}

let fn19: IGeneric = function(arg) {
  return arg;

  // 和接口申明不一致会报错
  // return arg + '';
}

// 针对整个接口的泛型
interface IGeneric2<T> {
  a: T;
  b: T[];
  c(arg: T): T;
}

const obj5: IGeneric2<number> = {
  a: 123,
  b: [1, 2, 3],
  c: (arg) => arg + 1
};


/**
 * 泛型类
 */
class CS5<T> {
  constructor(public attr: T) {}

  fn(): T {
    return this.attr;
  }

  // 静态成员不能使用泛型类型
  // static a: T = '';
}

const cs5 = new CS5<number>(123);

cs5.fn(); // 123


/**
 * 泛型约束
 * 
 * 需要约束泛型具有某些属性，可以 extends 指定接口
 */

interface IObj3 {
  length: number; // 约束为具有 length 属性的任意类型
}

function fn20<T extends IObj3>(arg: T): number {
  return arg.length;
}

fn20('abc'); // 3

// 报错，因为数字没有 length 属性
// fn20(123); // Error

// 泛型约束中使用类型参数
// 表示第二个参数需要是第一个参数对象的属性
function fn21<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

fn21({ a: 1 }, 'a');

// b 不是第一个参数对象的属性
// fn21({ a: 1 }, 'b'); // Error
