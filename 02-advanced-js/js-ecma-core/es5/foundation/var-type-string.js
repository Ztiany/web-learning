/*
具体参考：<https://wangdoc.com/javascript/types/string>

==========================================================
                        字符串编码
==========================================================

1. JavaScript 使用 Unicode 字符集。JavaScript 引擎内部，所有字符都用 Unicode 表示。
2. JavaScript 不仅以 Unicode 储存字符，还允许直接在程序中使用 Unicode 码点表示字符，
   即将字符写成 \uxxxx 的形式，其中 xxxx 代表该字符的 Unicode 码点。比如，\u00A9 代表版权符号。
3. 每个字符在 JavaScript 内部都是以 16 位（即 2 个字节）的 UTF-16 格式储存。也就是说，
   JavaScript 的单位字符长度固定为 16 位长度，即 2 个字节。
4. UTF-16 有两种长度：对于码点在 U+0000 到 U+FFFF 之间的字符，长度为 16 位（即 2 个字节）；对于
   码点在 U+10000 到 U+10FFFF 之间的字符，长度为 32 位（即 4 个字节），而且前两个字节在 0xD800
   到 0xDBFF 之间，后两个字节在 0xDC00 到 0xDFFF 之间。
5. JavaScript 对 UTF-16 的支持是不完整的，由于历史原因，只支持两字节的字符，不支持四字节的字符。
   这是因为 JavaScript 第一版发布的时候，Unicode 的码点只编到 U+FFFF，因此两字节足够表示了。
6. 对于码点在 U+10000 到 U+10FFFF 之间的字符，JavaScript 总是认为它们是两个字符（length 属性为 2）。
*/
console.log("========== 字符串编码 ==========")
console.log("'𝌆'.length: ", '𝌆'.length);

// 为了确保字符串长度的准确性，尤其是在处理包含代理对字符的字符串时，你可以使用以下方法：
function getAccurateStrLength1(str) {
    return Array.from(str).length
}

function getAccurateStrLength2(str) {
    let length = 0;
    for (const char of str) {
        length++;
    }
    return length;
}

function getAccurateStrLength3(str) {
    let length = 0;
    for (let i = 0; i < str.length;) {
        const codePoint = str.codePointAt(i);
        if (codePoint >= 0x10000) {
            // 代理对字符
            i += 2;
        } else {
            // 基本多文种平面（BMP）字符
            i++;
        }
        length++;
    }
    return length;
}

console.log("Array.from('𝌆').length", getAccurateStrLength1('𝌆')); // 输出: 1
console.log("for...of: ", getAccurateStrLength2('𝌆')); // 输出: 1
console.log("codePointAt: ", getAccurateStrLength3('𝌆')); // 输出: 1

/*
==========================================================
                        Base64 转码
==========================================================

JavaScript 原生提供两个 Base64 相关的方法。
btoa()：任意值转为 Base64 编码
atob()：Base64 编码转为原来的值
*/
console.log("========== Base64 转码 ==========")
function b64Encode(str) {
    return btoa(encodeURIComponent(str));
}

function b64Decode(str) {
    return decodeURIComponent(atob(str));
}

let str = "Hello, World";
let base64Str = b64Encode(str);

console.log("base64 of  \"Hello, World\": ", base64Str);
console.log("b64Decode: ", b64Decode(base64Str));
