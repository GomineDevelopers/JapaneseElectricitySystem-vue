import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// 测试 - Test
// 404 - 404

// 首页 - Home(/)
// 登录（密码登录/验证码登录） - Login
// 注册 - Register
// 商品详情 - ProductDetails 
// 购物车 - ShoppingTrolley 
// 核对订单信息（+添加收货地址） - CheckOrderInformation


export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home"),
      redirect: "/homepage",
      children: [
        {
          path: "/homepage",
          name: "HomePage",
          component: () => import("@/views/HomePage")
        }
      ]
    },
    {
      path: "/test",
      name: "Test",
      component: () => import("@/views/Test")
    },
    { path: "/404", name: "NotFound404", component: () => import("@/views/NotFound404") },
    { path: "*", redirect: "/404" },
    // ********* system
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Login")
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("@/views/Register")
    },
    {
      path: "/productdetails",
      name: "ProductDetails",
      component: () => import("@/views/ProductDetails")
    },
    {
      path: "/shoppingtrolley",
      name: "ShoppingTrolley",
      component: () => import("@/views/ShoppingTrolley")
    },
    {
      path: "/checkorderinformation",
      name: "CheckOrderInformation",
      component: () => import("@/views/CheckOrderInformation")
    },
  ]
});
