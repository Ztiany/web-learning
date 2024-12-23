import {existsSync, mkdirSync, writeFileSync, readFileSync} from 'fs';
import {fileURLToPath} from 'url'
import {dirname, resolve} from 'path'

export function loadCorpus(src) {
    // 获取当前脚本文件的 url
    const currentFileUrl = import.meta.url;
    // 拼接出路径：dirname 方法可以获得当前 JS 文件的目录，而 resolve 方法可以将 JS 文件目录和相对路径拼在一起，最终获得正确的文件路径。
    const path = resolve(dirname(fileURLToPath(currentFileUrl)), '..', src)
    // 读取内容
    const data = readFileSync(path, {encoding: 'utf-8'});
    // 解析成 json 对象并返回
    return JSON.parse(data)
}

export function saveArticle(title, content) {
    const currentFileUrl = import.meta.url;
    const outputDir = resolve(dirname(fileURLToPath(currentFileUrl)), '..', "output")
    const time = Date.now();
    const outputFile = resolve(outputDir, `${title}-${time}.txt`);
    if (!existsSync(outputDir)) {
        mkdirSync(outputDir);
    }

    const text = `${title}\n\n    ${content.join('\n    ')}`;
    writeFileSync(outputFile, text);

    return outputFile;
}
