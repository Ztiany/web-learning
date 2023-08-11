const crypto = require('crypto');
const {setSession} = require("./model-session");

const sessionName = 'userInfo';

async function login(database, ctx, {name, password}) {
    const userInfo = await database.get('SELECT * FROM user WHERE name = ?', name);
    if (!userInfo) {
        return null;
    }

    // 将用户输入的密码用同样的方式加密
    const salt = 'xypte';
    const hash = crypto.createHash('sha256')
        .update(`${salt}${password}`, 'utf8')
        .digest()
        .toString('hex');

    if (hash === userInfo.password) {
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