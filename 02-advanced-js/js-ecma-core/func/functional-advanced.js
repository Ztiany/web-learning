/*
==========================================================
                        偏函数
==========================================================

In computer science, partial application (or partial function application) refers to the
process of fixing a number of arguments to a function, producing another function of smaller arity.

翻译一下，意思就是在计算机科学中，部分应用程序（或者部分功能应用程序）是指固定一个函数的一些参数，然后产生另一个更小元的函数。
*/
console.log("========== 偏函数 ==========")

function sum(a, b) {
    return a + b;
}

// 正确调用
console.log(sum(2, 3)); // 5

// 使用原生的 `bind` 方法就能产生一个偏函数。
const sum_add_2 = sum.bind(null, 2);
console.log(sum_add_2(3)); // 5

// 可是 `bind` 函数中一般需要传入上下文给第一个参数，我们这里可以实现一个无关上下文的 `partial` 函数。
// 由于 `partial` 函数执行后返回了一个新的函数，那么它一定是个高阶函数。可以考虑如下实现：
const partial = (func, ...args) => {
    return (...rest) => {
        // apply() 方法接收两个参数：
        // 	thisArg - 函数内部 this 的值，调用函数时指定 this 的值。
        //	argsArray - 传递给函数的参数，必须包含在数组中。
        // this 为 {}，因为箭头函数没有自己的 this，它的 this 是继承外层的。{} 即 NodeJS 提供的闭包环境。
        return func.apply(this, [...args, ...rest]);
    };
};

const sum_add_1 = partial(sum, 1);
console.log(sum_add_1(2)); // 3
console.log(sum_add_1(3)); // 4

/*
==========================================================
                        柯里化
==========================================================

函数柯里化的意思就是你可以一次传很多参数给 `curry` 函数，也可以分多次传递，
`curry` 函数每次都会返回一个函数去处理剩下的参数，一直到返回最后的结果。
*/
console.log("========== 柯里化 ==========")

// 普通方式
const add1 = function (a, b, c) {
    return a + b + c;
};

// 柯里化，这里每次传入参数都会返回一个新的函数，这样一直执行到最后一次返回 `a+b+c`
// 的值。但是这种实现还是有问题的，这里只有三个参数，如果哪天产品经理告诉我们需要改成
// 100 次？我们就重新写 100 次？这很明显不符合开闭原则，所以我们需要对函数进行一次修改。
const add2 = function (a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        };
    };
};

const add3 = function () {
    const _args = [];
    return function () {
        // arguments 指向的是调用函数的参数。

        // 1：如果没有参数，就返回所有参数的和。
        if (arguments.length === 0) {
            return _args.reduce(function (a, b) {
                return a + b;
            });
        }
        // 如果有参数，就将参数 push 到数组中。
        [].push.apply(_args, arguments);
        // 2：返回自身，以便继续调用。
        return arguments.callee;
    };
};

const sum3 = add3();// 创建一个闭包环境，保存了 _args 变量。
console.log(sum3(1)(2)(3)()); // 6

// 通用柯里化函数
const curry1 = function (fn) {
    const _args = [];
    return function () {
        // 1：如果没有参数，就返回所有参数的和。
        if (arguments.length === 0) {
            // 一次性将所有参数传入 fn 函数。
            return fn.apply(fn, _args);
        }
        // 如果有参数，就将参数 push 到数组中。
        [].push.apply(_args, arguments);
        // arguments 指向被调用函数自身
        return arguments.callee;
    };
};

const addFunction = function () {
    // 用 Array.prototype.reduce() 方法将所有参数相加。[].reduce 指向的是 Array.prototype.reduce。
    return [].reduce.call(arguments, function (a, b) {
        return a + b;
    });
};

const add4 = curry1(addFunction);
console.log(add4(1)(2)(3)()); // 6

// 上面的实现每次都要以一个丑陋的括号结尾，我们可以通过重写 `toString` 和 `valueOf` 方法来解决这个问题。
const curry2 = function (fn) {
    return function () {
        // arguments 指向的是调用函数的参数。它是一个类数组对象，它的值是一个对象，包含了所有传入函数的参数。
        const _args = [].slice.call(arguments, 0);
        // 始终将参数传入 _args 数组中。
        const func1 = function () {
            [].push.apply(_args, arguments);
            return func1;
        };
        // 重写 `toString` 和 `valueOf 方法，这样在隐式转换时就会调用这两个方法。就能返回我们想要的结果。
        func1.toString = function () {
            return fn.apply(fn, _args);
        };
        func1.valueOf = function () {
            return fn.apply(fn, _args);
        };
        return func1;
    };
};

const add5 = function () {
    return [].reduce.call(arguments, function (a, b) {
        return a + b;
    });
};

const adder = curry2(add5);
console.log(adder(1)(2)(3));


// 在很多场景下，我们需要的函数参数很可能有一部分一样，这个时候再重复写就比较浪费了，
// 我们提前加载好一部分参数，再传入剩下的参数，这里主要是利用了闭包的特性，通过闭包可以保持着原有的作用域。
const match = curry2(function (what, str) {
    return str.match(what);
});

console.log(match(/\s+/g, "hello world"));
console.log(match(/\s+/g)("hello world"));

const hasSpaces = match(/\s+/g);
hasSpaces("hello world");
hasSpaces("space-less");
