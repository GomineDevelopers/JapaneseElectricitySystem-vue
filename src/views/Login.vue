<template>
  <div class="Login height_auto">
    <vue-headful title="登录"></vue-headful>
    <el-container class="height_auto">
      <el-header class="common">
        <el-row class="top_header">
          <el-row class>
            <el-col class="img_logo_p">
              <img
                @click="router_to('/')"
                class="img_logo"
                :src="require('@/assets/pic/logo.png')"
                alt
              />
            </el-col>
          </el-row>
        </el-row>
      </el-header>

      <div class="login_content">
        <div class="login_box">
          <div class="inlineBlock_verTopP l_title">
            <div class="inlineBlock_verTopP lt_left">
              <div
                v-show="LoginType == 'account'"
                class="LoginChoose0 LoginChoose1"
                @click="LoginType = 'account'"
              >
                账号登录
              </div>
              <div
                v-show="LoginType == 'phone'"
                class="LoginChoose0 LoginChoose2"
                @click="LoginType = 'account'"
              >
                账号登录
              </div>
              <div
                v-show="LoginType == 'phone'"
                class="LoginChoose0 LoginChoose1 LCMargin"
                @click="LoginType = 'phone'"
              >
                手机登录
              </div>
              <div
                v-show="LoginType == 'account'"
                class="LoginChoose0 LoginChoose2 LCMargin"
                @click="LoginType = 'phone'"
              >
                手机登录
              </div>
            </div>
            <!-- <div class="inlineBlock_verTopP lt_right">
              <div class="ltr_text">立即注册</div>
              <div class="ltr_img">
                <img class="svg_img" :src="require('@/assets/pic/svg.png')" alt />
              </div>
            </div>-->
          </div>

          <div v-show="LoginType == 'account'">
            <div class="inlineBlock_verTopP l_box l_user">
              <div class="login_icon_p">
                <img
                  class="login_icon"
                  :src="require('@/assets/pic/user.png')"
                  alt
                />
              </div>
              <div class="inlineBlock_verTopP">
                <input
                  class="m_input"
                  v-model="user_phone"
                  placeholder="手机号/用户名"
                  type="text"
                />
              </div>
            </div>
            <div class="inlineBlock_verTopP l_box l_password">
              <div class="login_icon_p">
                <img
                  class="login_icon"
                  :src="require('@/assets/pic/password.png')"
                  alt
                />
              </div>
              <div class>
                <input
                  class="m_input"
                  v-model="password"
                  placeholder="密码"
                  type="password"
                />
              </div>
            </div>
            <div class="inlineBlock_verTopP l_box l_v_code">
              <div class="login_icon_p">
                <img
                  class="login_icon"
                  :src="require('@/assets/pic/verificationCode.png')"
                  alt
                />
              </div>
              <div class>
                <input
                  class="m_input m_input2"
                  v-model="v_code_pic"
                  placeholder="图片验证码"
                  type="text"
                />
              </div>
              <div class="img_v_code_img_p">
                <!-- <button class="v_code_btnShow">{{btn_show}}</button> -->
                <img
                  @click="getVCodeImg('password')"
                  class="img_v_code_img"
                  :src="ImgUrl"
                  alt
                />
              </div>
            </div>
            <div class="inlineBlock_verTopP l_passwordinfo">
              <div class="l_checkbox">
                <el-checkbox v-model="ifRemPwd">记住密码</el-checkbox>
              </div>
              <div class="forget_password">
                <span
                  @click="router_to('/forgetpassword')"
                  class="forget_password_c"
                  >忘记密码</span
                >
                <span>&nbsp;|&nbsp;</span>
                <span @click="router_to('/register')" class="forget_password_c"
                  >免费注册</span
                >
              </div>
            </div>
            <div class="l_btn">
              <button @click="LoginManage('password')" class="login_btn">
                登录
              </button>
            </div>
          </div>

          <div v-show="LoginType == 'phone'">
            <div class="inlineBlock_verTopP l_box l_user">
              <div class="login_icon_p">
                <img
                  class="login_icon"
                  :src="require('@/assets/pic/user.png')"
                  alt
                />
              </div>
              <div class="inlineBlock_verTopP">
                <input
                  class="m_input"
                  v-model="phone"
                  placeholder="手机号"
                  type="text"
                />
              </div>
            </div>
            <div class="inlineBlock_verTopP l_box l_v_code">
              <div class="login_icon_p">
                <img
                  class="login_icon"
                  :src="require('@/assets/pic/verificationCode.png')"
                  alt
                />
              </div>
              <div class>
                <input
                  class="m_input m_input2"
                  v-model="v_code_pic2"
                  placeholder="图片验证码"
                  type="text"
                />
              </div>
              <!-- <div>
                <button class="v_code_btnShow">{{btn_show}}</button>
              </div>-->
              <div class="img_v_code_img_p">
                <img
                  @click="getVCodeImg('message')"
                  class="img_v_code_img"
                  :src="ImgUrl2"
                  alt
                />
              </div>
            </div>
            <div class="inlineBlock_verTopP l_box l_v_code">
              <div class="login_icon_p">
                <img
                  class="login_icon"
                  :src="require('@/assets/pic/verificationCode.png')"
                  alt
                />
              </div>
              <div class>
                <input
                  class="m_input m_input2 m_input3"
                  v-model="v_code"
                  placeholder="短信验证码"
                  type="text"
                />
              </div>
              <div>
                <button
                  v-if="ifGetAuthCode"
                  class="v_code_btnShow v_code_btnShow2"
                  @click="MessageAuthCode('get')"
                >
                  获取验证码
                </button>
                <button
                  v-if="!ifGetAuthCode"
                  class="v_code_btnShow v_code_btnShow2"
                  @click="MessageAuthCode('refuse')"
                >
                  {{ countDown }}s后获取
                </button>
              </div>
            </div>

            <div class="inlineBlock_verTopP l_passwordinfo">
              <div class="forget_password forget_password2">
                <span
                  @click="router_to('/forgetpassword')"
                  class="forget_password_c"
                  >忘记密码</span
                >
                <span>&nbsp;|&nbsp;</span>
                <span @click="router_to('/register')" class="forget_password_c"
                  >免费注册</span
                >
              </div>
            </div>
            <div class="l_btn">
              <button @click="LoginManage('message')" class="login_btn">
                登录
              </button>
            </div>
          </div>
        </div>
      </div>
      <el-footer class="el-footer">
        <FooterModule></FooterModule>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import FooterModule from "@/components/FooterModule";
import {
  captchas,
  verificationCodes,
  authorizations,
  authorizations_sms,
  getUserInfo
} from "@/api/api";

export default {
  name: "Login",
  components: {
    FooterModule
  },
  watch: {},
  data() {
    return {
      LoginType: "account", // "account" - 账号登录  "phone" - 手机登录
      user_phone: "", // 'password'
      phone: "", // 'message'
      password: "",
      v_code_pic: "",
      v_code_pic2: "",
      v_code: "",
      btn_show: "89db",
      ifRemPwd: true,
      countDown: 0,
      initTime: 60,
      ifGetAuthCode: true,
      ImgUrl: require("@/assets/pic/VCodeImg.png"),
      ImgUrl2: require("@/assets/pic/VCodeImg.png"),
      captcha_key: "",
      access_token: ""
    };
  },
  mounted() {
    let vm = this;
    this.$nextTick(function() {
      setInterval(this.timer, 1000);
    });
    this.countDown = this.initTime;

    // 记住密码模块
    let tem_ifRemPwd = this.$Utils.getCookieCry("ifRemPwd");
    let tem_account = this.$Utils.getCookieCry("account");
    let tem_password = this.$Utils.getCookieCry("password");
    let tem_ifLogout = this.$Utils.getCookieCry("ifLogout");
    if (tem_ifRemPwd == "true") {
      this.ifRemPwd = true; // 初始化by cookie
      this.user_phone = tem_account;
      this.password = tem_password;
      console.log("记住密码");
    } else {
      this.ifRemPwd = false; // 初始化by cookie
      this.user_phone = tem_account;
      console.log("不记住密码");
    }
  },
  methods: {
    router_to(str) {
      let vm = this;
      vm.$router.push({ path: str });
    },
    LoginManage(LoginType) {
      let vm = this;

      if (LoginType == "password") {
        // 密码

        if (
          this.$UninputJudgment(
            [this.user_phone, this.password, this.v_code_pic],
            ["请输入手机号/用户名！", "请输入密码！", "请输入图片验证码！"]
          )
        ) {
          return;
        }

        // /// 记住密码操作
        // vm.$Utils.delCookieCry("ifLogout"); // 登出配置-用于自动（登录关掉）
        let string_ifRemPwd = this.ifRemPwd.toString();
        // 记录账号-直接
        vm.$Utils.setCookieCry("account", this.user_phone, 1);
        // 记住密码-需判断

        if (vm.ifRemPwd) {
          vm.$Utils.setCookieCry("ifRemPwd", "true", 1); //Rem = ifAutoLogin
          vm.$Utils.setCookieCry("password", this.password, 1);
        }
        // ///

        var formData = new FormData();
        var formData = new window.FormData();
        formData.append("username", this.user_phone);
        formData.append("password", this.password);
        formData.append("captcha_key", this.captcha_key);
        formData.append("captcha_code", this.v_code_pic);

        authorizations(formData)
          .then(function(response) {
            console.log(response);
            // {data: {…}, status: 201, statusText: "Created", headers: {…}, config: {…}, …}
            // config: {url: "http://shop.zidata.cn/api/v2.0.0/authorizations", method: "post", data: FormData, headers: {…}, baseURL: "http://shop.zidata.cn/api/v2.0.0", …}
            // data: {access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJod…mNyJ9.0PZhH1SuxHpx8lMZCti9O5MjB1NRAlJMp_Vo45Y5PPM", token_type: "Bearer", expires_in: 3600}
            // headers: {content-type: "application/json", cache-control: "no-cache, private"}
            // request: XMLHttpRequest {onreadystatechange: ƒ, readyState: 4, timeout: 15000, withCredentials: false, upload: XMLHttpRequestUpload, …}
            // status: 201
            // statusText: "Created"
            // __proto__: Object
            if (response.status == 201) {
              vm.access_token = response.data.access_token;
              vm.$Utils.setCookie(
                "user_token",
                JSON.stringify(vm.access_token),
                60
              ); // 存用户的新token(60分钟)

              vm.$message("登录成功！");
              setTimeout(function() {
                if (
                  global.historyPageURL != undefined &&
                  global.historyPageURL != null &&
                  global.historyPageURL != ""
                ) {
                  vm.router_to(global.historyPageURL);
                } else {
                  let token = vm.$Utils.getCookie("user_token");
                  let newToken = token.replace('"', "").replace('"', "");
                  getUserInfo(newToken)
                    .then(function(response) {
                      // console.log(response);
                      if (response.status == 200) {
                        // 获取成功
                        vm.$Utils.setCookieCry("H_ifLogin", "true", 1);
                        vm.$Utils.setCookieCry("H_Name", response.data.name, 1);
                        vm.router_to("/");
                      }
                    })
                    .catch(function(error) {
                      console.info(error);
                    });
                }
              }, 2000);
            }
          })
          .catch(function(error) {
            console.info(error);
            // vm.$message("登录失败，请重试！");
            vm.getVCodeImg("password");
          });
      }
      if (LoginType == "message") {
        // 短信
        // 密码

        if (
          this.$UninputJudgment(
            [this.phone, this.v_code_pic2, this.v_code],
            ["请输入手机号！", "请输入图片验证码！", "请输入短信验证码！"]
          )
        ) {
          console.log("请输入手机号~~1");
          return;
        }

        var formData = new FormData();
        var formData = new window.FormData();
        formData.append("verification_key", this.verification_key);
        formData.append("verification_code", this.v_code);
        formData.append("phone", this.phone);

        authorizations_sms(formData)
          .then(function(response) {
            console.log(response);
            // {
            //     "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9zaG9wLnppZGF0YS5jblwvYXBpXC92Mi4wLjBcL2F1dGhvcml6YXRpb25zIiwiaWF0IjoxNTgzNDc0MTYwLCJleHAiOjE1ODM0Nzc3NjAsIm5iZiI6MTU4MzQ3NDE2MCwianRpIjoiS1RPTWVLazkyMkRad1ZrZiIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.kYRJjES3aQiYtdgPOBoElj2Qa2EVyUfpsd9O0UuBJyk",
            //     "token_type": "Bearer",
            //     "expires_in": 3600
            // }
            if (response.status == 201) {
              vm.$Utils.setCookie(
                "user_token",
                JSON.stringify(response.data.access_token),
                60
              ); // 存用户的新token(60分钟)

              vm.$message("登录成功！");
              setTimeout(function() {
                if (
                  global.historyPageURL != undefined &&
                  global.historyPageURL != null &&
                  global.historyPageURL != ""
                ) {
                  vm.router_to(global.historyPageURL);
                } else {
                  let token = vm.$Utils.getCookie("user_token");
                  let newToken = token.replace('"', "").replace('"', "");
                  getUserInfo(newToken)
                    .then(function(response) {
                      // console.log(response);
                      if (response.status == 200) {
                        // 获取成功
                        vm.$Utils.setCookieCry("H_ifLogin", "true", 1);
                        vm.$Utils.setCookieCry("H_Name", response.data.name, 1);
                        vm.router_to("/");
                      }
                    })
                    .catch(function(error) {
                      console.info(error);
                    });
                }
              }, 2000);
            }
          })
          .catch(function(error) {
            console.info(error);
            // vm.$message("登录失败，请重试！");
            vm.getVCodeImg("message");
          });
      }
    },
    getVCodeImg(accountType) {
      let vm = this;
      if (accountType == "password") {
        if (this.$UninputJudgment(this.user_phone, "请请输入手机号/用户名！")) {
          return;
        }
      }
      if (accountType == "message") {
        if (this.$UninputJudgment(this.phone, "请输入手机号！")) {
          console.log("请输入手机号~~2");
          return;
        }
      }

      var formData = new FormData();
      var formData = new window.FormData();
      if (accountType == "password") {
        formData.append("phone", this.user_phone);
      }
      if (accountType == "message") {
        formData.append("phone", this.phone);
      }

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
            if (accountType == "password") {
              vm.ImgUrl = response.data.captcha_image_content;
            }
            if (accountType == "message") {
              vm.ImgUrl2 = response.data.captcha_image_content;
            }
          }
          vm.captcha_key = response.data.captcha_key;
        })
        .catch(function(error) {
          console.info(error);
          // vm.$message("获取图片验证码失败，请重试！");
          vm.getVCodeImg("message");
        });
    },
    MessageAuthCode(AuthType) {
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
      if (this.$UninputJudgment(this.v_code_pic2, "请输入图片验证码！")) {
        return;
      }
      var formData = new FormData();
      var formData = new window.FormData();
      formData.append("captcha_key", this.captcha_key);
      formData.append("captcha_code", this.v_code_pic2);
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
          if (response.status == 201) {
            vm.verification_key = response.data.key;

            vm.ifGetAuthCode = false; // 获取信息api成功才执行倒计时
            vm.countDown = vm.initTime; // 获取信息api成功才执行倒计时
          }
        })
        .catch(function(error) {
          console.info(error);
          // vm.$message("获取短信验证码失败，请重试！");
          // ▲▲▲▲获取失败后 401验证码不正确  422?验证码过期 --反正都得 重新请求图片验证码
          vm.getVCodeImg("message");
        });
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
    }
  }
};
</script>

<style>
.Login .el-checkbox__input.is-checked .el-checkbox__inner,
.Login .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #775563;
  border-color: #775563;
}
.Login .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #775563;
}
.Login .el-header {
  height: 44px !important;
}
</style>
<style scoped>
.Login {
  overflow: hidden;
}
.Login .img_logo_p {
  padding-left: 210px;
}
@media screen and (max-width: 1400px) and (min-width: 1201px) {
  .Login .img_logo_p {
    padding-left: 170px;
  }
}

@media screen and (max-width: 1200px) {
  .Login .img_logo_p {
    padding-left: 120px;
  }
}

.Login .img_logo {
  width: 157px;
  height: 44px;
}
.Login .img_logo:hover {
  cursor: pointer;
}

.Login .login_content {
  background: url(../assets/pic/bg.png) no-repeat;
  background-size: 100% 100%;
  /* width: 1920px; */
  /* height: 880px; */
  /* width: 100vw; */
  width: 100%;
  height: calc(100% - 182px);
  display: -webkit-flex;
  display: flex;
  align-items: center;
}
@media screen and (max-width: 1200px) {
  .Login .login_content {
    width: 1200px;
    height: 550px;
  }
}

.Login .login_box {
  /* width: 350px; */
  /* height: 330px; */
  /* width: 300px; */
  /* padding: 30px 25px 40px 25px; */

  /* 苹果兼容 */
  width: 325px;
  padding: 30px 0px 40px 25px;

  background: rgba(255, 255, 255, 1);
  position: absolute;
  right: 11vw;
  /* margin-top: 10vw; */
}
@media screen and (max-width: 1200px) {
  .Login .login_box {
    /* margin-top: 80px; */
    left: 780px;
  }
}

.Login .l_title {
  height: 25px;
  line-height: 25px;
  padding-bottom: 25px;
}
.Login .lt_left {
  font-size: 18px;
  font-family: PingFangSCSemibold-;
  line-height: 25px;
  color: rgba(119, 85, 99, 1);
  /* margin-right: 152px; */
}
.Login .LoginChoose0 {
  height: 31px;
}
.Login .LoginChoose0:hover {
  cursor: pointer;
}

.Login .LoginChoose1 {
  border-bottom: 2px rgba(119, 85, 99, 1) solid;
  color: rgba(119, 85, 99, 1);
}
.Login .LoginChoose2 {
  color: #8a8f96;
}
.Login .LCMargin {
  margin-left: 32px;
}

.Login .lt_right {
  height: 25px;
  line-height: 25px;
}
.Login .lt_right:hover {
  cursor: pointer;
}
.Login .ltr_text {
  height: 20px;
  font-size: 14px;
  font-family: PingFang SC Regular;
  line-height: 20px;
  color: rgba(153, 194, 199, 1);
  margin-top: 2.5px;
}
.Login .ltr_img {
  margin-top: 2px;
}
.Login .l_box {
  width: 300px;
  height: 42px;
  border: 1px solid rgba(204, 193, 198, 1);
  border-radius: 4px;
  margin-bottom: 21px;
}
.Login .m_input {
  border: 0;
  /* width: 258px; */
  width: 250px;
  height: 30px;
  background: rgba(0, 0, 0, 0);
  margin: 5px 0;
  text-indent: 10px;
  font-size: 14px;
  font-family: PingFangTC;
  line-height: 20px;
  /* color: rgba(204, 193, 198, 1); */
}
.Login .m_input:hover {
  cursor: pointer;
}

.Login .m_input2 {
  /* width: 178px; */
  width: 112px;
}
.Login .m_input3 {
  width: 158px;
}

.Login .v_code_btnShow {
  width: 80px;
  height: 42px;
  border: 0;
  background: rgba(0, 0, 0, 0);
  border-left: 1px solid rgba(204, 193, 198, 1);
  padding: 0;
  font-size: 18px;
  font-family: PingFangSCSemibold-;
  color: rgba(119, 85, 99, 1);
}
.Login .v_code_btnShow2 {
  background: rgba(119, 85, 99, 1);
  width: 100px;
  color: #fff;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
.mac .Login .v_code_btnShow2 {
  width: 98px;
}

.Login .img_v_code_img_p {
  border-left: 1px solid rgba(204, 193, 198, 1);
  height: 42px;
}
.Login .img_v_code_img {
  /*  width: 80px; */
  width: 145px;
  height: 42px;
}
.mac .Login .img_v_code_img {
  width: 143px;
}
.Login .img_v_code_img:hover {
  cursor: pointer;
}
.Login .l_passwordinfo {
  height: 20px;
  line-height: 20px;
}
.Login .forget_password {
  height: 20px;
  font-size: 14px;
  font-family: PingFang SC Regular;
  line-height: 20px;
  color: rgba(17, 26, 52, 1);
  /* margin-left: 92px;*/
  margin-left: 90px;
}
.Login .forget_password2 {
  margin-left: 174px;
}

.Login .forget_password_c:hover {
  color: rgba(119, 85, 99, 1);
  cursor: pointer;
}
.Login .login_btn {
  width: 300px;
  height: 42px;
  background: rgba(119, 85, 99, 1);
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSCSemibold-;
  color: rgba(254, 248, 255, 1);
  margin-top: 34px;
  border: 0;
}
</style>
