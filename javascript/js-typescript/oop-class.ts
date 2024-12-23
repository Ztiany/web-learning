/*
==========================================================
                                    面向对象与类简介
==========================================================

Class 虽然也是从 ES6 开始就一直陪伴着我们，但它被使用的频率就要少得多。
因为对于相当一部分前端开发者来说，JavaScript 是踏入编程世界后第一门深
度接触的编程语言。而面向过程和面向对象这两个概念，显然是前者在 JavaScript
中更为主流。

面向过程和面向对象指的分别是什么？你可以认为它们是实现同一种效果的不
同手段而已。比如类比到做一锅黄焖鸡：

        - 面向对象要求你分别建立鸡肉对象、土豆对象、青椒对象、锅对象等等，
           这些对象携带着自己的信息，只要将它们组合在一起就是一道菜。
       - 而面向过程的范式则是，按照顺序逐步完成这道菜，依次备菜、起锅烧
          油、煎炒、焖等等。

区别在于你的执行流程不同。面向对象强调对象的封装、组合与交互，而面向
过程强调程序的执行流程。

假设我们需要计算一个圆形的面积与周长。
*/
console.log("---------- 面向对象与类简介 ----------");

// 使用面向对象的编程范式，我们需 * 要对“圆形”这个概念抽象并建立一个对象：
class Circle {

    private readonly radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    getArea() {
        return Math.PI * this.radius * this.radius;
    }

    getPerimeter() {
        return 2 * Math.PI * this.radius;
    }

}

// 使用面向过程的编程范式中则是这样的：
function getCircleArea(radius: number) {
    return Math.PI * radius * radius;
}

function getCircumference(radius: number) {
    return 2 * Math.PI * radius;
}

const radiusA = 10;
const radiusB = 20;
console.log(`radiusA 面积为：${getCircleArea(radiusA)}， 周长为：${getCircumference(radiusA)}.`);
console.log(`radiusB 面积为：${getCircleArea(radiusB)}， 周长为：${getCircumference(radiusB)}.`);

/*
面向过程的写法中我们并没有建立圆这个概念，虽然我们知道是在计算圆的面
积与周长，但代码中出现的却只有圆的半径。

同时我们可以发现，函数与 Class，分别是面向过程和面向对象这两种编程范
式中的底层实现依赖。函数我们很容易理解，它接受一个入参再返回一个出参，
对过程的封装使得我们可以将执行流程中的备菜、起锅烧油、煎炒等都封装成
函数，并按照顺序调用。那么，为什么我们在面向对象的编程范式中需要 Class
的存在？

如果我们要对人这个物种进行建模，用面向对象的方法，我们可以定义一个
Person 类，这个类中可以包含人的姓名、年龄、性别等属性，以及吃饭、睡
觉、工作等方法。

对于面向过程的写法，我们需要定义多个变量和函数来表示对人的建模，这些
变量与函数会分散在代码里的各处，虽然我们知道这些都是属于 Person 相关的
操作，但代码层面可体现不出来。因此 Class 的第一个好处就体现出来了：封装性。
它将一个对象相关的所有属性和方法封装在 Class 内部，供外界进行交互。

随着项目的开发，程序中的对象也会越来越多，它们有可能是 Person 和 Student
这样存在父子关系的对象（即，Student 一定是 Person），也可能是 Person 和
Animal 这样可能存在引用关系的对象（即，Person 中有个属性 pet 是 Animal 的
实例）...，这些对象之间很可能存在公用的属性和方法，比如 Student 和 Worker
中都包括了来自于 Person 的那部分属性，我们肯定不希望每次都重新定义它们。
此时，可以通过继承 Person ，额外添加属性和方法来实现一个新的对象。这就是
我们需要 Class 的另一个重要原因：继承能力。通过对已知对象的一层层扩展，
我们能够构建出清晰的关系链，大大减少重复属性的编写，获得更简洁与易于维
护的代码。

Class 之所以被视为面向对象编程范式中最重要的概念，主要就是因为它提供了
很好的封装与继承能力，让我们能够更直观地建模出程序中的各个对象类型。

上面定义的 Person 类，已经展示了如何在 TypeScript 中定义一个 Class 了。
相比 JavaScript，TypeScript 在 Class 的定义上增加了许多新特性，比如修饰
符、泛型、接口等等。这些特性的引入，使得 TypeScript 的 Class 更加强大与灵
活，能够更好地满足我们在项目中对对象的建模需求。
*/


/*
==========================================================
                                为工具方法的命名空间
==========================================================

Class 还有一个不那么常用的使用方式，即作为工具方法的命名空间。举例来说，
在 JavaScript 中，我们可能会在 utils 文件夹下封装很多通用的函数：

            export function isSameDate(){ } // 判断两个日期是否是同一天
            export function diffDate(){ } // 判断两个日期的差值
            export function getRandomInt(){ } // 获取随机整数

如果这些工具方法都放置在一个文件内部，那使用起来就可能显得混乱：你在
一个文件里同时导出了用于处理日期、数字、数组、业务逻辑的工具方法，而
如果要拆分成多个文件，可能又会出现部分文件里只有寥寥一两个函数的情况。
此时你可以考虑使用 Class ，将一批功能类似的方法收拢到一个 Class 内部：

            export class DateUtils {
              static isSameDate(){ }
              static diffDate(){ }
            }

            export class NumberUtils {
                    ...
             }

            export class UserListUtils {
                    ...
             }

这里的 static 称为“静态成员”，它表示这个方法不需要实例化对象就可以直接
调用。在别的模块中，可以通过 import { DateUtils } from './utils' 的方式引入
这个 Class，然后直接调用 DateUtils.isSameDate() 即可。

            import { DateUtils } from './utils';
            DateUtils.isSameDate();
 */
console.log("---------- 为工具方法的命名空间 ----------");

class StringUtils {

    static isBlank(str: string): boolean {
        return str.trim() === '';
    }

    static isNotBlank(str: string): boolean {
        return !StringUtils.isBlank(str);
    }

}