<template>
  <el-row class="top_header">
    <el-row class="header_right">
      <span>
        <img src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <i class="el-icon-arrow-down iconSize"></i>
      </span>
      <span class="logout_btn" @click="logout" title="退出登录">
        <i class="el-icon-setting iconSize"></i>退出
      </span>
    </el-row>
  </el-row>
</template>
<script>
export default {
  name: "topHeader",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$messageBox
        .confirm("确认退出系统吗?", "提示", {
          type: "warning"
        })
        .then(() => {
          this.$api
            .logout()
            .then(res => {
              console.log(res);
              if (res.code == 200) {
                this.$message({
                  message: "退出成功！",
                  type: "success"
                });
                this.$router.push({ path: "/login" });
                this.$store.dispatch("logout");
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          console.log("取消");
        });
    }
  }
};
</script>
<style scoped>
.iconSize {
  font-size: 0.12rem;
}
.top_header {
  background-color: #fff;
  line-height: 60px;
  display: -webkit-flex;
  display: flex;
  justify-content: flex-end;
}
.header_right {
  height: 60px;
  display: -webkit-flex;
  display: flex;
}
.header_right span {
  height: 60px;
  display: -webkit-flex;
  display: flex;
  align-items: center;
}
.header_right span:nth-child(1) {
  margin-right: 20px;
}
.header_right img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
.logout_btn {
  cursor: pointer;
  font-size: 16px;
}
.logout_btn:hover {
  color: #409eff;
}
</style>
