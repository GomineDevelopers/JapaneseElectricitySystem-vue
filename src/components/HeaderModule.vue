<template>
  <el-row class="top_header">
    <el-row class="main_width_1200">
      <el-col :span="12">
        hi!
        <span>请登录</span>
        <span>快速注册</span>
      </el-col>
      <el-col :span="12">
        <span>我的订单</span>
        <span>购物车</span>
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
<style scoped></style>
