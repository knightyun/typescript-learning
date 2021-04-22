/************************************************************
 * 发布
 *
 * 发布声明文件的方式：
 * - 包含到 npm 包中；
 * - 发布到 @types 组织上
 ************************************************************/

/**
 * 包含到 npm 包中
 * 
 * 使用该 npm 包时可以不用添加额外的声明依赖到 "dependencies" 中
 */

// 配置 package.json 中的 "types" 属性（或者 "typings"），添加声明文件入口：
// {
//   "name": "demo",
//   "version": "0.1.1",
//   "main": "./src/main.ts",
//   "types": "./src/main.d.ts"
// }
// 如果主声明文件是根目录下的 "index.d.ts"，则可以不用配置 "types" 值；

// 也可以指定某些 ts 版本下使用的声明文件来源：
// {
//   "typesVersions": {
//     ">=3.1": {
//       "*": ["ts3.1/*"]
//     }
//     ">=3.0": {
//       "*": ["ts3.0/*"]
//     }
//   }
// }
// 该配置表示如果当前使用的 ts 版本大于等于 3.1 时，将从 "ts3.1"（与 package.json 文件同级）目录中读取声明文件，
// 然后是判断 3.0 版本，最后如果都没有匹配的，则再从 "types" 中读取声明文件；
// 注意版本的书写顺序，应该是高版本在上，低版本在下，否则会匹配错误；



/**
 * 发布到 @types 公共仓库中
 */

// 要单独发布自己的包对应的 types 包，先提交 PR 到 <https://github.com/DefinitelyTyped/DefinitelyTyped> 仓库中，
// types 包名称需要 npm 包对应，比如 demo 包对应的 types 包应该是 @types/demo；
// 然后使用发布工具 <https://github.com/microsoft/DefinitelyTyped-tools/tree/master/packages/publisher> 将 types 包发布到 npm 上；