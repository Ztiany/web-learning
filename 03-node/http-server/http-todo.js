// noinspection DuplicatedCode

const HttpServer = require('./lib/http-server');
const Router = require('./lib/router');
const path = require('path');
const httpParams = require('./lib/http-params-aspect');
const staticFileAspectFactory = require('./lib/http-static-file-aspect');

const sqlite3 = require('sqlite3');
const {open} = require('sqlite');
const {getList, addTask} = require("./db/todolist");

// todolist.db 是 sqlite 数据库文件
const dbFile = path.resolve(__dirname, './db/todo.db3');
let db = null;

const app = new HttpServer();
const router = new Router();

app.use(async ({req}, next) => {
    console.log(`------------------------------------------------------`);
    console.log(`start process request: ${req.method} ${req.url}`);
    await next();
});

app.use(httpParams)

// 用于初始化数据库
app.use(async (context, next) => {
    if (!db) { // 如果数据库连接未创建，就创建一个
        db = await open({
            filename: dbFile,
            driver: sqlite3.cached.Database,
        });
    }
    // 将 db 挂在 ctx 上下文对象的 database 属性上
    context.database = db;
    await next();
})

// 如果请求的路径是 /list，则从表中获取所有任务数据。
app.use(router.get('/todo/list', async ({database, route, res}, next) => {
    console.log('run /todo/list aspect.')
    res.setHeader('Content-Type', 'application/json');
    const result = await getList(database); // 获取任务数据
    res.body = {data: result};
    await next();
}));

// 如果请求的路径是 /add，则添加
app.use(router.post('/todo/add', async ({database, httpParams, route, res}, next) => {
    console.log('run /todo/add aspect.')
    res.setHeader('Content-Type', 'application/json');
    res.body = await addTask(database, httpParams);
    await next();
}));

// 默认路径
app.use(router.all('.*', staticFileAspectFactory('todo-list.html')));

app.listen({
    port: 8080,
    host: '0.0.0.0',
});