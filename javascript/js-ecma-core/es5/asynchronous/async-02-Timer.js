/*
参考：

        - <https://wangdoc.com/javascript/async/timer>

==========================================================
                                            定时器
==========================================================

JavaScript 提供定时执行代码的功能，叫做定时器（timer），主要由
setTimeout() 和 setInterval() 这两个函数来完成。
 */
console.log("========== 定时器 ==========")
console.log("")

/*
==========================================================
                                    setTimeout()
==========================================================

setTimeout 函数用来指定某个函数或某段代码，在多少毫秒之后执行。
它返回一个整数，表示定时器的编号，以后可以用来取消这个定时器。
 */
console.log("========== setTimeout() ==========")

function helloFromSetTimeout() {
    console.log("Hello from setTimeout()");
}

setTimeout(helloFromSetTimeout, 2000);
const tTask = setTimeout(helloFromSetTimeout, 4000);
clearTimeout(tTask);

/*
==========================================================
                                    setInterval()
==========================================================

setInterval 函数的用法与 setTimeout 完全一致，区别仅仅在于 setInterval
指定某个任务每隔一段时间就执行一次，也就是无限次的定时执行。

setInterval 指定的是“开始执行”之间的间隔，并不考虑每次任务执行本身所
消耗的时间。因此实际上，两次执行之间的间隔会小于指定的时间。比如，
setInterval 指定每 100ms 执行一次，每次执行需要 5ms，那么第一次执行
结束后 95 毫秒，第二次执行就会开始。如果某次执行耗时特别长，比如需要
105 毫秒，那么它结束后，下一次执行就会立即开始。

为了确保两次执行之间有固定的间隔，可以不用 setInterval，而是每次执行
结束后，使用 setTimeout 指定下一次执行的具体时间。
 */
console.log("========== setInterval() ==========")
let count = 0;
const iTask = setInterval(function () {
    console.log(count++);
}, 1000);
setTimeout(function () {
    clearInterval(iTask);
}, 5000);

/*
==========================================================
                            clearTimeout()，clearInterval()
==========================================================
setTimeout 和 setInterval 函数，都返回一个整数值，表示计数器编号。
将该整数传入 clearTimeout 和 clearInterval 函数，就可以取消对应的
定时器。

setTimeout 和 setInterval 返回的整数值是连续的，也就是说，第二个
setTimeout 方法返回的整数值，将比第一个的整数值大 1。

利用这一点，可以写一个函数，取消当前所有的 setTimeout 定时器。
 */
console.log("========== clearTimeout/clearInterval ==========");
setTimeout(function () {
    console.log("Hello again from setTimeout()");
}, 2000);

(function () {
    // 每轮事件循环检查一次
    const gid = setTimeout(clearAllTimeouts, 0);

    function clearAllTimeouts() {
        let id = setTimeout(function () {
        }, 0);
        while (id > 0) {
            if (id !== gid) {
                clearTimeout(id);
            }
            id--;
        }
    }
})();