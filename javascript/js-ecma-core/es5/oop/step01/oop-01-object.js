/*
参考：

    - <https://wangdoc.com/javascript/oop/new>

==========================================================
                        对象是什么？
==========================================================

面向对象编程（Object Oriented Programming，缩写为 OOP）是目前主流的编程范式。
它将真实世界各种复杂的关系，抽象为一个个对象，然后由对象之间的分工与合作，完成对真实
世界的模拟。

每一个对象都是功能中心，具有明确分工，可以完成接受信息、处理数据、发出信息等任务。对象
可以复用，通过继承机制还可以定制。因此，面向对象编程具有灵活、代码可复用、高度模块化等
特点，容易维护和开发，比起由一系列函数或指令组成的传统的过程式编程（procedural programming），
更适合多人合作的大型软件项目。

“对象”（object）到底是什么？我们从两个层次来理解。

    1. 对象是单个实物的抽象：一本书、一辆汽车、一个人都可以是对象，一个数据库、一张网页、
       一个远程服务器连接也可以是对象。当实物被抽象成对象，实物之间的关系就变成了对象之
       间的关系，从而就可以模拟现实情况，针对对象进行编程。

    2. 对象是一个容器，封装了属性（property）和方法（method）：属性是对象的状态，方法
       是对象的行为（完成某种任务）。比如，我们可以把动物抽象为 animal 对象，使用“属性”
       记录具体是哪一种动物，使用“方法”表示动物的某种行为（奔跑、捕猎、休息等等）。
*/
console.log("========== 对象是什么？ ==========");
console.log("");

/*
==========================================================
                        构造函数
==========================================================

面向对象编程的第一步，就是要生成对象。前面说过，对象是单个实物的抽象。
通常需要一个模板，表示某一类实物的共同特征，然后对象根据这个模板生成。

典型的面向对象编程语言（比如 C++ 和 Java），都有“类”（class）这个概念。
所谓“类”就是对象的模板，对象就是“类”的实例。但是，JavaScript 语言的对
象体系，不是基于“类”的，而是基于构造函数（constructor）和原型链（prototype）。

JavaScript 语言使用构造函数（constructor）作为对象的模板。所谓”构造函数”，
就是专门用来生成实例对象的函数。它就是对象的模板，描述实例对象的基本结构。一个
构造函数，可以生成多个实例对象，这些实例对象都有相同的结构。

在 JavaScript 中，构造函数就是一个普通的函数，但具有自己的特征和用法。
*/

console.log("========== 构造函数 ==========");

// 这里 Vehicle 就是构造函数。为了与普通函数区别，构造函数名字的第一个字母通常大写。
// 构造函数的特点有两个：
//      1. 函数体内部使用了 this 关键字，代表了所要生成的对象实例。
//      2. 生成对象的时候，必须使用 new 命令。
const Vehicle = function () {
    this.price = 1000;
};

const vehicle1 = new Vehicle();
const resultOfVehicle = Vehicle();
console.log("vehicle1.price: ", vehicle1.price); // 1000
console.log("resultOfVehicle: ", resultOfVehicle); // undefined

/*
==========================================================
                        new 命令
==========================================================

new 命令的作用，就是执行构造函数，返回一个实例对象。

    1. new 命令执行时，构造函数内部的 this，就代表了新生成的实例对象。
    2. 使用 new 命令时，根据需要，构造函数也可以接受参数。
    3. new 命令本身就可以执行构造函数，所以后面的构造函数可以带括号，也可以不带括号。new Vehicle() 和 new Vehicle 等价。
    4. 如果没有带上 new 命令，构造函数就变成了普通函数，并不会生成实例对象。内部的 this 指向的是全局对象，将造成一些意想不到的结果。
    5. 为了保证构造函数必须与 new 命令一起使用，有以下解决办法:
            5.1 一个解决办法是，构造函数内部使用严格模式，即第一行加上 use strict。这样的话，一旦忘了使用 new 命令，直接调用构造函数就会报错。
            5.2 另一个解决办法，构造函数内部判断是否使用 new 命令，如果发现没有使用，则直接返回一个实例对象。
*/
console.log("========== new 命令 ==========");

const StrictVehicle = function () {
    "use strict";
    this.price = 1000;
};
// 由于严格模式中，函数内部的 this 不能指向全局对象，默认等于 undefined，导致不加 new 调用会报错（JavaScript 不允许对 undefined 添加属性）。
try {
    const strictVehicle = StrictVehicle();
} catch (e) {
    console.log("StrictVehicle: ", e.message); // TypeError: Cannot set property 'price' of undefined
}

const BetterVehicle = function () {
    if (!(this instanceof BetterVehicle)) {
        return new BetterVehicle();
    }
    this.price = 1000;
};
const betterVehicle1 = BetterVehicle();
console.log("betterVehicle1: ", betterVehicle1);

/*
==========================================================
                    new 命令的原理
==========================================================

使用 new 命令时，它后面的函数依次执行下面的步骤。

    1. 创建一个空对象，作为将要返回的对象实例。
    2. 将这个空对象的原型，指向构造函数的 prototype 属性。
    3. 将这个空对象赋值给函数内部的 this 关键字。
    4. 开始执行构造函数内部的代码。

构造函数内部，this 指的是一个新生成的空对象，所有针对 this 的操作，都会发生在这个空对象上。
构造函数之所以叫“构造函数”，就是说这个函数的目的，就是操作一个空对象（即 this 对象），将其
“构造”为需要的样子。

构造函数的 return：

    1. 如果构造函数内部有 return 语句，而且 return 后面跟着一个对象，new 命令会返回 return 语句
       指定的对象；否则，就会不管 return 语句，返回 this 对象。
    2. 如果 return 语句返回的是一个跟 this 无关的新对象，new 命令会返回这个新对象，而不是 this 对象。

*/

// new 命令简化的内部流程，可以用下面的代码表示。
function _new(/* 构造函数 */ constructor, /* 构造函数参数 */ params) {
    // 将 arguments 对象转为数组
    const args = [].slice.call(arguments);
    // 取出构造函数
    const safeConstructor = args.shift();
    // 创建一个空对象，继承构造函数的 prototype 属性
    const context = Object.create(safeConstructor.prototype);
    // 执行构造函数
    const result = safeConstructor.apply(context, args);
    // 如果返回结果是对象，就直接返回，否则返回 context 对象
    return (typeof result === 'object' && result != null) ? result : context;
}

let vehicle2 = _new(Vehicle);
console.log("vehicle2: ", vehicle2);


/*
==========================================================
                    new.target
==========================================================

函数内部可以使用 new.target 属性。如果当前函数是 new 命令调用，new.target 指向当前函数，否则为 undefined。

*/
console.log("========== new.target ==========");

// 使用 target 这个属性，可以判断函数调用的时候，是否使用new命令。
function Person(name, age) {
    if (new.target === undefined) {
        return new Person(name, age);
    }
    this.name = name;
    this.age = age;
}

const person1 = Person("John", 20);
console.log("person1: ", person1);


/*
==========================================================
                Object.create() 创建实例对象
==========================================================

构造函数作为模板，可以生成实例对象。但是，有时拿不到构造函数，只能拿到一个现有的对象。
我们希望以这个现有的对象作为模板，生成新的实例对象，这时就可以使用 Object.create() 方法。
*/
console.log("========== Object.create() 创建实例对象 ==========");

const zhangSan = {
    name: '张三',
    age: 38,
    greeting: function () {
        console.log('Hi! I\'m ' + this.name + '.');
    }
};

const person2 = Object.create(zhangSan);
console.log("person2: ", person2);
console.log("person2.name: ", person2.name);
console.log("person2.age: ", person2.age);
console.log("person2.constructor: ", person2.constructor);
person2.greeting()

// Object.create 方法用于创建一个新对象，并将其原型设置为指定的对象。
// 当你使用 Object.create 创建一个新对象时，新对象的 constructor
// 会继承自原型对象的 constructor 属性。
console.log("person2.constructor === zhangSan.constructor: ", person2.constructor === zhangSan.constructor);

