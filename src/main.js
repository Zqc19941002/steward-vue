import Vue from 'vue'
import App from './App.vue'
import router from "./router";
// import store from './store'
import HeyUI from "heyui";
import { FullCalendar } from 'vue-full-calendar'
import VueSocialChat from 'vue-social-chat'
import ChatWindow from 'vue-advanced-chat'
import '@babel/polyfill';
import "./js/vue/directives";
import "./js/vue/filters";
import "./js/vue/components"
import store from 'js/vuex/store';
import heyuiConfig from 'js/config/heyui-config';
import qs from 'qs'
import axios from 'axios'
import qiniu from "qiniu-js-es6";
import routerConfig from './js/config/router-config'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import "fullcalendar/dist/fullcalendar.css"
import '../static/icon-font/iconfont.css'
import 'vue-advanced-chat/dist/vue-advanced-chat.css'

Vue.config.productionTip = false
require('./css/app.less');
// require('./js/mock/index');
Vue.use(HeyUI)
Vue.use(ElementUI)
Vue.use(qiniu)
Vue.use(FullCalendar)
Vue.use(VueSocialChat)
Vue.use(ChatWindow)

heyuiConfig()

window.qs = qs
window.axios = axios
Vue.prototype.axios = axios;

//const router=routerConfig()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
