import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import VueLazyload from 'vue-lazyload'

import { refresh_token, getUserInfo } from "@/api/api";


// 使用VueLazyload并传入相应的配置
Vue.use(VueLazyload, {
  // error: 'dist/error.png',
  error: './assets/pic/loading.gif',
  loading: './assets/pic/loading.gif',// 懒加载使用的图片
})


import api from "./api/api";
import $ from "jquery";
Vue.prototype.$api = api;
Vue.prototype.$ = $;
Vue.config.productionTip = false;

import "@/utils/element-ui";


import store from "@/store";

import "@/utils/rem.js";

import "@/styles/common.css";
import "@/styles/common2.css";

import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

import vueHeadful from "vue-headful";
Vue.component("vue-headful", vueHeadful);

import { Utils } from '@/utils/Utils'
Vue.prototype.$Utils = Utils

import {
  Message,
} from "element-ui";
Vue.prototype.$message = Message;

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

global.IMGPrefix = "http://shop.zidata.cn/storage/"
// 处理方式搜  .image

global.MVersion = "1.0.0.9"; // 页面版本号（实时更新）
// 页面版本号处理 --以防测试出现缓存问题！
let local_Version = Utils.getCookieCry("MVersion");
// console.log(local_Version);
if (local_Version != global.MVersion) {
  Utils.setCookieCry("MVersion", global.MVersion, 10);
  setTimeout(function () {
    location.reload();
  }, 200);
}

// 浏览器兼容
function myBrowser() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
  var isIE = userAgent.indexOf("compatible") > -1
    && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
  var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
  var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
  var isSafari = userAgent.indexOf("Safari") > -1
    && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
  var isChrome = userAgent.indexOf("Chrome") > -1
    && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) {
      return "IE7";
    } else if (fIEVersion == 8) {
      return "IE8";
    } else if (fIEVersion == 9) {
      return "IE9";
    } else if (fIEVersion == 10) {
      return "IE10";
    } else if (fIEVersion == 11) {
      return "IE11";
    } else {
      return "0";
    }//IE版本过低
    return "IE";
  }
  if (isOpera) {
    return "Opera";
  }
  if (isEdge) {
    return "Edge";
  }
  if (isFF) {
    return "FF";
  }
  if (isSafari) {
    return "Safari";
  }
  if (isChrome) {
    return "Chrome";
  }

}
let BroType = myBrowser();
console.log("ooooooooooooooooo");
console.log(BroType);
if (BroType == "FF") {
  $('body').addClass('mac');
}

if (navigator.userAgent.indexOf('Mac OS X') !== -1) {
  $('body').addClass('mac');
} else {
  $('body').addClass('pc');
}




// 跳转后滚动条初始化
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
  NProgress.done() // 结束Progress
});
router.beforeEach((to, from, next) => {
  NProgress.start()

  // // 登录后存Cookies 给 HeaderModule
  // console.log(from.path);
  // if (from.path == '/login') {
  //   let token = Utils.getCookie("user_token");
  //   let newToken = token.replace('"', "").replace('"', "");
  //   if (token != undefined && token != null && token != "") {
  //     getUserInfo(newToken)
  //       .then(function (response) {
  //         // console.log(response);
  //         if (response.status == 200) {
  //           // 获取成功
  //           Utils.setCookieCry("H_ifLogin", 'true', 1);
  //           Utils.setCookieCry("H_Name", response.data.name, 1);
  //         }
  //       })
  //       .catch(function (error) {
  //         console.info(error);
  //       });
  //   }
  // }

  let NoAuthPages = [
    "/",
    "/homepage",
    "/transferpage",
    "/test",
    "/404",
    "/login",
    "/register",
    "/forgetpassword",
    "/productdetails",
    "/search",
    "/searchresult"
  ]
  // let AuthPage = [
  //   "/shoppingtrolley",
  //   "/checkorderinformation",
  //   "/personalcenter",
  //   "/orderdetails",
  //   "/evaluationdetails",
  //   "/makecomments",
  // ]
  // 订单页操作 非订单详细页 删除 cookie
  if (to.path != '/orderdetails' && to.path != '/OrderDetails') {
    // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    // Message(to.path);
    Utils.delCookieCry("ifOverShopping");
    Utils.delCookieCry("MOrderId");
  }

  if (NoAuthPages.indexOf(to.path) > -1) {
    NProgress.done();
    next();
  } else {

    let token = Utils.getCookie('user_token');
    if (!token) {
      // console.log("!token")
      if (to.path === '/login') {
        next()
      } else {
        next('/login')
        NProgress.done();
      }
    }
    else if (token) {
      NProgress.done();
      next()
    }
  }

  // next();
  // 路由跳转判断
});

new Vue({
  router,
  store,
  // mapGetters,
  render: h => h(App)
}).$mount("#app");