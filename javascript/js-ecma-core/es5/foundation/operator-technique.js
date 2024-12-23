/*
==========================================================
                    运算符小技巧
==========================================================
*/
console.log("========== 运算符小技巧 ==========")



/*
void 运算符对任何值返回 undefined。那为什么不直接使用 undefined 呢？
因为 undefined 不是保留字，在低版本浏览器或者局部作用域中是可以被当作变量赋值的，
这样就会导致我们拿不到正确的 undefined 值，在很多压缩工具中都是将 undefined 用 void 0 来代替掉了。
*/
console.log("========== void ==========")
console.log("void 0: ", void 0) // undefined



/* 利用 `+` 触发隐式类型转换的规则，我们可以用 `+` 将字符串转换为数字。*/
console.log("========== + ==========")
console.log("+\"123\": ", +"123", typeof +"123") // 123 number



/*
`>` 和 `<` 常用于比较两个数字大小，但在对字符串进行大小比较的时候，一般会依次比较两者每个字符 ASCII 码。
利用这一特性，我们可以巧妙地来比较一些日期的大小，这样就不需要再将日期拆开分别比较。
*/
console.log("========== > < ==========")
console.log("2020-01-01 > 2020-01-02: ", "2020-01-01" > "2020-01-02") // false



/*
在 ES7 中，将扩展运算符引入到了对象中。

    1. 扩展运算符可以用来进行浅拷贝。
    2. 扩展运算符也可以用于函数参数，尤其是对于不能使用 arguments 的箭头函数。
*/
console.log("========== ... ==========")
let va = {name: "ygy", age: 20};
let vb = {...va};
console.log("va === vb: ", va === vb) // false
console.log("va is vb: ", Object.is(va, vb)) // false，is 方法是严格相等
console.log("va equals vb: ", JSON.stringify(va) === JSON.stringify(vb)) // true
console.log("va: ", va)
console.log("vb: ", vb)

const funcA = (...rest) => {
    console.log("rest[1]: ", rest[1]);
};

funcA(1, 2, 3);



/* `&&` 短路运算符在一定程度上可以代替 if 语句，这在 React 中非常常用。*/
console.log("========== && ==========")

function funcB(callback) {
    // old
    if (callback) callback();
    // new
    callback && callback();
}

funcB(() => {
    console.log("funcB callback");
});

/* `&&` 短路运算符也经常用于深层取值。*/
const objA = {
    info: {
        name: "ygy",
    },
};
console.log("objA.info.name: ", objA.info && objA.info.name);



/* `||` 常被用于给变量赋默认值。*/
console.log("========== || ==========")

function funcC(name) {
    // 如果 name 是空值，那么 b 就是 1
    name = name || "ygy";
    console.log("name: ", name);
}

funcC(undefined);



/*
在 JavaScript 中，`!!` 是一种常见的操作符，通常用于将一个值转换为对应的布尔值。它的作用是将一个表达式或值强制转换为布尔类型，并返回相应的布尔值。

具体来说，`!!` 操作符的作用如下：

    1. 强制转换为布尔值：使用 `!!` 操作符可以将任何值转换为对应的布尔值。如果值是真值（truthy），则返回 `true`；如果值是假值（falsy），则返回 `false`。
    2. 规范化布尔值：`!!` 操作符可以用于规范化布尔值，确保一个值始终以明确的布尔形式表示。无论输入是真值还是假值，`!!` 操作符都会返回严格的布尔值。
*/
console.log("========== !! ==========")
console.log(!!true); // 输出: true
console.log(!!false); // 输出: false
console.log(!!0); // 输出: false
console.log(!!1); // 输出: true
console.log(!!''); // 输出: false
console.log(!!'hello'); // 输出: true
console.log(!!null); // 输出: false
console.log(!!undefined); // 输出: false
console.log(!!NaN); // 输出: false



/* 利用 `!` 可以将变量转换为布尔类型，但是最好使用 `!!` 来进行转换，这样对类型比较友好。*/
console.log("========== ! ==========")
console.log("!0: ", !0) // true
console.log("!!0: ", !!0) // false



/* `|` 可以用来对数值进行向下取整。*/
console.log("========== | ==========")
console.log("1.1 | 0: ", 1.1 | 0) // 1



/* 利用 1 和其他数字进行 & 操作后得到 1 或 0 来判断这个数字是奇偶。*/
console.log("========== & ==========")
console.log("1 & 1: ", 1 & 1) // 1，奇数
console.log("2 & 1: ", 2 & 1) // 0，偶数



/* `~~` 实现向下取整：可以使用双位操作符来替代 Math.floor()，和 | 的用法基本上保持一致。*/
console.log("========== ~~ ==========")
console.log("~~1.1: ", ~~1.1) // 1



/* 逗号运算符用于对两个表达式求值，并返回后一个表达式的值。*/
console.log("========== , ==========")
console.log(" ('a', 'b'): ", ('a', 'b'))
// 逗号运算符的一个用途是，在返回一个值之前，进行一些辅助操作。
const value1 = (console.log('Hi!'), true);
console.log("value1: ", value1)
