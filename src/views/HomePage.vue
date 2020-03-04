<template>
  <div class="HomePage">
    <!-- 顶部输入框开始 -->

    <TopSearchBox></TopSearchBox>
    <!-- 顶部输入框结束 -->

    <!-- 轮播开始 -->
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(imgItem, index2) in carouselList" :key="index2 + 'img'">
        <img :src="imgItem" />
      </el-carousel-item>
    </el-carousel>
    <!-- 轮播结束 -->

    <!-- 分类开始 -->
    <el-row class="home_page_content">
      <el-tabs type="border-card">
        <el-tab-pane label="油画">
          <div class="inlineBlock_verTopP">
            <template v-for="(item,index) in productArr ">
              <div
                class="perPic"
                :style="{backgroundImage: 'url(' + item.ImgUrl + ')'}"
                :key="index+ 'pa'"
              >
                <div
                  class="product_intro"
                  @mouseover="showDetails(index,true)"
                  @mouseout="showDetails(index,false)"
                >
                  <div v-show="index == index_ShowPD" class="product_intro_details">
                    <div class="pid_child">
                      <div class="d_1">{{item.name}}</div>
                      <div class="d_2">{{item.info1}},{{item.info2}}</div>
                      <div class="d_3">￥{{item.price}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </el-tab-pane>
        <el-tab-pane label="版画">
          <div class="inlineBlock_verTopP">
            <template v-for="(item,index) in productArr ">
              <div
                class="perPic"
                :style="{backgroundImage: 'url(' + item.ImgUrl + ')'}"
                :key="index+ 'pa'"
              >
                <div
                  class="product_intro"
                  @mouseover="showDetails(index,true)"
                  @mouseout="showDetails(index,false)"
                >
                  <div v-show="index == index_ShowPD" class="product_intro_details">
                    <div class="pid_child">
                      <div class="d_1">{{item.name}}</div>
                      <div class="d_2">{{item.info1}},{{item.info2}}</div>
                      <div class="d_3">￥{{item.price}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </el-tab-pane>
        <el-tab-pane label="书法">
          <div class="inlineBlock_verTopP">
            <template v-for="(item,index) in productArr ">
              <div
                class="perPic"
                :style="{backgroundImage: 'url(' + item.ImgUrl + ')'}"
                :key="index+ 'pa'"
              >
                <div
                  class="product_intro"
                  @mouseover="showDetails(index,true)"
                  @mouseout="showDetails(index,false)"
                >
                  <div v-show="index == index_ShowPD" class="product_intro_details">
                    <div class="pid_child">
                      <div class="d_1">{{item.name}}</div>
                      <div class="d_2">{{item.info1}},{{item.info2}}</div>
                      <div class="d_3">￥{{item.price}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </el-tab-pane>
        <el-tab-pane label="素描">
          <div class="inlineBlock_verTopP">
            <template v-for="(item,index) in productArr ">
              <div
                class="perPic"
                :style="{backgroundImage: 'url(' + item.ImgUrl + ')'}"
                :key="index+ 'pa'"
              >
                <div
                  class="product_intro"
                  @mouseover="showDetails(index,true)"
                  @mouseout="showDetails(index,false)"
                >
                  <div v-show="index == index_ShowPD" class="product_intro_details">
                    <div class="pid_child">
                      <div class="d_1">{{item.name}}</div>
                      <div class="d_2">{{item.info1}},{{item.info2}}</div>
                      <div class="d_3">￥{{item.price}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-row>
    <!-- 分类结束 -->

    <!-- 分页 -->
    <div class="textAlignCenter_w100p pagination_settings">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper "
        :total="100"
        background
      ></el-pagination>
    </div>
    <!-- 分页 -->

    <FooterNav></FooterNav>
  </div>
</template>
<script>
import TopSearchBox from "@/components/TopSearchBox";

import FooterNav from "@/components/FooterNav";

export default {
  name: "HomePage",
  components: {
    TopSearchBox,
    FooterNav
  },

  data() {
    return {
      carouselList: [
        require("../assets/pic/tree.png"),
        require("../assets/pic/tree2.jpeg"),
        require("../assets/pic/tree3.jpeg"),
        require("../assets/pic/tree4.jpeg")
      ],
      productArr: [
        {
          id: 1,
          ImgUrl: require("@/assets/pic/product.png"),
          name: "李新建",
          info1: "珠峰瑞祥",
          info2: "2015",
          price: "23270"
        },
        {
          id: 2,
          ImgUrl: require("@/assets/pic/product.png"),
          name: "李新建",
          info1: "珠峰瑞祥",
          info2: "2015",
          price: "23270"
        },
        {
          id: 3,
          ImgUrl: require("@/assets/pic/product.png"),
          name: "李新建",
          info1: "珠峰瑞祥",
          info2: "2015",
          price: "23270"
        },
        {
          id: 4,
          ImgUrl: require("@/assets/pic/product.png"),
          name: "李新建",
          info1: "珠峰瑞祥",
          info2: "2015",
          price: "23270"
        },
        {
          id: 5,
          ImgUrl: require("@/assets/pic/product.png"),
          name: "李新建",
          info1: "珠峰瑞祥",
          info2: "2015",
          price: "23270"
        },
        {
          id: 6,
          ImgUrl: require("@/assets/pic/product.png"),
          name: "李新建",
          info1: "珠峰瑞祥",
          info2: "2015",
          price: "23270"
        },
        {
          id: 7,
          ImgUrl: require("@/assets/pic/product.png"),
          name: "李新建",
          info1: "珠峰瑞祥",
          info2: "2015",
          price: "23270"
        },
        {
          id: 1,
          ImgUrl: require("@/assets/pic/product.png"),
          name: "李新建",
          info1: "珠峰瑞祥",
          info2: "2015",
          price: "23270"
        },
        {
          id: 1,
          ImgUrl: require("@/assets/pic/product.png"),
          name: "李新建",
          info1: "珠峰瑞祥",
          info2: "2015",
          price: "23270"
        }
      ],
      index_ShowPD: -1,
      currentPage: 1
    };
  },
  mounted() {
    let vm = this;
  },
  methods: {
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
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style>
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
.HomePage .el-carousel__arrow--left {
  left: 0px;
  background: rgba(0, 0, 0, 1);
  border-radius: 0px 5px 5px 0px;
  opacity: 0.3;
}
.HomePage .el-carousel__arrow--right {
  right: 0px;
  background: rgba(0, 0, 0, 1);
  border-radius: 5px 0px 0px 5px;
  opacity: 0.3;
}
.HomePage .el-tabs--border-card {
  border: none;
}
.HomePage .el-tabs--border-card > .el-tabs__header {
  border-bottom: none;
}
.HomePage .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  border: none;
}
.HomePage .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  border-left: none;
  border-right: none;
}

/* **** Tab */
.HomePage .el-tabs__content {
  padding: 0;
}
/* ****  */

.HomePage .el-pagination.is-background .el-pager li:not(.disabled).active {
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

/* 商品列表开始 */
.home_page_content {
  margin-top: 42px;
}
.HomePage .perPic {
  /* width: 392px; */
  /* height: 357px; */
  width: 386px;
  height: 352px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin-right: 12px;
  margin-bottom: 13px;
}
.HomePage .perPic:nth-child(3n) {
  margin-right: 0px;
}

.HomePage .perProduct {
  /* width: 392px; */
  /* height: 357px; */
}
.HomePage .product_intro {
  height: 100%;
  width: 100%;
  text-align: center;
}
.HomePage .product_intro_details {
  background-color: rgba(0, 0, 0, 0.6);
  height: 100%;
  width: 100%;
}
.HomePage .pid_child {
  padding-top: 132px;
  padding-bottom: 134px;
}
.HomePage .d_1 {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 20px;
  margin-bottom: 12px;
}
.HomePage .d_2 {
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 22px;
  margin-bottom: 13px;
}
.HomePage .d_3 {
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 25px;
}

.HomePage .pagination_settings {
  margin-top: 36px;
}
</style>
