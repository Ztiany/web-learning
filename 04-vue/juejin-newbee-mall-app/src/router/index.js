import {createRouter, createWebHashHistory} from "vue-router";

const routes = createRouter({
        history: createWebHashHistory(),
        routes: [
            {
                path: '/',
                redirect: '/home'
            },
            {
                path: '/home',
                name: 'Home',
                component: () => import('@/pages/Home.vue')
            },
            {
                path: '/about',
                name: 'About',
                component: () => import('@/pages/About.vue')
            }
        ]
    }
)

export default routes