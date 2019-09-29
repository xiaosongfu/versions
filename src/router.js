import Vue from 'vue'
import Router from 'vue-router'

import List from '@/views/List.vue'
import Detail from '@/views/Detail.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            component: List
        },
        {
            path: "/detail/:owner/:repo",
            component: Detail
        }
    ]
})