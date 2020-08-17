import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login.vue";
import Welcome from "@/components/Welcome.vue";
import Git from "@/components/Git.vue";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      component: Login
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/welcome",
      component: Welcome
    },
    {
      path: "/oauth/redirect",
      name: Git,
      component: Git
    }
  ],
 
});


//挂载路由导航守卫，拦截 
// router.beforeEach((to, from, next) => {
//   if (to.path === "/login") return next();
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem("token");

//   if (!tokenStr) return next("/login");
//   next();
// });


export default router;










