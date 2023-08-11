const url = require('url');
const querystring = require('querystring');

/*
使用内置模块 querystring 解析 URL 参数。querystring 可以将类似于

    key1=value1&key2=value2&key3=value3

的 query 字符串解析成如下对象：

    {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    }
 */
module.exports = async (context, next) => {
    const {req} = context;
    const {query} = url.parse(`http://${req.headers.host}${req.url}`);
    context.httpParams = querystring.parse(query);

    // 解析POST
    if (req.method === 'POST') {
        const headers = req.headers;

        // 读取 POST 的 body 数据
        const body = await new Promise((resolve) => {
            let data = '';
            req.on('data', (chunk) => {
                data += chunk.toString(); // convert Buffer to string
            });
            req.on('end', () => {
                resolve(data);
            });
        });

        context.httpParams = context.httpParams || {};
        if (headers['content-type'] === 'application/x-www-form-urlencoded') {
            Object.assign(context.httpParams, querystring.parse(body));
        } else if (headers['content-type'] === 'application/json') {
            Object.assign(context.httpParams, JSON.parse(body));
        }
    }

    await next();
}