<template>
  <div class="FooterNav">
    <div class="textAlignCenter_w100p tags_settings">
      <div class="inlineBlock_verTopP">
        <template v-for="(item,index) in tagsArr ">
          <div class="inlineBlock_verTopP perTag" :key="index+ 'ta'">
            <div class="tag_left">{{item.tag}}</div>
            <div class="tag_right">
              <div class="tr_top">{{item.title}}</div>
              <div class="tr_bottom">{{item.info}}</div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="textAlignCenter_w100p inlineBlock_verTopP href_settings">
      <div class="hs_left">
        <el-col class="img_logo_p">
          <img @click="router_to('/')" class="img_logo" :src="require('@/assets/pic/logo.png')" alt />
        </el-col>
      </div>
      <div class="hs_middle">
        <div class="inlineBlock_verTopP">
          <template v-for="(item,index) in hrefArr ">
            <div class="perHref" :key="index+ 'ha'">
              <div class="ha_title">{{item.title}}</div>
              <template v-for="(itemC,indexC) in item.content ">
                <div class :key="indexC+ 'haC'">
                  <div
                    v-if="itemC.sTitle !='CEO邮箱' && itemC.sTitle !='线下店' && itemC.sTitle !='联系我们'"
                    @click="GoHref(itemC.URL)"
                    class="sTitleContent"
                  >{{itemC.sTitle}}</div>
                  <div
                    v-if="itemC.sTitle =='联系我们'"
                    @click="ConnectUs()"
                    class="sTitleContent"
                  >{{itemC.sTitle}}</div>
                  <div
                    v-if="itemC.sTitle =='CEO邮箱'"
                    @click="CEOMail()"
                    class="sTitleContent"
                  >{{itemC.sTitle}}</div>
                  <div
                    v-if="itemC.sTitle =='线下店'"
                    @click="router_to(itemC.URL)"
                    class="sTitleContent"
                  >{{itemC.sTitle}}</div>
                </div>
              </template>
            </div>
          </template>
        </div>
      </div>
      <div class="inlineBlock_verTopP hs_right">
        <div class="perQR">
          <div class="QRCode_P">
            <img class="QRCode" src="../assets/pic/QRCode.png" alt />
          </div>
          <div class="QR_info">XXX海淘</div>
          <div class="QR_info">公众号</div>
        </div>

        <div class="perQR">
          <div class="QRCode_P">
            <img class="QRCode" src="../assets/pic/QRCode2.png" alt />
          </div>
          <div class="QR_info">XXX海淘</div>
          <div class="QR_info">微博账号</div>
        </div>
      </div>
    </div>

    <!-- 二维码弹窗 -->
    <div v-show="Dialog1 == true" class="Dialog1">
      <div class="Dialog1_bg">
        <h2>联系我们</h2>
        <div class="inlineBlock_verTopP cu_text">
          <div class="cu_t0">GOMINE-北京总部</div>
        </div>
        <div class="inlineBlock_verTopP">
          <!-- <div>
            <img class="img_Dialog" :src="img_Dialog" alt />
          </div>-->
          <div>
            <com-mymap></com-mymap>
          </div>
        </div>
        <div class="inlineBlock_verTopP cu_text">
          <div class="cu_t1">
            <i class="el-icon-location"></i>&nbsp;地址：
          </div>
          <div class="cu_t2">北京市朝阳区东四环中路58号远洋国际中心D座2202</div>
        </div>
        <div class="inlineBlock_verTopP cu_text">
          <div class="cu_t1">
            <i class="el-icon-phone"></i>&nbsp;电话：
          </div>
          <div class="cu_t2">010-59648158</div>
        </div>
        <div class="inlineBlock_verTopP cu_text">
          <div class="cu_t1">
            <i class="el-icon-eleme"></i>&nbsp;官网：
          </div>
          <div @click="GoHref(OfficialWebsite)" class="cu_t2 cu_t3">{{OfficialWebsite}}</div>
        </div>
        <el-button class="closeBtn" @click="Cancel1()">关闭</el-button>
      </div>
    </div>
    <!-- 二维码弹窗2 -->

    <div v-show="Dialog2 == true" class="Dialog1 Dialog2">
      <div class="Dialog1_bg Dialog2_bg">
        <h2>CEO邮箱</h2>
        <div class="inlineBlock_verTopP cu_text cu_text2">尊敬的xxx海购合作伙伴：</div>
        <div
          class="inlineBlock_verTopP cu_text cu_text2 indent"
        >为了加强xxx海购与商户之间的密切交流与合作，我们特别开通了xxx海购CEO邮箱，希望能够与大家更直接有效的进行沟通交流。当您在xxx海购的交易合作过程中遇到问题，或您对我们的发展有更多的建议及意见反馈。请您通过此邮箱联系我们！</div>
        <div class="inlineBlock_verTopP cu_text cu_text2">
          邮箱地址：
          <a href="mailto:marketing@gomine.cn">marketing@gomine.cn</a>
        </div>
        <div class="inlineBlock_verTopP cu_text cu_text2">感谢您对我们的支持与配合！</div>
        <el-button class="closeBtn" @click="Cancel2()">关闭</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import mymap from "@/components/mymap";
export default {
  name: "FooterNav",
  components: {
    "com-mymap": mymap
  },
  data() {
    return {
      tagsArr: [
        {
          tag: "正",
          title: "正品承诺",
          info: "正品保障 假一赔十"
        },
        {
          tag: "低",
          title: "低价保障",
          info: "缩减中间环节 确保低价"
        },
        {
          tag: "退",
          title: "30天无忧退货",
          info: "国内退货 售后无忧"
        },
        {
          tag: "邮",
          title: "满88包邮",
          info: "部分特殊商品除外"
        }
      ],
      hrefArr: [
        {
          title: "正品保障",
          content: [
            { sTitle: "假一赔十", URL: "" },
            { sTitle: "廉政举报", URL: "" }
          ]
        },
        {
          title: "新品指南",
          content: [
            { sTitle: "购物流程", URL: "" },
            { sTitle: "支付方式", URL: "" },
            { sTitle: "通关税费", URL: "" },
            { sTitle: "常见问题", URL: "" }
          ]
        },
        {
          title: "售后服务",
          content: [
            { sTitle: "售后政策", URL: "" },
            { sTitle: "退货流程", URL: "" },
            { sTitle: "特色服务", URL: "" },
            { sTitle: "联系客服", URL: "" }
          ]
        },
        {
          title: "物流配送",
          content: [
            { sTitle: "配送方式", URL: "" },
            { sTitle: "配送服务", URL: "" },
            { sTitle: "运费标准", URL: "" },
            { sTitle: "物流标准", URL: "" }
          ]
        },
        {
          title: "关于我们",
          content: [
            { sTitle: "联系我们", URL: "http://www.gomine.cn/contact.html" },
            { sTitle: "CEO邮箱", URL: "/" },
            { sTitle: "线下店", URL: "/" }
          ]
        }
      ],
      img_Dialog: require("@/assets/pic/about.png"),
      OfficialWebsite: "http://www.gomine.cn/index.html",
      Dialog1: false,
      Dialog2: false
    };
  },
  mounted() {
    let vm = this;
  },
  methods: {
    Cancel2() {
      let vm = this;
      vm.Dialog2 = false;
    },
    CEOMail() {
      this.Dialog2 = true;
    },
    Cancel1() {
      let vm = this;
      vm.Dialog1 = false;
    },
    ConnectUs() {
      this.Dialog1 = true;
    },
    GoHref(href) {
      window.location.href = href;
    },
    router_to(str) {
      let vm = this;
      vm.$router.push({ path: str });
    }
  }
};
</script>
<style scoped>
.FooterNav {
}

/* ***** tags */
.FooterNav .tags_settings {
  /* margin-top: 96px; */
  margin-top: 56px;
  margin-bottom: 56px;
}
.FooterNav .perTag {
  width: 295px;
  height: 48px;
}
.FooterNav .tag_left {
  margin-right: 9px;
  height: 48px;
  line-height: 48px;
  width: 48px;
  border: 1px solid rgba(119, 85, 99, 1);
  border-radius: 50px;

  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(119, 85, 99, 1);
}
.FooterNav .tag_right {
  text-align: left;
}
.FooterNav .tr_top {
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 25px;
  margin-bottom: 3px;
}
.FooterNav .tr_bottom {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
}

/* ****** href  */
.FooterNav .href_settings {
  margin-bottom: 56px;
}
.FooterNav .hs_left {
  /* margin-right: 96px; */
  margin-right: 56px;
}
.FooterNav .hs_middle {
  /* margin-right: 126px; */
  margin-right: 66px;
}
.FooterNav .img_logo_p {
  /* padding-left: 210px; */
}
.FooterNav .img_logo {
  width: 157px;
  height: 44px;
}
.FooterNav .img_logo:hover {
  cursor: pointer;
}

.FooterNav .perHref {
  /* margin-right: 40px; */
  margin-right: 30px;
  width: 100px;
}
.FooterNav .ha_title {
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(119, 85, 99, 1);
  line-height: 22px;
  margin-bottom: 20px;
}
.FooterNav .sTitleContent {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
  margin-bottom: 12px;
}
.FooterNav .ha_title,
.FooterNav .sTitleContent {
  cursor: pointer;
}

.FooterNav .QRCode {
  width: 100px;
  height: 100px;
}
.FooterNav .QRCode_P {
  margin-bottom: 12px;
}

.FooterNav .QR_info {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(119, 85, 99, 1);
  line-height: 20px;
}
/* ***** 弹出框 */
.FooterNav .Dialog1 {
  top: 0;
  padding-top: 90px;
  position: fixed;
  text-align: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1000;
}
.FooterNav .Dialog2 {
  padding-top: 180px;
}

.FooterNav .Dialog1_bg {
  height: 660px;
  width: 800px;
  text-align: center;
  padding: 32px 68px;
  background-color: #ffffff;
  margin: 0 auto;
  border-radius: 10px;
}
.FooterNav .Dialog2_bg {
  height: 400px;
  width: 800px;
}

.FooterNav .closeBtn {
  margin-top: 16px;
}
.FooterNav .img_Dialog {
  height: 398px;
  width: 398px;
}
.FooterNav .cu_text {
  text-align: left;
  margin-top: 10px;
  margin-bottom: 8px;
}
.FooterNav .cu_text2 {
  margin-top: 32px;
  margin-bottom: 32px;
}
.FooterNav .cu_t0 {
  font-weight: bold;
}
.FooterNav .cu_t1 {
  width: 9%;
}
.FooterNav .cu_t2 {
  width: 89%;
}
.FooterNav .cu_t3 {
  text-decoration: underline;
  color: rgb(0, 0, 238);
}
.FooterNav .cu_t3:hover {
  cursor: pointer;
}

.FooterNav .indent {
  text-indent: 16px;
  line-height: 24px;
}
</style>

