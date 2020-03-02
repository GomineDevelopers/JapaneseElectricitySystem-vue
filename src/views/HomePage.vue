<template>
  <div class="HomePage">
    <!-- 顶部输入框开始 -->
    <el-row class="top_body flex">
      <img src="../assets/pic/logo.png" />
      <el-row class="top_search_input">
        <!-- 输入框 -->
        <el-row class="flex">
          <el-row class="input_content flex_1">
            <el-input placeholder="搜索感兴趣的关键字" v-model="value">
            </el-input>
          </el-row>
          <el-button class="search_button"> 搜索</el-button>
        </el-row>
        <!-- 关键字 -->
        <el-row class="key_words">
          <span
            :class="keyActive == index ? 'active' : ''"
            v-for="(item, index) in keyWords"
            :key="index + 'key'"
            @click="(keyActive = index), (value = item)"
          >
            {{ item }}
          </span>
        </el-row>
      </el-row>
    </el-row>
    <!-- 顶部输入框结束 -->

    <!-- 轮播开始 -->
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item
        v-for="(imgItem, index2) in carouselList"
        :key="index2 + 'img'"
      >
        <img :src="imgItem" />
      </el-carousel-item>
    </el-carousel>
    <!-- 轮播结束 -->

    <!-- 分类开始 -->
    <el-row class="home_page_content">
      <el-tabs type="border-card">
        <el-tab-pane label="用户管理">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-row>
    <!-- 分类结束 -->
  </div>
</template>
<script>
export default {
  name: "HomePage",

  data() {
    return {
      value: "",
      keyActive: 0,
      keyWords: ["油画", "版画", "书法"],
      carouselList: [
        require("../assets/pic/tree.png"),
        require("../assets/pic/tree2.jpeg"),
        require("../assets/pic/tree3.jpeg"),
        require("../assets/pic/tree4.jpeg")
      ]
    };
  },
  mounted() {
    let vm = this;
  },
  methods: {}
};
</script>
<style>
.HomePage .el-input-group {
  border-radius: 60px !important;
}
.HomePage .input_content > .el-input input {
  border-radius: 60px 0px 0px 60px !important;
  font-size: 14px;
  background: #fff;
}
/* 轮播 */
.HomePage .el-carousel__container {
  height: 500px;
}
.HomePage .el-carousel__item img {
  width: 100%;
}
.HomePage .el-carousel__arrow {
  width: 42px;
  height: 80px;
}
.HomePage .el-carousel__arrow i {
  font-size: 28px;
  font-weight: bold;
}
.el-carousel__arrow--left {
  left: 0px;
  background: rgba(0, 0, 0, 1);
  border-radius: 0px 5px 5px 0px;
  opacity: 0.3;
}
.el-carousel__arrow--right {
  right: 0px;
  background: rgba(0, 0, 0, 1);
  border-radius: 5px 0px 0px 5px;
  opacity: 0.3;
}
</style>
<style scoped>
.top_body {
  padding: 20px 0px;
}
.top_body img {
  margin-right: 144px;
  height: 44px;
}
.top_search_input {
  min-width: 600px;
  width: 50%;
}
.input_content {
  box-sizing: border-box;
  padding: 2px 0px 2px 2px;
  border-radius: 60px 0px 0px 60px !important;
  background-image: -webkit-linear-gradient(
    left,
    rgba(119, 85, 99, 1),
    rgba(228, 213, 229, 1)
  );
  background-image: -moz-linear-gradient(
    left,
    rgba(119, 85, 99, 1),
    rgba(228, 213, 229, 1)
  );
  background-image: linear-gradient(
    left,
    rgba(119, 85, 99, 1),
    rgba(228, 213, 229, 1)
  );
}
.HomePage .search_button {
  width: 17%;
  height: 44px;
  margin-left: -1px;
  background: linear-gradient(
    135deg,
    rgba(228, 213, 229, 1) 0%,
    rgba(119, 85, 99, 1) 100%
  );
  border-radius: 0px 60px 60px 0px;
  color: #fff;
  font-size: 16px;
  text-align: center;
}
.key_words {
  font-size: 14px;
  color: #111a34;
  margin-top: 6px;
}
.key_words span {
  margin-left: 17px;
  cursor: pointer;
}
.key_words span.active {
  color: #775563;
}
/* 头部搜索结束 */
</style>
