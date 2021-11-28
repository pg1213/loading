import Vue from "vue";
import VueRouter from "vue-router";
import Userslist from '../components/Uerslist'
import UserDetail from '@/components/UserDetail'

Vue.use(VueRouter)
    //配置路由规则
const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/users'
        },
        {
            path: '/users',
            component: Userslist
        },
        {
            path: '/users/:id',
            component: UserDetail,
            props: true
        }
    ]
})

export default router