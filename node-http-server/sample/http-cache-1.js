// noinspection DuplicatedCode
// step 5（强缓存）

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const mime = require('mime'); // 引入mime包

const httpServer = http.createServer((req, res) => {
    handleHttpRequest(req, res)
})

httpServer.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

httpServer.listen(8080, () => {
    console.log('opened server-cache-1 on', httpServer.address());
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
            const {ext} = path.parse(filepath);//扩展名
            res.writeHead(200, {
                    'Content-Type': mime.getType(ext),
                    'Cache-Control': 'max-age=86400' //缓存一天（刷新浏览器进行验证）
                }
            );
            const fileStream = fs.createReadStream(filepath);// 以流的方式读取文件内容
            fileStream.pipe(res);// pipe 方法可以将两个流连接起来，这样数据就会从上游流向下游
            return;
        }
    }

    // default
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('<h1>Not Found</h1>');
}
