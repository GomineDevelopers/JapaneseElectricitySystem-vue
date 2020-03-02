<template>
  <el-row class="left_aside">
    <el-row class="header_logo">LOGO</el-row>
 
  </el-row>
</template>
<script>
export default {
  name: "asideNav",
  data() {
    return {};
  },
  created() {
    // console.log(this.$route.path);
  },
  methods: {
    handleOpen() {
      //   console.log(key, keyPath);
    },
    handleClose() {
      //   console.log(key, keyPath);
    }
  }
};
</script>
<style>
.left_aside .el-menu {
  border: none;
}
.left_aside .el-menu .el-menu-item {
  border-left: 3px solid #fff;
}
.left_aside .el-menu .el-menu-item.is-active {
  border-left: 3px solid #3399ff;
  background: rgba(51, 153, 255, 0.06);
}
.left_aside .el-menu .el-icon-arrow-down {
  font-size: 16px;
}
</style>
<style scoped>
.left_aside {
  background: #fff;
  height: 100%;
  z-index: 99;
}
.header_logo {
  font-weight: bold;
  font-size: 30px;
  text-align: center;
  height: 60px;
  line-height: 60px;
}
.el-menu-vertical-demo {
  overflow-y: auto;
  height: calc(100% - 60px);
  box-shadow: 2px 5px 6px 0px rgba(218, 218, 218, 1);
}
.el-menu-item img,
.el-submenu__title img {
  margin-right: 8px;
  width: 20px;
  vertical-align: text-top;
}
</style>
