/*
具体参考：

    - <https://wangdoc.com/javascript/stdlib/object>

==========================================================
                    Object 对象
==========================================================

JavaScript 的所有其他对象都继承自 Object 对象，即那些对象都是 Object 的实例。

Object对象的原生方法分成两类：

    - Object 本身的方法：直接定义在 Object 对象的方法。比如

        Object.print = function (o) { console.log(o) };

    - Object 的实例方法：定义在 Object 原型对象 Object.prototype 上的方法。它可以被 Object 实例直接使用。比如

        Object.prototype.print = function () {
          console.log(this);
        };
        var obj = new Object();
        obj.print() // Object
*/
console.log("========== Object 对象 ==========")
console.log("Object: ", Object) // [Function: Object]
console.log("new Object(): ", new Object()) // {}，等价于字面量 {}

/*
==========================================================
                                        Object 函数
==========================================================

Object 本身是一个函数，可以当作工具方法使用，将任意值转为对象。这个方法常用于
保证某个值一定是对象。

    1. 如果参数为空（或者为 undefined 和 null），Object() 返回一个空对象。
    2. 如果参数是原始类型的值，Object 方法将其转为对应的包装对象的实例。
    3. 如果 Object 方法的参数是一个对象，它总是返回该对象，即不用转换。
*/
console.log("========== Object 函数 ==========")

/* 如果 Object 方法的参数是一个对象，它总是返回该对象，即不用转换。利用这一点，可以写一个判断变量是否为对象的函数。*/
function isObject(value) {
    return value === Object(value);
}

console.log("isObject({}): ", isObject({})) // true
console.log("isObject([]): ", isObject([])) // true
console.log("isObject(1): ", isObject(1)) // false
console.log("isObject(new Date()): ", isObject(new Date())) // true


/*
==========================================================
                    Object 构造函数
==========================================================

Object 不仅可以当作工具函数使用，还可以当作构造函数使用，即前面可以使用 new 命令。

    1. Object 构造函数的首要用途，是直接通过它来生成新对象。通过 `var obj = new Object()`
       的写法生成新对象，与字面量的写法 `var obj = {}` 是等价的。
    2. Object 构造函数的用法与 Object 方法很相似，几乎一模一样。但是 Object(value) 与
       new Object(value) 两者的语义是不同的，Object(value) 表示将 value 转成一个对象，
       new Object(value) 则表示新生成一个对象，它的值是 value。

*/
console.log("========== Object 构造函数 ==========")
console.log("new Object(): ", new Object()) // {}，等价于字面量 {}
console.log("new Object(1): ", new Object(1)) // Number {1}
console.log("new Object(null): ", new Object(null)) // Object {}

/*
==========================================================
                Object 的静态方法
==========================================================

所谓“静态方法”，是指部署在 Object 对象自身的方法。

    - Object.keys()：返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历属性的键名。
    - Object.getOwnPropertyNames()：返回一个数组，成员是参数对象自身的所有属性的键名，不管属性是否可遍历。

除此之外还有：

    （1）对象属性模型的相关方法

        Object.getOwnPropertyDescriptor()：获取某个属性的描述对象。
        Object.defineProperty()：通过描述对象，定义某个属性。
        Object.defineProperties()：通过描述对象，定义多个属性。

    （2）控制对象状态的方法

        Object.preventExtensions()：防止对象扩展。
        Object.isExtensible()：判断对象是否可扩展。
        Object.seal()：禁止对象配置。
        Object.isSealed()：判断一个对象是否可配置。
        Object.freeze()：冻结一个对象。
        Object.isFrozen()：判断一个对象是否被冻结。

    （3）原型链相关方法

        Object.create()：该方法可以指定原型对象和属性，返回一个新的对象。
        Object.getPrototypeOf()：获取对象的 Prototype 对象。

*/
console.log("========== Object 对象的静态方法 ==========")

function printMethodsOfObject() {
    console.log("Methods of Object:");
    Object.getOwnPropertyNames(Object).forEach(function (method) {
        if (Object[method] instanceof Function && Object.hasOwnProperty(method)) {
            console.log("   ", method);
        }
    });
}

printMethodsOfObject();

const object1 = {
    p1: 123,
    p2: 456
};
Object.defineProperty(object1, 'p3', {
    value: 789,
    enumerable: false
});
console.log("Object.keys(object1): ", Object.keys(object1)) // [ 'p1', 'p2' ]
console.log("Object.getOwnPropertyNames(object1): ", Object.getOwnPropertyNames(object1)) // [ 'p1', 'p2' ]


/*
==========================================================
                Object 的实例方法
==========================================================

除了静态方法，还有不少方法定义在 Object.prototype 对象。它们称为实例方法，
所有 Object 的实例对象都继承了这些方法。

Object 实例对象的方法，主要有以下六个。

    - Object.prototype.valueOf()：返回当前对象对应的值。

    - Object.prototype.toString()：返回当前对象对应的字符串形式。

    - Object.prototype.toLocaleString()：返回当前对象对应的本地字符串形式。
      这个方法的主要作用是留出一个接口，让各种不同的对象实现自己版本的 toLocaleString，
      用来返回针对某些地域的特定的值。目前，主要有三个对象自定义了 toLocaleString 方法。

            Array.prototype.toLocaleString()
            Number.prototype.toLocaleString()
            Date.prototype.toLocaleString()

    - Object.prototype.hasOwnProperty()：判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性。

    - Object.prototype.isPrototypeOf()：判断当前对象是否为另一个对象的原型。

    - Object.prototype.propertyIsEnumerable()：判断某个属性是否可枚举。

*/
console.log("========== Object 对象的实例方法 ==========")

function printMethodsOfObjectPrototype() {
    console.log("Methods of Object.prototype:");
    Object.getOwnPropertyNames(Object.prototype).forEach(function (method) {
        if (Object[method] instanceof Function && Object.prototype.hasOwnProperty(method)) {
            console.log("   ", method);
        }
    });
}

printMethodsOfObjectPrototype();

/*
valueOf 方法的作用是返回一个对象的“值”，默认情况下返回对象本身。
valueOf 方法的主要用途是，JavaScript 自动类型转换时会默认调用这个方法。
*/
let object2 = {}
let object3 = {
    valueOf() {
        return 222;
    }
}
console.log("object2.valueOf(): ", object2.valueOf()) // {}
console.log("object3.valueOf(): ", object3.valueOf()) // 222
console.log("object2 + 1: ", object2 + 1) // [object Object]1
console.log("object3 + 1: ", object3 + 1) // 223

/*
toString 方法的作用是返回一个对象的字符串形式，默认情况下返回类型字符串。
字符串 [object Object] 本身没有太大的用处，但是通过自定义 toString
方法，可以让对象在自动类型转换时，得到想要的字符串形式。

以下对象都分别部署了自定义的 toString 方法，覆盖了 Object.prototype.toString 方法。

    数组
    字符串
    函数
    Date
*/
let object4 = {}
let object5 = {
    toString() {
        return "I am object5";
    }
}
console.log("object4.toString(): ", object4.toString()) // [object Object]
console.log("object5.toString(): ", object5.toString()) // I am object5
console.log("(new Date()).toString()", (new Date()).toString())

/**
 * `Object.prototype.toString` 方法返回对象的类型字符串，因此可以用来判断一个值的类型。
 *
 * 不同数据类型的 `Object.prototype.toString` 方法返回值如下。
 *
 * - 数值：返回 [object Number]。
 * - 字符串：返回 [object String]。
 * - 布尔值：返回 [object Boolean]。
 * - undefined：返回 [object Undefined]。
 * - null：返回 [object Null]。
 * - 数组：返回 [object Array]。
 * - arguments 对象：返回 [object Arguments]。
 * - 函数：返回 [object Function]。
 * - Error 对象：返回 [object Error]。
 * - Date 对象：返回 [object Date]。
 * - RegExp 对象：返回 [object RegExp]。
 * - 其他对象：返回 [object Object]。
 *
 * 利用这个特性，可以写出一个比 typeof 运算符更准确的类型判断函数。
 */
function type(o) {
    /*
    由于实例对象可能会自定义 toString 方法，覆盖掉 Object.prototype.toString 方法，
    所以为了得到类型字符串，最好直接使用 Object.prototype.toString 方法。通过函数的
    call 方法，可以在任意值上调用这个方法，帮助我们判断这个值的类型。
     */
    const s = Object.prototype.toString.call(o);
    return s.match(/\[object (.*?)\]/)[1].toLowerCase();
}

console.log(type({})); // "object"
console.log(type([])); // "array"
console.log(type(5)); // "number"
console.log(type(null)); // "null"
console.log(type()); // "undefined"
console.log(type(/abcd/)); // "regex"

[
    'Null',
    'Undefined',
    'Object',
    'Array',
    'String',
    'Number',
    'Boolean',
    'Function',
    'RegExp'
].forEach(function (t) {
    type['is' + t] = function (o) {
        return type(o) === t.toLowerCase();
    };
});

console.log(type(new Date())); // "date"
console.log(type.isObject({})); // true
console.log(type.isNumber(NaN)); // true
console.log(type.isRegExp(/abc/)); // true

// Object.prototype.hasOwnProperty()：判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性。
let object6 = {
    p1: 123
};
console.log("object6 has property p1: ", object6.hasOwnProperty('p1')) // true
console.log("object6 has property toString: ", object6.hasOwnProperty('toString')) // false
