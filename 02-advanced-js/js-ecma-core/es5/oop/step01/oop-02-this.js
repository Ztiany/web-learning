/*
参考：

    - <https://wangdoc.com/javascript/stdlib/this>

==========================================================
                    this 关键字
==========================================================

this 关键字是一个非常重要的语法点。毫不夸张地说，不理解它的含义，大部分开
发任务都无法完成。

this 可以用在构造函数之中，表示实例对象。除此之外，this 还可以用在别的场合。
但不管是什么场合，this 都有一个共同点：它总是返回一个对象。

简单说，this 就是属性或方法“当前”所在的对象。`this.property` 就代表 property
属性当前所在的对象。

*/
console.log("========== this 关键字 ==========");

const person1 = {
    name: '张三',
    // 这里，this.name 表示 name 属性所在的那个对象。
    describe: function () {
        return '姓名：' + this.name;
    }
};

// 由于对象的属性可以赋给另一个对象，所以属性所在的当前对象是可变的，即 this 的指向是可变的。
const person2 = {
    name: '李四'
};
// 此时 person2.describe 中的 this 指向 person2 对象。
// 总结：只要函数被赋给另一个变量，this 的指向就会变。
person2.describe = person1.describe;
console.log("person2.describe()", person2.describe());

/*
参考代码：

    <input type="text" name="age" size=3 onChange="validate(this, 18, 99);">
    <script>
        function validate(obj, lowVal, hiVal){
          if ((obj.value < lowVal) || (obj.value > hiVal))
            console.log('Invalid Value!');
        }
    </script>

上面代码是一个文本输入框，每当用户输入一个值，就会调用 onChange 回调函数，验证这个值是否在指定范围。
浏览器会向回调函数传入当前对象，因此 this 就代表传入当前对象（即文本框），然后就可以从 this.value
上面读到用户的输入值。

总结一下，JavaScript 语言之中，一切皆对象，运行环境也是对象，所以函数都是在某个对象之中运行，this 就
是函数运行时所在的对象（环境）。这本来并不会让用户糊涂，但是 JavaScript 支持运行环境动态切换，也就是说，
this 的指向是动态的，没有办法事先确定到底指向哪个对象，这才是最让初学者感到困惑的地方。
*/
function describe() {
    return '姓名：' + this.name;
}

const person3 = {
    name: '张三',
    describe: describe
};

const person4 = {
    name: '李四',
    describe: describe
};

console.log(person3.describe());
console.log(person4.describe());

/*
==========================================================
                    this 的实质
==========================================================

JavaScript 语言之所以有 this 的设计，跟内存里面的数据结构有关系。

    var obj = { foo:  5 };

上面的代码将一个对象赋值给变量 obj。JavaScript 引擎会先在内存里面，
生成一个对象 { foo: 5 }，然后把这个对象的内存地址赋值给变量 obj。
也就是说，变量 obj 是一个地址（reference）。后面如果要读取 obj.foo，
引擎先从 obj 拿到内存地址，然后再从该地址读出原始的对象，返回它的 foo 属性。

原始的对象以字典结构保存，每一个属性名都对应一个属性描述对象。举例来说，上面
例子的 foo 属性，实际上是以下面的形式保存的。

    {
      foo: {
        [[value]]: 5
        [[writable]]: true
        [[enumerable]]: true
        [[configurable]]: true
      }
    }

foo 属性的值保存在属性描述对象的 value 属性里面。这样的结构是很清晰的，问题在
于属性的值可能是一个函数。

    var obj = { foo: function () {} };

这时，引擎会将函数单独保存在内存中，然后再将函数的地址赋值给 foo 属性的 value 属性。

而由于函数是一个单独的值，所以它可以在不同的环境（上下文）执行。

    var f = function () {};
    var obj = { f: f };

JavaScript 允许在函数体内部，引用当前环境的其他变量。

    var f = function () {
        console.log(x);
    };

上面代码中，函数体里面使用了变量 x。该变量由运行环境提供。

现在问题就来了，由于函数可以在不同的运行环境执行，所以需要
有一种机制，能够在函数体内部获得当前的运行环境（context）。
所以，this 就出现了，它的设计目的就是在函数体内部，指代函
数当前的运行环境。

    var f = function () {
      console.log(this.x);
    }

上面代码中，函数体里面的 this.x 就是指当前运行环境的 x。
*/

console.log("========== this 的实质 ==========");
console.log("");


/*
==========================================================
                    this 使用场合
==========================================================

（1）全局环境：全局环境使用 this，它指的就是顶层对象 window【web 环境中】。
（2）构造函数：构造函数中的 this，指的是实例对象。
（3）对象的方法：如果对象的方法里面包含 this，this 的指向就是方法运行时所在的对象。该方法赋值给另一个对象，就会改变 this 的指向。
*/
console.log("========== this 使用场合 ==========");

// 第三条规则不容易把握，obj.foo 方法执行时，它内部的 this 指向 obj1。
const obj1 = {
    foo: function () {
        console.log(this);
    }
};

/*
下面这几种用法，都会改变 this 的指向。下面代码中，obj.foo 就是一个值。
这个值真正调用的时候，运行环境已经不是 obj 了，而是全局环境，所以 this
不再指向 obj。
*/
// 情况一
//(obj1.foo = obj1.foo)() // window
// 情况二
//(false || obj1.foo)() // window
// 情况三
//(1, obj1.foo)() // window

/*
可以这样理解，JavaScript 引擎内部，obj 和 obj.foo 储存在两个内存地址，称为地址一和地址二。

    obj.foo() 这样调用时，是从地址一调用地址二，因此地址二的运行环境是地址一，this 指向 obj。
    但是，上面三种情况，都是直接取出地址二进行调用，这样的话，运行环境就是全局环境，因此 this 指向全局环境。

上面三种情况等同于下面的代码。

        // 情况一
        (obj.foo = function () {
          console.log(this);
        })()
        // 等同于
        (function () {
          console.log(this);
        })()

        // 情况二
        (false || function () {
          console.log(this);
        })()

        // 情况三
        (1, function () {
          console.log(this);
        })()

如果 this 所在的方法不在对象的第一层，这时 this 只是指向当前一层的对象，而不会继承更上面的层。
*/

/*
==========================================================
                    this 使用注意点
==========================================================

*/
console.log("========== this 使用注意点 ==========");
