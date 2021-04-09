"use strict";
/************************************************************
 * 基础类型  十三种
 *
 ************************************************************/
/**
 * Boolean
 */
var bol1 = false || true;
var bol2 = !!123;
var bol3 = !'abc';
var bol4 = 123 >= 121;
/**
 * String
 */
var str1 = 'string';
var str2 = "bol: " + true;
/**
 * Number
 */
var num1 = 123;
var num2 = 0xff;
var num3 = 63;
var num4 = 10;
/**
 * Array
 */
var arr = [1, 0x2, 3, 2];
var arr0 = [1, '2'];
var arr2 = ['a', 'b', false];
/**
 * Object
 */
var obj = { a: 1, b: 'a' };
// 不能这样写
// const obj2: object = { a: number: 1, b: string: 2 };
/**
 * Tuple（元组）
 *
 * 已知元素数量和类型且可重复的 数组
 */
var tpl = ['a', 2, true, true];
var tplStr = tpl[0];
var tplNum = tpl[1];
tpl[3] = false;
// tpl[4] = false; // Error
var tplToString0 = tpl[0].toString();
var tplToString1 = tpl[1].toString();
/**
 * Enum（枚举）
 *
 * 为一组 数值或字符串 指定别名（方便记忆）
 */
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 4] = "Blue";
    Color["Pink"] = "pink";
    Color["Yellow"] = "yellow";
})(Color || (Color = {}));
;
// 访问枚举值 类似访问对象属性
// 变量的类型限定为枚举时，变量的值只能是枚举成员之一
var r = Color.Red; // r === 0
var g = Color.Green; // g === 1
var b = Color.Blue; // b === 4
var p = Color.Pink; // p === "pink"
var y = Color.Yellow; // y === "yellow"
// 枚举属性是只读的，不支持修改
// Color.Red = 123; // Error
// 如果将枚举属性作为类型，则变量值需要与枚举值一致
var yy;
yy = Color.Yellow;
// yy = 'black'; // Error
// 即使字面值与枚举值相同，也会报错
// yy = 'yellow'; // Error
var Enu;
(function (Enu) {
    Enu[Enu["Add"] = 0.6000000000000001] = "Add";
    Enu[Enu["Zero"] = 0] = "Zero";
    Enu[Enu["Total"] = 0.6000000000000001] = "Total";
    Enu[Enu["Len"] = '123'.length] = "Len";
    // 但是数值枚举中 不能存在上面的计算值
    // Str = 'abc', // Error
})(Enu || (Enu = {}));
// 与对象的区别
var EDirection;
(function (EDirection) {
    EDirection[EDirection["Up"] = 0] = "Up";
    EDirection[EDirection["Down"] = 1] = "Down";
    EDirection[EDirection["Left"] = 2] = "Left";
    EDirection[EDirection["Right"] = 3] = "Right";
})(EDirection || (EDirection = {}));
var ODirection = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3,
};
// 枚举能直接应用类型
function run1(dir) { }
;
run1(EDirection.Up);
function run2(dir) { }
;
run2(ODirection.Up);
/**
 * Any
 *
 * 任意类型，会跳过类型检查
 * 不指定类型默认为 any
 */
var anyVar = 123;
anyVar = 'abc';
anyVar = true;
anyVar.toString();
var anyArr = [true, 123, 'aaa'];
/**
 * Void
 *
 * 无任何类型，与 any 相反
 */
function voidFn() { }
function voidFn1() { return undefined; }
function voidFn2() { return; }
// function voidFn3(): void { return 1; } // Error
var void1 = undefined;
// void1 = 1234;             // Error
// const void2: void = 1234; // Error
/**
 * Undefined
 */
var u = undefined;
// const u2: undefined = null; // Error
// const u3: undefined = 123;  // Error
/**
 * Null
 */
var n = null;
// const n2: null = undefined; // Error
// const n3: null = 123;       // Error
// undefined, null 是所有类型的子类（"strictNullChecks": false）
// 即可以把任何类型赋值为 null | undefined
// "strictNullChecks": false
//
var num5 = 123;
// num5 = undefined;  // Pass
// num5 = null;       // Pass
// void1 = undefined; // Pass
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
var uk = 'abc';
uk = 123;
uk = true;
// uk.toString(); // Error
var uk2 = uk;
var uk3 = uk;
// let uk4: string = uk; // Error
/**
 * Never
 *
 * 永不存在的值 的类型
 */
// 例如抛出异常的函数，不能具有可访问的终结点
// 因为抛出异常会终止函数执行，也就无法到达终点返回值了
function err() {
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
function err3() {
    while (true) { }
}
// 变量也可以有永不存在的值，即不能给它赋值，否则报错，类似一种保护手段
var ne;
// ne = 123; // Error
// never 是所有类型的子类型，即可以赋值给任何类型
// 但是情况视 "strictNullChecks" 而定
var num6 = 123;
// "strictNullChecks": false
// num6 = ne; // Pass
//
// "strictNullChecks": true
// num6 = ne; // Error
// 但是没有类型是 never 的子类型，除了 never 自身
// 情况同样视 "strictNullChecks" 而定
var ne1;
// "strictNullChecks": false
// ne = ne1; // Pass
//
// "strictNullChecks": true
// ne = ne1; // Error
// any 也不能分配给 never
var any1 = 123;
// ne = any1; // Error
// 所以返回值为 never 类型的函数也可以通过检查
var neverReturn;
function err4() {
    return neverReturn;
}
/**
 * 类型断言
 *
 * 告诉编译器自己确定某个变量的类型
 */
var anyVar2;
anyVar2 = 123;
// 直接赋值会报错，不允许这样类型转换，虽然从结果上看是正确的
// const num7: number = anyVar2; // Error
// 可以使用断言，告诉编译器确认变量类型：
var num8 = anyVar2;
// 或者是这种写法：
var num9 = anyVar2;
// 调用方法需要加括号
var str3 = anyVar2.toFixed(2);
