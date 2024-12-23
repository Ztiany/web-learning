/*
参考：

    - <https://wangdoc.com/javascript/oop/prototype>

==========================================================
                                    对象的继承
==========================================================

面向对象编程很重要的一个方面，就是对象的继承。A 对象通过继承 B 对象，
就能直接拥有 B 对象的所有属性和方法。这对于代码的复用是非常有用的。

大部分面向对象的编程语言，都是通过“类”（class）实现对象的继承。传统上，
JavaScript 语言的继承不通过 class，而是通过“原型对象”（prototype）实现。

下面介绍 JavaScript 的原型链继承（这里不包括 ES6 引入了 class 语法）。
 */
console.log("========== 对象的继承 ==========");
console.log("");

/*
==========================================================
                                    构造函数的缺点
==========================================================
JavaScript 通过构造函数生成新对象，因此构造函数可以视为对象
的模板。实例对象的属性和方法，可以定义在构造函数内部。

        function Cat(name, color) {
          this.name = name;
          this.color = color;
        }

通过构造函数为实例对象定义属性，虽然很方便，但是有一个缺点：
同一个构造函数的多个实例之间，无法共享属性，从而造成对系统资源的浪费。
 */
console.log("========== 构造函数的缺点 ==========");

function CatA(name, color) {
    this.name = name;
    this.color = color;
    this.meow = function () {
        console.log('喵喵');
    };
}

const cat1 = new CatA('大毛', '白色');
const cat2 = new CatA('二毛', '黑色');
// 下面代码输出 false，说明每新建一个实例，就会新建一个meow方法。
// 这既没有必要，又浪费系统资源，因为所有meow方法都是同样的行为，
// 完全应该共享。
console.log("cat1.meow === cat2.meow: ", cat1.meow === cat2.meow); // false

/*
==========================================================
                                    prototype 属性的作用
==========================================================
JavaScript 继承机制的设计思想就是，原型对象的所有属性和方法，
都能被实例对象共享。也就是说，如果属性和方法定义在原型上，
那么所有实例对象就能共享，不仅节省了内存，还体现了实例对象之
间的联系。

JavaScript 规定，每个函数都有一个prototype属性，指向一个对象。
对于普通函数来说，该属性基本无用。但是，对于构造函数来说，
生成实例的时候，该属性会自动成为实例对象的原型。

原型对象上的属性不是实例对象自身的属性。只要修改原型对象，变动
就立刻会体现在所有实例对象上。
 */
console.log("========== prototype 属性的作用 ==========");

function AnimalA(name) {
    this.name = name;
}

AnimalA.prototype.color = 'white';
const cat3 = new AnimalA('大毛');
const cat4 = new AnimalA('二毛');
console.log("cat3.color: %s, cat4.color: %s", cat3.color, cat4.color); // white white

// 如果实例对象自身就有某个属性或方法，它就不会再去原型对象
// 寻找这个属性或方法。
cat3.color = 'black';
console.log("cat3.color: %s, cat4.color: %s", cat3.color, cat4.color); // black white

// 在 prototype 对象上面定义了一个 walk方法，这个方法将可以在所有 Anima l实例
// 对象上面调用。
AnimalA.prototype.walk = function () {
    console.log('走走');
}
cat3.walk(); // 走走

/*
==========================================================
                                    原型链
==========================================================
JavaScript 规定，所有对象都有自己的原型对象（prototype）。

        - 一方面，任何一个对象，都可以充当其他对象的原型；
        - 另一方面，由于原型对象也是对象，所以它也有自己的原型。

因此，就会形成一个“原型链”（prototype chain）：对象到原型，再到原型的原型……

如果一层层地上溯，所有对象的原型最终都可以上溯到 Object.prototype，
即 Object 构造函数的 prototype 属性。也就是说，所有对象都继承了
Object.prototype 的属性。这就是所有对象都有 valueOf 和 toString 方法
的原因，因为这是从 Object.prototype 继承的。

而 Object.prototype 的原型是 null。null 没有任何属性和方法，也没有自己
的原型。因此，原型链的尽头就是 null。

读取对象的某个属性时，JavaScript 引擎先寻找对象本身的属性，如果找不到，
就到它的原型去找，如果还是找不到，就到原型的原型去找。如果直到最顶层
的 Object.prototype 还是找不到，则返回undefined。如果对象自身和它的原型，
都定义了一个同名属性，那么优先读取对象自身的属性，这叫做“覆盖”（overriding）。
*/
console.log("==========  原型链 ==========");
console.log("Object.getPrototypeOf(Object.prototype): ", Object.getPrototypeOf(Object.prototype)); // null

// 如果让构造函数的 prototype 属性指向一个数组，就意味着实例对象可以调用数组方法。
function CustomArray() {

}

CustomArray.prototype = new Array();
CustomArray.prototype.constructor = CustomArray
const customArray = new CustomArray();
customArray.push(1, 2, 3);
customArray.length // 3
console.log(customArray instanceof CustomArray) // true
console.log(customArray instanceof Array) // true
/*
==========================================================
                                    constructor 属性
==========================================================
prototype 对象有一个constructor属性，默认指向 prototype 对象所在的构
造函数。

由于 constructor 属性定义在 prototype 对象上面，意味着可以被所有实例
对象继承。
*/
console.log("==========  constructor 属性 ==========");

function Dog() {

}

const dog1 = new Dog();
console.log("dog1.constructor === Dog: ", dog1.constructor === Dog); // true
console.log("Dog.prototype.constructor === Dog: ", Dog.prototype.constructor === Dog); // true
console.log("dog1.constructor === Dog.prototype.constructor: ", dog1.constructor === Dog.prototype.constructor); // true

// constructor 属性的作用之一，可以得知某个实例对象，到底是哪一个构造函数产生的。
console.log("dog1.constructor === Dog: ", dog1.constructor === Dog); // true
console.log("dog1.constructor === RegExp: ", dog1.constructor === RegExp); // false

// 另一方面，有了 constructor 属性，就可以从一个实例对象新建另一个实例。
const dog2 = new dog1.constructor();
console.log("dog2 instanceof Dog: ", dog2 instanceof Dog); // true

// 定义一个 createCopy 方法，用来生成实例对象的副本。
Dog.prototype.createCopy = function () {
    return new this.constructor();
}

/*
  注意：constructor 属性表示原型对象与构造函数之间的关联关系，如果修
  改了原型对象，一般需要同时修改 constructor 属性，防止引用的时候出错。
 */
function Person(name) {
    this.name = name;
}

console.log("Person.prototype.constructor === Person: ", Person.prototype.constructor === Person) // true

/*
构造函数 Person 的原型对象改掉了，但是没有修改 constructor 属性，导致
这个属性不再指向 Person。由于 Person 的新原型是一个普通对象，而普通对
象的 constructor 属性指向 Object 构造函数，导致 Person.prototype.constructor
变成了Object。所以，修改原型对象时，一般要同时修改 constructor 属性的指向。
 */
Person.prototype = {
    method: function () {
    }
};
console.log("Person.prototype.constructor === Person: ", Person.prototype.constructor === Person) // false
console.log("Person.prototype.constructor === Object: ", Person.prototype.constructor === Object) // true

// 要么将 constructor 属性重新指向原来的构造函数，要么只在原型对象上
// 添加方法，这样可以保证 instanceof 运算符不会失真。
function C() {
}

// 坏的写法
C.prototype = {
    method1: function () {
    },
    // ...
};

// 好的写法
C.prototype = {
    constructor: C,
    method1: function () {
    },
    // ...
};

// 更好的写法
C.prototype.method1 = function () {

};
const c1 = new C();
// 如果不能确定 constructor 属性是什么函数，还有一个办法：通过 name 属性
console.log("c1.constructor.name: ", c1.constructor.name) // C

/*
==========================================================
                                    instanceof 运算符
==========================================================

instanceof 运算符返回一个布尔值，表示对象是否为某个构造函数的实例。

instanceof 运算符的左边是实例对象，右边是构造函数。它会检查右边构造
函数的原型对象（prototype），是否在左边对象的原型链上。因此，下面两
种写法是等价的。

            var v = new Vehicle();
            v instanceof Vehicle
            // 等同于
            Vehicle.prototype.isPrototypeOf(v)

 由于 instanceof 检查整个原型链，因此同一个实例对象，可能会对多个构造
 函数都返回 true。

 由于任意对象（除了null）都是 Object 的实例，所以 instanceof 运算符可以
 判断一个值是否为非 null 的对象。
 */
console.log("==========  instanceof 运算符 ==========");
console.log("cat3 instanceof AnimalA: ", cat3 instanceof AnimalA); // true
console.log("null instanceof Object: ", null instanceof Object); // true

/*
instanceof 的原理是检查右边构造函数的 prototype 属性，是否在左边对象的
原型链上。有一种特殊情况，就是左边对象的原型链上，只有 nul l对象。这时，
instanceof 判断会失真。这是唯一的 instanceof 运算符判断会失真的情况：
一个对象的原型是 null。
 */
const object1 = Object.create(null);
console.log("type of object1: ", typeof object1); // object
console.log("object1 instanceof Object: ", object1 instanceof Object); // false

// instanceof 运算符的一个用处，是判断值的类型。instanceof 运算符只能
// 用于对象，不适用原始类型的值。
const array1 = [1, 2, 3];
const object2 = {};
const string1 = 'Hello';
console.log(array1 instanceof Array); // true
console.log(object2 instanceof Object); // true
console.log(string1 instanceof String); // false

// 对于 undefined 和 null，instanceof 运算符总是返回 false。
console.log("undefined instanceof Object: ", undefined instanceof Object); // false
console.log("null instanceof Object: ", null instanceof Object); // false

// 利用 instanceof 运算符，还可以巧妙地解决，调用构造函数时，忘了加 new 命令的问题。
function SafeConstructor(foo, bar) {
    if (this instanceof SafeConstructor) {
        this._foo = foo;
        this._bar = bar;
    } else {
        return new SafeConstructor(foo, bar);
    }
}

/*
==========================================================
                                    构造函数的继承
==========================================================
让一个构造函数继承另一个构造函数，是非常常见的需求。这可以分成两步
实现。第一步是在子类的构造函数中，调用父类的构造函数。

        function Sub(value) {
              Super.call(this);
              this.prop = value;
        }

上面代码中，Sub 是子类的构造函数，this 是子类的实例。在实例上调用父
类的构造函数 Super，就会让子类实例具有父类实例的属性。

第二步，是让子类的原型指向父类的原型，这样子类就可以继承父类原型。

        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;
        Sub.prototype.method = '...';

上面代码中，Sub.prototype 是子类的原型，要将它赋值为 Object.create(Super.prototype)，
而不是直接等于 Super.prototype。否则后面两行对 Sub.prototype 的操作，会连父类的原型
Super.prototype 一起修改掉。

另外一种写法是 Sub.prototype 等于一个父类实例。

            Sub.prototype = new Super();

这种写法也有继承的效果，但是子类会具有父类实例的方法。有时，这可能不是我们需要的，
所以不推荐使用这种写法。
 */
console.log("==========  构造函数的继承 ==========");
console.log("");

/*
==========================================================
                                    多重继承
==========================================================

JavaScript 不提供多重继承功能，即不允许一个对象同时继承多个对象。
但是，可以通过变通方法，实现这个功能。
 */
console.log("==========  多重继承 ==========");
function M1() {
    this.hello = 'hello';
}

function M2() {
    this.world = 'world';
}

function S() {
    M1.call(this);
    M2.call(this);
}

// 继承 M1
S.prototype = Object.create(M1.prototype);
// 继承链上加入 M2
Object.assign(S.prototype, M2.prototype);

// 指定构造函数
S.prototype.constructor = S;

// 子类 S 同时继承了父类 M1 和 M2。这种模式又称为 Mixin（混入）。
const s = new S();
console.log("s.hello: ", s.hello); // hello
console.log("s instanceof M1: ", s instanceof M1); // true
console.log("s instanceof M2: ", s instanceof M2); // false
