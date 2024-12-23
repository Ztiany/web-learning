/*
==========================================================
                        变量的类型
==========================================================

JS 中有以下数据类型：

    - 数值（number）：整数和小数（比如1和3.14）。
    - 字符串（string）：文本（比如Hello World）。
    - 布尔值（boolean）：表示真伪的两个特殊值，即true（真）和false（假）。
    - undefined：表示“未定义”或不存在，即由于目前没有定义，所以此处暂时没有任何值。
    - null：表示空值，即此处的值为空。
    - 对象（object）：各种值组成的集合。

其中：

    - 数值、字符串、布尔值这三种类型，合称为原始类型（primitive type）的值，即它们是最基本的数据类型，不能再细分了。
    - 对象则称为合成类型（complex type）的值，因为一个对象往往是多个原始类型的值的合成，可以看作是一个存放各种值的容器。
    - undefined 和 null，一般将它们看成两个特殊值。

对象是最复杂的数据类型，又可以分成三个子类型。

    - 狭义的对象（object）
    - 数组（array）
    - 函数（function）

除此之外，ES6 又新增了 Symbol 和 BigInt 数据类型。

----------------------------------------------------------
                    扩展：JavaScript 的动态类型

需要注意的是 JavaScript 的变量是动态类型的。动态类型其实换个说法就是无类型：
变量本身并没有指定的类型(你想指定也指定不了，语言层面不提供这样的功能)，每个
变量的类型取决于它指向一个什么类型的对象，所以变量的类型是动态变化的。

这就是 JavaScript 的动态类型特性：变量的类型不是在编译时就明确指定的，而是在运行
时由它指向的对象来动态确定。非常灵活、非常方便。

JavaScript 的动态类型带来了灵活性，但是面对复杂的代码，也带来了不少麻烦。比如，你
可能会遇到变量的类型不是你期望的类型，导致运行时错误。不过 JavaScript 有它的历史
背景。当年 JavaScript 的推出，只是为了方便在网页上执行一下脚本，本来复杂性就不高；
另外当年 JavaScript 是给写 HTML的工程师用的，这些工程师很多并不具备很好的编程基础，
所以把 JavaScript 设计得规则少一些、不要老是这个不允许、那个报错的，也更容易被网页
开发者所接纳。于是，JavaScript 就是动态类型的了。

动态类型好处是，灵活又方便；但就是，它的安全性需要依赖程序员的大脑来维护，而不是语言自身
的检查机制。所以，JavaScript 很难写大项目。但随着前端的发展，比如 Node.js, React,
Vue 等框架的出现，让JavaScript 具备了写大项目的能力。但是同时，它的动态类型特性也让开
发者非常头疼，于是 TypeScript 诞生了，它是 JavaScript 的超集，提供了类型检查机制，让
JavaScript 也可以写大项目了。
*/
console.log("========== 变量的类型 ==========")
console.log("打印 number：", 1)
console.log("打印 string：", "Hello World")
console.log("打印 boolean：", true)
console.log("打印 undefined：", undefined)
console.log("打印 null：", null)
console.log("打印 object：", {name: "ygy"})
console.log("打印 array：", [1, 2, 3])
console.log("打印 function：", function () {
})

/*
==========================================================
                        获取变量的类型
==========================================================
JavaScript 有三种方法，可以确定一个值到底是什么类型。

    - typeof 运算符
    - instanceof运算符
    - Object.prototype.toString 方法

typeof 运算符可以返回一个值的数据类型。
*/
console.log("========== 获取变量的类型 ==========")
console.log("type 1:", typeof 1) // number
console.log("type '1':", typeof '1') // string
console.log("type true:", typeof true) // boolean
console.log("type {}: ", typeof {}) // object
console.log("type []: ", typeof []) // object，在 JavaScript 内部，数组本质上只是一种特殊的对象。使用 instanceof 运算符可以区分数组和对象。
console.log("type function: ", typeof (function () {
})) // function

// object，null 的类型是 object，这是由于历史原因造成的。1995 年的 JavaScript 语言第一版，
// 只设计了五种数据类型（对象、整数、浮点数、字符串和布尔值），没考虑 null，只把它当作 object
// 的一种特殊值。后来 null 独立出来，作为一种单独的数据类型，为了兼容以前的代码，typeof null
// 返回 object 就没法改变了。
console.log("type null:", typeof null)
console.log("null:", null)
// undefined
console.log("type  undefined:", undefined)
console.log("undefined:", typeof undefined)

// 对于未定义过的变量，直接使用会抛出异常
try {
    if (v) {
        console.log("v is defined")
    }
} catch (e) {
    console.log("对于未定义过的变量，直接使用会抛出异常")
}
// 对于未定义过的变量，放在 typeof 后面，就不报错了，而是返回 undefined。
// 所以，推荐使用 typeof 来判断变量是否定义过。
if (typeof v == 'undefined') {
    console.log("v is not defined")
}
