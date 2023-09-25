import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
    // 默认页面
    {
        path: '/',
        redirect: '/task'
    },
    // 所有路由配置
    {
        path: '/contract',
        name: 'Contract',
        component: () => import('@/views/contract/index.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/message',
        name: 'Message',
        component: () => import('@/views/message/index.vue')
    },
    {
        path: '/my',
        name: 'My',
        component: () => import('@/views/my/index.vue')
    },
    {
        path: '/task',
        name: 'Task',
        component: () => import('@/views/task/index.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

export default router;