const crypto = require('crypto');
const {setSession} = require("./model-session");

const sessionName = 'userInfo';

/**
 * 默认用户：Alien/123456
 */
async function login(database, ctx, {name, password}) {
    console.log(`login is called, name: ${name}, password: ${password}`)
    const userInfo = await database.get('SELECT * FROM user WHERE name = ?', name);
    if (!userInfo) {
        console.log(`user ${name} not found.`);
        return null;
    }

    // 将用户输入的密码用同样的方式加密
    const salt = 'xypte';
    const hash = crypto.createHash('sha256')
        .update(`${salt}${password}`, 'utf8')
        .digest()
        .toString('hex');

    console.log(`user ${name} password: ${userInfo.password}, hash: ${hash}`)

    if (hash === userInfo.password) {
        console.log(`user ${name} login success.`)
        const data = {id: userInfo.id, name: userInfo.name};
        await setSession(database, ctx, sessionName, data)
        return data;
    }
    return null;
}

module.exports = {
    login: login,
    userSessionName: sessionName
};