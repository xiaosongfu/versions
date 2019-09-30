import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/Index.vue'
import Version from '@/views/Version.vue'
import List from '@/views/List.vue'
import Detail from '@/views/Detail.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            component: Index
        },
        {
            path: '/version',
            component: Version
        },
        {
            path: "/list/:category",
            name: "list",
            component: List
        },
        {
            path: "/detail/:owner/:repo",
            name: "detail",
            component: Detail
        }
    ]
})
