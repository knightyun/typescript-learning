namespace nameMulti {
  // 命名空间中导出的变量，在其他文件中使用 引用标签：
  // /// <reference path="./nameMulti-1.ts" />
  // 可以在相同命名空间内直接访问该变量；
  export let nameStr: string = 'abc';

  // 但是命名空间中不能使用 默认导出
  // export default 'abc';

  // 也不能使用先申明后导出的格式
  // export { nameStr }; // Error
}
