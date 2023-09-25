import {createApp} from 'vue'
import './assets/css/style.css'
import 'vant/lib/index.css'
import App from './App.vue'
import store from "./store";
import router from "./router";
import {Button, NavBar, Tabbar, TabbarItem, Checkbox, Toast, Icon} from "vant";
// noinspection ES6UnusedImports
import baseREM from "@/utils/rem.ts";

createApp(App)
    // 存储
    .use(store)
    // vant 组件
    .use(Button)
    .use(NavBar)
    .use(Tabbar)
    .use(TabbarItem)
    .use(Checkbox)
    .use(Toast)
    .use(Icon)
    // 路由
    .use(router)
    // 挂载
    .mount('#app')
