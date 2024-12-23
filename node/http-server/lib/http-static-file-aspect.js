// noinspection DuplicatedCode

const url = require('url');
const path = require("path");
const fs = require("fs");
const checksum = require("checksum");
const mime = require("mime");
const zlib = require("zlib");

async function serveStaticFile(defaultFile, {req, res}) {
    const fullUrl = `http://${req.headers.host}${req.url}`;
    const {pathname} = url.parse(fullUrl);

    // 解析请求的路径
    let filepath = path.resolve(__dirname, path.join('../www', pathname));
    console.log(`serveStaticFile: fullUrl = ${fullUrl}, pathname = ${pathname}, filepath = ${filepath}`)

    if (fs.existsSync(filepath)) {
        const stats = fs.statSync(filepath);
        const isDir = stats.isDirectory();
        if (isDir) {
            filepath = path.join(filepath, defaultFile || 'index.html');
            console.log(`serveStaticFile: modified filepath = ${filepath}`)
        }
        if (!isDir || fs.existsSync(filepath)) {
            return new Promise((resolve) => {
                checksum.file(filepath, (err, sum) => {
                    sum = `"${sum}"`; // etag 要加双引号
                    respondContent(filepath, req, res, stats, sum);
                    resolve()
                })
            })
        }
    }

    console.log(`serveStaticFile: ${filepath} doesn't exist.`)
    // default
    res.setHeader('Content-Type', 'text/html');
    res.body = '<h1>Not Found</h1>';
    res.statusCode = 404;
    return Promise.resolve();
}

function getMimeType(filepath) {
    return mime.getType(filepath);
}

const supportedAlgorithms = new Set()
supportedAlgorithms.add('gzip');
supportedAlgorithms.add('deflate');
supportedAlgorithms.add('br');

function setCompressAlgorithm(req, res, mimeType) {
    const acceptEncoding = req.headers['accept-encoding'];
    // 仅针对 text 和 application 类型的资源进行压缩，像图片等资源没有必要进行压缩。
    const compress = acceptEncoding && /^(text|application)\//.test(mimeType);
    let algorithm = "";
    if (compress) {
        // 返回客户端支持的一种压缩方式
        acceptEncoding.split(/\s*,\s*/).some((encoding) => {
            console.log(`test encoding = ${encoding}`);
            if (supportedAlgorithms.has(encoding)) {
                algorithm = encoding;
                return true
            }
            return false;
        });
    }
    console.log(`selected Content-Encoding = ${algorithm}`);
    if (algorithm) {
        res.setHeader('Content-Encoding', algorithm);
    }
    return {compress: compress && Boolean(algorithm), algorithm: algorithm};
}

function respondContent(filepath, req, res, stats, sum) {
    console.log("respondContent is called.");
    const mimeType = getMimeType(filepath);

    if (req.headers['if-none-match'] === sum) {
        console.log(`return 304 for ${filepath}`);
        res.setHeader('Content-Type', mimeType)
        res.setHeader('etag', sum);
        res.statusCode = 304
        return;
    }

    const {compress, algorithm} = setCompressAlgorithm(req, res, mimeType);

    res.statusCode = 200
    res.setHeader('Content-Type', mimeType)
    res.setHeader('etag', sum);

    const fileStream = fs.createReadStream(filepath);// 以流的方式读取文件内容
    if (compress) {
        let comp;
        // 使用指定的压缩方式压缩文件
        if (algorithm === 'gzip') {
            comp = zlib.createGzip();
        } else if (algorithm === 'deflate') {
            comp = zlib.createDeflate();
        } else {
            comp = zlib.createBrotliCompress();
        }
        res.body = fileStream.pipe(comp);
    } else {
        res.body = fileStream;
    }

}

// 静态文件支持
module.exports = function (defaultFile) {
    return async (context, next) => {
        await serveStaticFile(defaultFile, context)
        await next();
    }
}