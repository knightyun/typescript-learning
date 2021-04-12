/************************************************************
 * 基础类型  十三种
 * 
 ************************************************************/

/**
 * Boolean
 */
const bol1: boolean = false || true;
const bol2: boolean = !!123;
const bol3: boolean = !'abc';
const bol4: boolean = 123 >= 121;


/**
 * String
 */
const str1: string = 'string';
const str2: string = `bol: ${true}`;


/**
 * Number
 */
const num1: number = 123;
const num2: number = 0xff;
const num3: number = 0o77;
const num4: number = 0b1010;


/**
 * Array
 */
const arr: number[] = [1, 0x2, 0o3, 0b10];

const arr0: (number|string)[] = [1, '2'];

const arr2: Array<string|boolean> = ['a', 'b', false];


/**
 * Object
 */
const obj: object = { a: 1, b: 'a' };

// 不能这样写
// const obj2: object = { a: number: 1, b: string: 2 };


/**
 * Tuple（元组）
 *
 * 已知元素数量和类型且可重复的 数组
 */
const tpl: [string, number, boolean, boolean] = ['a', 2, true, true];

const tplStr: string = tpl[0];
const tplNum: number = tpl[1];

tpl[3] = false;
// tpl[4] = false; // Error

const tplToString0 = tpl[0].toString();
const tplToString1 = tpl[1].toString();


/**
 * Enum（枚举）
 *
 * 为一组 数值或字符串 指定别名（方便记忆）
 */
enum Color {
  Red,
  Green,
  Blue = 4,
  Pink = 'pink',
  Yellow = 'yellow',
};

// 访问枚举值 类似访问对象属性
// 变量的类型限定为枚举时，变量的值只能是枚举成员之一
const r: Color = Color.Red;   // r === 0
const g: Color = Color.Green; // g === 1
const b: Color = Color.Blue;  // b === 4
const p: Color = Color.Pink;  // p === "pink"
let y: Color = Color.Yellow;  // y === "yellow"

// 枚举属性是只读的，不支持修改
// Color.Red = 123; // Error

// 如果将枚举属性作为类型，则变量值需要与枚举值一致
let yy: Color.Yellow;

yy = Color.Yellow;

// yy = 'black'; // Error

// 即使字面值与枚举值相同，也会报错
// yy = 'yellow'; // Error

enum Enu {
  Add = 1 + 2 - 3 * 4 / 5 % 6, // 计算值
  Zero = 0,
  Total = Add + Zero, // 可以访问当前枚举值并计算
  Len = '123'.length, // 或者是表达式的计算值

  // 但是数值枚举中 不能存在上面的计算值
  // Str = 'abc', // Error
}

// 常量表达式，只能包含字符串或数值字面量的枚举 值，和普通计算值
const enum Enu2 {
  One = 1,
  Two = One + 2,

  // 不能存在表达式的计算值
  // Three = '123'.length, // Error
}

// 与对象的区别
enum EDirection {
  Up,
  Down,
  Left,
  Right,
}
const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;

// 枚举能直接应用类型
function run1(dir: EDirection): void {};

run1(EDirection.Up);

// 对象（字面量）不具有类型，需要先申明类型再应用
// (keyof typeof ODirection) 表示限制对象属性为 "Up" | "Down" | "Left" | "Right"
// 枚举则默认存在这种机制
type Direction = typeof ODirection[keyof typeof ODirection];

function run2(dir: Direction): void {};

run2(ODirection.Up);


/**
 * Any
 *
 * 任意类型，会跳过类型检查
 * 不指定类型默认为 any
 */
let anyVar: any = 123;

anyVar = 'abc';
anyVar = true;
anyVar.toString();

const anyArr: any[] = [ true, 123, 'aaa' ];


/**
 * Void
 *
 * 无任何类型，与 any 相反
 */
function voidFn(): void {}
function voidFn1(): void { return undefined; }
function voidFn2(): void { return; }

// function voidFn3(): void { return 1; } // Error

let void1: void = undefined;
// void1 = 1234;             // Error
// const void2: void = 1234; // Error


/**
 * Undefined
 */
let u: undefined = undefined;
// const u2: undefined = null; // Error
// const u3: undefined = 123;  // Error


/**
 * Null
 */
let n: null = null;
// const n2: null = undefined; // Error
// const n3: null = 123;       // Error


// undefined, null 是所有类型的子类（"strictNullChecks": false）
// 即可以把任何类型赋值为 null | undefined

// "strictNullChecks": false
//
let num5: number = 123;
// num5 = undefined;  // Pass
// num5 = null;       // Pass
void1 = undefined; // Pass
// void1 = null;      // Pass

// "strictNullChecks": true
//
// num5 = undefined; // Error
// num5 = null;      // Error
void1 = undefined;
// void1 = null;     // Error


/**
 * Unknown
 *
 * 未知类型，相当于 any，但是不允许执行变量的方法（更安全）
 */
let uk: unknown = 'abc';

uk = 123;
uk = true;
// uk.toString(); // Error

let uk2: unknown = uk;
let uk3: any = uk;
// let uk4: string = uk; // Error


/**
 * Never
 *
 * 永不存在的值 的类型
 */

// 例如抛出异常的函数，不能具有可访问的终结点
// 因为抛出异常会终止函数执行，也就无法到达终点返回值了
function err(): never {
  throw new Error('message');
}

// 有机会到达终点的函数也会报错
// function err1(): never {
//   if (Math.random() > 0.5) {
//     throw new Error('message');
//   }
// }

// 不写返回值其实是返回 undefined，并不是真正的无返回值
// function err2(): never {} // Error

// 或者一直循环，也无法到达终点，无返回值
function err3(): never {
  while (true) {}
}

// 变量也可以有永不存在的值，即不能给它赋值，否则报错，类似一种保护手段
let ne: never;
// ne = 123; // Error

// never 是所有类型的子类型，即可以赋值给任何类型
// 但是情况视 "strictNullChecks" 而定
let num6: any = 123;
// "strictNullChecks": false
// num6 = ne; // Pass
//
// "strictNullChecks": true
// num6 = ne; // Error

// 但是没有类型是 never 的子类型，除了 never 自身
// 情况同样视 "strictNullChecks" 而定
let ne1: never;
// "strictNullChecks": false
// ne = ne1; // Pass
//
// "strictNullChecks": true
// ne = ne1; // Error

// any 也不能分配给 never
let any1: any = 123;
// ne = any1; // Error

// 所以返回值为 never 类型的函数也可以通过检查
let neverReturn: never;

function err4(): never {
  return neverReturn;
}


/**
 * 类型断言
 *
 * 告诉编译器自己确定某个变量的类型
 */
let anyVar2: unknown;

anyVar2 = 123;

// 直接赋值会报错，不允许这样类型转换，虽然从结果上看是正确的
// const num7: number = anyVar2; // Error

// 可以使用断言，告诉编译器确认变量类型：
const num8: number = anyVar2 as number;

// 或者是这种写法：
const num9: number = <number>anyVar2

// 调用方法需要加括号
const str3: string = (anyVar2 as number).toFixed(2);

interface IObj {
  one?: string;
}

function fnn(arg: IObj): string {
  // 直接返回会报错，one 属性可能不存在
  // return arg.one; // Error

  // 如果自己当前确信 one 属性存在，则可以在属性最后添加感叹号（!），
  // 告诉 ts 无需检查，属性确实存在；
  return arg.one!;
}