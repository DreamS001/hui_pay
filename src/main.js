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
//引入富文本编辑器
// import '../static/UE/ueditor.config.js'
// import '../static/UE/ueditor.all.js'
// import '../static/UE/lang/zh-cn/zh-cn.js'
// import '../static/UE/ueditor.parse.js'

import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'　　　
import '../static/UE/ueditor.parse.min.js'

import '../static/UE/themes/default/css/ueditor.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
// import i18n from './i18n/i18n';
import '@/icons' // icon
import './router/index' // permission control
import clipboard from 'clipboard';
<<<<<<< HEAD
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
VueClipboard.config.autoSetContainer = true ;
=======


>>>>>>> efa76d768408ab662d072f74de9952065da20929
//注册到vue原型上
Vue.prototype.clipboard = clipboard;

Vue.use(VueAxios, axios)
Vue.use(mavonEditor)
Vue.use(permission)
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;
// 导入格式化时间的模块
import moment from 'moment'

// 定义全局的时间过滤器
Vue.filter('dateFormat', function (dateStr, formatStr = 'YYYY-MM-DD HH:mm:ss') {
  // 在过滤器的处理函数中，最后，必须 return 一个东西，这样，才是一个合法的过滤器
  return moment(dateStr).format(formatStr)
})

Vue.filter('toUSD',function(value){
  return `$${value}`
})

require('babel-polyfill')

new Vue({
  el: '#app',
  router,
  store,
  // i18n,
  render: h => h(App)
})









