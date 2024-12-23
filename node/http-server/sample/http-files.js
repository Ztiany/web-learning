// noinspection DuplicatedCode
// step 3

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
    console.log('opened server-files on', httpServer.address());
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
            const content = fs.readFileSync(filepath); // 读取文件内容
            const {ext} = path.parse(filepath);//扩展名
            res.writeHead(200, {'Content-Type': mime.getType(ext)});
            return res.end(content); // 返回文件内容
        }
    }

    // default
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('<h1>Not Found</h1>');
}
