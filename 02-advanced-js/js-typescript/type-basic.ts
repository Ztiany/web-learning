let x = null; // 类型拓宽成 any
let y = undefined; // 类型拓宽成 any

/** -----分界线------- */
const z = null; // 类型是 null
let anyFun = (param = null) => param; // 形参类型是 null
let z2 = z; // 类型是 null
let x2 = x; // 类型是 null
let y2 = y; // 类型是 undefined

console.log(z2); // null