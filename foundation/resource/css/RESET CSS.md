一些 HTML 标签在浏览器中会有默认样式，例如：body 标签会有 `margin:8px` ul 标签会有 `margin:16px 0` 及 `padding-left:40px`。

当我们在切图软件中进行尺寸或位置测量的时候，把测量出来的数值设置到对应的标签上时，可能会受到当前标签默认样式的影响，从而页面显示效果跟设计图效果不符。

通常在网页开发中，要去掉这些影响尺寸和位置的默认样式及其他影响布局的默认值。可以参考 [CSS Tools: Reset CSS](https://meyerweb.com/eric/tools/css/reset/) 方案。

由于 Reset CSS 相对“暴力”，不管你有没有用，统统重置成一样的效果，且影响的范围很大，所以更加“平和”的一种方式 [Normalize CSS](https://github.com/necolas/normalize.css/blob/master/normalize.css) 诞生了。

Normalize CSS 可以看成是一种 Reset CSS 的替代方案。创造 Normalize CSS 有下面这几个目的：

* 保护有用的浏览器默认样式而不是完全去掉它们；
* 一般化的样式：为大部分 HTML 元素提供一致的样式；
* 修复浏览器自身的 bug 并保证各浏览器的一致性；
* 优化 CSS 可用性：用一些小技巧来优化 CSS 的可用性；
* 解释代码：用注释和详细的文档来解释代码的目的和用法。
