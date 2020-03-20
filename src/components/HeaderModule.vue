<template>
  <div>
    <el-row class="top_header">
      <el-row class="main_width_1200">
        <el-col v-if="!ifLogin" :span="12" class="text_align_left">
          <span @click="router_to('/')" class="mainMenu">首页</span>
          {{HeaderInfo1}}
          <span
            class="hoverOpacity"
            @click="router_to('/login')"
          >{{HeaderInfo2}}</span>
          <span>丨</span>
          <span class="hoverOpacity" @click="router_to('/register')">{{HeaderInfo3}}</span>
        </el-col>
        <el-col v-if="ifLogin" :span="12" class="text_align_left text_align_left2">
          <span @click="router_to('/')" class="mainMenu">首页</span>
          {{HeaderInfo1}}
          <span
            class="hoverOpacity"
            @click="router_toSpec('/personalcenter','1')"
          >{{HeaderInfo2}}</span>
          <span class="hoverOpacity LoginOut" @click="LoginOutManage()">（注销）</span>
        </el-col>
        <el-col :span="12" class="inlineBlock_verTopP text_align_right">
          <div
            class="hoverOpacity inlineBlock_verTopP"
            @click="router_toSpec('/personalcenter','2')"
          >
            <div class="m_header_div">
              <img class="m_img" src="../assets/pic/order_icon.png" />
            </div>
            <div>我的订单</div>
          </div>
          <div class="hoverOpacity inlineBlock_verTopP" @click="router_to('/shoppingtrolley')">
            <div class="m_header_div">
              <img class="m_img" id="div2" src="../assets/pic/shopping_cart_icon.png" />
            </div>
            <div>购物车</div>
          </div>
        </el-col>
      </el-row>
    </el-row>
    <div class="top_header_solid"></div>
  </div>
</template>
<script>
import { loginout, refresh_token, getUserInfo } from "@/api/api";
export default {
  name: "HeaderModule",
  data() {
    return {
      ifLogin: false,
      HeaderInfo1: "hi!",
      HeaderInfo2: "请登录",
      HeaderInfo3: "快速注册"
    };
  },
  mounted() {
    let vm = this;
    // 请求有延迟 -- 用 Cookies
    // 获取个人信息-title部分赋值
    // setTimeout(function() {
    //   // ▲ 不能同时refresh_token - 头部设置个延时
    //   vm.initUserInfo();
    // }, 100);
    setTimeout(function() {
      vm.headerManage();
    }, 50);
  },
  methods: {
    headerManage() {
      let vm = this;
      let tem_ifLogin = this.$Utils.getCookieCry("H_ifLogin");
      if (tem_ifLogin == "true") {
        vm.ifLogin = true;
        vm.HeaderInfo1 = "欢迎您！";
        vm.HeaderInfo2 = this.$Utils.getCookieCry("H_Name");
      }
    },
    router_to(str) {
      let vm = this;
      vm.$router.push({ path: str });
    },
    router_toSpec(str, activeName) {
      let vm = this;
      vm.$router.push({
        path: str,
        query: {
          activeName: activeName
        }
      });
    },
    LoginOutManage() {
      let vm = this;
      let token = vm.$Utils.getCookie("user_token");
      let newToken = token.replace('"', "").replace('"', "");
      vm.$Utils.delCookie("user_token");
      // vm.$Utils.setCookieCry("ifLogout", "true", 1); // 设置登出Cookie 登出配置-用于自动（登录关掉）
      vm.$Utils.delCookieCry("H_ifLogin");
      vm.$Utils.delCookieCry("H_Name");

      loginout(newToken)
        .then(function(response) {
          console.log(response);
          if (response.status == 204) {
            vm.$message("注销成功！即将跳转登录页面！");
            // 删除本地token的Cookie

            setTimeout(function() {
              vm.router_to("/login");
            }, 2000);
          }
        })
        .catch(function(error) {
          console.info(error);
        });
    },
    initUserInfo() {
      let vm = this;
      let token = vm.$Utils.getCookie("user_token");
      let newToken = token.replace('"', "").replace('"', "");
      // console.log(token);
      if (vm.$TokenJudgment(token)) {
        //   // this.ifLogin = true;
        //   refresh_token(newToken)
        //     .then(function(response) {
        //       // console.log(response);
        //       if (response.status == 200) {
        //         // 刷新成功
        //         vm.$Utils.setCookie(
        //           "user_token",
        //           JSON.stringify(response.data.access_token),
        //           60
        //         );
        //         // 获取用户信息
        //         let token = vm.$Utils.getCookie("user_token");
        //         let newToken = token.replace('"', "").replace('"', "");

        getUserInfo(newToken)
          .then(function(response) {
            // console.log(response);
            if (response.status == 200) {
              // 获取成功
              vm.ifLogin = true;

              // data:
              // avatar: "https://cdn.learnku.com/uploads/images/201710/30/1/TrJS40Ey5k.png"
              // created_at: "2020-03-06 15:15:08"
              // email: null
              // email_verified_at: null
              // id: 2
              // introduction: null
              // last_actived_at: "2020-03-06T07:15:08.000000Z"
              // name: "yiduang"
              // notification_count: 0
              // phone: "18742257174"
              // updated_at: "2020-03-06 15:15:08"

              vm.HeaderInfo1 = "欢迎您！";
              vm.HeaderInfo2 = response.data.name;
            }
          })
          .catch(function(error) {
            console.info(error);
          });
        //   }
        // })
        // .catch(function(error) {
        //   console.info(error);
        // });
      }
    }
  }
};
</script>
<style scoped>
.top_header {
  /* position: fixed; */
  /* background-color: #fff; */
  /* z-index: 9999; */
  /* padding: 0 auto; */
  /* min-width: 1200px; */
  /* width: 62.5%; */
  /* margin: 0 auto; */
  /* text-align: center; */
  border-bottom: 1px solid #646464;
  /* position: absolute; */
  /* top: 0; */
}
.top_header_solid {
  /* width: 100%; */
  /* border-bottom: 1px solid #646464; */
}
.text_align_left {
  text-align: left;
  color: #111a34;
}
.text_align_left span {
  color: #775563;
  /* cursor: pointer; */
  padding: 0 5px;
  display: inline-block;
  height: 20px;
  line-height: 20px;
}
.text_align_left span:nth-child(2) {
  /* border-right: 1px solid #775563; */
}
.text_align_left2 span:nth-child(2) {
  border-right: 0;
}
.m_header_div {
  width: 30px;
  height: 30px;
  text-align: center;
}
.text_align_right {
  text-align: right;
  color: #111a34;
}
.text_align_right > div {
  cursor: pointer;
  /* margin-left: 32px; */
  margin-left: 12px;
}
.m_img {
  width: 20px;
  height: 20px;
  vertical-align: sub;
}
.LoginOut {
  font-size: 14px;
}
.LoginOut:hover {
  cursor: pointer;
}
.mainMenu {
  font-size: 14px;
  color: #775563;
  margin-right: 16px;
}
.mainMenu:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
