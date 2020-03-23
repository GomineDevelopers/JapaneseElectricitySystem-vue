<template>
  <el-row class="textAlignCenter_w100p FooterModule">
    <el-row class="footer_content main_width_1200">
      <el-row class="footer_logo">隐私政策 - 日本海购美术网</el-row>
      <div class="textAlignCenter_w100p">
        <!-- <span>增值电信业务经营许可证：贵B-20160288</span>
        <span>（贵）网械平台备字[2018]第00007号</span>
        <span>贵公安网备33010802002216</span>
        <span>贵ICP备16011229号</span>-->
        Copyright © 2008-2019 ZIDATA.CN 版权所有
        <a
          href="http://www.beian.miit.gov.cn"
          class="font_white a_href"
        >黔ICP备19004103号-1</a>
        <a
          class="font_white a_href"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=52011502000991"
        >
          <img class="ba_img" src="../assets/pic/ba.png" alt />贵公网安备 52011502000991号
        </a>

        <div class="font_white" style="margin:0 auto; padding:20px 0;">
          增值电信业务经营许可证：
          <a href=http://www.beian.miit.gov.cn class="font_white a_href a_href2">黔B2-20200004</a>
        </div>
      </div>
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
  min-width: 1200px;
}
.FooterModule span {
  margin-left: 27px;
}
.FooterModule span:nth-child(1) {
  margin-left: 0;
}
.footer_content {
 padding: 24px 0px 0px 0px;
}
.footer_logo {
  margin-bottom: 16px;
}
.ba_img {
  width: 14px;
  height: 14px;
  margin-right: 5px;
}
.font_white {
  color: #fff;
}
.a_href {
  text-decoration: none;
  margin-left: 16px;
}
.a_href2 {
  margin-left: 0;
}
.a_href:hover {
  text-decoration: underline;
}
</style>
