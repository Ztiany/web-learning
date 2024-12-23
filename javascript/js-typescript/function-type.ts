/*
==========================================================
                                   函数类型
==========================================================
*/
console.log("---------- 函数类型 ----------");

// 函数声明
function sum1(a: number, b: number): number {
    return a + b;
}

// 函数表达式
const sum2 = function (a: number, b: number): number {
    return a + b;
};

// 声明一个独立的函数类型，type 关键字能用来给一个类型起一个新名字。
type Sum = (a: number, b: number) => number;
const sum3: Sum = sum2


/*
==========================================================
                                   默认返回类型
==========================================================
JavaScript 中，如果没有显式的 return 语句，那么这个函数的执行结果
实际会是 undefined，但在 TypeScript 中，默认的返回类型是 void。

在 TypeScript 中，undefined 也被视为一个有意义的类型。因此如果你希
望将返回值类型标注为 undefined，就需要有显式的 return 语句。

注意：在 5.1 版本中，TS 对这个不符直觉的问题进行了修正，即允许了 undefined
作为无显式 return 语句函数的返回值类型，但考虑到发布时间较晚，因此还
是有必要了解这个问题的。
*/
console.log("---------- 默认返回类型 ----------");

type CallbackA = (loadedUser: string) => void
type CallbackB = (loadedUser: string) => undefined;

function callback(loadedUser: string) {
    console.log(loadedUser);
}

const callback1: CallbackA = callback;


/*
==========================================================
                                   函数重载
==========================================================
在 JavaScript 中，如果一个函数可能存在多种入参组合，比如我们有一个 sum
 函数，它接受两个参数，基于参数类型的不同，它会执行不同的逻辑并返回不同的值：

    1. 入参均为数字类型时，相加这两个参数，如 sum(1, 2) 返回 3。
    2. 一个参数为数字类型数组，另一个参数为数字类型时，让数组参数中的
        每个数字加上数字参数，再返回这个数字，如 sum([1, 2, 3], 4) 和 sum(4, [1, 2, 3])
        返回 [5, 6, 7]。
    3. 如果两个参数是长度一致的数字类型数组时，依次相加每个数字，返回
        相加后的数组，如 sum([1, 2, 3], [4, 5, 6]) 返回 [5, 7, 9]。

JS 的实现如下：

            function sum(x, y) {
              if (typeof x === 'number' && typeof y === 'number') {
                return x + y;
              } else if (Array.isArray(x) && typeof y === 'number') {
                return x.map((num) => num + y);
              } else if (typeof x === 'number' && Array.isArray(y)) {
                return y.map((num) => num + x);
              } else if (Array.isArray(x) && Array.isArray(y)) {
                if (x.length !== y.length) {
                  throw new Error('Arrays must have the same length');
                }
                return x.map((num, index) => num + y[index]);
              } else {
                throw new Error('Invalid arguments');
              }
            }

这其实就是函数重载的概念，它指的就是根据不同的入参匹配不同的实际逻辑，
实现一个函数名走天下。理想很美好，现实就比较忧伤了。在 JavaScript 中，
此时为了尽可能描述清楚各个入参的作用，我们会这么写参数名：

            function sum(numberOrArray, numberOrArray) { }

这个时候对调用方就很懵逼了，不是，这些参数到底接受啥类型？排列组合是怎样的？
为了解决这个问题，TypeScript 支持了类型层面的重载，比如上面的例子可以这么写：
 */
console.log("---------- 函数重载 ----------");

function sum(base: number, increase: number): number;
function sum(baseArray: number[], increase: number): number[];
function sum(increase: number, baseArray: number[]): number[];
function sum(baseArray: number[], increaseArray: number[]): number[];

/*
需要注意的是，在标注了每一种可能的重载的方式以后，在最后那个实际实
现的函数类型标注里，我们需要标注各个参数类型和返回值类型，使用上面
所有重载可能出现的类型组成的联合类型。但实际上这最后一个函数类型标
注并不会被调用方看到，在匹配到对应的调用时，我们就能够获取到与参数
组合完全匹配的提示与类型保障：
 */
function sum(x: number | number[], y: number | number[]): (number | number[]) {
    return 1;
}

const result1 = sum(1, 2); // 3
const result2 = sum([1, 2, 3], 3)
const result3 = sum([1, 2, 3], [1, 2, 3])
console.log(result1, result2, result3);