const fs = require('fs');
const path = require('path');

let dataCache = null;
let printed = false

function loadData() {
    if (dataCache) {
        return dataCache;
    }

    const file = path.resolve(__dirname, '../mock/data.json');
    const data = JSON.parse(fs.readFileSync(file, {encoding: 'UTF-8'}));
    const reports = data.dailyReports; // 数组格式的数据
    dataCache = {};
    // 把数组数据转换成以日期为 ke y的 JSON 格式并缓存起来
    reports.filter((report) => !!report)
        .forEach((report) => {
            const name = report.updatedDate;
            dataCache[name] = report;
        });
    return dataCache;
}

function getCoronavirusKeyIndex() {
    return Object.keys(loadData());
}

function getCoronavirusByDate(date) {
    const dailyData = loadData()[date] || {};
    if (dailyData.countries) {
        // 按照各国确诊人数排序
        dailyData.countries.sort((a, b) => {
            return b.confirmed - a.confirmed;
        });
    }
    return dailyData;
}

module.exports = {
    getCoronavirusByDate,
    getCoronavirusKeyIndex,
};