"use strict";
/*
具体参考：

    - <https://wangdoc.com/javascript/stdlib/attributes>

==========================================================
                    属性描述对象
==========================================================

JavaScript 提供了一个内部数据结构，用来描述对象的属性，控制它的行为，比如
该属性是否可写、可遍历等等。这个内部数据结构称为“属性描述对象”（attributes
 object）。每个属性都有自己对应的属性描述对象，保存该属性的一些元信息。

一个属性描述对象有如下属性：

    {
      value: 123,
      writable: false,
      enumerable: true,
      configurable: false,
      get: undefined,
      set: undefined
    }

    （1）value：value 是该属性的属性值，默认为 undefined。

    （2）writable：writable 是一个布尔值，表示属性值（value）是否可改变（即是否可写），默认为 true。

    （3）enumerable：enumerable 是一个布尔值，表示该属性是否可遍历，默认为 true。如果设为 false，
        会使得某些操作（比如 for...in 循环、Object.keys()）跳过该属性。

    （4）configurable：configurable 是一个布尔值，表示属性的可配置性，默认为 true。如果设为 false，
        将阻止某些操作改写属性描述对象，比如无法删除该属性，也不得改变各种元属性（value 属性除外）。也就
        是说，configurable 属性控制了属性描述对象的可写性。

    （5）get：get 是一个函数，表示该属性的取值函数（getter），默认为 undefined。

    （6）set：set 是一个函数，表示该属性的存值函数（setter），默认为 undefined。

相关操作方法：

    1. 通过 Object.getOwnPropertyDescriptor() 可以获取属性的描述对象。
       注意，Object.getOwnPropertyDescriptor() 方法只能用于对象自身的
       属性，不能用于继承的属性。

    2. Object.getOwnPropertyNames() 方法返回一个数组，成员是参数对象自身
       的全部属性的属性名，不管该属性是否可遍历。这跟 Object.keys 的行为不同，
       Object.keys 只返回对象自身的可遍历属性的全部属性名。

   3. Object.defineProperty() 方法允许通过属性描述对象，定义或修改一个属性，
      然后返回修改后的对象。用法：

        Object.defineProperty(object, propertyName, attributesObject)

      如果属性已经存在，Object.defineProperty() 方法相当于更新该属性的属性描述对象。

    4. Object.defineProperties() 方法允许通过属性描述对象，定义或修改一个或多个属性，

    5. Object.prototype.propertyIsEnumerable() 方法返回一个布尔值，用来判断某个属
       性是否可遍历。注意，这个方法只能用于判断对象自身的属性，对于继承的属性一律返回 false。

*/
console.log("========== 属性描述对象 ==========")
const object1 = {
    property1: 42,
    property2: "hello"
}
console.log("PropertyDescriptor of property1: ", Object.getOwnPropertyDescriptor(object1, "property1"))
console.log("PropertyDescriptor of property2: ", Object.getOwnPropertyDescriptor(object1, "property2"))
console.log("PropertyDescriptor of toString: ", Object.getOwnPropertyDescriptor(Object.getPrototypeOf(object1), "toString"))
console.log("Object.getOwnPropertyNames(object1): ", Object.getOwnPropertyNames(object1))

const object2 = Object.defineProperty(object1, 'property3', {
    value: 123,
    writable: false,
    enumerable: true,
    configurable: false
});

Object.defineProperties(object1, {
    p1: {value: 123, enumerable: true},
    p2: {value: 'abc', enumerable: false},
    // 注意，一旦定义了取值函数 get（或存值函数 set），就不能将 writable 属性设为 true，或者同时定义 value 属性，否则会报错。
    p3: {
        get: function () {
            return this.p1 + this.p2
        },
        enumerable: true,
        configurable: true
    }
});

console.log("object1 === object2: ", object1 === object2)
console.log("Object.getOwnPropertyNames(object2): ", Object.getOwnPropertyNames(object2))
console.log("object1.propertyIsEnumerable(p1): ", object1.propertyIsEnumerable("p1"))
console.log("object1.propertyIsEnumerable(p2): ", object1.propertyIsEnumerable("p2"))
console.log("object1.propertyIsEnumerable(p3): ", object1.propertyIsEnumerable("p3"))
console.log("object1.propertyIsEnumerable(toString): ", object1.propertyIsEnumerable("toString"))

/*

==========================================================
                        元属性
==========================================================

    1. value 属性是目标属性的值。

    2. writable 属性是一个布尔值，决定了目标属性的值（value）是否可以被改变。
       正常模式下，对 writable 为 false 的属性赋值不会报错，只会默默失败。
       但是，严格模式下会报错，即使对 a 属性重新赋予一个同样的值。

       如果原型对象的某个属性的 writable 为 false，那么子对象将无法自定义这个属性。
       如果是严格模式，这样做还会抛出一个错误。但是，有一个规避方法，就是通过覆盖属性
       描述对象，绕过这个限制。原因是这种情况下，原型链会被完全忽视。

   3. enumerable（可遍历性）返回一个布尔值，表示目标属性是否可遍历。JavaScript 的
      早期版本，for...in 循环是基于 in 运算符的。我们知道，in 运算符不管某个属性是
      对象自身的还是继承的，都会返回 true。

      如果一个属性的enumerable为false，下面三个操作不会取到该属性。

           - for..in 循环：
           - Object.keys 方法
           - JSON.stringify 方法：有时可以利用这一点。如果对象的 JSON 格式输出要排除
             某些属性，就可以把这些属性的 enumerable 设为 false。

      注意：

            for...in 循环包括继承的属性；
            Object.keys 方法不包括继承的属性。
            如果需要获取对象自身的所有属性，不管是否可遍历，可以使用 Object.getOwnPropertyNames 方法。

    4. configurable(可配置性）返回一个布尔值，决定了是否可以修改属性描述对象。也就是说，configurable
       为 false 时，writable、enumerable 和 configurable 都不能被修改了。

        - writable 属性只有在 false 改为 true 时会报错，true 改为 false 是允许的。
        - value 属性的情况比较特殊。只要 writable 和 configurable 有一个为 true，就允许改动 value。
        - 可配置性还决定了目标属性是否可以被删除（delete），当且仅当 configurable 为 true 时，目标属性才能被删除。

*/
console.log("========== 元属性 ==========")

const prototype1 = Object.defineProperty({}, 'foo', {
    value: 'a',
    writable: false
});

// writable 为 false，所以无法修改属性值，也无法覆盖继承的属性。严格模式下会报错。
try {
    const object2 = Object.create(prototype1);
    object2.foo = 'b';
    console.log("object2.foo: ", object2.foo); // a
} catch (e) {
    console.log("Error: ", e.message)
}

// 就是通过覆盖属性描述对象，绕过 writable 限制。原因是这种情况下，原型链会被完全忽视。
const object3 = Object.create(prototype1);
Object.defineProperty(object3, 'foo', {
    value: 'b'
});
console.log("object3.foo: ", object3.foo); // b


const object4 = Object.defineProperties({}, {
    foo: {
        value: 123,
        writable: false,
        enumerable: true,
        configurable: false
    },
    bar: {
        value: 'abc',
        writable: false,
        enumerable: true,
        configurable: false
    }
});

console.log("object4: ", object4)

// writable 为 false，所以无法修改属性值。严格模式下会报错。
try {
    object4.foo = 456;
    console.log("object4.foo: ", object4.foo); // 123
} catch (e) {
    console.log("Error: ", e.message)
}

// configurable 为 false，无法重新定义属性。严格模式下会报错。
try {
    Object.defineProperty(object4, 'bar', {
        value: 'xyz'
    })
    console.log("object4.bar: ", object4.bar); // abc
} catch (e) {
    console.log("Error: ", e.message)
}


/*

==========================================================
                        存取器
==========================================================

除了直接定义以外，属性还可以用存取器（accessor）定义。其中，存值函数称为
setter，使用属性描述对象的 set 属性；取值函数称为 getter，使用属性描述
对象的 get 属性。

一旦对目标属性定义了存取器，那么存取的时候，都将执行对应的函数。利用这个功能，
可以实现许多高级特性，比如定制属性的读取和赋值行为。

存取器往往用于，属性的值依赖对象内部数据的场合。
*/
console.log("========== 存取器 ==========")

// 定义 setter 和 getter 的第一种方法
const object5 = Object.defineProperty({}, 'p', {
    get: function () {
        return 'getter';
    },
    set: function (value) {
        console.log('setter: ' + value);
    }
});

// 定义 setter 和 getter 的第二种方法。区别：
//      第一种写法，属性 p 的 configurable 和 enumerable 都为 false，从而导致属性 p 是不可遍历的；
//      第二种写法，属性 p 的 configurable 和 enumerable 都为 true，因此属性 p 是可遍历的。实际开发中，写法二更常用。
const object6 = {
    get p() {
        console.log('call object6.getter');
        return 'getter';
    },
    set p(value) {
        console.log('call object6.setter');
        console.log('setter: ' + value);
    },
    name: 'object6'
};

console.log("object5", object5)
console.log("object6", object6)


/*

==========================================================
                        对象的拷贝
==========================================================

有时，我们需要将一个对象的所有属性，拷贝到另一个对象，可以用下面的方法实现。

    - for in 遍历对象的所有属性，然后逐一拷贝。
    - 通过 Object.defineProperty 方法来拷贝属性。
*/
console.log("========== 对象的拷贝 ==========")

/**
 * 这个方法的问题在于，如果遇到存取器定义的属性，会只拷贝值。【貌似在 nodejs 中没有这个问题】
 */
const extendFromV1 = function (to, from) {
    for (const property in from) {
        to[property] = from[property];
    }
    return to;
};

const extendFromV2 = function (to, from) {
    for (const property in from) {
        // hasOwnProperty 用来过滤掉继承的属性，否则可能会报错，因为
        // Object.getOwnPropertyDescriptor 读不到继承属性的属性描述对象。
        if (!from.hasOwnProperty(property)) continue;
        Object.defineProperty(
            to,
            property,
            Object.getOwnPropertyDescriptor(from, property)
        );
    }

    return to;
}

const object7 = extendFromV1(object6)
const object8 = extendFromV2(object6)
console.log("object7", object7)
console.log("object7", object7.p)
console.log("object8", object8)
console.log("object8", object8.p)

/*

==========================================================
                    控制对象状态
==========================================================

    1. Object.preventExtensions 方法可以使得一个对象无法再添加新的属性。（可以删除）
    2. Object.isExtensible 方法用于检查一个对象是否使用了 Object.preventExtensions
       方法。也就是说，检查是否可以为一个对象添加属性。

    3. Object.seal 方法使得一个对象既无法添加新属性，也无法删除旧属性。Object.seal 实质
       是把属性描述对象的 configurable 属性设为 false，因此属性描述对象不再能改变了。
    4. Object.isSealed 方法用于检查一个对象是否使用了 Object.seal 方法。

    5. Object.freeze 方法可以使得一个对象无法添加新属性、无法删除旧属性、也无法改变属性的值，
       使得这个对象实际上变成了常量。
    6. Object.isFrozen 方法用于检查一个对象是否使用了 Object.freeze方法。

上面的三个方法锁定对象的可写性有局限性：

    1. 可以通过改变原型对象，来为对象增加属性。一种解决方案是，把对象的原型也冻结住。
    2. 另外一个局限是，如果属性值是对象，上面这些方法只能冻结属性指向的对象，而不能冻结对象本身的内容。
*/
console.log("========== 控制对象状态 ==========")
const object9 = {
    a: 1
}

Object.freeze(object9)
try {
    object9.b = 2
} catch (e) {
    console.log("Error: ", e.message)
}
// 可以通过改变原型对象，来为对象增加属性。
const protoOfObject9 = Object.getPrototypeOf(object9);
protoOfObject9.c = 3;
console.log("object9.c: ", object9.c)
// 把对象的原型也冻结住
Object.freeze(protoOfObject9)
try {
    protoOfObject9.d = 4
} catch (e) {
    console.log("Error: ", e.message)
}
