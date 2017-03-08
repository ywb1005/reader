import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      title: '一叶书屋',
      component (resolve) {
        require(['views/index.vue'], resolve)
      }
    }
  ]
})

export default router
