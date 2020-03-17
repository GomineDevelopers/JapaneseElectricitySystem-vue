<template>
  <el-row class="ForgetPassword height_auto">
    <vue-headful title="重置密码"></vue-headful>
    <el-container class="height_auto">
      <el-header>
        <el-row class="top_header">
          <div class="inlineBlock_verTopP">
            <div class="header_left">
              <div class="img_logo_p">
                <img
                  @click="router_to('/')"
                  class="img_logo"
                  :src="require('@/assets/pic/logo.png')"
                  alt
                />
              </div>
            </div>

            <div class="inlineBlock_verTopP header_right">
              <span class="hr_common hr_left">您好，欢迎来到XXX海购！</span>
              <span class="hr_common hr_right">
                请
                <span @click="router_to('/login')" class="top_login">登录</span>
              </span>
            </div>
          </div>
        </el-row>
      </el-header>

      <div class="textAlignCenter_w100p R_content">
        <div class="R_content_child">
          <div class="inlineBlock_verTopP perRow">
            <div class="PR_left">手机号</div>
            <div>
              <div class="PR_right">
                <input
                  class="m_input"
                  v-model="phone"
                  placeholder="请输入手机号"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div class="inlineBlock_verTopP perRow">
            <div class="PR_left">新密码</div>
            <div>
              <div class="PR_right">
                <input
                  class="m_input"
                  v-model="password"
                  placeholder="0-16位字符"
                  type="password"
                />
              </div>
            </div>
          </div>

          <div class="inlineBlock_verTopP perRow">
            <div class="PR_left">确认新密码</div>
            <div>
              <div class="PR_right">
                <input
                  class="m_input"
                  v-model="password2"
                  placeholder="0-16位字符"
                  type="password"
                />
              </div>
            </div>
          </div>

          <div class="inlineBlock_verTopP perRow">
            <div class="PR_left">图片验证码</div>
            <div>
              <div class="inlineBlock_verTopP PR_right">
                <div>
                  <input
                    class="m_input m_input2"
                    v-model="v_code_pic"
                    placeholder="输入图片验证码"
                    type="text"
                  />
                </div>
                <div class="inlineBlock_verTopP">
                  <!-- <div>
                    <button @click="getVCodeImg()" class="v_code_btnShow v_code_btnShow2">获取图片验证码</button>
                  </div>-->
                  <div>
                    <img
                      @click="getVCodeImg()"
                      class="img_v_code_img"
                      :src="ImgUrl"
                      alt
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="inlineBlock_verTopP perRow">
            <div class="PR_left">短信验证码</div>
            <div>
              <div class="inlineBlock_verTopP PR_right">
                <div>
                  <input
                    class="m_input m_input2"
                    v-model="v_code"
                    placeholder="短信验证码"
                    type="text"
                  />
                </div>
                <div>
                  <button
                    v-if="ifGetAuthCode"
                    @click="getVCode('get')"
                    class="v_code_btnShow"
                  >
                    获取短信验证码
                  </button>
                  <button
                    v-if="!ifGetAuthCode"
                    @click="getVCode('refuse')"
                    class="v_code_btnShow"
                  >
                    {{ countDown }}s后获取
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="m_btn_p">
            <button @click="RegisterManage()" class="m_btn">重置密码</button>
          </div>
        </div>
      </div>
      <el-footer class="el-footer">
        <FooterModule></FooterModule>
      </el-footer>
    </el-container>
  </el-row>
</template>
<script>
import FooterModule from "@/components/FooterModule";
import { captchas, verificationCodes, reset_password } from "@/api/api";

export default {
  name: "ForgetPassword",
  components: {
    FooterModule
  },
  data() {
    return {
      phone: "",

      password: "",
      password2: "",
      v_code_pic: "",
      v_code: "",
      ImgUrl: require("@/assets/pic/VCodeImg.png"),
      captcha_key: "",
      verification_key: "",
      countDown: 0,
      initTime: 60,
      ifGetAuthCode: true
    };
  },
  mounted() {
    let vm = this;
    this.$nextTick(function() {
      setInterval(this.timer, 1000);
    });
    this.countDown = this.initTime;
  },
  methods: {
    router_to(str) {
      let vm = this;
      vm.$router.push({ path: str });
    },
    timer() {
      try {
        if (this.countDown > 0) {
          let temp_countDown = this.countDown;
          this.countDown--;
          if (temp_countDown == 1) {
            this.ifGetAuthCode = true;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    getVCode(AuthType) {
      if (AuthType == "get") {
        this.do_getVCode();
      }
      if (AuthType == "refuse") {
        // doNoting... 或者提示一下
        this.$message("请" + String(this.countDown) + "秒后再试！");
      }
    },
    do_getVCode() {
      let vm = this;
      if (this.$UninputJudgment(vm.v_code_pic, "请输入图片验证码！")) {
        return;
      }
      var formData = new FormData();
      var formData = new window.FormData();
      formData.append("captcha_key", this.captcha_key);
      formData.append("captcha_code", this.v_code_pic);
      verificationCodes(formData)
        .then(function(response) {
          console.log(response);
          // {data: {…}, status: 201, statusText: "Created", headers: {…}, config: {…}, …}
          // config: {url: "http://5095649e.ngrok.io/api/v2.0.0/verificationCodes", method: "post", data: FormData, headers: {…}, baseURL: "http://5095649e.ngrok.io/api/v2.0.0", …}
          // data: {key: "verificationCode_o0obauk76N4R5El", expired_at: "2020-03-06 11:17:33"}
          // headers: {content-type: "application/json", cache-control: "no-cache, private"}
          // request: XMLHttpRequest {onreadystatechange: ƒ, readyState: 4, timeout: 15000, withCredentials: false, upload: XMLHttpRequestUpload, …}
          // status: 201
          // statusText: "Created"
          // __proto__: Object
          vm.verification_key = response.data.key;

          vm.ifGetAuthCode = false; // 获取信息api成功才执行倒计时
          vm.countDown = vm.initTime; // 获取信息api成功才执行倒计时
        })
        .catch(function(error) {
          console.info(error);
          // vm.$message("获取短信验证码失败，请重试！");
          vm.getVCodeImg();
        });
    },
    getVCodeImg() {
      let vm = this;
      if (this.$UninputJudgment(vm.phone, "请输入手机号！")) {
        return;
      }
      var formData = new FormData();
      var formData = new window.FormData();
      formData.append("phone", this.phone);
      captchas(formData)
        .then(function(response) {
          console.log(response);
          // {data: {…}, status: 201, statusText: "Created", headers: {…}, config: {…}, …}
          // config: {url: "http://a1dae0ff.ngrok.io/api/v2.0.0/captchas", method: "post", data: FormData, headers: {…}, baseURL: "http://a1dae0ff.ngrok.io/api/v2.0.0", …}
          // data: {captcha_key: "captcha-xauFWueIyBFJS8w", expired_at: "2020-03-06 10:51:53", captcha_image_content: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD…lQo+ypO8m3d7WW1vN2v5JSa13XrteUeWFABQAUAFABQB//9k="}
          // headers: {content-type: "application/json", cache-control: "no-cache, private"}
          // request: XMLHttpRequest {onreadystatechange: ƒ, readyState: 4, timeout: 15000, withCredentials: false, upload: XMLHttpRequestUpload, …}
          // status: 201
          // statusText: "Created"
          // __proto__: Object
          if (response.status == 201) {
            vm.ImgUrl = response.data.captcha_image_content;
            vm.captcha_key = response.data.captcha_key;
          }
        })
        .catch(function(error) {
          console.info(error);
          // vm.$message("获取图片验证码失败，请重试！");
          vm.getVCodeImg();
        });
    },
    RegisterManage() {
      let vm = this;
      if (this.password2 != this.password) {
        this.$message("两次密码输入不一样！");
        return;
      }
      if (
        this.$UninputJudgment(
          [
            this.phone,
            this.password,
            this.password2,
            this.v_code_pic,
            this.v_code
          ],
          [
            "请输入手机号！",
            "请输入密码！",
            "请确认密码！",
            "请输入图片验证码！",
            "请输入短信验证码！"
          ]
        )
      ) {
        return;
      }

      var formData = new FormData();
      var formData = new window.FormData();
      formData.append("verification_key", this.verification_key);
      formData.append("verification_code", this.v_code);
      formData.append("password", this.password);
      formData.append("phone", this.phone);

      reset_password(formData)
        .then(function(response) {
          console.log(response);

          if (response.status == 200) {
            vm.$message("重置密码成功！即将跳转登录页面！");

            setTimeout(function() {
              vm.router_to("/login");
            }, 2000);
          }
        })
        .catch(function(error) {
          console.info(error);
          // vm.$message("重置密码失败，请重试！");
          vm.getVCodeImg();
        });
    }
  }
};
</script>
<style>
.ForgetPassword .el-checkbox__input.is-checked .el-checkbox__inner,
.ForgetPassword .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #775563;
  border-color: #775563;
}
.ForgetPassword .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #775563;
}
.ForgetPassword .el-header {
  height: 88px !important;
  padding: 0;
}
</style>

<style scoped>
.ForgetPassword .top_header {
  height: 88px;
  line-height: 88px;
  box-shadow: 0px 1px 0px 0px rgba(100, 100, 100, 0.5);
  min-width: 1200px;
}
.ForgetPassword .img_logo_p {
  padding-left: 210px;
  height: 88px;
  line-height: 88px;
}
.ForgetPassword .img_logo {
  width: 157px;
  height: 44px;
  vertical-align: top;
  margin-top: 22px;
}
.ForgetPassword .img_logo:hover {
  cursor: pointer;
}
.ForgetPassword .header_left {
  height: 88px;
  line-height: 88px;
}

.ForgetPassword .header_right {
  /* margin-left: 775px; */
  margin-left: 50%;
  height: 88px;
  line-height: 88px;
}
@media screen and (max-width: 1400px) and (min-width: 1201px) {
  .ForgetPassword .img_logo_p {
    padding-left: 170px;
  }
  .ForgetPassword .header_right {
    margin-left: 38%;
  }
}
@media screen and (max-width: 1200px) {
  .ForgetPassword .img_logo_p {
    padding-left: 120px;
  }
  .ForgetPassword .header_right {
    margin-left: 450px;
  }
}

.ForgetPassword .top_login:hover {
  cursor: pointer;
  text-decoration: underline;
  font-weight: bold;
}

.ForgetPassword .hr_common {
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(17, 26, 52, 1);
}
.ForgetPassword .hr_left {
  color: #111a34;
}
.ForgetPassword .hr_right {
  color: #775563;
}

/* ****内容部分 */
.ForgetPassword .R_content {
  padding-top: 100px;
  min-width: 1200px;
  height: calc(100% - 328px);
}
.ForgetPassword .R_content_child {
  min-width: 1200px;
}

.ForgetPassword .perRow {
  margin-bottom: 24px;
}
.ForgetPassword .PR_left {
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
.ForgetPassword .PR_right {
  width: 360px;
}
.ForgetPassword .m_input {
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
.ForgetPassword .m_input2 {
  width: 212px;
}

.ForgetPassword .v_code_btnShow {
  background: rgba(119, 85, 99, 1);
  width: 146px;
  color: #fff;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  border: 0;
  height: 42px;
}
.ForgetPassword .v_code_btnShow2 {
  width: 73px;
}
.ForgetPassword .img_v_code_img {
  height: 42px;
  /* width: 73px; */
  width: 146px;
  /* background-color: red; */
}
.ForgetPassword .img_v_code_img:hover {
  cursor: pointer;
}

.ForgetPassword .m_checkbox {
  margin-bottom: 36px;
}
.ForgetPassword .agreement_p {
  color: #111a34;
}
.ForgetPassword .agreement {
  color: #775563;
}

.ForgetPassword .m_btn {
  font-size: 16px;
  font-family: PingFangSCSemibold-;
  color: rgba(254, 248, 255, 1);
  border: 0;

  width: 360px;
  height: 47px;
  background: rgba(119, 85, 99, 1);
  border-radius: 4px;
  margin-top: 37px;
  margin-left: 93px;
}
</style>
