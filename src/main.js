import Vue from 'vue'

import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'

Vue.config.productionTip = false

axios.defaults.baseURL = ""
Vue.use(VueAxios, axios)
// Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
