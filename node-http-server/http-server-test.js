// noinspection DuplicatedCode

const HttpServer = require('./lib/http-server');

const app = new HttpServer();

// 添加拦截切面
app.use(async ({res}, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.body = '<h1>Hello world</h1>';
    await next();
});

app.listen({
    port: 8080,
})