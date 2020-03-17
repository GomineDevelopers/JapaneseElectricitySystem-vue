<template>
  <!-- 页面流程 -->
  <div class="pageFlow">
    <span @click="router_toSpec(Flow1)" class="pageFlow_href">{{Flow1}}</span>
    <span>&nbsp;>&nbsp;</span>
    <span @click="router_toSpec(Flow2)" class="pageFlow_href">{{Flow2}}</span>
    <span>&nbsp;>&nbsp;</span>
    <span @click="router_toSpec(Flow3)" class="pageFlow_href pageFlow_href_current">{{Flow3}}</span>
  </div>
</template>
<script>
export default {
  name: "PageFlow",
  props: ["Flow1", "Flow2", "Flow3"],
  data() {
    return {};
  },
  methods: {
    router_toSpec(str) {
      let vm = this;
      if (str == "首页") {
        vm.$router.push({ path: "/" });
      }
      if (str == "个人中心") {
        vm.$router.push({
          path: "personalcenter",
          query: {
            activeName: "1"
          }
        });
      }
      if (str == "我的订单") {
        vm.$router.push({
          path: "personalcenter",
          query: {
            activeName: "2"
          }
        });
      }
    }
  }
};
</script>
<style scoped>
/* ***** 页面流程 */
.pageFlow {
  margin-bottom: 38px;
}
.pageFlow_href {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
}
.pageFlow_href:hover {
  cursor: pointer;
  text-decoration: underline;
}

.pageFlow_href_current {
  color: #775563;
}
/* *****  */
</style>
