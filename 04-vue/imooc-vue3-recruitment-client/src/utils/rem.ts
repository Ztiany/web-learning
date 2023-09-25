/**
 * 基准大小
 */
const baseREM = 37.5;

function setREM() {
    const scale = document.documentElement.clientWidth / 750;
    document.documentElement.style.fontSize = baseREM * Math.min(scale, 1) + 'px'
    return document.documentElement.style.fontSize;
}

// 初始化
setREM();

// 监听
window.onreset = function () {
    const result = setREM();
    console.log('window size has changed, adjust fontSize to ' + result)
};

export default baseREM;