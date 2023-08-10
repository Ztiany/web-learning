// noinspection DuplicatedCode
// step 7（基于数字签名的缓存协商）

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const checksum = require('checksum');
const mime = require('mime'); // 引入mime包

const httpServer = http.createServer((req, res) => {
    handleHttpRequest(req, res)
})

httpServer.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

httpServer.listen(8080, () => {
    console.log('opened server-cache-3 on', httpServer.address());
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

function respondContent(filepath, req, res, stats, sum) {
    if (req.headers['if-none-match'] === sum) {
        res.writeHead(304, {
            'Content-Type': getMimeType(filepath),
            etag: sum,
        });
        return res.end();
    }

    res.writeHead(200, {
        'Content-Type': getMimeType(filepath),
        etag: sum,
    });
    const fileStream = fs.createReadStream(filepath);// 以流的方式读取文件内容
    fileStream.pipe(res);// pipe 方法可以将两个流连接起来，这样数据就会从上游流向下游
}
