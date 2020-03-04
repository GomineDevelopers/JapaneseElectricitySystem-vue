<template>
  <div class="Register">
    <vue-headful title="注册"></vue-headful>
    <el-container class="height_auto">
      <el-header>
        <el-row class="top_header">
          <div class="inlineBlock_verTopP">
            <div class="header_left">
              <div class="img_logo_p">
                <img class="img_logo" :src="require('@/assets/pic/logo.png')" alt />
              </div>
            </div>

            <div class="inlineBlock_verTopP header_right">
              <span class="hr_common hr_left">您好，欢迎来到XXX海购！</span>
              <span class="hr_common hr_right">请登录</span>
            </div>
          </div>
        </el-row>
      </el-header>

      <div class="textAlignCenter_w100p R_content">
        <div class="R_content_child">
          <div class="inlineBlock_verTopP perRow">
            <div class="PR_left">用户名</div>
            <div>
              <div class="PR_right">
                <input class="m_input" v-model="user" placeholder="手机号" type="text" />
              </div>
            </div>
          </div>

          <div class="inlineBlock_verTopP perRow">
            <div class="PR_left">密码</div>
            <div>
              <div class="PR_right">
                <input class="m_input" v-model="account" placeholder="0-16位字符" type="text" />
              </div>
            </div>
          </div>

          <div class="inlineBlock_verTopP perRow">
            <div class="PR_left">确认密码</div>
            <div>
              <div class="PR_right">
                <input class="m_input" v-model="account2" placeholder="0-16位字符" type="text" />
              </div>
            </div>
          </div>

          <div class="inlineBlock_verTopP perRow">
            <div class="PR_left">短信验证码</div>
            <div>
              <div class="inlineBlock_verTopP PR_right">
                <div>
                  <input class="m_input m_input2" v-model="v_code" placeholder="短信验证码" type="text" />
                </div>
                <div>
                  <button class="v_code_btnShow">获取短信验证码</button>
                </div>
              </div>
            </div>
          </div>

          <div class="textAlignCenter_w100p m_checkbox">
            <el-checkbox v-model="ifRead">
              <span class="agreement_p">
                我已阅读并同意
                <span class="agreement">《用户注册协议》</span>
              </span>
            </el-checkbox>
          </div>

          <div class="m_btn_p">
            <button class="m_btn">登录</button>
          </div>
        </div>
      </div>
    </el-container>

    <el-footer class="el-footer">
      <FooterModule></FooterModule>
    </el-footer>
  </div>
</template>
<script>
import FooterModule from "@/components/FooterModule";

export default {
  name: "Register",
  components: {
    FooterModule
  },
  data() {
    return {
      user: "",
      account: "",
      account2: "",
      v_code: "",
      ifRead: true
    };
  },
  mounted() {
    let vm = this;
  },
  methods: {}
};
</script>
<style >
.Register .el-checkbox__input.is-checked .el-checkbox__inner,
.Register .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #775563;
  border-color: #775563;
}
.Register .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #775563;
}
</style>



<style scoped>
.Register {
}

.Register .el-header {
  height: 80px;
}
.Register .top_header {
  height: 88px;
  line-height: 88px;
  box-shadow: 0px 1px 0px 0px rgba(100, 100, 100, 0.5);
  min-width: 1200px;
}
.Register .img_logo_p {
  padding-left: 210px;
  height: 88px;
  line-height: 88px;
}
.Register .img_logo {
  width: 157px;
  height: 44px;
  vertical-align: top;
  margin-top: 22px;
}
.Register .header_left {
  height: 88px;
  line-height: 88px;
}

.Register .header_right {
  /* margin-left: 775px; */
  margin-left: 50%;
  height: 88px;
  line-height: 88px;
}
@media screen and (max-width: 1400px) and (min-width: 1201px) {
  .Login .img_logo_p {
    padding-left: 170px;
  }
  .Register .header_right {
    margin-left: 38%;
  }
}
@media screen and (max-width: 1200px) {
  .Login .img_logo_p {
    padding-left: 120px;
  }
  .Register .header_right {
    margin-left: 450px;
  }
}

.Register .hr_common {
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(17, 26, 52, 1);
}
.Register .hr_left {
  color: #111a34;
}
.Register .hr_right {
  color: #775563;
}

/* ****内容部分 */
.Register .R_content {
  padding-top: 100px;
  height: 700px;
  min-width: 1200px;
}
.Register .R_content_child {
  min-width: 1200px;
}

.Register .perRow {
  margin-bottom: 24px;
}
.Register .PR_left {
  width: 80px;
  text-align: right;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(17, 26, 52, 1);
  height: 42px;
  line-height: 42px;
  margin-right: 13px;
}
.Register .PR_right {
  width: 360px;
}
.Register .m_input {
  width: 360px;
  height: 40px;
  border: 1px solid rgba(204, 193, 198, 1);
  font-size: 14px;
  line-height: 20px;
  color: rgba(17, 26, 52, 1);
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  padding: 0;
  text-indent: 10px;
}
.Register .m_input2 {
  width: 212px;
}

.Register .v_code_btnShow {
  background: rgba(119, 85, 99, 1);
  width: 146px;
  color: #fff;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  border: 0;
  height: 42px;
}

.Register .m_checkbox {
  margin-bottom: 36px;
}
.Register .agreement_p {
  color: #111a34;
}
.Register .agreement {
  color: #775563;
}

.Register .m_btn {
  font-size: 16px;
  font-family: PingFangSCSemibold-;
  color: rgba(254, 248, 255, 1);
  border: 0;

  width: 360px;
  height: 47px;
  background: rgba(119, 85, 99, 1);
  border-radius: 4px;
}
</style>

