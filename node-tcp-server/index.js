const net = require("net");

const server = net.createServer((socket) => {

    socket.on('data', (data) => {
        handleData(data, socket)
        console.log(`DATA:\n\n${data}`);
    }).on('close', () => {
        console.log('connection closed, goodbye!\n\n\n');
    })

}).on('error', (err) => {
    console.log('server error', err);
    throw err;
});

server.listen({
    host: '0.0.0.0', port: 8080,
}, () => {
    console.log('opened server on', server.address());
});

/**
 * 写回数据，必须按照 HTTP 的格式输出。
 *
 * @param str 响应体
 * @param status 状态码
 * @param desc 状态码描述
 * @returns {string}
 */
function responseData(str, status = 200, desc = 'OK') {
    return `HTTP/1.1 ${status} ${desc}
Connection: keep-alive
Date: ${new Date()}
Content-Length: ${str.length}
Content-Type: text/html

${str}`;
}

function handleData(data, socket) {
    // noinspection JSCheckFunctionSignatures
    const matched = data.toString('UTF-8').match(/^GET ([/\w]+) HTTP/);
    if (matched) {
        const path = matched[1];
        if (path === '/') { //如果路径是 '/'，返回 hello world、状态是 200
            socket.write(responseData('<h1>Hello world</h1>'));
        } else { // 否则返回 404 状态
            socket.write(responseData('<h1>Not Found</h1>', 404, 'NOT FOUND'));
        }
    }
}