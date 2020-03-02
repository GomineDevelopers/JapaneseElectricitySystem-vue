<template>
  <el-row class="top_header">
    <el-row class="main_width_1200">
      <el-col :span="12" class="text_align_left">
        hi!
        <span>请登录</span>
        <span>快速注册</span>
      </el-col>
      <el-col :span="12" class="text_align_right">
        <span><img src="../assets/pic/order_icon.png" /> 我的订单</span>
        <span><img src="../assets/pic/shopping_cart_icon.png" /> 购物车</span>
      </el-col>
    </el-row>
  </el-row>
</template>
<script>
export default {
  name: "HeaderModule",
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.text_align_left {
  text-align: left;
  color: #111a34;
}
.text_align_left span {
  color: #775563;
  cursor: pointer;
  padding: 0 5px;
  display: inline-block;
  height: 20px;
  line-height: 20px;
}
.text_align_left span:nth-child(1) {
  border-right: 1px solid #775563;
}
.text_align_right {
  text-align: right;
  color: #111a34;
}
.text_align_right span {
  cursor: pointer;
  margin-left: 32px;
}
.text_align_right span img {
  width: 20px;
  height: 20px;
  vertical-align: sub;
}
</style>
