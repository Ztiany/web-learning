const num1 = 1;
const num2 = Object(num1);
const num3 = new Object(num1);
console.log(num1 === num2);
console.log(num2 === num3);
