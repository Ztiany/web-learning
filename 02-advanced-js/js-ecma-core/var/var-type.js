/*
==========================================================
                        怪异现象
==========================================================

JavaScript 中的类型转换一直都是让前端开发者最头疼的问题。下面是一些经典的例子：
*/
console.log("========== 怪异现象 ==========")
console.log("1 + {} =", 1 + {}) // 1[object Object]
console.log("{} + 1 =", {} + 1) // [object Object]1
console.log("1 + [] =", 1 + []) // 1，因为 [] 转换为数字为 0。
console.log("1 + '2' =", 1 + '2') // 12
// 打印的是 banana，因为 +'a' 会被转换为 NaN。
console.log("'b'+'a'+ + 'a' + 'a' =", ('b' + 'a' + +'a' + 'a').toLowerCase())

/*
==========================================================
                        类型转换
==========================================================

JS 中有六种简单数据类型：undefined、null、boolean、string、number、symbol，以及一种复杂类型：object。
但是 JavaScript 在声明时只有一种类型，只有到运行期间才会确定当前类型。在运行期间，由于 JavaScript 没有对类
型做严格限制，导致不同类型之间可以进行运算，这样就需要允许类型之间互相转换。

类型转换主要有两种：隐式转换和显示转换。
*/
console.log("========== 类型转换 ==========")
console.log("显示转换：", Number("123"), typeof Number("123"))
console.log("隐式转换：", 1 + "2", typeof (1 + "2"))

/*
下面例子结果为：[1, NaN, NaN]。

  parseInt 函数的第二个参数表示要解析的数字的基数。该值介于 2 ~ 36 之间。
  如果省略该参数或其值为 0，则数字将以 10 为基础来解析。如果它以 “0x” 或 “0X” 开头，将以 16 为基数。
  如果该参数小于 2 或者大于 36，则 `parseInt()` 将返回 NaN。

  而 `Array.prototype.map()` 方法在调用回调函数时，实际上会传递 3 个参数：当前元素、当前索引、数组本身。
*/
console.log([1, 2, 3].map(parseInt))


/*
==========================================================
                        显示转换
==========================================================

显式类型转换就是手动地将一种值转换为另一种值。常用的显式类型转换方法有：

    - Number
    - String
    - Boolean
    - parseInt
    - parseFloat
    - toString
    - 等等

一般来说，类型转换主要是基本类型转基本类型、复杂类型转基本类型两种。转换的目标类型主要分为以下几种：

    1. 转换为 number
    2. 转换为 string
    3. 转换为 boolean
*/
console.log("========== 显示转换 ==========")
console.log("To Number: ", Number("123"), Number("123abc"), Number("abc123"))
console.log("To String: ", String(123), String(null), String(undefined))
console.log("To Boolean: ", Boolean(0), Boolean(1), Boolean(""))

/*
==========================================================
                        toNumber
==========================================================

其他类型转换到 number 类型的规则见下方表格：

    | 原始值     | 转换结果                              |
    | :-------- | :---------------------------------- |
    | Undefined | NaN                                 |
    | Null      | 0                                   |
    | true      | 1                                   |
    | false     | 0                                   |
    | String    | 根据语法和转换规则来转换                 |
    | Symbol    | Throw a TypeError exception         |
    | Object    | 先调用 toPrimitive，再调用 toNumber    |

String 转换为 Number 类型的规则：

    1. 如果字符串中只包含数字，那么就转换为对应的数字；
    2. 如果字符串中只包含十六进制格式，那么就转换为对应的十进制数字；
    3. 如果字符串为空，那么转换为 0；
    4. 如果字符串包含上述之外的字符，那么转换为 NaN。

使用 `+` 可以将其他类型转为 number 类型。
*/
console.log("========== toNumber ==========")
console.log("+undefined: ", +undefined)
console.log("+null: ", +null) // 0
console.log("+true: ", +true)
console.log("+false: ", +false)
console.log("+\"123\": ", +"123")
console.log("+\"123abc\": ", +"123abc")
console.log("+\"abc123\": ", +"abc123")
console.log("+\"0x10\": ", +"0x10")
console.log("+\"\": ", +"")
console.log("+{}: ", +{}) // NaN，因为 {} 转换为字符串为 "[object Object]"，再转换为数字为 NaN
console.log("+[]: ", +[]) // 0，因为 [] 转换为字符串为 ""，再转换为数字为 0
console.log("+[1]: ", +[1]) // 1，因为 [1] 转换为字符串为 "1"，再转换为数字为 1
console.log("+[1, 2]: ", +[1, 2]) // NaN，因为 [1, 2] 转换为字符串为 "1,2"，再转换为数字为 NaN
try {
    console.log("+Symbol(): ", +Symbol())
} catch (e) {
    console.log("Symbol() 转换为 Number 类型时会抛出异常")
}


/*
==========================================================
                        toBoolean
==========================================================

    | 原始值     | 转换结果                             |
    | :-------- | :--------------------------------- |
    | Undefined | false                              |
    | Boolean   | true or false                      |
    | Number    | 0 和 NaN 返回 false，其他返回 true    |
    | Symbol    | true                               |
    | Object    | true                               |
*/
console.log("========== toBoolean ==========")
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(1)); // true
console.log(Boolean(0)); // false
console.log(Boolean(NaN)); // false
console.log(Boolean(Symbol())); // true
console.log(Boolean({})); // true

/*
==========================================================
                        ToString
==========================================================

    | 原始值     | 转换结果                              |
    | :-------- | :---------------------------------- |
    | Undefined | ‘Undefined’                         |
    | Boolean   | ‘true’ or ‘false’                   |
    | Number    | 对应的字符串类型                       |
    | String    | String                              |
    | Symbol    | Throw a TypeError exception         |
    | Object    | 先调用 toPrimitive，再调用 toString    |

转换到 string 类型同样可以用构造函数 String 来实现。
*/

console.log("========== ToString ==========")
console.log("String(undefined): ", String(undefined))
console.log("String(null): ", String(null))
console.log("String(true): ", String(true))
console.log("String(false): ", String(false))
console.log("String(123): ", String(123))
console.log("String(Symbol()): ", String(Symbol()))
console.log("String({}): ", String({})) // [object Object]
console.log("String([]): ", String([])) // ""
console.log("String([1, 2]): ", String([1, 2]))

// 如果是 `Symbol() + ""`  或者 `${Symbol()}`这种，由于无法将 Symbol 类型转换为 String 类型，会抛出类型错误。
// 但如果是 `String(Symbol())`，是会调用 Symbol.prototype.toString，将其转换为 “`Symbol()`”
try {
    console.log("Symbol() + '': ", (Symbol() + ''))
} catch (e) {
    console.log("Symbol() 隐式转换为 String 类型时会抛出异常")
}
try {
    console.log("${Symbol()}: ", `${Symbol()}`)
} catch (e) {
    console.log("Symbol() 隐式转换为 String 类型时会抛出异常")
}

/*
==========================================================
                        隐式转换
==========================================================

隐式类型转换一般是在涉及到运算符的时候才会出现的情况，比如我们将两个变量相加，或者比较两个变量是否相等。
对于对象转原始类型的转换，也会遵守 ToPrimitive 的规则。

toPrimitive：在对象转原始类型的时候，一般会调用内置的 ToPrimitive 方法，而 ToPrimitive 方法则
会调用 OrdinaryToPrimitive 方法。参考 https://tc39.es/ecma262/#sec-ordinarytoprimitive，
意思就是 ToPrimitive 方法接受两个参数，一个是输入的值 input，一个是期望转换的类型 PreferredType。

    1. 如果没有传入 PreferredType 参数，让 hint 等于"default"
    2. 如果 PreferredType 是 hint String，让 hint 等于"string"
    3. 如果 PreferredType 是 hint Number，让 hint 等于"number"
    4. 让 exoticToPrim 等于 GetMethod(input, `@@toPrimitive`)，意思就是获取参数 input 的 `@@toPrimitive` 方法
    5. 如果 exoticToPrim 不是 Undefined，那么就让 result 等于 `Call(exoticToPrim, input, « hint »)`，
       意思就是执行 `exoticToPrim(hint)`，如果执行后的结果 result 是原始数据类型，返回 result，否则就抛出类型错误的异常
    6. 如果 hint 是"default"，让 hint 等于"number"
    7. 返回 `OrdinaryToPrimitive(input, hint)` 抽象操作的结果

而 OrdinaryToPrimitive 方法也接受两个参数，一个是输入的值 O，一个也是期望转换的类型 hint。

    1. 如果输入的值是个对象
    2. 如果 hint 是个字符串并且值为’string’或者’number’
    3. 如果 hint 是’string’，那么就将 methodNames 设置为 toString、valueOf
    4. 如果 hint 是’number’，那么就将 methodNames 设置为 valueOf、toString
    5. 遍历 methodNames 拿到当前循环中的值 name，将 method 设置为 `O[name]`（即拿到 O 的 valueOf 和 toString 两个方法）
    6. 如果 method 可以被调用，那么就让 result 等于 method 执行后的结果，如果 result 不是对象就返回 result，否则就抛出一个类型错误的报错。

在 ES6 之后提供了 Symbol.toPrimitive 方法，该方法在类型转换的时候优先级最高。
*/
console.log("========== 隐式转换 ==========")
console.log("hello + {}: ", "hello" + {})

const obj = {
    toString() {
        return "1111";
    },
    valueOf() {
        return 222;
    },
    [Symbol.toPrimitive]() {
        return 666;
    },
};

const num = 1 + obj; // 667
const str = "1" + obj; // '1666'
console.log("num: ", num)
console.log("str: ", str)
