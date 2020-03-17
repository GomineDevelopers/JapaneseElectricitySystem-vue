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
      <magnifier :imgList="pictureList2"></magnifier>
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
    return {
      pictureList2: [
        {
          ImgUrl:
            "http://mp.ofweek.com/Upload/News/Img/member645/201711/17170046839337.jpg"
        },
        {
          ImgUrl:
            "http://image.buy.ccb.com/merchant/201703/904919627/1522929521661_4.jpg"
        },
        {
          ImgUrl:
            "http://image5.suning.cn/uimg/b2c/newcatentries/0070130691-000000000826244625_5_800x800.jpg"
        },
        {
          ImgUrl:
            "http://img12.360buyimg.com/n5/s450x450_jfs/t9952/98/2269407420/279171/6137fe2f/59f28b2bN6959e086.jpg"
        },
        {
          ImgUrl:
            "http://d.ifengimg.com/w600/p0.ifengimg.com/pmop/2017/1213/A4037864F6728F006B67AAEC51EC8A485F320FD2_size93_w1024_h734.jpeg"
        },
        {
          ImgUrl:
            "http://d.ifengimg.com/w600/p0.ifengimg.com/pmop/2017/1213/A4037864F6728F006B67AAEC51EC8A485F320FD2_size93_w1024_h734.jpeg"
        }
      ]
    };
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

