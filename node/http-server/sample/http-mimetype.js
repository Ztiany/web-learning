// noinspection DuplicatedCode
// step 2

const http = require('http');
const url = require('url');

const responseData = {
    ID: 'ZhangSan',
    Name: '张三',
    RegisterDate: '2020年3月1日',
};

function toHTML(data) {
    return `
    <ul>
      <li><span>账号：</span><span>${data.ID}</span></li>
      <li><span>昵称：</span><span>${data.Name}</span></li>
      <li><span>注册时间：</span><span>${data.RegisterDate}</span></li>
    </ul>
  `;
}


const httpServer = http.createServer((req, res) => {
    const fullUrl = `http://${req.headers.host}${req.url}`;
    const {pathname} = url.parse(fullUrl);
    console.log(`fullUrl = ${fullUrl}, pathname = ${pathname}`)

    if (pathname === '/') {
        const accept = req.headers.accept;
        console.log(`accept = ${accept}`)
        if (req.method === 'POST' || accept.indexOf('application/json') > -1) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(responseData));
        } else {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(toHTML(responseData));
        }

    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>Not Found</h1>');
    }
})

httpServer.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

httpServer.listen(8080, () => {
    console.log('opened server-mime on', httpServer.address());
})