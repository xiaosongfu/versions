import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = "https://jsonbox.io/box_4db461250ac32f2805a8/"
axios.defaults.headers.post["Content-Type"] = "application/json";

Vue.use(VueAxios, axios)
// Vue.prototype.$axios = axios
