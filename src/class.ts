/************************************************************
 * 类（class）
 *
 ************************************************************/

/**
 * 申明类
 */
class CS1 {
  attr1: string;                // 不加成员修饰默认是公共（public）
  public attr2: string = "";    // 公共属性（可以被派生类、实例对象访）
  private attr3: string = "";   // 私有属性（只能自己访问）
  protected attr4: string = ""; // 受保护属性（只能被自己和派生类访问）
  readonly attr5: string = "";  // 只读属性（只能被当前类的构造函数修改）
  static attr7: string = "";    // 静态属性（只能直接通过类访问，实例和当前类 this 都访问不到）

  /**
   * 构造函数
   *
   * 具有 protected 构造函数的类，只能被派生类访问，不能实例化（不影响派生类是否能实例化）
   * 具有 private   构造函数的类，既不能实例化，也不能被继承
   */
  constructor(arg: string, public attr6?: string) {
    /**
     * 参数属性
     *
     * public attr6: string 称为 参数属性，用于同时定义并初始化一个指定成员，
     * 通过在参数前添加成员修饰符形成，如 public, private, readonly，
     * 功能等同于：
     *
     * attr6: string;
     *
     * constructor(attr6: string) {
     *   this.attr6 = attr6;
     * }
     */

    // 获取所有属性
    this.attr1 = arg + this.attr2 + this.attr3 + this.attr4;

    // 只读属性可以在该类中修改
    this.attr5 = "1";
  }

  // 方法不加修饰符也默认是 public
  getAttr1(): string {
    // 只读属性无法在该类的方法中修改
    // this.attr5 = '2'; // Error
    return this.attr1;
  }

  // 静态方法
  static getStatic(): string {
    // 无法访问当前类（this）的属性与方法
    // this.attr1; // Error

    // 静态属性只能通过该类直接访问（this 获取不到值）
    return CS1.attr7;
  }
}


/**
 * 继承
 *
 * 被继承类称为 父类，继承类称为 派生类
 */
class CS2 extends CS1 {
  constructor(arg: string) {
    // 调用父类的 constructor 方法
    // 只要申明了构造函数，必须调用 super()
    // （不申明构造函数，则不影响该类的属性方法调用父类属性与方法）
    super(arg, "");

    // 父类的只读属性不能被派生类修改
    // this.attr5 = '1';
  }

  // 甚至可以重写父类的方法（只有该类实例化后能访问到）
  getAttr1(): string {
    return this.attr1;
  }

  getAttrs(): string {
    // 获取父类的 公共、受保护成员（获取不到私有成员）
    return this.attr1 + this.attr2 + this.attr4;
  }

  getSuperAttr1(): string {
    // 获取父类的方法
    return this.getAttr1();
  }
}


/**
 * 类的实例（实例化）
 */
const cs1 = new CS1("aaa", "a");

// 实例只能访问公共属性与方法
cs1.attr1;
cs1.attr2;
cs1.attr5;
cs1.attr6;
cs1.getAttr1();
// 修改只读属性会报错
// cs1.attr5 = '1';

// 访问类的静态属性与方法
CS1.attr7;
CS1.getStatic();

const cs2 = new CS2("bbb");

// 派生类实例只能访问 父类的公共属性与方法、派生类的公共属性与方法
cs2.attr1;
cs2.attr2;
cs2.attr5;
cs2.getAttr1();
cs2.getAttrs();
cs2.getSuperAttr1();


/**
 * 实例的类型
 */

// 表示 cs21 应是类 CS2 或其派生类的实例
let cs21: CS1;

cs21 = new CS1('1');
cs21 = new CS2('1');

// 如果成为了其他类的实例会报错
// class CS22 {}
// cs21 = new CS22(); // Error

// 赋予其他值也会报错
// cs21 = '123'; // Error


/**
 * 抽象类
 *
 * 用作其他派生类的基类，不能被直接 实例化
 * 与接口的区别是，可以包含成员的 实现细节
 */
abstract class CS3 {
  // 可以申明普通成员并初始化值，派生类中可直接访问
  attr1: string = "111";

  /**
   * 抽象属性
   * 
   * 必须在派生类中申明该属性，该基类中不会存在该属性
   * 抽象属性也能和成员修饰符结合
   */
  abstract attr2: string = "";
  protected abstract attr3: string = "";

  // 抽象类也可以有构造函数
  constructor(public name?: string) {}

  /**
   * 抽象方法
   *
   * 不能包含具体实现，但必须在派生类中实现
   */
  abstract fn1(arg: string): boolean;

  // 普通方法，可以包含具体实现
  fn2(): string {
    return this.attr1;
  }
}

class CS4 extends CS3 {
  attr2: string = '';
  attr3: string = '';

  fn1(arg: string) {
    return !!arg;
  }
}

// 抽象类的子类可以实例化
const cs4 = new CS4();

cs4.attr1; // "111"
cs4.attr2;
cs4.fn1('1'); // true
cs4.fn2(); // "111"
