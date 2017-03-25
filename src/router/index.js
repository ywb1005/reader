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
    },
    {
      path: '/book/:id',
      title: '书籍信息',
      component (resolve) {
        require(['views/book.vue'], resolve)
      }
    },
    {
      path: '/book/:id/section/:sectionId',
      title: '书籍信息',
      component (resolve) {
        require(['views/read.vue'], resolve)
      }
    }
  ]
})

export default router
