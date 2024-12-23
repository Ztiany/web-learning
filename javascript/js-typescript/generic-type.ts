/*
==========================================================
                                   泛型
==========================================================
对于 TypeScript 中的类型别名、联合类型以及交叉类型，也将它们一一类比
到 JavaScript 中的变量、逻辑或与逻辑与，可以看出，其实 TypeScript 的本
质，是在对类型进行编程。

即 TypeScript 在 JavaScript 对值进行编程的能力之上，又给予了你对类型进
行编程的能力。为什么我们需要对类型进行编程？当然是因为，有时候类型世
界也存在着和实际值一致的逻辑，就像联合类型与交叉类型，就很好地证明了
这一点。

在绝大部分编程语言中，函数都是一个非常重要的概念，如果缺少了函数，我
们的代码可能会变得冗长晦涩，到处夹杂着重复的片段。而在函数中，最重要
的概念则是参数，参数是一个函数向外界开放的唯一入口，随着入参的差异，
函数可能也会表现出各不相同的行为。而「泛型」，其实本质就是类型世界中
的参数。
*/
type Status<T> = 'success' | 'failure' | 'pending' | T;

// 等价于 'success' | 'failure' | 'pending' | 'offline';
type CompleteStatus1 = Status<'offline'>;