/*
==========================================================
                    null 和 undefined
==========================================================


 1. null 与 undefined 都可以表示“没有”，含义非常相似。将一个变量赋值为 undefined 或 null，老实说，语法效果几乎没区别。
    在 if 语句中，它们都会被自动转为 false。

 2. 1995年 JavaScript 诞生时，最初像 Java 一样，只设置了 null 表示“无”。根据 C 语言的传统，null 可以自动转为 0。

            Number(null) // 0
            5 + null // 5

 3. JavaScript 的设计者 Brendan Eich，觉得这样做还不够。首先，第一版的 JavaScript 里面，null就像在 Java 里一样，
    被当成一个对象，Brendan Eich 觉得表示“无”的值最好不是对象。其次，那时的 JavaScript 不包括错误处理机制，Brendan
    Eich 觉得，如果null自动转为0，很不容易发现错误。因此，他又设计了一个 undefined。区别是这样的：null 是一个表示“空”
    的对象，转为数值时为 0；undefined 是一个表示“此处无定义”的原始值，转为数值时为 NaN。

        Number(undefined) // NaN
        5 + undefined // NaN
*/

// 调用函数时，应该提供的参数没有提供，该参数等于 undefined
function func(x) {
    console.log("func, x: ", x);
    return x;
}

func()

// 对象没有赋值的属性
const o = {};
console.log("o.a: ", o.a); // undefined

// 函数没有返回值时，默认返回 undefined
console.log("func1(): ", (function () {
})());

// null 表示空值，即该处的值现在为空。调用函数时，某个参数未设置任何值，这时就可以传入 null，表示该参数为空。
// 比如，某个函数接受引擎抛出的错误作为参数，如果运行过程中未出错，那么这个参数就会传入 null，表示未发生错误。
func(null);
console.log("null === null", null === null); // true
console.log("null === undefined", null === undefined); // false
