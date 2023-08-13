async function getList(database) {
    return await database.all('SELECT * FROM todo');
}

async function getUserList(database, userInfo) {
    // state <> 2 表示 state 列的值不等于 2。
    return await database.all(
        `SELECT *
         FROM todo_user
         WHERE state <> 2
           and userId = ${userInfo.id}
         ORDER BY state DESC`
    );
}

async function addTask(database, {text, state}) {
    try {
        const data = await database.run('INSERT INTO todo(text,state) VALUES (?, ?)', text, state);
        return {err: '', data: data};
    } catch (ex) {
        return {err: ex.message};
    }
}

async function addUserTask(database, userInfo, {text, state}) {
    try {
        const data = await database.run(
            'INSERT INTO todo_user(text,state,userId) VALUES (?, ?,?)',
            text,
            state,
            userInfo.id
        );
        return {err: '', data: data};
    } catch (ex) {
        return {err: ex.message};
    }
}

module.exports = {
    getList,
    addTask,
    getUserList,
    addUserTask,
};