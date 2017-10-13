//const vm = 1   打包后会在build.js中转换成var vm=1

import Vue from 'vue'  //es6的模块化方案

import App from './App.vue'
//引入路由
import axios from 'axios'

import router from './routers'

axios.defaults.baseURL = 'http://localhost:3000/'

//解决跨域
axios.defaults.withCredentials = true
global.axios = axios

new Vue({
    //配置项
    el: '#app',
    // data:{
    //     level:'top'
    // },
    router,
    render: h => h(App)
})
