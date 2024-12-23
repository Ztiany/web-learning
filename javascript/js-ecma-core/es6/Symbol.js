/*
具体参考：

    - <https://es6.ruanyifeng.com/#docs/symbol>

==========================================================
                                            Symbol
==========================================================

ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了
一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新
方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性
的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是
ES6 引入 Symbol 的原因。

 ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。它属于
JavaScript 语言的原生数据类型之一。Symbol 值通过 Symbol() 函数生成。
这就是说，对象的属性名现在可以有两种类型：

        一种是原来就有的字符串
        另一种就是新增的 Symbol 类型。

凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性
名产生冲突。
*/
console.log("========== Symbol ==========")
const symbol1 = Symbol();
const symbol2 = Symbol();
console.log("symbol1 === symbol2: ", symbol1 === symbol2); // false

// Symbol() 函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述。
// 这主要是为了在控制台显示，或者转为字符串时，比较容易区分。这个参
// 数只是表示对当前 Symbol 值的描述，因此相同参数的 Symbol 函数的返
// 回值是不相等的。

const symbol3 = Symbol("foo");
const symbol4 = Symbol("foo");
console.log("symbol3 === symbol4: ", symbol3 === symbol4); // false

// Symbol 值不能与其他类型的值进行运算，会报错。
try {
    const symbol5 = symbol4 + "bar";
} catch (e) {
    console.log("symbol4 + 'bar': ", e.message);
}

// 可以通过下面两种方法将 Symbol 转为字符串。
console.log("symbol3.toString(): ", symbol3.toString());
console.log("String(symbol3): ", String(symbol3));

/*

==========================================================
                                Symbol.prototype.description
==========================================================
Symbol() 函数创建 Symbol 值时，可以用参数添加一个描述。但是，读取这
个描述需要将 Symbol 显式转为字符串，不是很方便，ES2019 提供了一个
Symbol 值的实例属性description，直接返回 Symbol 值的描述。
*/
console.log("========== Symbol.prototype.description ==========")
try {
    console.log("symbol3.description: ", symbol3.description);
} catch (e) {
    console.log("symbol3.description: ", e.message);
}

/*

==========================================================
                                作为属性名的 Symbol
==========================================================
由于每一个 Symbol 值都是不相等的，这意味着只要 Symbol 值作为标识符，
用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个
模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。

Symbol 值作为对象属性名时，不能用点运算符。因为点运算符后面总是字符
串。
*/
console.log("========== 作为属性名的 Symbol ==========")
const symbol6 = Symbol();
// 第一种写法
const obj1 = {
    [symbol6]: "Hello"
};
// 第二种写法
const obj2 = {};
obj2[symbol6] = "Hello";
// 第三种写法
const obj3 = {};
Object.defineProperty(obj3, symbol6, {value: "Hello"});


/*
==========================================================
                                属性名的遍历
==========================================================
Symbol 值作为属性名，遍历对象的时候，该属性不会出现在 for...in、for...of
循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()
返回。

但是，它也不是私有属性，有一个 Object.getOwnPropertySymbols() 方法，
可以获取指定对象的所有 Symbol 属性名。该方法返回一个数组，成员是当
前对象的所有用作属性名的 Symbol 值。
*/
console.log("========== 属性名的遍历 ==========")
const obj4 = {
    [Symbol("foo")]: 0,
    [Symbol("bar")]: 1,
    baz: 2
};
console.log("Object.getOwnPropertyNames(obj4): ", Object.getOwnPropertyNames(obj4));
console.log("Object.getOwnPropertySymbols(obj4): ", Object.getOwnPropertySymbols(obj4));
// 另一个新的 API，Reflect.ownKeys() 方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
console.log("Reflect.ownKeys(obj4): ", Reflect.ownKeys(obj4));

// 由于以 Symbol 值作为键名，不会被常规方法遍历得到。我们可以利用这个
// 特性，为对象定义一些非私有的、但又希望只用于内部的方法。
const size = Symbol("size");

class Collection {
    // 对象 x 的 size 属性是一个 Symbol 值，所以Object.keys(x)、Object.getOwnPropertyNames(x)
    // 都无法获取它。这就造成了一种非私有的内部方法的效果。
    constructor() {
        this[size] = 0;
    }

    add(item) {
        this[this[size]] = item;
        this[size]++;
    }

    static sizeOf(instance) {
        return instance[size];
    }
}

/*
==========================================================
                            Symbol.for()，Symbol.keyFor()
==========================================================
有时，我们希望重新使用同一个 Symbol 值，Symbol.for() 方法可以做到这一
点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol
 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的
 Symbol 值，并将其注册到全局。

Symbol.for() 与 Symbol() 这两种写法，都会生成新的 Symbol。它们的区别是，
前者会被登记在全局环境中供搜索，后者不会。Symbol() 每次调用都会返回一个
新的 Symbol 值，而 Symbol.for() 不会每次调用都返回新的 Symbol 值，而是
会先检查给定的 key 是否已经存在，如果不存在才会新建一个值。

Symbol.keyFor() 方法返回一个已登记的 Symbol 类型值的 key。如果没有登记的
Symbol 类型值，则返回 undefined。
*/
console.log("========== Symbol.for()，Symbol.keyFor() ==========")
const symbol7 = Symbol.for("foo");
const symbol8 = Symbol.for("foo");
console.log("symbol7 === symbol8: ", symbol7 === symbol8); // true
console.log("Symbol.keyFor(symbol7): ", Symbol.keyFor(symbol7));
console.log("Symbol.keyFor(symbol8): ", Symbol.keyFor(symbol1));


/*
==========================================================
                            内置的 Symbol 值
==========================================================
ES6 提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。

        Symbol.hasInstance
        Symbol.isConcatSpreadable
        Symbol.species
        Symbol.match
        Symbol.replace
        Symbol.search
        Symbol.split
        Symbol.iterator
        Symbol.toPrimitive
        Symbol.toStringTag
        Symbol.unscopables

具体参考相关文档。
 */
console.log("========== 内置的 Symbol 值 ==========")
