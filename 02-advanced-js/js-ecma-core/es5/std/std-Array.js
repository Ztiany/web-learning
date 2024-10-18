/*
参考：

    - <https://wangdoc.com/javascript/stdlib/array>

==========================================================
                    Array 构造函数
==========================================================

Array 是 JavaScript 的原生对象，同时也是一个构造函数，可以用它生成新的数组。
*/

console.log("========== Array 构造函数 ==========")

// 加不加 new 的运行结果是一样的。但是考虑到语义，还是建议加上 new。
const arr1 = new Array(2);
const arr2 = Array(2);
console.log("arr1:", arr1); // [ <2 empty items> ]
console.log("arr2:", arr2); // [ <2 empty items> ]
console.log("arr2[0]:", arr2[0]); // undefined

// Array() 构造函数有一个很大的缺陷，不同的参数个数会导致不一致的行为。

// 无参数时，返回一个空数组
console.log(new Array()); // []

// 单个正整数参数，表示返回的新数组的长度
console.log(new Array(1)); // [ empty ]
console.log(new Array(2)); // [ empty x 2 ]

// 非正整数的数值作为参数，会报错
try {
    new Array(3.2) // RangeError: Invalid array length
} catch (e) {
    console.log("new Array(3.2) error:", e.message);
}

// 非正整数的数值作为参数，会报错
try {
    new Array(-3) // RangeError: Invalid array length
} catch (e) {
    console.log("new Array(-3) error:", e.message);
}

// 单个非数值（比如字符串、布尔值、对象等）作为参数，
// 则该参数是返回的新数组的成员
console.log(new Array('abc')); // ['abc']
console.log(new Array([1])); // [Array[1]]

// 多参数时，所有参数都是返回的新数组的成员
console.log(new Array(1, 2)); // [1, 2]
console.log(new Array('a', 'b', 'c')); // ['a', 'b', 'c']

// Array() 作为构造函数，行为很不一致。因此，不建议使用它生成新数组，直接使用数组字面量是更好的做法。
const arr3 = [1, 2];
console.log("arr3:", arr3); // [1, 2]

// 如果参数是一个正整数，返回数组的成员都是空位。虽然读取的时候返回 undefined，但实际上该位置没有任何值。
// 虽然这时可以读取到 length 属性，但是取不到键名。
const arr4 = new Array(3);
console.log("arr4:", arr4); // [ <3 empty items> ]
console.log("arr4[0]:", arr4[0]); // undefined
console.log("0 in arr4:", 0 in arr4); // false，但是取不到键名，所以 in 运算符返回 false。

/*

==========================================================
                    Array 静态方法
==========================================================

Array.isArray 方法返回一个布尔值，表示参数是否为数组。它可以弥补 typeof 运算符的不足。
*/
console.log("========== Array 静态方法 ==========")
console.log("Array.isArray([]):", Array.isArray([])); // true

/*

==========================================================
                    Array 实例方法
==========================================================

Array 有如下实例方法：

    valueOf()：valueOf 方法是一个所有对象都拥有的方法，表示对该对象求值。不同对象的 valueOf 方法不尽一致，数组的 valueOf 方法返回数组本身。

    toString()：toString 方法也是对象的通用方法，数组的 toString 方法返回数组的字符串形式。

    push()：
        push 方法用于在数组的末端添加一个或多个元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组。
        push 方法可以接受多个参数，这些参数都会添加到目标数组的尾部。

    pop()：
        pop 方法用于删除数组的最后一个元素，并返回该元素。注意，该方法会改变原数组。
        对空数组使用 pop 方法，不会报错，而是返回 undefined。

    shift()：shift 方法用于删除数组的第一个元素，并返回该元素。注意，该方法会改变原数组。

    unshift()：
        unshift 方法用于在数组的第一个位置添加元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组。
        unshift 方法可以接受多个参数，这些参数都会添加到目标数组头部。

    join()：
        join 方法以指定参数作为分隔符，将所有数组成员连接为一个字符串返回。如果不提供参数，默认用逗号分隔。
        通过 call 方法，这个方法也可以用于字符串或类似数组的对象。

    concat()：
        concat 方法用于多个数组的合并。它将新数组的成员，添加到原数组成员的后部，然后返回一个新数组，原数组不变。
        除了数组作为参数，concat 也接受其他类型的值作为参数，添加到目标数组尾部。
        如果数组成员包括对象，concat 方法返回当前数组的一个浅拷贝。所谓“浅拷贝”，指的是新数组拷贝的是对象的引用。

    reverse()：reverse 方法用于颠倒排列数组元素，返回改变后的数组。注意，该方法将改变原数组。

    slice()：
        slice 方法用于提取目标数组的一部分，返回一个新数组，原数组不变。
        如果 slice 没有参数，实际上等于返回一个原数组的拷贝。
        如果 slice 方法的参数是负数，则表示倒数计算的位置。
        slice 方法的一个重要应用，是将类似数组的对象转为真正的数组。
            `Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 })` 得到 ['a', 'b']

    splice()：splice 方法用于删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素。注意，该方法会改变原数组。

    sort()：sort 方法对数组成员进行排序，默认是按照字典顺序排序。排序后，原数组将被改变。

    map：map 方法将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新数组返回。

    forEach：forEach 方法与 map 方法很相似，也是对数组的所有成员依次执行参数函数。但是，
            forEach 方法不返回值，只用来操作数据。这就是说，如果数组遍历的目的是为了得到
            返回值，那么使用 map 方法，否则使用 forEach 方法。

    filter()：filter 方法用于过滤数组成员，满足条件的成员组成一个新数组返回。

    some()，every()：这两个方法类似“断言”（assert），返回一个布尔值，表示判断数组成员是否符合某种条件。

    reduce()，reduceRight()：reduce 方法和 reduceRight 方法依次处理数组的每个成员，最终累计为一个值。
             它们的差别是，reduce 是从左到右处理（从第一个成员到最后一个成员），reduceRight 则是从右到左
             （从最后一个成员到第一个成员），其他完全一样。

    indexOf()，lastIndexOf()：indexOf 方法返回给定元素在数组中第一次出现的位置，如果没有出现则返回 -1。

*/
console.log("========== Array 实例方法 ==========")
console.log("Array.prototype:", Object.getOwnPropertyNames(Array.prototype))
Object.getOwnPropertyNames(Array.prototype).forEach(function (name) {
    if (Array.prototype[name] instanceof Function) {
        console.log("   ", name)
    }
})
