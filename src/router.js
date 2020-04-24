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
import WorkPlan from "./views/WorkPlan"
import Editor from "./views/Editor";
import MarkDownEditor from "./views/MarkDownEditor";
import FileData from "./views/FileData";
import MapDemo from "./components/steward/map/MapDemo";
import RichEdit from "./views/richtext-editor"
Vue.use(Router)

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)
}
export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/home',
            name:'home',
            component: appHome,
            children:[
                {
                    path: '',
                    name: 'Home',
                    component: appFrameIndex,
                    meta: { title: '首页', icon: 'icon-monitor' }
                },
                {
                    path:"/mapDemo",
                    name:"MapDemo",
                    component:MapDemo
                },{
                    path:"/RichEdit",
                    name:"RichEdit",
                    component:RichEdit
                },
                {
                    path:"/netTag",
                    name:"NetTag",
                    component:NetTag
                },
                {
                    path:"/workPlan",
                    name:"WorkPlan",
                    component:WorkPlan
                },
                {
                    path:"/FileData",
                    name:"FileData",
                    component:FileData
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
                {
                    path:"/MarkDownEditor",
                    name:"MarkDownEditor",
                    component:MarkDownEditor
                },
                {
                    path:"/Editor",
                    name:"Editor",
                    component:Editor
                }
            ]

        }
    ]
})
