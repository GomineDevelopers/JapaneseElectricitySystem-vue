import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// 测试 - Test
// 404 - 404

// 首页 - Home(/)
// 登录（密码登录/验证码登录） - Login
// 注册 - Register
// 忘记密码 - ForgetPassword
// 商品详情 - ProductDetails 
// 购物车 - ShoppingTrolley 
// 核对订单信息（+添加收货地址） - CheckOrderInformation

// 我的订单-个人中心（全部订单/代付款/待收货/待评价/已取消） (用户资料/我的订单/收货地址) - PersonalCenter 
// 订单详情-已完成 - OrderDetails
// 评价详情 - EvaluationDetails
// 发表评论 - MakeComments
// 用户资料 - UserInfo  ---看个人中心
// 收货地址（+ 添加编辑） - ShippingAddress   ---看个人中心

// TransferPage - 中转页 用于相同页面路由跳转
// SearchResult - 搜索结果页

// FinanceApplyText  - 支付宝支付页面

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
    // search页结构大致同home页
    {
      path: "/search",
      name: "search",
      component: () => import("@/views/Search"),
      redirect: "/Search",
      children: [
        {
          path: "/searchresult",
          name: "SearchResult",
          component: () => import("@/views/SearchResult")
        }
      ]
    },
    // {
    //   path: "/searchresult",
    //   name: "SearchResult",
    //   component: () => import("@/views/SearchResult")
    // },
    {
      path: "/transferpage",
      name: "TransferPage",
      component: () => import("@/views/TransferPage")
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
      path: "/forgetpassword",
      name: "ForgetPassword",
      component: () => import("@/views/ForgetPassword")
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

    // ********* new
    {
      path: "/personalcenter",
      name: "PersonalCenter",
      component: () => import("@/views/PersonalCenter")
    },
    {
      path: "/orderdetails",
      name: "OrderDetails",
      component: () => import("@/views/OrderDetails")
    },
    {
      path: "/evaluationdetails",
      name: "EvaluationDetails",
      component: () => import("@/views/EvaluationDetails")
    },
    {
      path: "/makecomments",
      name: "MakeComments",
      component: () => import("@/views/MakeComments")
    },
    // {
    //   path: "/userinfo",
    //   name: "UserInfo",
    //   component: () => import("@/views/UserInfo")
    // },
    // {
    //   path: "/shippingaddress",
    //   name: "ShippingAddress",
    //   component: () => import("@/views/ShippingAddress")
    // },
    {
      path: "/financeapplytext",
      name: "FinanceApplyText",
      component: () => import("@/components/FinanceApplyText")
    },

  ]
});
