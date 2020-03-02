import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// 测试 - Test
// 404 - 404
// 首页 - Home(/)

// 整体设置 - GlobalSettings
// 登录 - Login
// 首页 - MainMenu
// 会议背景 - MeetingBackground
// 会议日程 - MeetingSchedule
// 讲师介绍 - LecturerIntroduction
// 赞助商 - Sponsor
// 会务日程 - ConferenceSchedule
// 调查问卷 - Questionnaire
// 资料下载 - DataDownload 
// 联系我们 - ConnectUs 
// 个人中心 - PersonalCenter
// 报表 - ReportForms


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
    {
      path: "/globalsettings",
      name: "GlobalSettings",
      component: () => import("@/views/system/GlobalSettings")
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/system/Login")
    },
    {
      path: "/mainmenu",
      name: "MainMenu",
      component: () => import("@/views/system/MainMenu")
    },
    {
      path: "/meetingbackground",
      name: "MeetingBackground",
      component: () => import("@/views/system/MeetingBackground")
    },
    {
      path: "/meetingschedule",
      name: "MeetingSchedule",
      component: () => import("@/views/system/MeetingSchedule")
    },
    {
      path: "/lecturerintroduction",
      name: "LecturerIntroduction",
      component: () => import("@/views/system/LecturerIntroduction")
    },
    {
      path: "/sponsor",
      name: "Sponsor",
      component: () => import("@/views/system/Sponsor")
    },
    {
      path: "/conferenceschedule",
      name: "ConferenceSchedule",
      component: () => import("@/views/system/ConferenceSchedule")
    },
    {
      path: "/questionnaire",
      name: "Questionnaire",
      component: () => import("@/views/system/Questionnaire")
    },
    {
      path: "/datadownload",
      name: "DataDownload",
      component: () => import("@/views/system/DataDownload")
    },
    {
      path: "/connectus",
      name: "ConnectUs",
      component: () => import("@/views/system/ConnectUs")
    },
    {
      path: "/personalcenter",
      name: "PersonalCenter",
      component: () => import("@/views/system/PersonalCenter")
    },
    {
      path: "/reportforms",
      name: "ReportForms",
      component: () => import("@/views/system/ReportForms")
    },
  ]
});
