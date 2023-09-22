import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from 'node:url'
import Components from 'unplugin-vue-components/vite'
import {VantResolver} from 'unplugin-vue-components/resolvers'
import postCssPxToRem from 'postcss-pxtorem'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 8090,
    },
    plugins: [
        vue(),
        Components({resolver: VantResolver()}),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        }
    },
    css: {
        postcss: {
            plugins: [
                postCssPxToRem({
                    rootValue: 37.5,//1rem=37.5px
                    propList: ['*'],
                    selectorBlackList: ['.norem'] // 过滤掉 .norem- 开头的 class，不进行 rem 转换
                })
            ]
        }
    }
})
