/*
变量提升：JavaScript 引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。
这造成的结果，就是所有的变量的声明语句，都会被提升到代码的头部，这就叫做变量提升（hoisting）。

具体参考：

    <https://www.cnblogs.com/weiyalin/p/9447637.html>
    <https://wangdoc.com/javascript/basic/grammar#%E5%8F%98%E9%87%8F%E6%8F%90%E5%8D%87>

在 JavaScript 存在着这样一种预处理机制，即浏览器在解析 JS 代码时会将 var 声明的变量和 function 声明的函
数提升到当前作用域的顶部。但是解析 JS 代码时对 var 和 function 关键字声明的对象的处理是不一样的：

    - 前者在解析时只是将声明提前了，但是赋值却依旧在原来的位置。
    - 而后者不仅将声明提前了，而且将定义也完成。

下面在第一行输出一个在下面用 var 声明并且赋值的 variableA 变量，没有报错但是输出的是 undefined，说明
variableA 变量的声明确实是被提前了但是没有赋值，所以输出的是 undefined。正是因为给变量赋值依旧在原来的
位置，所以之后输出 variableA 变量可以正常输出。

在处理 function 定义的 sayHi 函数时，sayHi 的声明被提前了，同时也对它进行了定义，所以在第二行调用 sayHi
时正常输出 hi 而不是报 sayHi is not defined 或者 sayHi is not a function 的错。
*/

// readVarBefore
console.log("variableA", variableA);// will print undefined
sayHi();

function sayHi() {
    console.log("hi");
}

var variableA = 10;

// readVarAfter
console.log("variableA", variableA);

// console.log("variableNotExist", variableNotExist);// will throw error

/*
函数声明优先于变量声明：需要注意的是函数声明优先于变量声明，看下面例子。

先用 var 声明变量 sayHello 并赋值为 "sayHello"，然后用 function 再将 sayHello 重新声明为一个函数。
在声明的前后输出 sayHello，发现前面输出的是一个函数，后面输出的是一个字符串 "sayHello"。显然可以看出函数声明是优先于变量声明的。
 */
console.log(sayHello);         // [Function: sayHello]

var sayHello = "sayHello";

function sayHello() {
    console.log("Hello");
}

console.log(sayHello);         // sayHello

// 定义在循环体内的 var 变量，也会被提升到循环体的头部，但是不会被初始化。
console.log("indexF: ", indexF); // undefined
for (var indexF = 0; indexF < 10; indexF++) {
    console.log(indexF);
}

// 定义在函数内部的 var 变量，也会被提升到函数的头部，但不是全局的。
// 因为函数有自己的作用域，所以在函数外部是无法访问到函数内部的变量的。
function functionA() {
    var variableB = 10;
    console.log("foo");
}
