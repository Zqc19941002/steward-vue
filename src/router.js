import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import index from "components/login/index";
import appHome from "components/app/app-frame"
import appFrameIndex from "components/home/index"
import Icons from "components/demo-components/icons"
import TableBasic from "./components/demo-components/table/basic"
import TableSearch from "./components/demo-components/table/search"
import account from "./components/demo-components/account/account"
import NetTag from "./views/NetTag";
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'login',
            component: index
        },
        {
            path: '/home',
            name:'home',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: appHome,
            children:[
                {
                    path: '',
                    name: 'Home',
                    component: appFrameIndex,
                    meta: { title: '首页', icon: 'icon-monitor' }
                },
                {
                    path:"/netTag",
                    name:"NetTag",
                    component:NetTag
                },
                {
                    path:"/Icons",
                    name:"Icons",
                    component:Icons
                },
                {
                    path:"/TableBasic",
                    name:"TableBasic",
                    component:TableBasic
                },
                {
                    path:"/TableSearch",
                    name:"TableSearch",
                    component:TableSearch
                },
                {
                    path:"/AccountBasic",
                    name:"AccountBasic",
                    component:account
                },
            ]

        }
    ]
})
