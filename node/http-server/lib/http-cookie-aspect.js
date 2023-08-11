const {sessionKey} = require("./model-session");

/**
 * Http Cookie 切面
 *
 * @param ctx 切面链的上下文
 * @param next 下一个切面
 * @returns {Promise<void>}
 */
async function cookieParser(ctx, next) {
    const {req} = ctx;
    const cookieStr = decodeURIComponent(req.headers.cookie);
    const cookies = cookieStr.split(/\s*;\s*/);
    ctx.cookies = {};
    cookies.forEach((cookie) => {
        const [key, value] = cookie.split('=');
        ctx.cookies[key] = value;
    });
    await next();
}

async function cookieCreator({cookies, res}, next) {
    let id = cookies[sessionKey];
    if (!id) {
        id = Math.random().toString(36).slice(2);
    }
    // 设置 cookie 的有效时长一周
    res.setHeader('Set-Cookie', `${sessionKey}=${id}; Path=/; Max-Age=${7 * 86400}`);
    await next();
}

module.exports = {
    cookieParser: cookieParser,
    cookieCreator: cookieCreator
}
