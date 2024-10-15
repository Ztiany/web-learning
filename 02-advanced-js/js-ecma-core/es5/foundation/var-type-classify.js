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
console.log("type undefined:", typeof undefined) // undefined
console.log("type null:", typeof null) // object
console.log("type {}: ", typeof {}) // object
console.log("type []: ", typeof []) // object，在 JavaScript 内部，数组本质上只是一种特殊的对象。使用 instanceof 运算符可以区分数组和对象。
console.log("type function: ", typeof (function () {
})) // function

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
