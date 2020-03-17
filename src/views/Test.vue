<template>
  <div class="Test">
    <vue-headful title="测试页面"></vue-headful>
    <div>
      <el-button @click="router_to('/')">首页</el-button>
      <el-button @click="router_to('/test')">测试</el-button>
      <el-button @click="router_to('/login')">登录</el-button>
      <el-button @click="router_to('/register')">注册</el-button>
      <el-button @click="router_to('/forgetpassword')">忘记密码</el-button>
      <el-button @click="router_to('/productdetails')">商品详情</el-button>
      <el-button @click="router_to('/shoppingtrolley')">购物车</el-button>
      <el-button @click="router_to('/checkorderinformation')">核对订单信息</el-button>
      <el-button @click="router_to('/personalcenter')">我的订单</el-button>
      <el-button @click="router_to('/orderdetails')">订单详情-已完成</el-button>
      <el-button @click="router_to('/evaluationdetails')">评价详情</el-button>
      <el-button @click="router_to('/makecomments')">发表评论</el-button>
      <!-- <el-button @click="router_to('/userinfo')">用户资料</el-button> -->
      <!-- <el-button @click="router_to('/shippingaddress')">收货地址</el-button> -->
      <magnifier></magnifier>
    </div>
  </div>
</template>
<script>
import HeaderModule from "@/components/HeaderModule";

import Magnifier from "@/components/Magnifier";
export default {
  name: "Test",
  components: {
    // 注册
    Magnifier
  },
  data() {
    return {};
  },
  mounted() {
    let vm = this;
  },
  methods: {
    router_to(str) {
      let vm = this;
      vm.$router.push({ path: str });
    }
  }
};
</script>
<style scoped>
.Test {
}
</style>

