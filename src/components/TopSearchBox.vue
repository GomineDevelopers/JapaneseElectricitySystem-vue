<template>
  <div class="TopSearchBox">
    <el-row class="top_body flex">
      <img src="../assets/pic/logo.png" />
      <el-row class="top_search_input">
        <!-- 输入框 -->
        <el-row class="flex">
          <el-row class="input_content flex_1">
            <el-input placeholder="搜索感兴趣的关键字" v-model="value"></el-input>
          </el-row>
          <el-button class="search_button">搜索</el-button>
        </el-row>
        <!-- 关键字 -->
        <el-row class="key_words">
          <span
            :class="keyActive == index ? 'active' : ''"
            v-for="(item, index) in keyWords"
            :key="index + 'key'"
            @click="(keyActive = index), (value = item)"
          >{{ item }}</span>
        </el-row>
      </el-row>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "TopSearchBox",

  data() {
    return {
      value: "",
      keyActive: 0,
      keyWords: ["油画", "版画", "书法"]
    };
  },
  mounted() {
    let vm = this;
  },
  methods: {}
};
</script>

<style>
.TopSearchBox .el-input-group {
  border-radius: 60px !important;
}
.TopSearchBox .input_content > .el-input input {
  border-radius: 60px 0px 0px 60px !important;
  font-size: 14px;
  background: #fff;
}
</style>
<style scoped>
.TopSearchBox {
}

.TopSearchBox .top_body {
  padding: 20px 0px;
}
.TopSearchBox .top_body img {
  margin-right: 144px;
  height: 44px;
}
.TopSearchBox .top_search_input {
  min-width: 600px;
  width: 50%;
}
.TopSearchBox .input_content {
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
.TopSearchBox .search_button {
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
.TopSearchBox .key_words {
  font-size: 14px;
  color: #111a34;
  margin-top: 6px;
}
.TopSearchBox .key_words span {
  margin-left: 17px;
  cursor: pointer;
}
.TopSearchBox .key_words span.active {
  color: #775563;
}
/* 头部搜索结束 */
</style>

