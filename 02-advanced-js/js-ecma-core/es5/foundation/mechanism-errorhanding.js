/*
具体参考：

    - <https://wangdoc.com/javascript/features/error>

==========================================================
                    错误处理机制
==========================================================

JavaScript 解析或运行时，一旦发生错误，引擎就会抛出一个错误对象。
JavaScript 原生提供 Error 构造函数，所有抛出的错误都是这个构造函数的实例。
*/
console.log("========== 错误处理机制 ==========")

// 调用 Error() 构造函数，生成一个实例对象。Error() 构造函数接受一个参数，表示错误提示，可以从实例的 message 属性读到这个参数。
let error1 = new Error("This is an error message");

/*
JavaScript 语言标准只提到，Error 实例对象必须有 message 属性，表示出错时的提示信息，没有提到其他属性。
大多数 JavaScript 引擎，对 Error 实例还提供 name 和 stack 属性，分别表示错误的名称和错误的堆栈，但
它们是非标准的，不是每种实现都有。

    message：错误提示信息
    name：错误名称（非标准属性）
    stack：错误的堆栈（非标准属性）
*/
console.log("error1: ", error1)
console.log("error1.message: ", error1.message)


/*
==========================================================
                    原生错误类型
==========================================================

Error 实例对象是最一般的错误类型，在它的基础上，JavaScript 还定义了其他
6 种错误对象。也就是说，存在 Error 的 6 个派生对象。

    - SyntaxError 对象：SyntaxError 对象是解析代码时发生的语法错误。

    - ReferenceError 对象：ReferenceError 对象是引用一个不存在的变量时发生的错误。

    - RangeError 对象：RangeError 对象是一个值超出有效范围时发生的错误。比如：
        数组长度为负数，
        Number 对象的方法参数超出范围，以及函数堆栈超过最大值。

    - TypeError 对象：TypeError 对象是变量或参数不是预期类型时发生的错误。比如，
      对字符串、布尔值、数值等原始类型的值使用 new 命令，就会抛出这种错误，因为 new
      命令的参数应该是一个构造函数。或者调用对象不存在的方法，也会抛出 TypeError 错误，
      因为不存在的方法就是 undefined，将 undefined 当作函数来调用，就会抛出这种错误。

    - URIError 对象：URIError 对象是 URI 相关函数的参数不正确时抛出的错误，主要涉及
      encodeURI()、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape() 和 unescape() 这六个函数。

    - EvalError 对象：EvalError 对象是 eval 函数没有被正确执行时，会抛出 EvalError 错误。

*/
console.log("========== 原生错误类型 ==========")
let object1 = {name: "ygy"};
try {
    console.log(object1.name());
} catch (e) {
    console.log(e)
}

/*
==========================================================
                    自定义错误
==========================================================

除了 JavaScript 原生提供的七种错误对象，还可以定义自己的错误对象。
*/
console.log("========== 自定义错误 ==========")

function UserError(message) {
    this.message = message || '默认信息';
    this.name = 'UserError';
}

UserError.prototype = new Error();
UserError.prototype.constructor = UserError;
console.log("UserError: ", new UserError('这是自定义的错误！'));

/*
==========================================================
                    throw 语句
==========================================================

1. throw 语句的作用是手动中断程序执行，抛出一个错误。
2. throw 可以抛出任何类型的值。也就是说，它的参数可以是任何值。
3. 对于 JavaScript 引擎来说，遇到 throw 语句，程序就中止了。
4. 引擎会接收到 throw 抛出的信息，可能是一个错误实例，也可能是其他类型的值。
*/
console.log("========== throw 语句 ==========")
try {
    throw 1;
} catch (e) {
    console.log("Catch: ", e)
}

/*
==========================================================
                    try...catch...finally
==========================================================

1. 一旦发生错误，程序就中止执行了。JavaScript 提供了 try...catch 结构，允许对错误进行处理，选择是否往下执行。
2. try...catch 结构允许在最后添加一个 finally 代码块，表示不管是否出现错误，都必需在最后运行的语句。
*/
console.log("========== try...catch...finally ==========")

function function1() {
    try {
        throw '出错了！';
    } catch (e) {
        console.log('捕捉到内部错误');
        throw e; // 这句原本会等到finally结束再执行
    } finally {
        return false; // 直接返回
    }
}

console.log("function1: ", function1()); // false
