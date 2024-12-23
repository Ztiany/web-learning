/*
==========================================================
                                            模块
==========================================================
随着网站逐渐变成“互联网应用程序”，嵌入网页的 JavaScript 代码越来越庞
大，越来越复杂。网页越来越像桌面程序，需要一个团队分工协作、进度管
理、单元测试等等……开发者必须使用软件工程的方法，管理网页的业务逻辑。

JavaScript 模块化编程，已经成为一个迫切的需求。理想情况下，开发者只
需要实现核心的业务逻辑，其他都可以加载别人已经写好的模块。

然而 JavaScript 不是一种模块化编程语言，ES6 才开始支持“类”和“模块”。
下面介绍传统的做法，如何利用对象实现模块的效果。
 */
console.log("========== 模块 ==========");
console.log("");

/*
==========================================================
                                            基本的实现方法
==========================================================
模块是实现特定功能的一组属性和方法的封装。简单的做法是把模块写成一
个对象，所有的模块成员都放到这个对象里面。

                var module1 = new Object({
                    　_count : 0,
                    　m1 : function (){
                    　　//...
                    　},
                    　m2 : function (){
                      　//...
                    　}
                });

但是，这样的写法会暴露所有模块成员，内部状态可以被外部改写。比如，
外部代码可以直接改变内部计数器的值。

            module1._count = 5;
 */
const module1 = new Object({
    _count: 0,
    m1: function () {
        //...
    },
    m2: function () {
        //...
    }
});

/*
==========================================================
                            封装私有变量：构造函数的写法
==========================================================

我们可以利用构造函数，封装私有变量。buffer 是模块的私有变量。一旦生
成实例对象，外部是无法直接访问 buffer 的。

但是，这种方法将私有变量封装在构造函数中，导致构造函数与实例对象是
一体的，总是存在于内存之中，无法在使用完成后清除。这意味着，构造函
数有双重作用，既用来塑造实例对象，又用来保存实例对象的数据，违背了
构造函数与实例对象在数据上相分离的原则（即实例对象的数据，不应该保
存在实例对象以外）。同时，非常耗费内存。
 */
function StringBuilder() {
    var buffer = [];

    this.add = function (str) {
        buffer.push(str);
    };

    this.toString = function () {
        return buffer.join('');
    };
}

// strBuilder 销毁后，buffer 依然存在内存中，无法被清除。
var strBuilder = new StringBuilder();
strBuilder = null

// 这种方法将私有变量放入实例对象中，好处是看上去更自然，
// 但是它的私有变量可以从外部读写，不是很安全。
function StringBuilder2() {
    this._buffer = [];
}

StringBuilder2.prototype = {
    constructor: StringBuilder2,
    add: function (str) {
        this._buffer.push(str);
    },
    toString: function () {
        return this._buffer.join('');
    }
};

/*
==========================================================
                            封装私有变量：立即执行函数的写法
==========================================================

另一种做法是使用“立即执行函数”（Immediately-Invoked Function Expression，IIFE），
将相关的属性和方法封装在一个函数作用域里面，可以达到不暴露私有成员的目的。
 */
console.log("========== 封装私有变量：立即执行函数的写法 ==========");
const module2 = (function () {
    // 外部代码无法读取内部的 _count 变量。
    var _count = 0;
    var m1 = function () {
        //...
    };
    var m2 = function () {
        //...
    };
    return {
        m1: m1,
        m2: m2
    };
})();

/*
==========================================================
                            模块的放大模式
==========================================================

上面 module2 就是 JavaScript 模块的基本写法。下面，再对这种写法进行
加工。

如果一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块，
这时就有必要采用“放大模式”（augmentation）。

 为 module3 模块添加了一个新方法 m3()，然后返回新的 module3 模块。
 */

console.log("========== 模块的放大模式 ==========");
const module3 = (function (mod) {
    mod.m3 = function () {
        //...
    };
    return mod;
})(module3);

/*
 在浏览器环境中，模块的各个部分通常都是从网上获取的，有时无法知道哪
 个部分会先加载。如果采用上面的写法，第一个执行的部分有可能加载一个
 不存在空对象，这时就要采用"宽放大模式"（Loose augmentation）。

 与"放大模式"相比，“宽放大模式”就是“立即执行函数”的参数可以是空对象。
 */
const module4 = (function (mod) {
    //...
    return mod;
})(window.module4 || {});

/*
==========================================================
                            输入全局变量
==========================================================

独立性是模块的重要特点，模块内部最好不与程序的其他部分直接交互。

为了在模块内部调用全局变量，必须显式地将其他变量输入模块。
 */
console.log("========== 输入全局变量 ==========");
const jQuery = (function () {
    //...
})();
const YAHOO = (function () {
    //...
})();

// module5 模块需要使用 jQuery 库和 YUI 库，就把这两个库（其实是两个
// 模块）当作参数输入 module5。这样做除了保证模块的独立性，还使得模
// 块之间的依赖关系变得明显。
const module5 = (function ($, YAHOO) {
    //...
})(jQuery, YAHOO);

/*
==========================================================
                            命名空间
==========================================================

立即执行函数还可以起到命名空间的作用。finalCarousel 对象输出到全局，
对外暴露 init 和 destroy 接口，内部方法 go、handleEvents、initialize、
dieCarouselDie 都是外部无法调用的。
 */
console.log("========== 命名空间 ==========");
(function ($, window, document) {

    function go(num) {
    }

    function handleEvents() {
    }

    function initialize() {
    }

    function dieCarouselDie() {
    }

    //attach to the global scope
    window.finalCarousel = {
        init: initialize,
        destroy: dieCarouselDie
    }

})(jQuery, window, document);