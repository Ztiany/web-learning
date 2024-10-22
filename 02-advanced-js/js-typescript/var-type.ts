/*
==========================================================
                                   声明变量类型
==========================================================
*/
console.log("---------- 声明变量类型 ----------");
let useAge: number; // 定义变量类型
let userName1 = "张三"; // 定义变量并赋值
let userName2: string = "李四"; // 定义变量并赋值


/*
==========================================================
                                            数组
==========================================================
*/
console.log("---------- 数组 ----------");
let userNames1: string[] = ["张三", "李四", "王五"]; // 定义数组
let userNames2: Array<string> = ["张三", "李四", "王五"]; // 定义数组


/*
==========================================================
                                            对象类型
==========================================================
*/
console.log("---------- 对象类型 ----------");
// 对于对象类型，我们需要首先使用 TypeScript 的语法，先编写一个 interface
// 接口，然后再定义对象类型。
interface User {
    name: string;
    age: number;
    married: boolean;
    jon?: string; // 可选属性
}

const user1: User = {
    name: "张三",
    age: 18,
    married: false
};

const user2: User = {
    name: "张三",
    age: 18,
    married: false,
    jon: "前端工程师"
};
console.log("user1", user1);
console.log("user2", user2);


/*
==========================================================
                                            枚举类型
==========================================================
*/
console.log("---------- 枚举类型 ----------");

// 枚举中可以同时支持数字、字符串、函数计算等成员。
enum UserLevelCode {
    Visitor = 10001,
    NonVIPUser,
    VIPUser,
    Admin = 10010,
}

console.log("UserLevelCode", UserLevelCode);
console.log("UserLevelCode", UserLevelCode.Admin);
console.log("UserLevelCode", UserLevelCode.VIPUser);


/*
==========================================================
                                set 与 map 的类型标注
==========================================================
*/
console.log("---------- set 与 map 的类型标注 ----------");
const set = new Set<number>();
const map = new Map<string, number>();