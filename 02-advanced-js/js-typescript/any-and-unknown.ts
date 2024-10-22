/*
==========================================================
                                            any 类型
==========================================================

any 类型 = 万能类型 + 放弃类型检查。这是 TypeScript 提供的从弱类型到强
类型的一个过渡方案。一般情况下，我们不推荐使用 any 类型，因为这样会
放弃 TypeScript 的类型检查。
 */
console.log("---------- any 类型 ----------");

const anyValue: any = 'this is a string';
const username: string = 'Mike';
console.log("anyValue: ", anyValue);
console.log("username: ", username);


/*
==========================================================
                                            unknown 类型
==========================================================

any 类型 = 万能类型 + 放弃类型检查，其中「万能类型」是我们想要的，能不
能只要这个部分，而不要「放弃类型检查」这个危险的行为呢？当然！考虑到
 any 类型的危险性，TypeScript 中还提供了一个功能类似的家伙：unknown 类
 型，用于表示万能类型的同时，保留类型检查。我们先看万能类型的部分：
*/
console.log("---------- unknown 类型 ----------");

function testFuncA() {
    // 1，万能类型的体现。
    funcA({});
    funcA([]);
    funcA(true);
}

function funcA(param: unknown) {
    // 2，类型检查的体现，我们尝试使用一个 unknown 类型的变量时，类型
    // 检查系统阻止了我们，它要求我们先为这个变量提供一个具体的类型后
    // 才能使用。
    // param.toString()
}

/*
==========================================================
                                            类型断言
==========================================================
*/
console.log("---------- 类型断言 ----------");
function funcB(param: unknown) {
    // 通过 as 将 unknown 类型的变量转换为 string 类型。
    (param as string).toString()
}
