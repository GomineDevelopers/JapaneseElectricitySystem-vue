<template>
  <div class="TopSearchBox">
    <el-row class="top_body flex">
      <img class="img_logo" @click="router_to('/')" src="../assets/pic/logo.png" />
      <el-row class="top_search_input">
        <!-- 输入框 -->
        <el-row class="flex">
          <el-row class="input_content flex_1">
            <el-input
              @keyup.enter.native="m_search()"
              placeholder="搜索感兴趣的关键字"
              v-model="SearchValue"
            ></el-input>
          </el-row>
          <el-button @click="m_search()" class="search_button">搜索</el-button>
        </el-row>
        <!-- 关键字 -->
        <div style="height:20px;"></div>

        <!-- <el-row class="key_words">
          <span
            :class="keyActive == index ? 'active' : ''"
            v-for="(item, index) in keyWords"
            :key="index + 'key'"
            @click="(keyActive = index), (SearchValue = item)"
          >{{ item }}</span>
        </el-row>-->
      </el-row>
    </el-row>
  </div>
</template>
<script>
import { geCategories, GoodsSearch } from "@/api/api";

export default {
  name: "TopSearchBox",
  props: [
    "searchType", // searchType - 搜索类型："homepage"-首页  （按照路由path设置）
    "categories" // categories - 分类（数组类型）
  ],
  data() {
    return {
      SearchValue: "",
      keyActive: 0,
      keyWords: ["油画", "版画", "书法"]
    };
  },
  mounted() {
    let vm = this;
    setTimeout(function() {
      // console.log(vm.searchType);
      // console.log(vm.categories);
      if (vm.searchType == "HomePage") {
        vm.keyWords = vm.categories;
      } else {
        // 通用
        // vm.InitCategories(); // 请求分类
      }
    }, 50);
  },
  methods: {
    m_search() {
      let vm = this;
      var formData = new FormData();
      var formData = new window.FormData();
      console.log(vm.SearchValue);
      formData.append("search", vm.SearchValue);
      GoodsSearch(formData)
        .then(function(response) {
          console.log("GoodsSearch");
          console.log(response);
          if (response.status == 200) {
            // data: Array(9)
            //    0: {id: 1, title: "Moriah Feest", description: "Consequatur aut blanditiis impedit maiores distinctio incidunt.", art: "tony.steuber", time: "2009-03-25", …}
            //    1: {id: 2, title: "Lula Konopelski", description: "Sol
            let data = response.data.data;
            let length = data.length;
            let temp_productArr = [];
            for (let i = 0; i < length; i++) {
              temp_productArr.push(data[i]);
            }
            console.log(temp_productArr);
            let currentPath = vm.$route.path;
            if (
              currentPath == "/homepage" ||
              currentPath == "/home" ||
              currentPath == "/"
            ) {
              // 在 首页搜索 （中转） -- pass
              vm.$router.push({
                // path: "/transferpage",
                path: "/searchresult",
                query: {
                  SearchValue: vm.SearchValue,
                  IfSearch: true,
                  // targetPage: "/homepage",
                  targetPage: "/searchresult",
                  productArr: JSON.stringify(temp_productArr)
                }
              });
            } else {
              // 在 非首页搜索 （直达）
              // vm.$router.push({
              //   path: "/homepage",
              //   query: {
              //     SearchValue: vm.SearchValue,
              //     IfSearch: true,
              //     targetPage: "/homepage",
              //     productArr: JSON.stringify(temp_productArr)
              //   }
              // });
              vm.$router.push({
                path: "/searchresult",
                query: {
                  SearchValue: vm.SearchValue,
                  IfSearch: true,
                  targetPage: "/searchresult",
                  productArr: JSON.stringify(temp_productArr)
                }
              });
            }
          }
        })
        .catch(function(error) {
          console.info(error);
        });
    },
    router_to(str) {
      let vm = this;
      vm.$router.push({ path: str });
    },
    InitCategories() {
      let vm = this;

      geCategories()
        .then(function(response) {
          console.log(response);
          let data = response.data.data;
          vm.keyWords = [];
          for (let i = 0; i < data.length; i++) {
            vm.keyWords.push(data[i].name);
          }
        })
        .catch(function(error) {
          console.info(error);
        });
    }
  }
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

.TopSearchBox .img_logo:hover {
  cursor: pointer;
}
</style>

