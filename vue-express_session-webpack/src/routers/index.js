import Vue from 'vue'
// 路由 router-link
// router-view 匹配的路由地址
// 显示相应的组件
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Times from '../components/times.vue'

// rules 每一项都是json
const routes = [
    { path: '/', component: Login },
    { path: '/home', component: Home },
    {path:'/times', component:Times}
]
const router = new VueRouter({
    routes: routes
})

export default router
