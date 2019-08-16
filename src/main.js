import Vue from 'vue'
import App from './App.vue'
import router from "./router";
// import store from './store'
import HeyUI from "heyui";
import '@babel/polyfill';
import "./js/vue/directives";
import "./js/vue/filters";
import "./js/vue/components"
import store from 'js/vuex/store';
import heyuiConfig from 'js/config/heyui-config';
import qs from 'qs'
import axios from 'axios'
import routerConfig from './js/config/router-config'
Vue.config.productionTip = false
require('./css/app.less');
// require('./js/mock/index');
Vue.use(HeyUI)
heyuiConfig()

window.qs = qs
window.axios = axios
Vue.prototype.axios = axios;

// const router=routerConfig()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
