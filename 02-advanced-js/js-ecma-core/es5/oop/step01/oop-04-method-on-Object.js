/*
参考：

    - <https://wangdoc.com/javascript/oop/object>

JavaScript 在 Object 对象上面，提供了很多相关方法，处理面向对象编程的相关操作。
 */

/*
==========================================================
                                Object.getPrototypeOf()
==========================================================

Object.getPrototypeOf 方法返回参数对象的原型。这是获取原型对象的标准方法。
*/
console.log("========== Object.getPrototypeOf() ==========");
console.log("Object.getPrototypeOf({}): ", Object.getPrototypeOf({})); // [Object: null prototype] {}
console.log("Object.getPrototypeOf({} === Object.prototype): ", Object.getPrototypeOf({}) === Object.prototype); // true

/*
==========================================================
                                Object.setPrototypeOf()
==========================================================

Object.setPrototypeOf 方法为参数对象设置原型，返回该参数对象。它接
受两个参数，第一个是现有对象，第二个是原型对象。

new 命令可以使用 Object.setPrototypeOf 方法模拟。
*/
console.log("========== Object.setPrototypeOf() ==========");

const FA = function () {
    this.foo = 'bar';
};
const fa = new FA();
// 等同于
const fb = Object.setPrototypeOf({}, FA.prototype);
console.log("fb.constructor === FA: ", fb.constructor === FA); // true
FA.call(fb);
console.log("fb instanceof FA: ", fb instanceof FA); // true

/*
==========================================================
                                Object.create()
==========================================================

生成实例对象的常用方法是，使用 new 命令让构造函数返回一个实例。
但是很多时候，只能拿到一个实例对象，它可能根本不是由构建函数
生成的，那么能不能从一个实例对象，生成另一个实例对象呢？

JavaScript 提供了Object.create() 方法，用来满足这种需求。该方法接受
一个对象作为参数，然后以它为原型，返回一个实例对象。该实例完全继承
原型对象的属性。
*/

console.log("========== Object.create() ==========");
// 原型对象
const A = {
    print: function () {
        console.log('hello');
    }
};

// 实例对象
const B = Object.create(A);
console.log("Object.getPrototypeOf(B) === A: ", Object.getPrototypeOf(B) === A); // true
console.log("B.constructor === Object: ", B.constructor === Object); // true
B.print(); // hello
console.log("B.print === A.print: ", B.print === A.print); // true

// 实际上，Object.create() 方法可以用下面的代码代替。Object.create()
// 方法的实质是新建一个空的构造函数 F，然后让 F.prototype 属性指向参
// 数对象 obj，最后返回一个 F 的实例，从而实现让该实例继承 obj 的属性。
function initCreate(proto) {
    if (typeof Object.create !== 'function') {
        Object.create = function (obj) {
            function F() {
            }

            F.prototype = obj;
            return new F();
        };
    }
}

Object.createSimulate = function (obj) {
    function F() {
    }

    F.prototype = obj;
    return new F();
};
const C = Object.createSimulate(A);
console.log("Object.getPrototypeOf(C) === A: ", Object.getPrototypeOf(C) === A); // true
console.log("C.constructor === Object: ", C.constructor === Object); // true，C 的构造函数读取的是其原型对象的构造函数
B.print(); // hello
console.log("C.print === A.print: ", C.print === A.print); // true

/*
下面三种方式生成的新对象是等价的。

        var obj1 = Object.create({});
        var obj2 = Object.create(Object.prototype);
        var obj3 = new Object();

如果想要生成一个不继承任何属性（比如没有 toString() 和 valueOf() 方法）
的对象，可以将 Object.create() 的参数设为 null。

                    var obj = Object.create(null);

使用 Object.create() 方法的时候，必须提供对象原型，即参数不能为空，
或者不是对象，否则会报错。

Object.create() 方法生成的新对象，动态继承了原型。在原型上添加或修
改任何方法，会立刻反映在新对象之上。

除了对象的原型，Object.create() 方法还可以接受第二个参数。该参数是一
个属性描述对象，它所描述的对象属性，会添加到实例对象，作为该对象自身
的属性。
 */
const obj1 = Object.create({}, {
    p1: {
        value: 123,
        enumerable: true,
        configurable: true,
        writable: true,
    },
    p2: {
        value: 'abc',
        enumerable: true,
        configurable: true,
        writable: true,
    }
});

// 等同于
const obj2 = Object.create({});
obj2.p1 = 123;
obj2.p2 = 'abc';

// Object.create() 方法生成的对象，继承了它的原型对象的构造函数。
function D() {
}

const d1 = new D();
const d2 = Object.create(d1);
console.log("d1.constructor === D: ", d1.constructor === D); // true
console.log("d2.constructor === D: ", d2.constructor === D); // true

/*
==========================================================
                        Object.prototype.isPrototypeOf()
==========================================================

实例对象的 isPrototypeOf 方法，用来判断该对象是否为参数对象的原型。

        var o1 = {};
        var o2 = Object.create(o1);
        var o3 = Object.create(o2);

        o2.isPrototypeOf(o3) // true
        o1.isPrototypeOf(o3) // true

        Object.prototype.isPrototypeOf({}) // true
        Object.prototype.isPrototypeOf([]) // true
        Object.prototype.isPrototypeOf(/xyz/) // true
        Object.prototype.isPrototypeOf(Object.create(null)) // false
 */
console.log("========== Object.prototype.isPrototypeOf() ==========");
console.log("");

/*
==========================================================
                        Object.prototype.__proto__
==========================================================
实例对象的 __proto__ 属性（前后各两个下划线），返回该对象的原型。
该属性可读写。

根据语言标准，__proto__属性只有浏览器才需要部署，其他环境可以没
有这个属性。它前后的两根下划线，表明它本质是一个内部属性，不应该
对使用者暴露。因此，应该尽量少用这个属性，而是用 Object.getPrototypeOf()
和 Object.setPrototypeOf()，进行原型对象的读写操作。
 */
console.log("========== Object.prototype.__proto__ ==========");
console.log("");

/*
==========================================================
                        获取原型对象方法的比较
==========================================================

获取实例对象obj的原型对象，有三种方法：

    obj.__proto__
    obj.constructor.prototype
    Object.getPrototypeOf(obj)

上面三种方法之中，前两种都不是很可靠。__proto__ 属性只有浏览器才
需要部署，其他环境可以不部署。而 obj.constructor.prototype 在手动改
变原型对象时，可能会失效。

推荐使用第三种 Object.getPrototypeOf 方法，获取原型对象。
*/
console.log("========== 获取原型对象方法的比较 ==========");
console.log("");

/*
==========================================================
                        Object.getOwnPropertyNames()
==========================================================
Object.getOwnPropertyNames 方法返回一个数组，成员是参数对
象本身的所有属性的键名，不包含继承的属性键名。

对象本身的属性之中，有的是可以遍历的（enumerable），有的是
不可以遍历的。Object.getOwnPropertyNames 方法返回所有键名，
不管是否可以遍历。只获取那些可以遍历的属性，使用 Object.keys
方法。
*/
console.log("========== Object.getOwnPropertyNames() ==========");
console.log("");


/*
==========================================================
                   Object.prototype.hasOwnProperty()
==========================================================
对象实例的 hasOwnProperty 方法返回一个布尔值，用于判断某个
属性定义在对象自身，还是定义在原型链上。
 */
console.log("========== Object.prototype.hasOwnProperty() ==========");
console.log("");

/*
==========================================================
                        in 运算符和 for...in 循环
==========================================================
in 运算符返回一个布尔值，表示一个对象是否具有某个属性。它不区分该属性
是对象自身的属性，还是继承的属性。为了在 for...in 循环中获得对象自身的
属性，可以采用 hasOwnProperty 方法判断一下。
 */
console.log("========== in 运算符和 for...in 循环 ==========");

// 获得对象的所有属性（不管是自身的还是继承的，也不管是否可枚举），可以使用下面的函数。
function inheritedPropertyNames(obj) {
    const props = {};
    while (obj) {
        Object.getOwnPropertyNames(obj).forEach(function (p) {
            props[p] = true;
        });
        obj = Object.getPrototypeOf(obj);
    }
    return Object.getOwnPropertyNames(props);
}

console.log("all the properties of an Array object: ", inheritedPropertyNames([]));

/*
==========================================================
                        对象的拷贝
==========================================================
如果要拷贝一个对象，需要做到下面两件事情。

        确保拷贝后的对象，与原对象具有同样的原型。
        确保拷贝后的对象，与原对象具有同样的实例属性。
 */
console.log("========== 对象的拷贝 ==========");

// 实现 1：
function copyObjectES5(orig) {
    const copy = Object.create(Object.getPrototypeOf(orig));
    copyOwnPropertiesFrom(copy, orig);
    return copy;
}

function copyOwnPropertiesFrom(target, source) {
    Object
        .getOwnPropertyNames(source)
        .forEach(function (propKey) {
            const desc = Object.getOwnPropertyDescriptor(source, propKey);
            Object.defineProperty(target, propKey, desc);
        });
    return target;
}

// 另一种更简单的写法，是利用 ES2017 才引入标准的 Object.getOwnPropertyDescriptors 方法。
function copyObjectES7(orig) {
    return Object.create(
        Object.getPrototypeOf(orig),
        Object.getOwnPropertyDescriptors(orig)
    );
}

const array1 = [1, 2, 3];
const objectCopy1 = copyObjectES5(array1);
const objectCopy2 = copyObjectES7(array1);
console.log("array1: ", array1); // [1, 2, 3]
console.log("objectCopy1: ", objectCopy1); // Array { '0': 1, '1': 2, '2': 3 }，这里的 1,2,3 不是通过 push 方法添加的，所以没有按照数组的方式打印出来？
console.log("objectCopy2: ", objectCopy2); // Array { '0': 1, '1': 2, '2': 3 }
console.log("objectCopy2: ", objectCopy2.toString());
console.log("objectCopy2: ", objectCopy2.toLocaleString());
