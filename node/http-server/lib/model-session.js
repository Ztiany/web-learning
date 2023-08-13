const sessionKey = 'interceptor_js';

/**
 * 根据 Cookie 中的 ID 获取用户的 Session。
 *
 * @param database 数据库
 * @param ctx 切面链上下文
 * @param name session 的名称
 * @returns {Promise<any|null>}
 */
async function getSession(database, ctx, name) {
    console.log(`getSession is called, name: ${name}`)
    const key = ctx.cookies[sessionKey];
    if (key) {
        console.log(`getSession: key: ${key}`)
        const now = Date.now();
        const session = await database.get(
            'SELECT * FROM session WHERE key = ? and name = ? and expires > ?', key, name, now
        );
        if (session) {
            const value = session.value;
            console.log(`getSession: session: ${value}`)
            return JSON.parse(value);
        }
    }
    return null;
}


/**
 * 创建新的 Session。
 *
 * @param database
 * @param ctx
 * @param name
 * @param data
 * @returns {Promise<{err: string}|{err}|{result: *, err: string}>}
 */
async function setSession(database, ctx, name, data) {
    try {
        const key = ctx.cookies[sessionKey];
        if (key) {
            let result = await database.get('SELECT id FROM session WHERE key = ? AND name = ?', key, name);
            if (!result) {
                // 如果result不存在，那么插入这个session
                result = await database.run(
                    `INSERT INTO session(key, name, value, created, expires)
                     VALUES (?, ?, ?, ?, ?)`,
                    key,
                    name,
                    JSON.stringify(data),
                    Date.now(),
                    Date.now() + 7 * 86400 * 1000
                );
            } else {
                // 否则更新这个session
                result = await database.run(
                    'UPDATE session SET value = ?, created = ?, expires = ? WHERE key = ? AND name = ?',
                    JSON.stringify(data),
                    Date.now(),
                    Date.now() + 7 * 86400 * 1000,
                    key,
                    name
                );
            }
            return {err: '', result};
        }
        return {err: 'invalid cookie'};
    } catch (ex) {
        return {err: ex.message};
    }
}

module.exports = {
    getSession,
    setSession,
    sessionKey
};