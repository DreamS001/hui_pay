import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import echarts from 'echarts';
import '@/styles/index.scss' // global css

import App from './App'
import router from './router/routers'
import permission from './components/permission'
import store from './store'
//

import axios from 'axios'
import VueAxios from 'vue-axios'
// import i18n from './i18n/i18n';
import '@/icons' // icon
import './router/index' // permission control
import clipboard from 'clipboard';
//注册到vue原型上
Vue.prototype.clipboard = clipboard;

Vue.use(VueAxios, axios)
Vue.use(mavonEditor)
Vue.use(permission)
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;

require('babel-polyfill')

new Vue({
  el: '#app',
  router,
  store,
  // i18n,
  render: h => h(App)
})









