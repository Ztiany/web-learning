/*
==========================================================
                        number
==========================================================

1. JavaScript 内部，所有数字都是以 64 位浮点数形式储存，即使整数也是如此。所以，1 与 1.0 是相同的，是同一个数。
2. JavaScript 语言的底层根本没有整数，所有数字都是小数（64 位浮点数）。容易造成混淆的是，某些运算只有整数才能完成，
   此时 JavaScript 会自动把 64 位浮点数，转成 32 位整数，然后再进行运算。
3. 由于浮点数不是精确的值，所以涉及小数的比较和运算要特别小心。
*/
console.log("========== number ==========")
console.log("(0.3 - 0.2) === (0.2 - 0.1): ", (0.3 - 0.2) === (0.2 - 0.1)); // false
console.log("0.1 + 0.2: ", 0.1 + 0.2); // 0.30000000000000004

/*
==========================================================
                    number 的运算
==========================================================

Math 是 JavaScript 的原生对象，提供各种数学功能。该对象不是构造函数，不能生成实例，所有的属性和方法都必须在 Math 对象上调用。比如：

    - Math.abs()：求绝对值
    - Math.ceil()：向上取整
    - Math.floor()：向下取整
    - Math.round()：四舍五入
    - Math.max()：求最大值
    - Math.min()：求最小值
    - Math.pow()：求幂

Number 对象是原始数值的包装对象，可以作为构造函数使用，将任意类型的值转为数值。Number 中定义了一些数值相关的方法。比如：

    - Number.isNaN()：用来检查一个值是否为 NaN。
    - Number.isFinite()：用来检查一个值是否为有限的（finite），即不是 Infinity。
    - Number.parseInt()：用于将字符串转为整数。
    - Number.parseFloat()：用于将字符串转为浮点数。
    - Number.isInteger()：用来判断一个值是否为整数。
    - Number.isSafeInteger()：用来判断一个整数是否落在 JavaScript 的安全整数范围之内。
    - Number.MAX_VALUE 和 Number.MIN_VALUE：表示可以表示的最大和最小的数值。
*/
console.log("========== number 运算 ==========")
console.log("Math.abs(-1): ", Math.abs(-1)); // 1
console.log("Math.ceil(1.1): ", Math.ceil(1.1)); // 2
console.log("Number.Max_VALUE", Number.MAX_VALUE);
console.log("Number.MIN_VALUE", Number.MIN_VALUE);

// Math 不是构造函数，不能生成实例
try {
    Math()
} catch (e) {
    console.log("Math is not a constructor")
}

/*
==========================================================
                        NaN
==========================================================

NaN:

    1. NaN 是 JavaScript 的特殊值，表示“非数字”（Not a Number），主要出现在将字符串解析成数字出错的场合。

    2. NaN 不等于任何值，包括它本身。数组的 indexOf 方法内部使用的是严格相等运算符，所以该方法对 NaN 不成立。

        [NaN].indexOf(NaN) // -1

    3. NaN 不是独立的数据类型，而是一个特殊数值，它的数据类型依然属于 Number。

    4. NaN 在布尔运算时被当作 false。

    5. NaN 与任何数（包括它自己）的运算，得到的都是 NaN。

    6. ES6 引入指数运算符（**）后，出现了一个例外：NaN ** 0 = 1
*/

console.log("========== NaN ==========")
console.log("NaN === NaN: ", NaN === NaN); // false
console.log("isNaN(NaN): ", isNaN(NaN)); // true
console.log("isNaN(1): ", isNaN(1)); // false
console.log("0/0: ", 0 / 0); // NaN
console.log("NaN + 1: ", NaN + 1); // NaN
console.log("NaN ** 0: ", NaN ** 0); // 1

/*
==========================================================
                        Infinity
==========================================================

Infinity：

    1. Infinity 表示“无穷”，用来表示两种场景。
            一种是一个正的数值太大，或一个负的数值太小，无法表示；
            另一种是非 0 数值除以 0，得到 Infinity。
    2. Infinity 有正负之分，Infinity 表示正的无穷，-Infinity 表示负的无穷。

    3. 由于数值正向溢出（overflow）、负向溢出（underflow）和被 0 除，JavaScript 都不报错，所以单纯的数学运算几乎没有可能抛出错误。

    4. Infinity 大于一切数值（除了 NaN），-Infinity 小于一切数值（除了 NaN）。Infinity 与 NaN 比较，总是返回 false。

    5. 0 乘以 Infinity，返回 NaN；0 除以 Infinity，返回 0；Infinity 除以 0，返回 Infinity。

    6. Infinity 加上或乘以 Infinity，返回的还是 Infinity。Infinity 减去或除以 Infinity，得到 NaN。

    7. Infinity 与 null 计算时，null 会转成 0，等同于与 0 的计算。Infinity 与 undefined 计算，返回的都是 NaN。
*/

console.log("========== Infinity ==========")
console.log("1 / 0: ", 1 / 0); // Infinity
console.log("-1 / 0: ", -1 / 0); // -Infinity
console.log("1 / -0: ", 1 / -0); // -Infinity
console.log("-1 / -0: ", -1 / -0); // Infinity

console.log("0 * Infinity: ", 0 * Infinity); // NaN
console.log("0 / Infinity: ", 0 / Infinity); // 0
console.log("Infinity / 0: ", Infinity / 0); // Infinity

console.log("Infinity + Infinity: ", Infinity + Infinity); // Infinity
console.log("Infinity * Infinity: ", Infinity * Infinity); // Infinity
console.log("Infinity - Infinity: ", Infinity - Infinity); // NaN
console.log("Infinity / Infinity: ", Infinity / Infinity); // NaN
console.log("Infinity + : undefined", Infinity + undefined); // NaN


/*
==========================================================
                    parseInt 和 parseFloat
==========================================================

具体参考：

    1. <https://wangdoc.com/javascript/types/number#parseint>
    2. <https://wangdoc.com/javascript/types/number#parsefloat>
*/
console.log("========== parseInt 和 parseFloat ==========")
console.log("parseInt('')", parseInt('')); // NaN
console.log("parseInt(null)", parseInt(null)); // NaN
console.log("parseInt(undefined)", parseInt(undefined)); // NaN

console.log("parseFloat('')", parseFloat('')); // NaN
console.log("parseFloat(null)", parseFloat(null)); // NaN
console.log("parseFloat(undefined)", parseFloat(undefined)); // NaN

console.log("Number.parseInt === parseInt: ", Number.parseInt === parseInt) // true，顶层的 parseInt 函数和 Number.parseInt 是同一个函数。
console.log("Number.parseFloat === parseFloat: ", Number.parseFloat === parseFloat) // true，顶层的 parseFloat 函数和 Number.parseFloat 是同一个函数。

