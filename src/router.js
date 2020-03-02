import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// 测试 - Test
// 404 - 404
// 首页 - Home(/)


export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home")
    },
    {
      path: "/test",
      name: "Test",
      component: () => import("@/views/Test")
    },

    { path: "/404", name: "NotFound404", component: () => import("@/views/NotFound404") },
    { path: "*", redirect: "/404" },
    // ********* system

  ]
});
