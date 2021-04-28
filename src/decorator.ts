/************************************************************
 * 装饰器
 *
 * 用于标注或修改类及其成员，是一种特殊类型声明，
 * 支持被附加到类声明、方法、访问符、属性或参数上
 ************************************************************/

/**
 * 基本使用
 */

// 声明装饰器函数：
// 函数一共接收三个参数：
// 1. 装饰器所装饰的目标（target）；
// 2. 装饰目标的属性名（key）；
// 3. 装饰目标的属性描述值（descriptor）；
function decBasic(target: unknown, key: string, descriptor: object): void {
  console.log('decorator');
}

console.log('=============== Basic ===============');

// 使用装饰器，直接写在装饰目标的上方，
// 这里装饰目标是类的 getNum 方法；
class DecBasicCS {
  @decBasic
  getNum(): void {
    console.log('class');
  }
}

const decBasicCS = new DecBasicCS();
decBasicCS.getNum();
// "decorator"
// "class"


/**
 * 装饰器工厂
 * 
 * 可自定义如何装饰一个目标（允许为装饰器传参）
 */
function decFactory(str: 'add' | 'plus') {
  // 这里可写自定义装饰逻辑
  let returnFn;

  if (str === 'add') {
    // 装饰器工厂函数最后需要返回一个装饰器函数
    returnFn = function(target: unknown, key: string): void {
      console.log('add');
    }
  } else {
    returnFn = function(target: unknown, key: string): void {
      console.log('plus');
    }
  }

  return returnFn;
}

console.log('=============== Factory ===============');

class DecFactoryCS {
  // 装饰器工厂函数可以像普通函数一样传参执行（运行时执行）
  @decFactory('add')
  useAdd(): void {}
  
  // 使用不同参数针对不同装饰目标，或使用不同装饰逻辑
  @decFactory("plus")
  usePlus(): void {}
}

const decFactoryCS = new DecFactoryCS();
decFactoryCS.useAdd(); // "add"
decFactoryCS.usePlus(); // "plus"


/**
 * 装饰器组合
 * 
 * 一个装饰目标可同时被多个装饰器叠加装饰
 */
function decMultiOne(target: unknown, key: string): void {
  console.log('one');
}
function decMultiTwo(target: unknown, key: string): void {
  console.log('two');
}

function decMultiOneFact() {
  console.log('one fact');
  return function(target: unknown, key: string): void {
    console.log('one');
  }
}
function decMultiTwoFact() {
  console.log('two fact');
  return function(target: unknown, key: string): void {
    console.log('two');
  }
}

console.log('=============== Multi decorator ===============');

class DecMultiCS {
  // 多个装饰器叠加时，会从装饰目标开始，依次向上执行，
  // 类型于执行 decMultiOne(decMultiTwo(getNum))
  @decMultiOne
  @decMultiTwo
  getNum(): void {}

  // 装饰器也可以横向书写
  @decMultiOne @decMultiTwo getNum1(): void {}

  @decMultiOne @decMultiTwo
  getNum2(): void {}

  // 使用装饰器工厂也能叠加，但是执行顺序是：
  // - 先自上而下执行工厂函数的逻辑
  // - 然后自下而上执行装饰器的逻辑
  @decMultiOneFact()
  @decMultiTwoFact()
  getNum3(): void {}
}

const decMultiCS = new DecMultiCS();
decMultiCS.getNum();
// "two"
// "one"
decMultiCS.getNum1();
// "two"
// "one"
decMultiCS.getNum2();
// "two"
// "one"
decMultiCS.getNum3();
// "one" "fact"
// "two" "fact"
// "two"
// "one"


/**
 * 多种装饰目标类型
 * 
 * 执行顺序：
 * 1. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器 应用到每个 实例成员。
 * 2. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器 应用到每个 静态成员。
 * 3. 参数装饰器应用到构造函数。
 * 4. 类装饰器应用到类。
 */
function decClass() {
  console.log('class fact');
  return function(target: Function): void {
    console.log('class');
  }
}
function decAttr() {
  console.log('attr fact');
  return function(target: unknown, key: string): void {
    console.log('attr', key);
  }
}
function decMethod() {
  console.log('method fact');
  return function(target: unknown, key: string): void {
    console.log('method', key);
  }
}
function decGetter() {
  console.log('getter fact');
  return function(target: unknown, key: string): void {
    console.log('getter');
  }
}
function decSetter() {
  console.log('getter fact');
  return function(target: unknown, key: string): void {
    console.log('getter');
  }
}
function decArg() {
  console.log('arg fact');
  return function(target: unknown, key: string, index: unknown): void {
    console.log('arg');
  }
}

console.log('=============== Multi target ===============');

// 类装饰器，实际是作用于类的构造函数，
// 即装饰器的 target 入参是构造函数（并且只能定义这一个入参）
// 如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明
@decClass()
class MultiDecCS {
  /**
   * 属性装饰器
   *
   * target: 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
   * 属性装饰器没有第三个入参 属性描述符；
   */

  // 公共属性
  @decAttr()
  public publicAttr: number = 0;

  // 私有属性
  @decAttr()
  private privateAttr: number = 0;

  // 受保护属性
  @decAttr()
  protected protectedAttr: number = 0;

  // 静态属性
  @decAttr()
  static staticAttr: number = 0;

  /**
   * 方法装饰器
   *
   * target: 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
   * 如果方法装饰器返回一个值，它会被用作方法的属性描述符
   */
  @decMethod()
  getVar(): void {}

  // 静态方法
  @decMethod()
  getStaticVar(): void {};

  /**
   * getter 修饰器
   *
   * target: 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
   * 但不能同时向同一个属性的 getter 和 setter 设置修饰器
   * 如果访问器装饰器返回一个值，它会被用作方法的属性描述符
   */
  @decGetter()
  get var(): undefined { return; }
  
  /**
   * setter 修饰器
   */
  @decSetter()
  set var1(val: unknown) {}

  /**
   * 参数装饰器
   *
   * target: 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
   * 入参第三个是当前参数在入参数组中的索引
   */
  getArg<T>(@decArg() arg: T): T { return arg; }
}

const multiDecCS = new MultiDecCS();
