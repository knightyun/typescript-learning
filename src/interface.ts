/************************************************************
 * Interface（接口）
 *
 ************************************************************/

/**
 * 属性类型接口
 */

// 限制某个对象的属性类型（这里是入参）
function fn1(obj: { str: string }): string {
  return obj.str;
}

fn1({ str: "abc" });
// fn1({ str: 123 }); // Error

// 使用接口实现
interface IObj {
  str: string;

  // 不能包含具体实现
  // str2: string = 'abc'; // Error

  // 属性可以是个复杂对象
  aa?: {
    ba: {
      ca: string;
    },
    bb: [ number, boolean ];
  };

  /**
   * 可选属性
   */
  num?: number;

  /**
   * 只读属性，类似于 const 变量
   */
  readonly bol?: boolean;

  /**
   * 索引签名
   */
  [propName: string]: any;
}

// 应用接口类似于申明类型
function fn2(obj: IObj) {
  return obj.str;
}

fn2({
  str: "abc",
  num: 123,
  aa: { 
    ba: { ca: "a" },
    bb: [1, true]
  },
});

// 属性类型校验，应为 string
// fn2({ str: 123 }); // Error

// 属性存在性校验，必须存在 str，不存在 abc
// fn2({ abc: 'abc' }); // Error

const obj1: IObj = { str: "abc", bol: true };

// 修改只读属性会报错
// obj1.bol = false; // Error

// 由于使用索引签名，传入额外的属性不会报错
const obj2: IObj = { str: "abc", other: "none" };


/**
 * 方法类型接口
 */
interface IMethod {
  fn1(arg: string): boolean;
}

const fnObj: IMethod = {
  // 普通方法
  fn1: function (arg: string) {
    return arg === "";
  },

  // 简写格式
  // fn1(arg: string) { return arg === ''; }

  // 箭头函数格式
  // fn1: (arg) => arg === '',
};


/**
 * 函数类型接口
 */
interface IFn {
  // 函数签名：
  // （参数：类型）：返回类型
  (arg1: string, arg2: number): boolean;
}

// 函数传参可以少于函数签名定义的参数，但不能异于，
// 比如：arg1: number, arg3: boolean
let fn3: IFn = function (arg1: string): boolean {
  return arg1 !== "";
};

// 使用类型断言的两种写法
fn3 = <IFn>function (arg1: string): boolean {
  return arg1 !== "";
};
fn3 = function (arg1: string): boolean {
  return arg1 !== "";
} as IFn;

// 或者使用箭头函数
fn3 = (arg1: string): boolean => {
  return arg1 !== "";
};

// 类似于直接申明函数时指定参数和返回类型
function fn4(arg1: string): boolean {
  return arg1 !== "";
}


/**
 * 索引类型接口
 */
interface IArr {
  // 索引签名：（参数类型只能为 number | string）

  // 表示用数字类型的索引访问时，会得到字符类型的值
  [index: number]: string;

  // 访问字符类型索引时返回任意类型值，比如访问方法名
  [prop: string]: any;
}

const arr1: IArr = ["a", "b", "c"];

// 访问数字类型索引
arr1[0]; // 'a'

// 访问字符类型索引
arr1["length"]; // 3

// 只读索引
interface IArr2 {
  readonly [idx: number]: number;
}

const arr3: IArr2 = [1, 2, 3];

// 修改只读索引会报错
// arr3[0] = 4; // Error


/**
 * class 类型接口
 */
interface IPerson {
  // 描述类的公共属性，无法包含私有属性
  firstName: string;
  lastName: string;
  age?: number;
}

// 实现接口的类
class Person implements IPerson {
  public firstName: string;
  public lastName: string;
  public age?: number;

  constructor(obj: IPerson) {
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.age = obj.age;
  }
}


/**
 * 接口继承
 */
interface IOne {
  attr1: string;
}

interface ITwo extends IOne {
  attr2: number;
}

const obj3: ITwo = {
  // 少写任何一个都会报错
  attr1: "123",
  attr2: 123,
};

// 继承多个接口
interface IThree extends IOne, ITwo {
  attr3: boolean;
}

const obj4: IThree = {
  attr1: "123",
  attr2: 123,
  attr3: true,
};


/**
 * 混合类型的接口
 */

// 同时声明多种类型，为复杂结构所使用
interface IMulti {
  (arg1: number): void;
  attr1: string;
  fn1(arg: number): number;
}

// 函数类型
const fn5: IMulti = function () {};
// 属性
fn5.attr1 = "def";
// 方法
fn5.fn1 = (arg: number) => arg;


/**
 * 接口继承类
 */
class CSPub {
  // 公共属性
  public pub: string = "aaa";
}

class CSPri {
  // 私有属性
  private pri: string = "bbb";

  getPri?(): string {
    return this.pri;
  }
}

class CSPro {
  // 受保护属性
  protected pro: string = "ccc";
}

// 接口会继承类的 所有成员（只有类型声明，不包含具体实现），
// 即继承类的 公共，私有，受保护的成员
interface IClassPub extends CSPub {
  attr1: string;
}

interface IClassPri extends CSPri {
  attr1: string;
}

interface IClassPro extends CSPro {
  attr1: string;
}

// 继承了只有公共成员的类的接口，可以被任意 其他类 实现
// 通常用于复用类的约束
class CSI1 implements IClassPub {
  pub = "aaa";
  attr1 = "ddd";
}

// 具有私有成员或受保护成员的接口，只能由 继承类 实现
// 通常用于拓展对类的子类的约束
class CSI2 extends CSPri implements IClassPri {
  attr1 = "ddd";
}
class CSI3 extends CSPro implements IClassPro {
  pro = "ccc";
  attr1 = "ddd";
}

// 被其他类直接实现都会报错：
// class CSI2 implements IClassPri {
//   pri = 'bbb';
//   attr1 = 'ddd';
// }
// class CSI4 implements IClassPro {
//   pro = 'ccc';
//   attr1 = 'ddd';
// }
