import Vue from 'vue'
import App from './App.vue'
//导入axios
import axios from 'axios'
//导入模块路由
import router from './router'
//导入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {
    Loading
} from 'element-ui'

Vue.use(ElementUI)

Vue.config.productionTip = false

//配置全局过滤器
Vue.filter('timeFormat', (str) => {
    const dt = new Date(str)

    const Y = padZero(dt.getFullYear())
    const M = padZero(dt.getMonth() + 1)
    const D = padZero(dt.getDate())

    const hh = padZero(dt.getHours())
    const mm = padZero(dt.getMinutes())
    const ss = padZero(dt.getSeconds())
    return `${Y}-${M}-${D} ${hh}:${mm}:${ss}`
})

function padZero(n) {
    return n > 9 ? n : '0' + n
}
let LoadingInstance = null;

//全局配置axios
Vue.prototype.$http = axios
    // axios.defaults.baseURL = 'https://www.escook.cn'
axios.defaults.baseURL = 'http://localhost:3000'
    //拦截器
axios.interceptors.request.use((config) => {
        LoadingInstance = Loading.service({
            fullscreen: true
        })
        return config
    })
    //响应器
axios.interceptors.response.use((response) => {
    LoadingInstance.close()
    return response
})

new Vue({
    router, //挂载路由
    render: h => h(App),
}).$mount('#app')