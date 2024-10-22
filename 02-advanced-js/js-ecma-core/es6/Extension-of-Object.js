/*
具体参考：

    - <https://es6.ruanyifeng.com/#docs/object-methods>

==========================================================
                                    Object 的新增方法
==========================================================

ES6 为 Object 对象新增了一些方法。分别是：

    - Object.is()
    - Object.assign()
    - Object.getOwnPropertyDescriptors()
    - Object.setPrototypeOf()
    - Object.getPrototypeOf()
    - Object.keys()
    - Object.values()
    - Object.entries()
    - Object.fromEntries()
    - Object.hasOwn()
*/
console.log("========== Object 的新增方法 ==========")
console.log("")

/*
==========================================================
                                    Object.is()
==========================================================
ES5 比较两个值是否相等，只有两个运算符：相等运算符（==）和严格相等运
算符（===）。它们都有缺点，前者会自动转换数据类型，后者的 NaN 不等于
自身，以及 +0 等于 -0。JavaScript 缺乏一种运算，在所有环境中，只要两个
值是一样的，它们就应该相等。

ES6 提出“Same-value equality”（同值相等）算法，用来解决这个问题。Object.is
就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较
运算符（===）的行为基本一致。不同之处只有两个：

            一是 +0 不等于 -0
            二是 NaN 等于自身。
 */
console.log("========== Object.is() ==========")
console.log("{} === {}: ", {} === {}); // false
console.log("0 === -0: ", 0 === -0); // true
console.log("0 === +0: ", 0 === +0); // true

console.log("Object.is(+0, -0): ", Object.is(+0, -0)); // false
console.log("Object.is(NaN, NaN): ", Object.is(NaN, NaN)); // true

// ES5 可以通过下面的代码，部署 Object.is。
Object.defineProperty(Object, 'es5Is', {
    value: function (x, y) {
        if (x === y) {
            // 针对 +0 不等于 -0 的情况
            return x !== 0 || 1 / x === 1 / y;
        }
        // 针对 NaN 的情况
        return x !== x && y !== y;
    },
    configurable: true,
    enumerable: false,
    writable: true
});
console.log("Object.es5Is(+0, -0): ", Object.es5Is(+0, -0)); // false
console.log("Object.es5Is(NaN, NaN): ", Object.es5Is(NaN, NaN)); // true
console.log("Object.es5Is({}}, {}}): ", Object.es5Is({}, {})); // false

/*
==========================================================
                                    Object.assign()
==========================================================
Object.assign() 方法用于对象的合并，将源对象（source）的所有可枚举属性，
复制到目标对象（target）。如果目标对象与源对象有同名属性，或多个源对
象有同名属性，则后面的属性会覆盖前面的属性。

Object.assign() 拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承
属性），也不拷贝不可枚举的属性（enumerable: false）。

        - 如果只有一个参数，Object.assign() 会直接返回该参数。
        - 如果该参数不是对象，则会先转成对象，然后返回。
        - 由于 undefined 和 null 无法转成对象，所以如果它们作为参数，就会报错。
        - 如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所
           不同。首先，这些参数都会转成对象，如果无法转成对象，就会跳过。这
           意味着，如果 undefined 和 null 不在首参数，就不会报错。
       - 其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但是，
           除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。因为
           只有字符串的包装对象，会产生可枚举的实义属性，那些属性则会被拷贝。
        - 属性名为 Symbol 值的属性，也会被 Object.assign() 拷贝。
 */
console.log("========== Object.assign() ==========")
const target1 = {a: 1};
const source1 = {b: 2};
const source2 = {c: 3};
const source3 = {[Symbol("3")]: 3};
Object.assign(target1, source1, source2, source3, 4, 5, "abc");
console.log("Object.assign(target1, source1, source2): ", target1); // { '0': 'a', '1': 'b', '2': 'c', a: 1, b: 2, c: 3, [Symbol(3)]: 3 }

// 只有字符串的包装对象，会产生可枚举属性。{0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}
console.log("Object('123')[0]: ", Object("123")[0]);