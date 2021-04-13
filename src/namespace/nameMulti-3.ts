// 可以同时引用多个文件
/// <reference path="./nameMulti-1.ts" />
/// <reference path="./nameMulti-2.ts" />

namespace nameMulti {
  let nameStr3: string;

  // 引用的多个文件的导出内容能全部访问
  nameStr3 = nameStr;
  nameStr3 = nameStr2;
}