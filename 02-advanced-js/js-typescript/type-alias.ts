/*
==========================================================
                                    类型别名
==========================================================

在 TypeScript 中，类型别名起到的就是变量的作用，它可以存储一个类型，
后续你可以直接引用它即可。
 */
console.log("---------- 类型别名 ----------");

type Handler = () => void;
const handler1: Handler = () => {
};
const handler2: Handler = () => {
};

// 我们也可以使用类型别名来替换接口，实现对对象类型的复用：
type User = {
    userName: string;
    userAge: number;
    userMarried: boolean;
    userJob?: string;
}

const userA: User = {
    userName: 'Mike',
    userAge: 18,
    userMarried: false
}

/*
==========================================================
                                联合类型与交叉类型
==========================================================
在 JavaScript 中，我们经常会需要写“或”逻辑和“与”逻辑，比如你是一个小孩
或老人，比如你是一个程序员且是前端领域，而在类型层面，或逻辑可以由联
合类型实现，与逻辑可以由交叉类型实现。
*/
console.log("---------- 联合类型与交叉类型 ----------");

type PossibleTypes = string | number | boolean;

// 联合类型对其中的类型成员并没有限制，你可以混合原始类型，字面量类型，
// 函数类型，对象类型等等：
type Status = 'success' | 'failure';
type Code = 200 | 404 | 502;
const fixedStr: 'name' = 'name'; // 值只能是 'name'
const fixedNum: 599 = 599; // 值只能是 599

// 我们也可以使用由接口组成的联合类型：
interface VisitorUser {
}

interface CommonUser {
}

interface VIPUser {
}

interface AdminUser {
}

type GeneralUser = VisitorUser | CommonUser | VIPUser | AdminUser;

// 既然能够将联合类型关联到按位或，那么从按位与逻辑到交叉类型就更好
// 理解了，类似于逻辑或 || 到联合类型的 |，交叉类型的 & 也脱胎自逻辑与
// &&，我们同样可以使用类型别名来表示一个交叉类型：
type ExactUser = VisitorUser & CommonUser & VIPUser & AdminUser;

// 如果尝试交叉两个原始类型，会得到一个 never 类型：
type Test = string & number; // never 类型

// 还可以组合联合类型和交叉类型：
type UnionIntersection = (1 | 2 | 3) & (1 | 2); // 1 | 2
const ui1: UnionIntersection = 1;