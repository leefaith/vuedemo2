# vuedemo2

> A Vue.js project

## Build Setup




```
目前问题说明：
1.mock index.js

  //第一种方法可以得到token  但是是下载文件模式。没法传给前端
  //得到 如access_token=e7dce17146e898d13de9de3dfce0acdcbfd6cffc&scope=&token_type=bearer下载文件
   window.location.href = URL

  //第二种获取token   这种方式总是出现跨域问题
  // const tokenResponse = axios({
  //   method: "POST",
  //   url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
  //   headers: {
  //     headers: {
  //       accept: "application/json"
  //     }
  //   }
  // });
  //  console.log(tokenResponse);

2.   components/Git.vue
//保存从后台获取的token，跳转到欢迎页面  
    //  window.sessionStorage.setItem('token',res.data.token)
       this.$router.push("/welcome")


3.  router/index.js
//挂载路由导航守卫，拦截 ，测试可通过
// router.beforeEach((to, from, next) => {
//   if (to.path === "/login") return next();
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem("token");

//   if (!tokenStr) return next("/login");
//   next();
// });


```