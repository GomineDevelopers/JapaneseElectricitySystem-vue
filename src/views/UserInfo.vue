<template>
  <div class="UserInfo height_auto">
    <vue-headful title="用户资料"></vue-headful>
    <el-header class="common">
      <HeaderModule id="navigation"></HeaderModule>
    </el-header>
    <el-main class="common">
      <TopSearchBox :searchType="'UserInfo'" :categories="[]"></TopSearchBox>
      <div class="pc_content">
        <PageFlow
          :Flow1="'首页'"
          :Flow2="'我的订单'"
          :Flow3="'个人中心'"
        ></PageFlow>
      </div>
    </el-main>

    <FooterNav></FooterNav>
    <el-footer class="el-footer">
      <FooterModule></FooterModule>
    </el-footer>
  </div>
</template>
<script>
import HeaderModule from "@/components/HeaderModule";

import TopSearchBox from "@/components/TopSearchBox";
import FooterNav from "@/components/FooterNav";
import FooterModule from "@/components/FooterModule";
import PageFlow from "@/components/PageFlow";

export default {
  name: "UserInfo",
  components: {
    HeaderModule,
    TopSearchBox,
    FooterNav,
    FooterModule,
    PageFlow
  },
  data() {
    return {};
  },
  mounted() {
    // 标题title浮动初始化
    this.$Utils.TitleInit();
    let vm = this;
  },
  methods: {}
};
</script>
<style></style>

<style scoped>
.UserInfo {
}
</style>
