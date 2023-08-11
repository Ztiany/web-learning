// noinspection DuplicatedCode
// step 8（压缩）

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const checksum = require('checksum');
const mime = require('mime'); // 引入mime包

const httpServer = http.createServer((req, res) => {
    handleHttpRequest(req, res)
})

httpServer.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

httpServer.listen(8080, () => {
    console.log('opened server-compression on', httpServer.address());
})

function handleHttpRequest(req, res) {
    const fullUrl = `http://${req.headers.host}${req.url}`;
    const {pathname} = url.parse(fullUrl);

    // 解析请求的路径
    let filepath = path.resolve(__dirname, path.join('../www', pathname));
    console.log(`fullUrl = ${fullUrl}, pathname = ${pathname}, filepath = ${filepath}`)

    if (fs.existsSync(filepath)) {
        const stats = fs.statSync(filepath);
        const isDir = stats.isDirectory();
        if (isDir) {
            filepath = path.join(filepath, "index.html");
        }
        if (!isDir || fs.existsSync(filepath)) {
            checksum.file(filepath, (err, sum) => {
                sum = `"${sum}"`; // etag 要加双引号
                respondContent(filepath, req, res, stats, sum);
            })
            return;
        }
    }

    // default
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('<h1>Not Found</h1>');
}

function getMimeType(filepath) {
    return mime.getType(filepath);
}

const supportedAlgorithms = new Set()
supportedAlgorithms.add('gzip');
supportedAlgorithms.add('deflate');
supportedAlgorithms.add('br');

function setCompressAlgorithm(req, mimeType, headers) {
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
        headers['Content-Encoding'] = algorithm;
    }
    return {compress: compress && Boolean(algorithm), algorithm: algorithm};
}

function respondContent(filepath, req, res, stats, sum) {
    console.log("respondContent is called.");
    if (req.headers['if-none-match'] === sum) {
        console.log(`return 304 for ${filepath}`);
        /*
        尽管返回 304 状态码已经明确指示资源未被修改，但仍然有必要在响应中包含 ETag 头部。
        ETag（实体标签）是一个唯一标识符，用于标识服务器上的资源版本。它可以是一个哈希值、时间戳或其他表示资源状态的字符串。

        包含 ETag 头部的主要目的是在将来的请求中使用它进行缓存验证。客户端可以在后续请求中使用 If-None-Match 头部将之前
        获取的 ETag 值发送回服务器，以检查资源是否发生了变化。如果服务器仍然返回相同的 ETag 值，那么客户端可以继续使用缓存
        的副本，而无需重新下载资源。

        因此，即使在返回 304 状态码时，建议仍然包含 ETag 头部。这样可以确保客户端在将来的请求中能够正确地验证缓存，并且服务
        器可以提供正确的缓存控制。
        */
        res.writeHead(304, {
            'Content-Type': getMimeType(filepath),
            etag: sum,
        });
        return res.end();
    }

    const mimeType = getMimeType(filepath);
    const headers = {
        'Content-Type': mimeType,
        etag: sum,
    }

    const {compress, algorithm} = setCompressAlgorithm(req, mimeType, headers);

    res.writeHead(200, headers);

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
        fileStream.pipe(comp).pipe(res);
    } else {
        fileStream.pipe(res)
    }

}