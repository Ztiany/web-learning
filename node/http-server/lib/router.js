const url = require('url');
const path = require('path');


/*
@rule：路径规则
@pathname：路径名
*/
function check(rule, pathname) {
    console.log(`rule = ${rule}, pathname = ${pathname}`);
    /*
    解析规则，比如：/test/:course/:lecture 得到 paraMatched = [':course', ':lecture']

        这个正则表达式 /:[^/]+/g 用于匹配字符串中的冒号后面的非斜杠字符序列。具体解释如下：

        （1）:：匹配冒号字符。
        （2）[^/]：表示一个字符集，匹配除了斜杠字符 / 之外的任意字符。
        （3）+：表示匹配前面的字符集一次或多次。
        （4）/g：表示全局匹配，即匹配字符串中所有符合条件的子串。

    */
    const paraMatched = rule.match(/:[^/]+/g);
    console.log(`paraMatched = ${paraMatched}`)

    /*
        介绍：
            （1）^ 和 $：分别表示匹配字符串的开头和结尾，用于确保整个字符串与规则完全匹配。
            （2）${rule}：使用模板字符串将 rule 变量的值嵌入到正则表达式中。
            （3）replace(/:[^/]+/g, '([^/]+)')：在规则中，将所有以冒号开头、后面跟着一个或多个非斜杠字符的部分替换为 ([^/]+)。这个替换操作将冒号参数部分转换为一个捕获组 ( )，用于在匹配时提取对应的路径参数值。
     */
    const ruleExp = new RegExp(`^${rule.replace(/:[^/]+/g, '([^/]+)')}$`);
    console.log(`ruleExp = ${ruleExp}`)

    /*
    解析真正的路径，比如：/test/123/abc 得到 ruleMatched = ['/test/123/abs', '123', 'abs']
    */
    const ruleMatched = pathname.match(ruleExp);
    console.log(`ruleMatched = ${ruleMatched}`)

    /*
    将规则和路径拼接为对象：ret = {course: 123, lecture: abc}
    */
    if (ruleMatched) {
        const ret = {};
        if (paraMatched) {
            for (let i = 0; i < paraMatched.length; i++) {
                ret[paraMatched[i].slice(1)] = ruleMatched[i + 1];
            }
        }
        return ret;
    }
    return null;
}

function checkTester() {
    const fullUrl = url.parse(`http://www.baidu.com:80/test/123/index.html`);
    /*
        /test/ 用于匹配的路径：
        /:course/:lecture 用匹配路径后面的模式
     */
    console.log(check('/test/:course/:lecture', fullUrl.pathname)); // 根据路径规则解析路径
}


/**
 * @method: GET/POST/PUT/DELETE
 * @rule: 路径规则，比如：test/:course/:lecture
 * @aspect: 拦截函数，必须是 async 的。
 */
function route(method, rule, aspect) {
    return async (ctx, next) => {
        const req = ctx.req;
        if (!ctx.url) {
            ctx.url = url.parse(`http://${req.headers.host}${req.url}`);
        }

        const checked = check(rule, ctx.url.pathname); // 根据路径规则解析路径
        // 执行 aspect 的条件：
        //  1. ctx 的 route 没有匹配过
        //  2. 对应的方法要一致
        //  3. 能解析到规则
        if (!ctx.route && (method === '*' || req.method === method) && !!checked/* !! 强制转换为布尔值 */) {
            ctx.route = checked;
            await aspect(ctx, next);
        } else {
            // 如果路径与路由规则不匹配，则跳过当前拦截切面，执行下一个拦截切面
            await next();
        }
    };
}


class Router {
    constructor(base = '') {
        this.baseURL = base;
    }

    get(rule, aspect) {
        return route('GET', path.posix.join(this.baseURL, rule), aspect);
    }

    post(rule, aspect) {
        return route('POST', path.posix.join(this.baseURL, rule), aspect);
    }

    put(rule, aspect) {
        return route('PUT', path.posix.join(this.baseURL, rule), aspect);
    }

    delete(rule, aspect) {
        return route('DELETE', path.posix.join(this.baseURL, rule), aspect);
    }

    all(rule, aspect) {
        return route('*', path.posix.join(this.baseURL, rule), aspect);
    }
}

module.exports = Router