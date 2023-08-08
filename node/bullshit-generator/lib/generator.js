import {randomInt, createRandomPicker} from "./random.js";

/**
 * 生成一句话。
 *
 * @param pick 生成一句话的函数
 * @param replacer 替换占位的规则
 * @returns {*}
 */
function sentence(pick, replacer) {
    // 返回一个句子文本
    let ret = pick();
    // replacer是一个对象，存放替换占位符的规则
    for (const key in replacer) {
        // 如果 replacer[key] 是一个 pick 函数，那么执行它随机取一条替换占位符，否则将它直接替换占位符
        ret = ret.replace(
            new RegExp(`{{${key}}}`, 'g'),
            typeof replacer[key] === 'function' ? replacer[key]() : replacer[key]
        );
    }
    return ret;
}

export function generate(title, {
    corpus,
    min = 6000,
    max = 10000
} = {}) {

    // 将文章长度设置为 min 到 max之间的随机数
    const articleLength = randomInt(min, max);

    const {famous, bosh_before, bosh, said, conclude} = corpus;
    const [
        pickFamous,
        pickBoshBefore,
        pickBosh,
        pickSaid,
        pickConclude
    ] = [famous, bosh_before, bosh, said, conclude].map((item) => {
        return createRandomPicker(item);
    });

    const article = [];
    let totalLength = 0;

    while (totalLength < articleLength) {

        let section = ''; //用于存储段落
        const sectionLength = randomInt(200, 500); // 将段落长度设为 200 到 500 字之间

        console.log()

        // 继续的条件：如果当前段落字数小于段落长度，或者当前段落不是以句号。和问号结尾
        while (section.length < sectionLength || !/[。？]$/.test(section)) {

            /*
            规定每个段落的字数在 200~500 字之间。
                1. 每个段落包含 20% 的名人名言（famous），80% 的废话（bosh)；
                2. 其中，废话里带前置从句（bosh_before）的废话占文章句子的 30%，不带前置从句的废话占文章句子的 50%；
                3. 带前置从句（bosh_before）的废话不能作为开头。
             */
            const num = randomInt(0, 100);
            if (num < 20) {
                // 如果 n 小于 20，生成一条名人名言，也就是文章中有百分之二十的句子是名人名言
                section += sentence(pickFamous, {said: pickSaid, conclude: pickConclude})
            } else if (num < 50 && !section) {
                // 如果 n 小于 50，生成一个带有前置从句的废话
                section += sentence(pickBoshBefore, {title}) + sentence(pickBosh, {title})
            } else {
                // 否则生成一个不带有前置从句的废话
                section += sentence(pickBosh, {title});
            }
        }

        totalLength += section.length;
        article.push(section);

    }

    return article;
}