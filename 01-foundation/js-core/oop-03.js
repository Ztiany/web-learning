/*
 以下内容来自：《廖雪峰的 JavaScript 教程》，地址：https://www.liaoxuefeng.com/wiki/1022910821149312/1023021997355072。


 模拟类型扩展：在传统的基于 Class 的语言如 Java、C++ 中，继承的本质是扩展一个已有的 Class，并生成新的 Subclass。
 由于这类语言严格区分类和实例，继承实际上是类型的扩展。但是，JavaScript 由于采用原型继承，我们无法直接扩展
 一个 Class，因为根本不存在 Class 这种类型。

 如果要模拟这个过程，应该怎么做？比如我们有一个 Student 函数，需要基于 Student 扩展出 PrimaryStudent，然后通过
 PrimaryStudent 创建的对象具有如下原型链：

    new PrimaryStudent() ----> PrimaryStudent.prototype ----> Student.prototype ----> Object.prototype ----> null

 可以封装一个如下方法，来手动修改原型链，其中用到了一个中间函数。
 */
function inherits(Child, Parent) {
    const F = function () {
    };
    F.prototype = Parent.prototype;
    // 从
    //  Child.prototype --> Function.prototype --> Object.prototype -->null
    // 到
    //  Child.prototype --> F.prototype(Parent.prototype) --> Function.prototype --> Object.prototype -->null
    Child.prototype = new F();

    // 修复构造函数的指向
    Child.prototype.constructor = Child;
}

/*
具体的用法如下：
 */
function Student(props) {
    this.name = props.name || "匿名";
}

Student.prototype.hello = function () {
    console.log("Hello," + this.name + "!");
};

// 相当于 Java 里面的，PrimaryStudent extends Student，PrimaryStudent 自己扩展了一个 grade 属性。
function PrimaryStudent(props) {
    Student.call(this, props);
    this.grade = props.grade || 1;
}

// 实现原型链的继承
inherits(PrimaryStudent, Student);
// 绑定其他方法到 PrimaryStudent 原型:
PrimaryStudent.prototype.getGrade = function () {
    return this.grade;
};

const xm = new PrimaryStudent({name: "小明", grade: 2});
console.log("xm.name: ", xm.name);
console.log("xm.gradle: ", xm.grade);
// JavaScript 中的 instanceof 运算符是基于原型链来判断的。
console.log("xm instanceof PrimaryStudent: ", xm instanceof PrimaryStudent);
console.log("xm instanceof Student: ", xm instanceof Student);
console.log("xm.__proto__ === PrimaryStudent.prototype: ", xm.__proto__ === PrimaryStudent.prototype);
console.log("xm.__proto__.__proto__ === Student.prototype: ", xm.__proto__.__proto__ === Student.prototype);
xm.hello();

/*
 以下内容来自：《廖雪峰的 JavaScript 教程》，地址：https://www.liaoxuefeng.com/wiki/1022910821149312/1072866346339712。

 相比 Java/C++ 中的继承语法，上面的写法有点复杂，于是 ES6 也推出了 class 和 extends 关键字。让开发者可以更简单地去实现类型扩展。

 那么这和原有的 JavaScript 原型继承有什么区别呢？实际上它们没有任何区别，class 的作用就是让 JavaScript 引擎去实现原来需要我们
 自己编写的原型链代码。简而言之，用 class 的好处就是极大地简化了原型链代码。
 */

class StudentES6 {
    constructor(name) {
        this.name = name;
    }

    hello() {
        console.log("Hello," + this.name + "!");
    }
}

class PrimaryStudentES6 extends StudentES6 {
    constructor(name, grade) {
        super(name);
        this.grade = grade;
    }

    getGrade() {
        console.log("I am at gradle " + this.name + "!");
    }
}

const xh = new PrimaryStudentES6("小红", 6);
xh.hello();
xh.getGrade();