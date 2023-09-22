import {createApp} from 'vue'

import './common/style/style.css'
import 'vant/lib/index.css';
import '@/common/style/theme.css'

import App from './App.vue'
import router from './router'
import {Button, Field} from "vant";
import 'lib-flexible/flexible'

// 初始化 Vue 实例
createApp(App)
    // 挂载路由
    .use(router)
    // 挂载 Vant 组件
    .use(Button)
    .use(Field)
    // 挂载到标签 #app
    .mount('#app')
