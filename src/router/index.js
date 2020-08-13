import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Welcome from '@/components/Welcome.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    }
  ]
})


// 挂载路由导航守卫
router.beforeEach((to, from, next) => {

  if (to.path === '/login') return next()
// 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router