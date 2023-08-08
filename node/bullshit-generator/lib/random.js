/**
 *
 * randomInt 函数返回一个大于等于 min，小于 max 的随机整数。
 * 使用算法：用 Math.random() 对 min 和 max 两个参数进行线性插值，然后将结果向下取整。
 *
 * @param min
 * @param max
 * @returns {number}
 */
export function randomInt(min, max) {
    // decimal 在 0 到 1 之间，区间为 [0, 1)。
    const decimal = Math.random();
    return Math.floor(min * (1 - decimal) + max * decimal);
}

/**
 * 基于数组，创建一个随机选择数组内元素的函数。
 *
 * @param arr
 * @returns {randomPick}
 */
export function createRandomPicker(arr) {
    // copy 数组，以免修改原始数据
    arr = [...arr];

    function randomPick() {
        const len = arr.length - 1;
        const index = randomInt(0, len);
        const picked = arr[index];
        // 把这次选中的，放到最后一个，防止下次可能又被选中，否则就可能会连续生成两句一样的句子。
        [arr[picked], arr[len]] = [arr[len], arr[picked]];
        return picked;
    }

    // 抛弃第一次选择结果（否则初始在数组末位的那个元素，第一次肯定不会被取到，破坏了随机性；）
    randomPick()

    return randomPick;
}