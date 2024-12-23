// noinspection DuplicatedCode

const HttpServer = require('./lib/http-server');
const Router = require('./lib/router');
const {getCoronavirusKeyIndex, getCoronavirusByDate} = require('./lib/corona-mock')
const path = require("path");
const fs = require("fs");

const app = new HttpServer();
const router = new Router();

app.use(async ({req}, next) => {
    console.log(`------------------------------------------------------`);
    console.log(`start process request: ${req.method} ${req.url}`);
    await next();
});

app.use(router.get('/coronavirus/index', async ({route, req, res}, next) => {
    console.log('run /coronavirus/index aspect.')

    const accept = req.headers.accept;
    console.log(`accept = ${accept}`)
    if (req.method === 'POST' || accept.indexOf('application/json') > -1) {
        res.setHeader('Content-Type', 'application/json');
        res.body = {data: getCoronavirusKeyIndex()};
    } else {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        // 获取模板模块
        const handlebars = require('handlebars');
        // 获取模板文件
        const filepath = path.resolve(__dirname, 'www/coronavirus_index.html');
        const templateContent = fs.readFileSync(filepath, {encoding: 'utf-8'});
        // 编译模板
        const template = handlebars.compile(templateContent);
        // 将数据和模板结合
        res.body = template({data: getCoronavirusKeyIndex()});
    }

    await next();
}));

app.use(router.get('/coronavirus/:date', async ({route, req, res}, next) => {
    console.log('run /coronavirus/:date aspect')

    const accept = req.headers.accept;
    console.log(`accept = ${accept}`)
    const data = getCoronavirusByDate(route.date/* 这里的 date 来自上面 /coronavirus/:date 指定的模式*/);

    if (req.method === 'POST' || accept.indexOf('application/json') > -1) {
        res.setHeader('Content-Type', 'application/json');
        res.body = {data: data};
    } else {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        // 获取模板模块
        const handlebars = require('handlebars');
        // 获取模板文件
        const filepath = path.resolve(__dirname, 'www/coronavirus_date.html');
        const templateContent = fs.readFileSync(filepath, {encoding: 'utf-8'});
        // 编译模板
        const template = handlebars.compile(templateContent);
        // 将数据和模板结合
        res.body = template({data: data});
    }

    await next();
}));

// 添加默认的路由
app.use(router.all('.*', async ({req, res}, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.body = '<h1>Not Found</h1>';
    await next();
}));

app.listen({
    port: 8080,
})
