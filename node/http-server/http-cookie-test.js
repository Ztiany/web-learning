// noinspection DuplicatedCode

const HttpServer = require('./lib/http-server');
const Router = require('./lib/router');
const cookie = require('./lib/http-cookie-aspect');

const app = new HttpServer();
const router = new Router();

app.use(cookie)

const users = {};
app.use(router.get('/', async ({cookies, route, res}, next) => {
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    const id = cookies.interceptor_js;
    if (id) {
        users[id] = users[id] || 1;
        users[id]++;
        res.body = `<h1>你好，欢迎第 ${users[id]} 次访问本站</h1>`;
    } else {
        res.setHeader('Set-Cookie', `interceptor_js=${Math.random().toString(36).slice(2)}`);
        users[id] = 1;
        res.body = '<h1>你好，新用户</h1>';
    }
    await next();
}));
app.listen({
    port: 8080,
})