const _ = require("underscore");

const obj = {a: 1, b: 2, c: 3};
const objTransformed = _.map(obj, (k, v) =>
    k + "=" + v
);
console.log(objTransformed);