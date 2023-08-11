// noinspection DuplicatedCode

const HttpServer = require('./lib/http-server');
const Router = require('./lib/router');
const path = require('path');
const httpParams = require('./lib/http-params-aspect');
const staticFileAspectFactory = require('./lib/http-static-file-aspect');
const {cookieParser, cookieCreator} = require('./lib/http-cookie-aspect');

const sqlite3 = require('sqlite3');
const {open} = require('sqlite');
const {getUserList, addUserTask} = require("./db/todolist");

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
app.use(cookieParser)
app.use(cookieCreator)

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

async function checkLogin(ctx) {
    const {getSession} = require('./lib/model-session');
    const {userSessionName} = require('./lib/model-user');
    ctx.userInfo = await getSession(ctx.database, ctx, userSessionName);
    return ctx.userInfo;
}

// 如果请求的路径是 /list，则从表中获取所有任务数据。
app.use(router.get('/todo/list', async (ctx, next) => {
    console.log('run /todo/list aspect.')
    // 如果 session 存在并有效，则返回用户信息对象
    const userInfo = await checkLogin(ctx);
    const {database, res} = ctx;
    res.setHeader('Content-Type', 'application/json');
    if (userInfo) {
        const result = await getUserList(database, userInfo);
        res.body = {data: result};
    } else {
        res.body = {err: 'not login'};
    }
    await next();
}));

// 如果请求的路径是 /add，则添加
app.use(router.post('/todo/add', async (ctx, next) => {
    console.log('run /todo/add aspect.')
    const userInfo = await checkLogin(ctx);
    const {database, httpParams, res} = ctx;
    res.setHeader('Content-Type', 'application/json');
    if (userInfo) {
        res.body = await addUserTask(database, userInfo, httpParams);
    } else {
        res.body = {err: 'not login'};
    }
    await next();
}));

app.use(router.post('/todo/login', async (ctx, next) => {
    const {database, params, res} = ctx;
    res.setHeader('Content-Type', 'application/json');
    const {login} = require('./lib/model-user');
    const result = await login(database, ctx, params);

    res.statusCode = 302;
    if (!result) { // 登录失败，跳转到 login 继续登录
        res.setHeader('Location', '/www/todo-login.html');
    } else {
        res.setHeader('Location', '/'); // 成功，跳转到 index
    }
    await next();
}));

// 默认路径
app.use(router.all('.*', staticFileAspectFactory('todo-list.html')));

app.listen({
    port: 8080,
    host: '0.0.0.0',
});