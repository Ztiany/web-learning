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
