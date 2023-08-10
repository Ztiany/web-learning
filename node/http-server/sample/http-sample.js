// noinspection DuplicatedCode
// step 1

const http = require('http');
const url = require('url');

const httpServer = http.createServer((req, res) => {
    const fullUrl = `http://${req.headers.host}${req.url}`;
    const {pathname} = url.parse(fullUrl);
    console.log(`fullUrl = ${fullUrl}, pathname = ${pathname}`)
    if (pathname === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('<h1>Hello world</h1>');
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>Not Found</h1>');
    }
})

httpServer.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

httpServer.listen(8080, () => {
    console.log('opened server-same on', httpServer.address());
})