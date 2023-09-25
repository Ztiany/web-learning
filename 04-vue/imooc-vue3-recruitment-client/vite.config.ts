import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    //因为应用存在跨域请求，所以需要配置 proxy。
    server: {
        port: 8002,
        host: '0.0.0.0',
        open: true,
        proxy: {
            '/api/upload': 'https://mobile.zcwytd.com',
            '/api': 'https://api.imooc.zcwytd.com'
        },
        cors: true
    },
    //路径解析
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            //'@': path.resolve(__dirname, './src') // 也可以
        }
    }
})
