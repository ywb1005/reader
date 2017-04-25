import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      title: '一叶书屋',
      component (resolve) {
        require(['views/index.vue'], resolve)
      }
    },
    {
      path: '/register',
      title: '一叶书屋',
      component (resolve) {
        require(['views/register.vue'], resolve)
      }
    },
    {
      path: '/login',
      title: '一叶书屋',
      component (resolve) {
        require(['views/login.vue'], resolve)
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
    },
    {
      path: '/user',
      title: '个人中心',
      component (resolve) {
        require(['views/user.vue'], resolve)
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((transition) => {
  NProgress.done()
})

export default router
