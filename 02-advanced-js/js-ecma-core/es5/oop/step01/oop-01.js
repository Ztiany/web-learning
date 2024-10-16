/*
 以下内容来自：《廖雪峰的 JavaScript 教程》，地址：https://www.liaoxuefeng.com/wiki/1022910821149312/1023022126220448。

 面向对象：在 JavaScript 中，不区分类和实例的概念，而是通过原型（prototype）来实现面向对象编程。

 原型是指当我们想要创建 xm 这个具体的学生时，我们并没有一个 Student 类型可用。但是我们有一个 Student
 对象，这个 Student 对象有身高，还会跑，跟小明类似，干脆就根据它来“创建”小明得了。
*/
const Student = {
    name: "Robot",
    height: 1.6,
    run: function () {
        console.log(this.name + ' is running...');
    }
};

/*
 于是就用 Student 来创建 xm：
 下面把 xm 的原型指向了对象 Student，看上去 xm 仿佛是从 Student 继承下来的。
 */
const xm = {
    name: "小明"
};
xm.__proto__ = Student;

console.log("xm.name = ", xm.name);
xm.run();

/*
 JavaScript 的原型链和 Java 的 Class 区别就在，它没有 “Class” 的概念，所有对象都是实例，所谓继承关系不过是把一个对象的原型指向另一个对象而已。

 需要注意的是，在编写 JavaScript 代码时，不要直接用 obj.__proto__ 去改变一个对象的原型，并且，低版本的 IE 也无法使用 __proto__。
 Object.create() 方法可以传入一个原型对象，并创建一个基于该原型的新对象，但是新对象什么属性都没有，比如：
 */

function createStudent(name) {
    const student = Object.create(Student);
    student.name = name;
    return student;
}

const xz = createStudent("小张");
console.log("xz.name = ", xz.name);
console.log("typeof xz = ", typeof xz);
xz.run();
