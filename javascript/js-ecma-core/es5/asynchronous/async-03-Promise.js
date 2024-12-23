/*
具体参考：

    - <https://wangdoc.com/javascript/async/promise>

==========================================================
                                            Promise 对象
==========================================================

Promise 对象是 JavaScript 的异步操作解决方案，为异步操作提供统一接口。
它起到代理作用（proxy），充当异步操作与回调函数之间的中介，使得异步
操作具备同步操作的接口。Promise 可以让异步操作写起来，就像在写同步操
作的流程，而不必一层层地嵌套回调函数。

首先，Promise 是一个对象，也是一个构造函数。Promise 的设计思想是，所
有异步任务都返回一个 Promise 实例。Promise 实例有一个 then 方法，用来
指定下一步的回调函数。
*/
console.log("========== Promise 对象 ==========")
new Promise(function (resolve, reject) {
    console.log("step 1");
    resolve();
}).then(function () {
    console.log("step 2");
}).then(function () {
    console.log("step 3");
})


/*
==========================================================
                            Promise 对象的状态
==========================================================
Promise 对象通过自身的状态，来控制异步操作。Promise 实例具有三种状态。

        异步操作未完成（pending）
        异步操作成功（fulfilled）
        异步操作失败（rejected）

上面三种状态里面，fulfilled 和 rejected 合在一起称为 resolved（已定型）。

这三种的状态的变化途径只有两种。

        从“未完成”到“成功”
        从“未完成”到“失败”

一旦状态发生变化，就凝固了，不会再有新的状态变化。这也是 Promise 这个
名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

因此，Promise 的最终结果只有两种。

    异步操作成功，Promise 实例传回一个值（value），状态变为 fulfilled。
    异步操作失败，Promise 实例抛出一个错误（error），状态变为 rejected。
 */
console.log("========== Promise 对象的状态 ==========")
new Promise(function (resolve, reject) {
    console.log("step 1");
    resolve();
}).then(function () {
    console.log("step 2");
    throw new Error("step 2 error");
}).then(function () {
    console.log("step 3");
}).catch(function (e) {
    console.log("step 4");
    console.log(e);
})

/*
==========================================================
                                Promise 构造函数
==========================================================
JavaScript 提供原生的 Promise 构造函数，用来生成 Promise 实例。

            var promise = new Promise(function (resolve, reject) {
                      // ...
                      if (成功){
                        resolve(value);
                    } else {
                        reject(new Error());
                    }
            });

Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve
和 reject。它们是两个函数，由 JavaScript 引擎提供，不用自己实现。

        - resolve 函数的作用是，将 Promise 实例的状态从“未完成”变为“成功”
            （即从 pending 变为 fulfilled），在异步操作成功时调用，并将异步操
            作的结果，作为参数传递出去。
        - reject 函数的作用是，将 Promise 实例的状态从“未完成”变为“失败”
            （即从 pending 变为 rejected），在异步操作失败时调用，并将异步
                操作报出的错误，作为参数传递出去。
 */
console.log("========== Promise 构造函数 ==========")
console.log("")

/*
==========================================================
                            Promise.prototype.then()
==========================================================
Promise 实例的 then 方法，用来添加回调函数。then 方法可以接受
两个回调函数，第一个是异步操作成功时（变为 fulfilled 状态）的回调函数，
第二个是异步操作失败（变为 rejected）时的回调函数（该参数可以省略）。
一旦状态改变，就调用相应的回调函数。
 */
console.log("========== Promise.prototype.then() ==========")
const promise1 = new Promise(function (resolve, reject) {
    resolve('成功');
});
promise1.then(console.log, console.error);
// "成功"

const promise2 = new Promise(function (resolve, reject) {
    reject(new Error('失败'));
});
promise2.then(console.log, console.error);

/*
them 的四种写法：

        // 写法一：f3 回调函数的参数，是 f2 函数的运行结果。
        f1().then(function () {
          return f2();
        }).then(f3);

        // 写法二：f3 回调函数的参数是 undefined。
        f1().then(function () {
          f2();
        }).then(f3);

        // 写法三：f3 回调函数的参数，是 f2 函数返回的函数的运行结果。
        f1().then(f2()).then(f3);

        // 写法四：与写法一只有一个差别，那就是 f2 会接收到 f1() 返回的结果。
        f1().then(f2).then(f3);

一个图片加载案例：

            var preloadImage = function (path) {
                  return new Promise(function (resolve, reject) {
                    var image = new Image();
                    image.onload  = resolve;
                    image.onerror = reject;
                    image.src = path;
                  });
            };

            // 图片加载成功以后，onload 属性会返回一个事件对象，因此第一个
            // then() 方法的回调函数，会接收到这个事件对象。该对象的 target
            // 属性就是图片加载后生成的 DOM 节点。
            preloadImage('https://example.com/my.jpg')
              .then(function (e) { document.body.append(e.target) })
              .then(function () { console.log('加载成功') })
 */
console.log("========== Promise.prototype.then() ==========")
console.log("")

/*
==========================================================
                            微任务和宏任务
==========================================================
Promise 的回调函数不是正常的异步任务，而是微任务（microtask）。它们
的区别在于，正常任务追加到下一轮事件循环，微任务追加到本轮事件循环。
这意味着，微任务的执行时间一定早于正常任务。
 */