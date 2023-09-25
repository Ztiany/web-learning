import service from "@/utils/request.ts"

/**
 * 获取短信验证码
 * @param data 参考
 */
export function getSMSCode(data: any) {
    return service({
        url: 'login/code',
        method: 'post',
        data
    })
}

/**
 * 登录
 * @param data 参考
 */
export function login(data: any) {
    return service({
        url: '/login',
        method: 'post',
        data
    })
}

/**
 * 获取隐私协议
 * @param data 参考
 */
export function getPolicy(data: any) {
    return service({
        url: 'policy_protocol/list',
        method: 'get',
        params: data
    })
}


