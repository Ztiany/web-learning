/**
 * this 在不同环境中的指向：
 *
 * 1. 在浏览器中，顶层的 this 指向 window 对象，所以第一行是 window.type = 1，
 *    然后调用了 redefineType 函数，函数中的 this 也是指向 window 对象，所以
 *    第二行是 window.type = 2，最终打印出来的结果是 2。
 *
 * 2. 在 nodejs 中，顶层的 this 指向的是一个空对象，所以第一行是 {}.type = 1，
 *    而函数中的 this 指向的是 global 对象，所以第二行是 global.type = 2，最终
 *    打印出来的结果是 1。
 *
 *    原理解析：在 nodejs 中，运行时将代码隐藏在一个立即被调用的匿名函数，我们可以使
 *    用 global 来访问全局范围。也就是说在 node 中运行的任何文件其实都被包裹在一个
 *    {} 中，所以脚本文件都在自己的闭包中执行, 类似于下面这样：
 *
 *    ```
 *    {
 *      (function(){
 *           //脚本文件
 *      })()
 *    }
 *    ```
 *
 *   因此，在 nodejs 中，在全局环境中 this 指向的是一个空对象，而在浏览器中，this 指向的
 *   是 window 对象。
 *
 */
const type = 1;

function redefineType(){
    console.log("this in redefineType: ", this); // nodejs: Object[global]; browser: Window
    this.type = 2;
}

redefineType();

/*
打印结果：
    nodejs: 1
    browser: 2
*/
console.log(type) // 2
console.log("this in global: ", this); // nodejs: {}; browser: Window
console.log("global: ", global); // nodejs: {}; browser: Window
