import Vue from 'vue'

// router 和 store
import router from './router'
import store from './store'

// App 主界面
import App from './App.vue'

// element
import './plugins/element.js'

// axios
import './axios.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
