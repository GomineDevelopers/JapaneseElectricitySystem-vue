<template>
  <div class="Login">
    <vue-headful title="登录"></vue-headful>
    <el-container class="height_auto">
      <el-header class="common">
        <el-row class="top_header">
          <el-row class>
            <el-col class="img_logo_p">
              <img class="img_logo" :src="require('@/assets/pic/logo.png')" alt />
            </el-col>
          </el-row>
        </el-row>
      </el-header>
      <div class="login_content">
        <div class="login_box">
          <div class="inlineBlock_verTopP l_title">
            <div class="inlineBlock_verTopP lt_left">
              <div
                v-show="LoginType =='account'"
                class="LoginChoose0 LoginChoose1"
                @click="LoginType ='account'"
              >账号登录</div>
              <div
                v-show="LoginType =='phone'"
                class="LoginChoose0 LoginChoose2"
                @click="LoginType ='account'"
              >账号登录</div>
              <div
                v-show="LoginType =='phone'"
                class="LoginChoose0 LoginChoose1 LCMargin"
                @click="LoginType ='phone'"
              >手机登录</div>
              <div
                v-show="LoginType =='account'"
                class="LoginChoose0 LoginChoose2 LCMargin"
                @click="LoginType ='phone'"
              >手机登录</div>
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
                <img class="login_icon" :src="require('@/assets/pic/user.png')" alt />
              </div>
              <div class="inlineBlock_verTopP">
                <input class="m_input" v-model="user" placeholder="手机号/用户名" type="text" />
              </div>
            </div>
            <div class="inlineBlock_verTopP l_box l_password">
              <div class="login_icon_p">
                <img class="login_icon" :src="require('@/assets/pic/password.png')" alt />
              </div>
              <div class>
                <input class="m_input" v-model="password" placeholder="密码" type="text" />
              </div>
            </div>
            <div class="inlineBlock_verTopP l_box l_v_code">
              <div class="login_icon_p">
                <img class="login_icon" :src="require('@/assets/pic/verificationCode.png')" alt />
              </div>
              <div class>
                <input class="m_input m_input2" v-model="v_code" placeholder="验证码" type="text" />
              </div>
              <div>
                <button class="v_code_btnShow">{{btn_show}}</button>
              </div>
            </div>
            <div class="inlineBlock_verTopP l_passwordinfo">
              <div class="l_checkbox">
                <el-checkbox v-model="ifRememberPassword">记住密码</el-checkbox>
              </div>
              <div class="forget_password">
                <span class="forget_password_c">忘记密码</span>
                <span>&nbsp;|&nbsp;</span>
                <span class="forget_password_c">免费注册</span>
              </div>
            </div>
            <div class="l_btn">
              <button class="login_btn">登录</button>
            </div>
          </div>

          <div v-show="LoginType == 'phone'">
            <div class="inlineBlock_verTopP l_box l_user">
              <div class="login_icon_p">
                <img class="login_icon" :src="require('@/assets/pic/user.png')" alt />
              </div>
              <div class="inlineBlock_verTopP">
                <input class="m_input" v-model="user" placeholder="手机号" type="text" />
              </div>
            </div>
            <div class="inlineBlock_verTopP l_box l_v_code">
              <div class="login_icon_p">
                <img class="login_icon" :src="require('@/assets/pic/verificationCode.png')" alt />
              </div>
              <div class>
                <input
                  class="m_input m_input2 m_input3"
                  v-model="v_code"
                  placeholder="验证码"
                  type="text"
                />
              </div>
              <div>
                <button class="v_code_btnShow v_code_btnShow2">获取验证码</button>
              </div>
            </div>
            <div class="inlineBlock_verTopP l_passwordinfo">
              <div class="forget_password forget_password2">
                <span class="forget_password_c">忘记密码</span>
                <span>&nbsp;|&nbsp;</span>
                <span class="forget_password_c">免费注册</span>
              </div>
            </div>
            <div class="l_btn">
              <button class="login_btn">登录</button>
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

export default {
  name: "Login",
  components: {
    FooterModule
  },
  watch: {},
  data() {
    return {
      LoginType: "account", // "account" - 账号登录  "phone" - 手机登录

      user: "",
      password: "",
      v_code: "",
      btn_show: "89db",
      ifRememberPassword: true
    };
  },
  mounted() {
    let vm = this;
  },
  methods: {}
};
</script>

<style >
.Login .el-checkbox__input.is-checked .el-checkbox__inner,
.Login .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #775563;
  border-color: #775563;
}
.Login .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #775563;
}
</style>
<style scoped>
.Login {
}

.Login .el-main {
  height: calc(100% - 156px);
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

.Login .login_content {
  background: url(../assets/pic/bg.png) no-repeat;
  background-size: 100% 100%;
  /* width: 1920px; */
  /* height: 880px; */
  /* width: 100vw; */
  width: 100%;
  height: 45.8vw;
}
@media screen and (max-width: 1200px) {
  .Login .login_content {
    width: 1200px;
    height: 550px;
  }
}

.Login .login_box {
  /* width: 350px; */
  width: 300px;
  /* height: 330px; */
  background: rgba(255, 255, 255, 1);
  padding: 30px 25px 40px 25px;
  position: absolute;
  right: 7vw;
  margin-top: 10vw;
}
@media screen and (max-width: 1200px) {
  .Login .login_box {
    margin-top: 80px;
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
  width: 258px;
  height: 30px;
  background: rgba(0, 0, 0, 0);
  margin: 5px 0;
  text-indent: 10px;
  font-size: 14px;
  font-family: PingFangTC;
  line-height: 20px;
  color: rgba(204, 193, 198, 1);
}
.Login .m_input:hover {
  cursor: pointer;
}

.Login .m_input2 {
  width: 178px;
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
  margin-left: 92px;
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

