// 使用 引用标签 来告诉编译器文件之间的关联
/// <reference path="./nameMulti-1.ts" />

namespace nameMulti {
  let nameStr1: string;

  // 可以直接访问所引用文件中 相同命名空间内导出的变量（无需 import）
  nameStr1 = nameStr;

  // 也可以重新申明引入的变量，对其进行覆盖
  // let nameStr: boolean;

  export const nameStr2 = nameStr1;
}

// 命名空间外不能直接访问
// nameStr; // Error

namespace _nameMulti {
  // 同一文件的其他命名空间中不能访问 其他命名空间导出的变量
  // nameStr; // Error
}