<template>
  <el-row class="FooterModule">
    <el-row class="footer_content main_width_1200">
      <el-row class="footer_logo">隐私政策 - XXX海购</el-row>
      <el-row>
        <span>增值电信业务经营许可证：贵B-20160288</span>
        <span>（贵）网械平台备字[2018]第00007号</span>
        <span>贵公安网备33010802002216</span>
        <span>贵ICP备16011229号</span>
      </el-row>
    </el-row>
  </el-row>
</template>
<script>
export default {
  name: "FooterModule",
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style>
.FooterModule {
  font-size: 14px;
  text-align: center;
}
.FooterModule span {
  margin-left: 27px;
}
.FooterModule span:nth-child(1) {
  margin-left: 0;
}
.footer_content {
  padding: 24px 0px 32px;
}
.footer_logo {
  margin-bottom: 16px;
}
</style>
