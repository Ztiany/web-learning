/*
 尾递归优化的实现：具体参考 https://wangdoc.com/es6/function#%E5%B0%BE%E8%B0%83%E7%94%A8%E4%BC%98%E5%8C%96

 尾递归优化只在严格模式下生效，那么正常模式下，或者那些不支持该功能的环境中，有没有办法也使用尾递归优化呢？回答是可以的，就是自己实现尾递归优化。
 */
function tco(f) {
    let value;
    let active = false;
    const accumulated = [];

    return function accumulator() {
        accumulated.push(arguments);
        if (!active) {
            active = true;
            while (accumulated.length) {
                value = f.apply(this, accumulated.shift());
            }
            console.log(`value = ${value}`)
            active = false;
            return value;
        }
    };
}

const sum = tco(function (x, y) {
    if (y > 0) {
        // sum 就是 accumulator，前面所有的 accumulator 调用都返回 undefined。
        return sum(x + 1, y - 1)
    } else {
        return x
    }
});

console.log(sum(1, 100000));