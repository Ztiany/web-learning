// noinspection DuplicatedCode

const HttpServer = require('./lib/http-server');
const Router = require('./lib/router');

const app = new HttpServer();
const router = new Router();

// 添加拦截切面，这里用 router 包装原始的 aspect，这样只有在路径匹配的情况下，该 aspect 才会生效，否则直接进入下一个 aspect。
app.use(router.all('/test/:course/:lecture', async ({route, res}, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.body = route;
    await next();
}));

// 添加默认的路由
app.use(router.all('.*', async ({req, res}, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.body = '<h1>Hello world</h1>';
    await next();
}));

app.listen({
    port: 8080,
})