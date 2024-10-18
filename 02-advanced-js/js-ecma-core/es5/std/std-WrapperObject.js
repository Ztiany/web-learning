/*
参考：

    - <https://wangdoc.com/javascript/stdlib/wrapper>

==========================================================
                    包装对象
==========================================================

对象是 JavaScript 语言最主要的数据类型，三种原始类型的值——数值、字符串、布尔值
——在一定条件下，也会自动转为对象，也就是原始类型的“包装对象”（wrapper）。

所谓“包装对象”，指的是与数值、字符串、布尔值分别相对应的 Number、String、Boolean
三个原生对象。这三个原生对象可以把原始类型的值变成（包装成）对象。
*/
console.log("========== 包装对象 ==========")

/*
下面基于原始类型的值，生成了三个对应的包装对象。可以看到，v1、v2、v3 都是对象，且与对应的简单类型值不相等。

包装对象的设计目的：

    1. 首先是使得“对象”这种类型可以覆盖 JavaScript 所有的值，整门语言有一个通用的数据模型；
    2. 其次是使得原始类型的值也有办法调用自己的方法。
 */
const v1 = new Number(123);
const v2 = new String('abc');
const v3 = new Boolean(true);

console.log(typeof v1); // "object"
console.log(typeof v2); // "object"
console.log(typeof v3); // "object"

console.log(v1 === 123); // false
console.log(v2 === 'abc'); // false
console.log(v3 === true); // false
console.log(v1 == 123); // true
console.log(v2 == 'abc'); // true
console.log(v3 == true); // true

/*
Number、String 和Boolean 这三个原生对象，如果不作为构造函数调用（即调用时不加 new），
而是作为普通函数调用，常常用于将任意类型的值转为数值、字符串和布尔值。
*/
const v4 = Number(123);
const v5 = String('abc');
const v6 = Boolean(true);
console.log(v4 === 123); // true
console.log(v5 === 'abc'); // true
console.log(v6 === true); // true

/*
==========================================================
                    包装对象实例方法
==========================================================

这里介绍两种它们共同具有、从 Object 对象继承的方法：valueOf() 和 toString()。

    - valueOf() 方法返回包装对象实例对应的原始类型的值。
    - toString() 方法返回对应的字符串形式。
*/
console.log("========== 包装对象实例方法 ==========")
console.log(v1.valueOf()); // 123
console.log(v1.toString()); // "123"
console.log(v1.valueOf() === 123); // true

/*
==========================================================
                原始类型与实例对象的自动转换
==========================================================

某些场合，原始类型的值会自动当作包装对象调用，即调用包装对象的属性和方法。这时，
JavaScript 引擎会自动将原始类型的值转为包装对象实例，并在使用后立刻销毁实例。

比如，字符串可以调用 length 属性，返回字符串的长度。

    'abc'.length // 3

这里 abc 是一个字符串，本身不是对象，不能调用 length 属性。JavaScript 引擎
自动将其转为包装对象，在这个对象上调用 length 属性。调用结束后，这个临时对象就
会被销毁。这就叫原始类型与实例对象的自动转换。
*/

console.log("========== 包装对象实例方法 ==========")
var s = 'Hello World';
// 为字符串 s 添加了一个 x 属性，结果无效，总是返回 undefined。
s.x = 123;
console.log(s.x); // undefined

/*
==========================================================
                        自定义方法
==========================================================
除了原生的实例方法，包装对象还可以自定义方法和属性，供原始类型的值直接调用。

比如，我们可以新增一个 double 方法，使得字符串和数字翻倍。
*/
console.log("========== 自定义方法 ==========")

String.prototype.double = function () {
    return this.valueOf() + this.valueOf();
};

Number.prototype.double = function () {
    return this.valueOf() + this.valueOf();
};

console.log('abc'.double())
// 123 外面必须要加上圆括号，否则后面的点运算符（.）会被解释成小数点。
console.log((123).double())
