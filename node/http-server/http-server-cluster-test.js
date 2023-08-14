const Server = require('./lib/http-server-cluster');
const Router = require('./lib/router');

const app = new Server({instances: 2, mode: 'development'});
const router = new Router();

// 使用 process.on('message') 的监听器，监听来自 work.send 发来的消息。
let count = 0;
process.on('message', (msg) => {
    if (msg === 'count') {
        console.log(`message flow final: ${msg}`)
        console.log('visit count: %d', ++count);
    }
});

// 下面所有的 aspect 都运行在子进程中。

// 统计访问次数
app.use(async (ctx, next) => {
    console.log(`message flow 1: process.send('count');`)
    // the process.send() method can be used to send messages to the parent process.
    // 即发送消息给主进程，主进程可以使用 cluster.on('message') 的监听器，监听来自 work.send 发来的消息。
    process.send('count');
    await next();
});

app.use(async (ctx, next) => {
    console.log(`visit ${ctx.req.url} through worker: ${app.worker.process.pid}`);
    await next();
});

app.use(router.all('.*', async ({req, res}, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.body = '<h1>Hello world 123</h1>';
    await next();
}));

app.listen({
    port: 8080,
    host: '0.0.0.0',
});
