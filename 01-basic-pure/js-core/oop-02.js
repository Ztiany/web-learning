/*
以下内容来自：《廖雪峰的 JavaScript 教程》，地址：https://www.liaoxuefeng.com/wiki/1022910821149312/1023022043494624。

 原型链：JavaScript 对每个创建的对象都会设置一个原型，指向它的原型对象。当我们用 obj.xxx 访问一个对象的属性时，JavaScript 引擎先
 在当前对象上查找该属性，如果没有找到，就到其原型对象上找，如果还没有找到，就一直上溯到 Object.prototype 对象，最后，如果还没有
 找到，就只能返回 undefined。

 比如：
        创建一个Array对象：var arr = [1, 2, 3]; 则原型链为：arr ----> Array.prototype ----> Object.prototype ----> null。
        创建一个函数：function foo(){}; 则原型链为：arr ----> Function.prototype ----> Object.prototype ----> null。
 */
const arr = [1, 2, 3]

/*
 函数的 prototype 属性：在 JavaScript 中，每个函数都有一个 prototype 属性，它是一个对象。这个 prototype 对象被用作构造函数
 创建的实例对象的原型，也就是说，它是创建该函数实例对象的模板。（在 JavaScript 中，任何一个函数都可以用作构造函数，参考下面构造函数的内容）

 当你创建一个函数 foo 时，它的 prototype 属性会被自动创建并且指向一个空对象（全新的）。你可以通过给这个 prototype 对象添加
 属性和方法来为 foo 函数创建一个原型，这些属性和方法可以被 foo 函数所创建的实例对象所共享（这里说的是将 foo 当作构造函数来创建对象）。
 */
function foo() {

}

/*
其实，Array, Function, Object 等，都是函数类型。
 */
console.log("typeof Array: ", typeof Array)
console.log("typeof Function: ", typeof Function)
console.log("typeof Object: ", typeof Object)

/*
 构造函数：除了直接用 { ... } 创建一个对象外，JavaScript 还可以用一种构造函数的方法来创建对象。

 在 JavaScript 中，任何一个函数都可以被用作构造函数。构造函数是一种特殊的函数，它可以通过 "new" 关键字来创建对象实例。
 当调用一个函数并在其前面加上 "new" 关键字时，这个函数就成为了一个构造函数，它会返回一个新的对象实例。

 例如，我们可以定义一个 Student 构造函数，用来创建一个人的对象实例：
 */
function Student(name) {
    this.name = name;
    this.hello = function () {
        console.log('Hello, ' + this.name + '!');
    }
}

/*
 如果不写 new，这就是一个普通函数，它返回 undefined。但是，如果写了 new，它就变成了一个构造函数，它绑定的 this 指向新创建
 的对象，并默认返回 this，也就是说，不需要在最后写 return this;。

 新创建的对象的原型链是：
    xm ----> Student.prototype ----> Object.prototype ----> null
    xz ----> Student.prototype ----> Object.prototype ----> null
 */
const xm = new Student("小明")
const xz = new Student("小张")

/*
 用 new Student() 创建的对象还从原型上获得了一个 constructor 属性，它指向函数 Student 本身：
 */
console.log("xm.constructor === Student: ", xm.constructor === Student)
console.log("Student.prototype.constructor === Student: ", Student.prototype.constructor === Student)
console.log("Object.getPrototypeOf(xm) === Student.prototype: ", Object.getPrototypeOf(xm) === Student.prototype)
console.log("xm instanceof Student: ", xm instanceof Student)

/*
 把公共的属性放到 prototype 中：上面 Student 函数中，每次都定义了一个新的 hello 函数，但是它们的代码完全相同，这是没有必要的，利用
 prototype 链的特性，我们可以将 hello 函数定义到 Student.prototype 上来进行优化。
 */
console.log("xm.hello === xz.hello: ", xm.hello === xz.hello)

/*
 优化版本：
 */
function StudentOptimized(name) {
    this.name = name;
}

StudentOptimized.prototype.hello = function () {
    console.log('Hello, ' + this.name + '!');
}

const xmOptimized = new StudentOptimized("小明")
const xzOptimized = new StudentOptimized("小张")
console.log("xmOptimized.hello === xzOptimized.hello: ", xmOptimized.hello === xzOptimized.hello)

/*
 扩展：prototype 这个属性是函数类型专有的，普通对象可以通过 __proto__ 这个非标准用法来查看自己的原型。
 */
console.log("xm.__proto__ === StudentOptimized.prototype: ", xmOptimized.__proto__ === StudentOptimized.prototype)

/*
 实践：
    （1）创建对象时，不要忘了写 new 关键字，如果忘了写 new，那么在 strict 模式下，this.name = name 将报错，因为 this 绑定为 undefined，而
    在非 strict 模式下，this.name = name 不报错，因为 this 绑定为 window，于是无意间创建了全局变量 name，并且返回 undefined，这个结果更糟糕。

    因此，为了区分普通函数和构造函数，按照约定，构造函数首字母应当大写，而普通函数首字母应当小写，这样，一些语法检查工具如 jslint 将可以
    帮你检测到漏写的 new。

    （2）另一种实践是，可以编写一个 createStudent() 函数，在内部封装所有的 new 操作：
 */
function Student2(props) {
    // 在 JS 中，逻辑或运算符 "||" 的工作方式是，如果它的左操作数为假值（例如 undefined、null、false、0、NaN 或空字符串），
    // 则返回右操作数，否则返回左操作数。
    this.name = props.name || '匿名'; // 默认值为'匿名'
    this.grade = props.grade || 1; // 默认值为 1
}

Student2.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
};

function createStudent2(props) {
    return new Student2(props || {})
}

/*
 上面这个 createStudent()2 函数有几个巨大的优点：一是不需要 new 来调用，二是参数非常灵活，可以不传，也可以这么传：
 */
const xm2 = createStudent2({
    name: '小明'
});
console.log("xm2.grade: ", xm2.grade);