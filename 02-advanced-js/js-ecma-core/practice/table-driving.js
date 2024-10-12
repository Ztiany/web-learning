/*
 * 表驱动法：
 *
 *  表驱动法就是一种编程模式，从表里面查找信息而不使用逻辑语句。事实上，凡是能通过逻辑语句来选择的事物，都可以通过查表来选择。
 *  对简单的情况而言，使用逻辑语句更为容易和直白。但随着逻辑链的越来越复杂，查表法也就愈发显得更具吸引力。
 */

// bad
function isQualifiedV1(age) {
    return age === 10 || age === 20 || age === 30 || age === 40;
}

// good
const ages = [10, 20, 30, 40];

function isQualifiedV2(age) {
    return ages.indexOf(age) >= 0;
}
