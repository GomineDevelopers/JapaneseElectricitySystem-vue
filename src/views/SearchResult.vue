<template>
  <div class="SearchResult height_auto">
    <!-- 顶部输入框开始 -->
    <el-main class="common">
      <TopSearchBox
        :searchType="'SearchResult'"
        :categories="categories"
      ></TopSearchBox>
      <!-- 顶部输入框结束 -->

      <!-- 分类开始 -->
      <el-row class="home_page_content">
        <el-tabs
          type="border-card"
          v-model="activeName"
          @tab-click="handleClick"
        >
          <template v-for="(item, index) in categoriesDetails">
            <el-tab-pane
              :key="index + 'cd'"
              :label="item.name"
              :name="String(index)"
            >
              <div class="inlineBlock_verTopP">
                <template v-for="(itemC, indexC) in productArr[index]">
                  <div
                    class="perPic"
                    :style="{ backgroundImage: 'url(' + itemC.ImgUrl + ')' }"
                    :key="indexC + 'pa'"
                  >
                    <div
                      class="product_intro"
                      @mouseover="showDetails(indexC, true)"
                      @mouseout="showDetails(indexC, false)"
                      @click="detailsPageManage(index, indexC)"
                    >
                      <div
                        v-show="indexC == index_ShowPD"
                        class="product_intro_details"
                      >
                        <div class="pid_child">
                          <div class="d_1">{{ itemC.art }}</div>
                          <div class="d_2">
                            {{ itemC.title }},{{ itemC.created_at }}
                          </div>
                          <div class="d_3">￥{{ itemC.price }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>

              <!-- 分页 -->
              <div class="textAlignCenter_w100p pagination_settings">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange($event, index)"
                  :current-page="CurrentCategoryIdPageArr[index]"
                  :page-sizes="[9]"
                  :page-size="9"
                  layout="total, sizes, prev, pager, next, jumper "
                  :total="CurrentCategoryIdTotal"
                  background
                ></el-pagination>
              </div>
              <!-- 分页 -->
            </el-tab-pane>
          </template>
        </el-tabs>
      </el-row>
      <!-- 分类结束 -->
    </el-main>
    <FooterNav></FooterNav>
    <el-footer class="el-footer">
      <FooterModule></FooterModule>
    </el-footer>
  </div>
</template>
<script>
import Vue from "vue";

import TopSearchBox from "@/components/TopSearchBox";

import FooterNav from "@/components/FooterNav";
import FooterModule from "@/components/FooterModule";
import { geCategories, getGoodsById, refresh_token } from "@/api/api";

export default {
  name: "SearchResult",
  components: {
    TopSearchBox,
    FooterNav,
    FooterModule
  },

  data() {
    return {
      activeName: "0", // Tabs 标签
      productArr: [
        // 分类1 - Arr
        // [
        // {
        //   id: 1,
        //   ImgUrl: require("@/assets/pic/product.png"),
        //   art: "李新建",
        //   title: "珠峰瑞祥",
        //   created_at: "2015",
        //   price: "23270"
        // }
        // ],
        // 分类2 - Arr
        // [
        // {
        //   id: 1,
        //   ImgUrl: require("@/assets/pic/product.png"),
        //   art: "李新建",
        //   title: "珠峰瑞祥",
        //   created_at: "2015",
        //   price: "23270"
        // }
        // ],
        // 实际内容
        // [
        // {
        //  art: data[i].art, // 创作者  // ★★★首页数据
        //   category_id: data[i].category_id, // 分类id
        //   content: data[i].content, // 产品介绍
        //   created_at: data[i].created_at, // 创建时间  // ★★★首页数据
        //   description: data[i].description, // 产品描述（关键字）
        //   discount: data[i].discount, // 折扣（最大为1）
        //   id: data[i].id, // 产品id  // ★★★首页数据
        //   on_sale: data[i].on_sale, // 是否在售 - bool
        //   price: data[i].price, // 单价   （折后价=单价*折扣）  // ★★★首页数据
        //   quality: data[i].quality, // 材质
        //   rating: Number(data[i].rating), // 评分等级 --组件需要为Number类型
        //   review_count: data[i].review_count, // 评论数
        //   size: data[i].size, // 尺寸
        //   sold_count: data[i].sold_count, // 销售数量
        //   stock: data[i].stock, // 库存
        //   style: data[i].style, // 风格
        //   time: data[i].time, // 创作时间
        //   title: data[i].title, // 产品名称   // ★★★首页数据
        //   type: data[i].type, // 作品类型
        //   theme: data[i].theme, // 题材
        //   updated_at: data[i].updated_at, // 更新时间
        //   // ImgUrl: require("@/assets/pic/product.png") // 产品图（需要Arr）// ★★★首页数据
        //   ImgUrl: image, // 产品图（需要Arr）// ★★★首页数据
        //   ImgUrls: images
        // }
        // ]
      ],
      index_ShowPD: -1,
      categories: [],
      categoriesDetails: [],
      defaultCategoryId: null, // 默认分类 - 第一个
      currentCategoryIndex: 0, // 当前分类Arr序数 - 0
      // 分页
      CurrentCategoryIdTotal: 0,
      CurrentCategoryIdPageArr: [], // 分页-对应每个分类的当前（历史）页数
      // currentPage: 1,
      ifSearch: false
    };
  },
  mounted() {
    let vm = this;
    if (
      this.$route.query.IfSearch == true ||
      this.$route.query.IfSearch == "true"
    ) {
      // 搜索显示结果
      vm.ifSearch = true;
      console.log(vm.ifSearch);
      vm.SearchResult();
    } else {
      // 普通显示分类
      vm.InitCategories();
    }
  },
  methods: {
    SearchResult() {
      console.log("SearchResult");
      let vm = this;
      vm.categoriesDetails.push({
        id: 0,
        name: "搜索结果"
      });
      let temp_productArr = JSON.parse(this.$route.query.productArr);
      let length = temp_productArr.length;
      let temp_PArr1 = [];
      for (let i = 0; i < length; i++) {
        let obj = temp_productArr[i];
        let images_length = obj.images.length;
        obj.ImgUrl = "";
        obj.ImgUrls = [];
        if (images_length == 0) {
          try {
            obj.ImgUrl = require("@/assets/pic/product.png"); //无图处理
            obj.ImgUrls.push(require("@/assets/pic/product.png")); //无图处理
          } catch (error) {
            console.log(error);
          }
        } else if (images_length >= 0) {
          try {
            // 有图处理
            obj.ImgUrl = global.IMGPrefix + obj.images[0].image;
            obj.ImgUrls = [];
            for (let k = 0; k < images_length; k++) {
              obj.ImgUrls.push(global.IMGPrefix + obj.images[k].image);
            }
          } catch (error) {
            console.log(error);
          }
        }

        temp_PArr1.push({
          ...obj
        });
      }
      vm.productArr.push([]); // 搜索结果表只有1个分类！ length为1
      Vue.set(vm.productArr, 0, temp_PArr1);
      console.log(vm.productArr);
    },

    // 跳转产品细节页面 （写入Cookie）
    detailsPageManage(index, indexC) {
      console.log("detailsPageManage");
      console.log(index);
      console.log(indexC);
      let vm = this;
      let dataObj = {};
      dataObj = vm.productArr[index][indexC];
      console.log(dataObj);
      // this.router_to("/productdetails");
      setTimeout(function() {
        vm.$router.push({
          path: "/productdetails",
          query: {
            ImgUrl: dataObj.ImgUrl,
            ImgUrls: dataObj.ImgUrls, // new  // Arr化
            art: dataObj.art,
            category_id: dataObj.category_id,
            content: dataObj.content,
            created_at: dataObj.created_at,
            description: dataObj.description,
            discount: dataObj.discount,
            id: dataObj.id,
            on_sale: dataObj.on_sale,
            price: dataObj.price,
            quality: dataObj.quality,
            rating: dataObj.rating,
            review_count: dataObj.review_count,
            size: dataObj.size,
            sold_count: dataObj.sold_count,
            stock: dataObj.stock,
            style: dataObj.style,
            time: dataObj.time,
            title: dataObj.title,
            type: dataObj.type,
            theme: dataObj.theme,
            updated_at: dataObj.updated_at
          }
        });
      }, 500);
    },
    router_to(str) {
      let vm = this;
      vm.$router.push({ path: str });
    },
    handleClick(tab, event) {
      console.log(tab);
      console.log(event);
      console.log(tab.index);
      let vm = this;
      vm.currentCategoryIndex = Number(tab.index); //当前产品数据index
      vm.defaultCategoryId = vm.categoriesDetails[Number(tab.index)].id; //分类id
      vm.getAssign_Goods("index", Number(tab.index)); // 默认：第一个分类产品显示
    },
    // 初始化分类
    InitCategories() {
      let vm = this;
      geCategories()
        .then(function(response) {
          console.log(response);
          let data = response.data.data;
          for (let i = 0; i < data.length; i++) {
            vm.categories.push(data[i].name);
            vm.categoriesDetails.push({
              id: data[i].id,
              name: data[i].name
            });
            vm.productArr.push([]);
            vm.CurrentCategoryIdPageArr.push(1); // 分页全重置为第1页
          }
          vm.currentCategoryIndex = 0; //当前产品数据index：0
          vm.defaultCategoryId = data[0].id; // 默认：分类id
          console.log(vm.categories);
          console.log(vm.categoriesDetails);
          // 初始分类-显示第一个
          vm.getAssign_Goods("index", 0); // 默认：第一个分类产品显示
        })
        .catch(function(error) {
          console.info(error);
        });
    },
    // 获取指定分类产品数据 => productArr
    // AssignType-指定类型： 'index'-数组序号 'id'-分类id 'page'-带id+页码
    // 参数： string Number
    getAssign_Goods(AssignType, AssignValue) {
      let vm = this;
      setTimeout(function() {
        // AssignType
        if (AssignType == "index") {
          let id = vm.categoriesDetails[AssignValue].id;
          vm.getGoodsById(id);
        } else if (AssignType == "id") {
        } else if (AssignType == "page") {
          let id = vm.defaultCategoryId;
          vm.getGoodsById(id, AssignValue);
        }
      }, 100);
    },
    getGoodsById(id, page) {
      let vm = this;
      getGoodsById(id, page)
        .then(function(response) {
          console.log("getGoodsById");
          console.log(response);
          let temp_productArr_child = [];
          let data = response.data.data;
          let length = data.length;

          if (response.status == 200) {
            Vue.set(vm.productArr, vm.currentCategoryIndex, []); // 当前分类清空（只存一页！）
            for (let i = 0; i < length; i++) {
              let image = require("@/assets/pic/product.png");
              try {
                image = global.IMGPrefix + data[i].images[0].image;
              } catch (error) {
                console.log(error);
              }
              let images = [require("@/assets/pic/product.png")];
              try {
                images = [];
                let length = data[i].images.length;
                for (let j = 0; j < length; j++) {
                  images.push(global.IMGPrefix + data[i].images[j].image);
                }
              } catch (error) {
                console.log(error);
                images = [];
                // images = [require("@/assets/pic/product.png")];
              }
              temp_productArr_child.push({
                art: data[i].art, // 创作者  // ★★★首页数据
                category_id: data[i].category_id, // 分类id
                content: data[i].content, // 产品介绍
                created_at: data[i].created_at, // 创建时间  // ★★★首页数据
                description: data[i].description, // 产品描述（关键字）
                discount: data[i].discount, // 折扣（最大为1）
                id: data[i].id, // 产品id  // ★★★首页数据
                on_sale: data[i].on_sale, // 是否在售 - bool
                price: data[i].price, // 单价   （折后价=单价*折扣）  // ★★★首页数据
                quality: data[i].quality, // 材质
                rating: Number(data[i].rating), // 评分等级 --组件需要为Number类型
                review_count: data[i].review_count, // 评论数
                size: data[i].size, // 尺寸
                sold_count: data[i].sold_count, // 销售数量
                stock: data[i].stock, // 库存
                style: data[i].style, // 风格
                time: data[i].time, // 创作时间
                title: data[i].title, // 产品名称   // ★★★首页数据
                type: data[i].type, // 作品类型
                theme: data[i].theme, // 题材
                updated_at: data[i].updated_at, // 更新时间
                // ImgUrl: require("@/assets/pic/product.png") // 产品图（需要Arr）// ★★★首页数据
                ImgUrl: image, // 产品图（需要Arr）// ★★★首页数据
                ImgUrls: images

                // art: "bailey.kieran"
                // category_id: 1
                // content: "Quasi in saepe excepturi dolorem voluptatibus culpa. Delectus officiis quis iure qui vel sunt ipsam. Sit praesentium molestiae ipsum ea amet incidunt."
                // created_at: "1985-10-03 16:32:47"
                // description: "Praesentium rem est possimus aliquid perspiciatis veniam atque minus."
                // discount: 1
                // id: 1
                // on_sale: true
                // price: "0.01"
                // quality: "布面油画"
                // rating: 5
                // review_count: 10
                // size: "10cm X 10cm"
                // sold_count: 10
                // stock: 100
                // style: "具象表现"
                // time: "2008-01-28"
                // title: "Rosella Raynor"
                // type: "风景"
                // updated_at: "1985-10-03 16:32:47"
              });
            }
            Vue.set(
              vm.productArr,
              vm.currentCategoryIndex,
              temp_productArr_child
            );
            vm.CurrentCategoryIdTotal = response.data.total; // 当前分类产品数量=》映射到分页上
            // console.log(vm.productArr);
            // console.log(vm.productArr[0][0].ImgUrl);
          }
        })
        .catch(function(error) {
          console.info(error);
        });
    },

    showDetails(index, status) {
      // console.log(index);
      // console.log(status);
      if (status == false) {
        this.index_ShowPD = -1;
      }
      if (status == true) {
        this.index_ShowPD = index;
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val, index) {
      console.log(`当前页: ${val}`);
      console.log(index);
      let vm = this;
      // 设置历史页码数组
      Vue.set(vm.CurrentCategoryIdPageArr, vm.currentCategoryIndex, val);
      // 获取指定 CategoryIndex的历史页数
      let currentCidPage = vm.CurrentCategoryIdPageArr[vm.currentCategoryIndex];
      vm.getAssign_Goods("page", currentCidPage);
    }
  }
};
</script>
<style>
/* 每一页设置min-height不同 --首页*/
.mac .common.el-main {
  /* min-height: 1453px; */
}

/* 轮播 */
.SearchResult .el-carousel__container {
  height: 500px;
}
.SearchResult .el-carousel__item img {
  width: 100%;
}
.SearchResult .el-carousel__arrow {
  width: 42px;
  height: 80px;
}
.SearchResult .el-carousel__arrow i {
  font-size: 28px;
  font-weight: bold;
}
.SearchResult .el-carousel__arrow--left {
  left: 0px;
  background: rgba(0, 0, 0, 1);
  border-radius: 0px 5px 5px 0px;
  opacity: 0.3;
}
.SearchResult .el-carousel__arrow--right {
  right: 0px;
  background: rgba(0, 0, 0, 1);
  border-radius: 5px 0px 0px 5px;
  opacity: 0.3;
}
.SearchResult .el-tabs--border-card {
  border: none;
}
.SearchResult .el-tabs--border-card > .el-tabs__header {
  border-bottom: none;
}
.SearchResult .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  border: none;
}
.SearchResult
  .el-tabs--border-card
  > .el-tabs__header
  .el-tabs__item.is-active {
  border-left: none;
  border-right: none;
}

/* **** Tab */
.SearchResult .el-tabs__content {
  padding: 0;
}
/* ****  */

.SearchResult .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #775563;
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
.SearchResult .search_button {
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

/* 商品列表开始 */
.home_page_content {
  margin-top: 42px;
}
.SearchResult .perPic {
  /* width: 392px; */
  /* height: 357px; */
  width: 386px;
  height: 352px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin-right: 12px;
  margin-bottom: 13px;
}
.SearchResult .perPic:nth-child(3n) {
  margin-right: 0px;
}

.SearchResult .perProduct {
  /* width: 392px; */
  /* height: 357px; */
}
.SearchResult .product_intro {
  height: 100%;
  width: 100%;
  text-align: center;
}
.SearchResult .product_intro:hover {
  cursor: pointer;
}
.SearchResult .product_intro_details {
  background-color: rgba(0, 0, 0, 0.6);
  height: 100%;
  width: 100%;
}
.SearchResult .pid_child {
  padding-top: 132px;
  padding-bottom: 134px;
}
.SearchResult .d_1 {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 20px;
  margin-bottom: 12px;
}
.SearchResult .d_2 {
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 22px;
  margin-bottom: 13px;
}
.SearchResult .d_3 {
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 25px;
}

.SearchResult .pagination_settings {
  margin-top: 36px;
  padding-bottom: 40px;
}
</style>
