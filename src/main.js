import Vue from 'vue'
import App from './App.vue'
import resource from 'vue-resource'
import Scrollspy from 'vue-scrollspy';
import router from './router/router'
import 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.css'

Vue.use(ElementUI)
Vue.use(resource)
Vue.use(Scrollspy);

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
