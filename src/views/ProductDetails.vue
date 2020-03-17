<template>
  <div class="ProductDetails">
    <vue-headful title="商品详情"></vue-headful>
    <el-header class="common">
      <HeaderModule id="navigation"></HeaderModule>
    </el-header>
    <el-main class="common">
      <TopSearchBox :searchType="'ProductDetails'" :categories="[]"></TopSearchBox>

      <div class="pd_content">
        <!-- 页面流程 -->
        <PageFlow :Flow1="'首页'" :Flow2="'油画'" :Flow3="PData.title"></PageFlow>

        <!-- 商品信息 -->
        <div class="inlineBlock_verTopP product_info">
          <!-- <div class="pi_left">
            <div class="pil_top">
              <img class="mainPic" :src="mainPicURL" alt />
            </div>
            <div class="pil_bottom">
              <div class="inlineBlock_verTopP perSPic_p">
                <template v-for="(item,index) in smallPicArr ">
                  <div class="perSPic" :key="index+ 'psp'">
                    <img @click="MainPicChange(index)" :src="item.ImgUrl" class="img_smallPic" alt />
                  </div>
                </template>
              </div>
            </div>
          </div> -->
          <div class="pi_left">
            <magnifier :imgList="smallPicArr"></magnifier>
          </div>
          <div class="pi_right">
            <div class="pir_keywords">{{PData.description}}</div>
            <div class="inlineBlock_verTopP pir_info">
              <div class="info_font">
                市场价：
                <span class="info2_font">￥{{PData.price}}</span>
              </div>
              <div class="info_font">
                月销量：
                <span class="info2_font">{{PData.sold_count}}</span>
              </div>
            </div>
            <div class="inlineBlock_verTopP pir_price">
              <div class="rmb">￥</div>
              <div class="rmb rmb_value">{{PData.price * PData.discount }}</div>
            </div>
            <div class="inlineBlock_verTopP pir_count">
              <div class="pir_count_Title">数量：</div>
              <div class="pir_count_Count">
                <el-input-number
                  v-model="productNum"
                  @change="handleChange"
                  :min="1"
                  :max="Number(PData.stock)"
                  label="商品数量"
                ></el-input-number>
              </div>
              <div class="pir_count_Inventory">库存{{PData.stock}}件</div>
            </div>
            <div class="pir_btns">
              <div class>
                <button @click="Shopping('BuyNow')" class="i_btn">立即购买</button>
                <button @click="Shopping('ShoppingTrolley')" class="i_btn i_btn2">加入购物车</button>
              </div>
            </div>
          </div>
        </div>
        <!-- 商品信息详细 -->
        <div class="product_info_details">
          <div class="inlineBlock_verTopP pid_title">
            <div class="inlineBlock_verTopP pid_left">
              <div
                v-show="PIDType =='introduction'"
                class="PIDChoose0 PIDChoose1"
                @click="PIDType ='introduction'"
              >商品介绍</div>
              <div
                v-show="PIDType =='evaluate'"
                class="PIDChoose0 PIDChoose2"
                @click="PIDType ='introduction'"
              >商品介绍</div>
              <div
                v-show="PIDType =='evaluate'"
                class="PIDChoose0 PIDChoose1 PIDMargin"
                @click="PIDType ='evaluate'"
              >累计评价（{{PData.review_count}}）</div>
              <div
                v-show="PIDType =='introduction'"
                class="PIDChoose0 PIDChoose2 PIDMargin"
                @click="PIDType ='evaluate'"
              >累计评价（{{PData.review_count}}）</div>
            </div>
          </div>

          <div v-show="PIDType == 'introduction'">
            <div class>
              <!-- 产品详情 -->
              <div class="m_introduction">
                <div class="mi_title">产品详情</div>
                <div class="mi_content">
                  <div class="inlineBlock_verTopP perMic">
                    <template v-for="(item,index) in mi_contentArr.slice(0,3) ">
                      <div :key="index+ 'mic1'" class="perMic_child">{{item.name}}：{{item.value}}</div>
                    </template>
                  </div>
                  <div class="inlineBlock_verTopP perMic">
                    <template v-for="(item,index) in mi_contentArr.slice(3,6) ">
                      <div :key="index+ 'mic2'" class="perMic_child">{{item.name}}：{{item.value}}</div>
                    </template>
                  </div>
                  <div class="inlineBlock_verTopP perMic">
                    <template v-for="(item,index) in mi_contentArr.slice(6,9) ">
                      <div :key="index+ 'mic3'" class="perMic_child">{{item.name}}：{{item.value}}</div>
                    </template>
                  </div>
                </div>
              </div>
              <!-- 产品介绍 -->
              <div class="m_introduction2">
                <div class="mi_title mi_title2">产品介绍</div>
                <div class="mi_content2">
                  <!-- <div class="mi_content2_font">{{PData.content}}</div> -->
                  <!-- 产品介绍内容由后台返回HTML文本自动生成 -->
                  <div class="mi_content2_font" v-html="PData.content"></div>
                  <!-- <div class="mi_content2_font" >{{PData.content}}</div> -->
                </div>

                <!-- <div class="mi_content2_picIntro">
                  <template v-for="(item,index) in mi_picIntroArr">
                    <div class="inlineBlock_verTopP mipi" :key="index+ 'mipi'">
                      <div class="mipi_left">
                        <img class="mipi_img" :src="item.ImgUrl" alt />
                      </div>
                      <div class="mipi_right">
                        <div class="mipi_right_child">{{item.picIntro}}</div>
                      </div>
                    </div>
                  </template>
                </div>-->
              </div>
            </div>

            <!--  -->
            <div class="rate_orign">
              <div class="mi_title">累计评价（{{PData.review_count}}）</div>
              <div style="height:16px;"></div>
              <div class="productContent">
                <div class="inlineBlock_verTopP productGrade">
                  <div class="pg_left">商品评分</div>
                  <div class="pg_right">
                    <el-rate
                      v-model="PData.rating"
                      disabled
                      show-score
                      text-color="#775563"
                      score-template="{value}"
                      :colors="colors"
                    ></el-rate>
                  </div>
                </div>
                <template v-for="(item,index) in RateDataArr ">
                  <div :key="index+ 'rd'" class="perRateData">
                    <div class="rd_text">{{item.text}}</div>
                    <div class="inlineBlock_verTopP rd_imgs">
                      <template v-for="(itemC,indexC) in item.imgs ">
                        <div :key="indexC+ 'rdimgs'" class="perRateDataImg">
                          <img class="rate_img" :src="itemC" alt />
                        </div>
                      </template>
                    </div>
                    <div class="rd_date">{{item.date}}</div>
                  </div>
                </template>
              </div>
            </div>

            <!--  -->
          </div>
          <div v-show="PIDType == 'evaluate'">
            <div class="rate_orign">
              <div class="productContent">
                <div class="inlineBlock_verTopP productGrade">
                  <div class="pg_left">商品评分</div>
                  <div class="pg_right">
                    <el-rate
                      v-model="PData.rating"
                      disabled
                      show-score
                      text-color="#775563"
                      score-template="{value}"
                      :colors="colors"
                    ></el-rate>
                  </div>
                </div>
                <template v-for="(item,index) in RateDataArr ">
                  <div :key="index+ 'rd'" class="perRateData">
                    <div class="rd_text">{{item.text}}</div>
                    <div class="inlineBlock_verTopP rd_imgs">
                      <template v-for="(itemC,indexC) in item.imgs ">
                        <div :key="indexC+ 'rdimgs'" class="perRateDataImg">
                          <img class="rate_img" :src="itemC" alt />
                        </div>
                      </template>
                    </div>
                    <div class="rd_date">{{item.date}}</div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>
    <!-- 客服咨询按钮 -->
    <div class="CustomerService_bg">
      <div @click="CustomerServiceManage('none')" class="CustomerService">
        <i class="el-icon-s-custom"></i> 客服咨询
      </div>
    </div>

    <FooterNav></FooterNav>
    <el-footer class="el-footer">
      <FooterModule></FooterModule>
    </el-footer>
  </div>
</template>
<script>
import HeaderModule from "@/components/HeaderModule";

import TopSearchBox from "@/components/TopSearchBox";
import FooterNav from "@/components/FooterNav";
import FooterModule from "@/components/FooterModule";
import PageFlow from "@/components/PageFlow";
import { refresh_token, addToCart, GoodsReplies } from "@/api/api";
import Magnifier from "@/components/Magnifier";
export default {
  name: "ProductDetails",
  components: {
    HeaderModule,
    TopSearchBox,
    FooterNav,
    FooterModule,
    PageFlow,
    Magnifier
  },
  data() {
    return {
      PData: {
        // description:
        //   "李新建珠峰瑞祥, 2015，布面油画李新建珠峰瑞祥, 2015，布面油画李新建珠峰瑞祥, 2015，布面油画李新建",
        // title: "珠峰瑞祥",
        // price: 45415,
        // sold_count: 20,
        // discount: 0.8, // 折扣 （现价=单价*折扣）
        // stock: 12, // 库存
        // review_count: 2, // 累计评价数
        // art: "李新建",
        // quality: "布面油画",
        // size: "150.0x100.0cm",
        // created_at: "2015",
        // style: "具象表现",
        // type: "油画",
        // theme: "风景",
        // // 产品介绍
        // content:
        //   "“圣山系列”是李新建近年创作的最新一组作品，一方面是艺术家对西藏内容的一个沉淀，另一方面也是自身内心想要表达的需求。“圣山系列”的创作更像是一种仪式，其创作的过程不仅仅是一种语言表达的方式或者艺术家个体感情的投射。感性、技术、经验在转化的过程中以不同寻常的方式融合，用深沉取代认识，艺术家对于所面对的对象的表达更像是一位谦卑的仆人，世界持静观状态，而不是激情状态，这种距离暗含了某种敬畏，对自然之物的点到为止。绘画在这里只是一个支点，作为整个过程的结果实际上也是某种开始。",
        // rating: 4.8,
        // id: null
        description: "-",
        title: "-",
        price: 0,
        sold_count: 0,
        discount: 0, // 折扣 （现价=单价*折扣）
        stock: 0, // 库存
        review_count: 0, // 累计评价数
        art: "-",
        quality: "-",
        size: "",
        created_at: "-",
        style: "-",
        type: "-",
        theme: "-",
        // 产品介绍
        content: "-",
        rating: 0,
        id: null
      },
      // mainPicURL: require("@/assets/pic/product.png"),
      // smallPicArr: [
      //   {
      //     ImgUrl: require("@/assets/pic/product.png")
      //   },
      //   {
      //     ImgUrl: require("@/assets/pic/product.png")
      //   },
      //   {
      //     ImgUrl: require("@/assets/pic/product2.png")
      //   },
      //   {
      //     ImgUrl: require("@/assets/pic/product.png")
      //   },
      //   {
      //     ImgUrl: require("@/assets/pic/product.png")
      //   },
      //   {
      //     ImgUrl: require("@/assets/pic/product.png")
      //   }
      // ],
      mainPicURL: "",
      smallPicArr: [],
      productNum: 1,
      PIDType: "introduction", // "introduction" - 商品介绍  "evaluate" - 累计评价
      mi_contentArr: [
        {
          name: "作品名称",
          value: "珠峰瑞祥"
        },
        {
          name: "艺术家",
          value: "李新建"
        },
        {
          name: "材质",
          value: "布面油画"
        },
        {
          name: "尺寸",
          value: "150.0x100.0cm"
        },
        {
          name: "创作时间",
          value: "2015"
        },
        {
          name: "作品类型",
          value: "油画"
        },
        {
          name: "风格",
          value: "具象表现"
        },
        {
          name: "题材",
          value: "风景"
        }
      ],
      mi_picIntroArr: [
        {
          ImgUrl: require("@/assets/pic/product.png"),
          picIntro:
            "圣山，千年磨损而矗立于此，它存在的力量穿透了时间的屏障，暗含了某种生命的高度，一种生命的伟大。"
        },
        {
          ImgUrl: require("@/assets/pic/product2.png"),
          picIntro: "艺术细节展示。"
        }
      ],
      colors: ["#775563", "#775563", "#775563"],
      RateDataArr: [
        // {
        //   text:
        //     "当你有一个傻瓜时，你会很痛苦；你有 50 个傻瓜是最幸福的，吃饭、睡觉、上厕所排着队去的；你有一个聪明人时很带劲，你有 50 个聪明人实际上是最痛苦的，谁都不服谁。我在公司里的作用就象水泥，把许多优秀的人才粘合起来，使他们力气往一个地方使",
        //   imgs: [
        //     require("@/assets/pic/product.png"),
        //     require("@/assets/pic/product2.png")
        //   ],
        //   date: "2019-10-12"
        // },
        // {
        //   text:
        //     "当你有一个傻瓜时，你会很痛苦；你有 50 个傻瓜是最幸福的，吃饭、睡觉、上厕所排着队去的；你有一个聪明人时很带劲，你有 50 个聪明人实际上是最痛苦的，谁都不服谁。我在公司里的作用就象水泥，把许多优秀的人才粘合起来，使他们力气往一个地方使",
        //   imgs: [
        //     require("@/assets/pic/product.png"),
        //     require("@/assets/pic/product2.png")
        //   ],
        //   date: "2019-10-12"
        // }
      ]
    };
  },
  mounted() {
    let vm = this;
    // 标题title浮动初始化
    this.$Utils.TitleInit();

    vm.InitData(); // 一次初始化
    // 跳转商品详情页，处理的延迟如果过小，会出现不稳定问题
    // 这里添加一个后置验证吧！ 如果1S后还是 初始值，那就再初始化一遍！
    setTimeout(function() {
      // vm.PData.title = "-"; // 测试
      if (vm.PData.title == "-") {
        // 二次初始化（判断一次没成功的话）
        vm.$message("商品信息重新加载中，请稍后！");
        vm.InitData();
      }
    }, 1000);
    setTimeout(function() {
      // vm.PData.title = "-"; // 测试
      if (vm.PData.title == "-") {
        vm.$message("商品信息加载失败，将为您返回首页！");
        setTimeout(function() {
          vm.$router.push({
            path: "/"
          });
        }, 1000);
      }
    }, 6000);
  },

  methods: {
    InitData() {
      let vm = this;
      console.log("ProductDetails");
      if (
        this.$route.query.id != null &&
        this.$route.query != undefined &&
        this.$route.query != ""
      ) {
        setTimeout(function() {
          vm.PdataInit(); // 数据初始化
        }, 200);
        console.log("ProductDetails2");
        // 商品评论初始化
        setTimeout(function() {
          vm.GoodsReplies();
        }, 600);
        console.log("ProductDetails3");
      }
    },
    CustomerServiceManage(CSType) {
      let vm = this;
      if (CSType == "none") {
        this.$message("功能开发中，敬请期待。");
        return;
      }
    },
    GoodsReplies() {
      let vm = this;
      let id = vm.PData.id;
      GoodsReplies(id)
        .then(function(response) {
          console.log("GoodsReplies");
          console.log(response);
          if (response.status == 200) {
            let data = response.data.data;
            let length = data.length;
            console.log(length);
            vm.PData.review_count = length; // ▲▲▲实际评论数！
            for (let i = 0; i < length; i++) {
              vm.RateDataArr.push({
                text: data[i].content,
                date: data[i].updated_at,
                imgs: [
                  // ▲▲▲临时-评论图片
                  require("@/assets/pic/product.png"),
                  require("@/assets/pic/product2.png")
                  // "../assets/pic/product.png",
                  // "../assets/pic/product2.png",
                ]
              });
            }
            // data: Array(3)
            //      0:
            //      content: "很好"
            //      created_at: "2020-03-11 00:46:56"
            //      good_id: 12
            //      id: 1
            //      updated_at: "2020-03-11 00:46:56"
            //      user_id: 1
            //      __proto__: Object
            //      1: {id: 2, good_id: 12, user_id: 1, content: "good", created_at: "2020-03-11 00:47:38", …}
            //      2: {id: 3, good_id: 12, user_id: 1, content: "hao!", created_at: "2020-03-11 00:48:42", …}
          }
        })
        .catch(function(error) {
          console.info(error);
        });
    },
    // 购物  shoppingType： 'BuyNow' - 立即购买 'ShoppingTrolley' - 加入购物车
    Shopping(shoppingType) {
      // 购买前判定！先登录！
      let vm = this;
      let token = vm.$Utils.getCookie("user_token");
      let newToken = token.replace('"', "").replace('"', "");
      if (token != undefined && token != null && token != "") {
        refresh_token(newToken)
          .then(function(response) {
            if (response.status == 200) {
              vm.$Utils.setCookie(
                "user_token",
                JSON.stringify(response.data.access_token),
                60
              );
              function temp_function(type) {
                var formData = new FormData();
                var formData = new window.FormData();
                formData.append("good_id", vm.PData.id);
                formData.append("amount", vm.productNum);
                if (type != "BuyNow") {
                  formData.append("cartExist", 0);
                } else if (type == "BuyNow") {
                  formData.append("cartExist", 1);
                }
                // cartExist 0=>未在购物车页面，1=>在购物车页面  (0-自增 1-赋值)
                let token = vm.$Utils.getCookie("user_token");
                let newToken = token.replace('"', "").replace('"', "");
                addToCart(newToken, formData)
                  .then(function(response) {
                    console.log("addToCart");
                    console.log(response);
                    if (response.status == 201) {
                      if (type != "BuyNow") {
                        vm.$message("加入购物车成功！");
                      } else {
                        vm.$message("跳转处理中...");
                      }
                    }
                  })
                  .catch(function(error) {
                    console.info(error);
                  });
              }
              setTimeout(function() {
                if (shoppingType == "BuyNow") {
                  temp_function("BuyNow");
                  setTimeout(function() {
                    // ▲▲▲ temp跳购物车 -- 应该跳核查订单！！
                    // vm.router_to("/shoppingtrolley");
                    // 方便处理-中转购物车再跳核查订单！
                    vm.$router.push({
                      path: "/shoppingtrolley",
                      query: {
                        ifBuyNow: 1,
                        id: vm.PData.id
                      }
                    });
                  }, 500);
                } else if (shoppingType == "ShoppingTrolley") {
                  temp_function();
                }
              }, 500);
            }
          })
          .catch(function(error) {
            console.info(error);
          });
      } else {
        // console.log("即将为您跳转登录页面！");
        vm.$message("即将为您跳转登录页！");
        setTimeout(function() {
          vm.router_to("/login");
          // global.historyPageURL = "/productdetails";
        }, 2000);
      }
    },
    router_to(str) {
      let vm = this;
      vm.$router.push({ path: str });
    },
    // 产品详情-数据格式赋值
    PDetailsManage() {
      this.mi_contentArr[0].value = this.PData.title;
      this.mi_contentArr[1].value = this.PData.art;
      this.mi_contentArr[2].value = this.PData.quality;
      this.mi_contentArr[3].value = this.PData.size;
      this.mi_contentArr[4].value = this.PData.created_at;
      this.mi_contentArr[5].value = this.PData.type;
      this.mi_contentArr[6].value = this.PData.style;
      this.mi_contentArr[7].value = this.PData.theme;
    },
    MainPicChange(index) {
      this.mainPicURL = this.smallPicArr[index].ImgUrl;
    },
    PdataInit() {
      let Query = this.$route.query;
      console.log("Query");
      console.log(Query);

      this.PData = {
        ...this.ExampleCover(this.PData, Query)
      };
      this.PData.rating = Number(this.PData.rating); //rating前置： Number类型
      console.log(this.PData);

      // 主图
      this.mainPicURL = Query.ImgUrl;
      // 小图xn
      if (typeof Query.ImgUrls == "string") {
        this.smallPicArr = [];
        console.log("~~!!1");
        this.smallPicArr.push({
          ImgUrl: Query.ImgUrls
        });
      } else {
        this.smallPicArr = [];
        let length = Query.ImgUrls.length;
        console.log("~~!!2");
        console.log(Query.ImgUrls);
        for (let i = 0; i < length; i++) {
          this.smallPicArr.push({
            ImgUrl: Query.ImgUrls[i]
          });
        }
      }
      console.log(this.smallPicArr);

      this.PDetailsManage(); // 产品详情-数据格式赋值
    },
    ExampleCover(ExampleParams, newParams) {
      let temp_ExampleParams = Object.assign({}, ExampleParams);
      let temp_newParams = Object.assign({}, newParams);
      for (let OBJ in temp_newParams) {
        temp_ExampleParams[OBJ] = temp_newParams[OBJ];
      }
      return temp_ExampleParams;
    },

    handleChange(value) {
      console.log(value);
    }
  }
};
</script>
<style>
/* ***** 计数器 样式 */
.ProductDetails .el-input-number {
  width: 88px;
}
.ProductDetails .pir_count_Count {
  height: 20px;
  line-height: 20px;
}
.ProductDetails .pir_count_Count div,
.ProductDetails .pir_count_Count span,
.ProductDetails .pir_count_Count i,
.ProductDetails .pir_count_Count input {
  height: 17px;
  line-height: 17px;
}
.ProductDetails .pir_count_Count .el-input-number .el-input,
.ProductDetails .el-input-number .el-input__inner {
  height: 20px;
  line-height: 20px;
  border: 0;
  padding: 0;
}

.ProductDetails .el-input-number__decrease {
  border-radius: 100px;
  height: 18px !important;
  width: 18px !important;
  color: #775563;
  background-color: #fff;
  border: 1px #c5cad5 solid;
  font-weight: bold;
}
.ProductDetails .el-input-number__increase {
  border-radius: 100px;
  height: 18px !important;
  width: 18px !important;
  color: #fff;
  background-color: #775563;
  border: 1px #775563 solid;
  font-weight: bold;
}
/* ***** 评分Rate */
.ProductDetails .el-rate__text {
  font-size: 18px;
}
</style>

<style scoped>
.ProductDetails {
}

/* ***** 商品信息 */
.ProductDetails .product_info {
  margin-bottom: 54px;
}
.ProductDetails .pi_left {
  margin-right: 113px;
  width: 392px;
}
.ProductDetails .pi_right {
  width: 493px;
}
.ProductDetails .pil_top {
  margin-bottom: 20px;
}
.ProductDetails .mainPic {
  width: 392px;
  height: 388px;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
.ProductDetails .perSPic_p {
  white-space: nowrap;
  overflow-y: hidden;
}
.ProductDetails .perSPic {
  margin-right: 12px;
}
.ProductDetails .img_smallPic {
  width: 89px;
  height: 89px;
  border-radius: 10px;
}
.ProductDetails .img_smallPic:hover {
  cursor: pointer;
}

.ProductDetails .pir_keywords {
  width: 493px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(17, 26, 52, 1);
  line-height: 25px;
  margin-bottom: 8px;
}
.ProductDetails .pir_info {
  margin-bottom: 32px;
}
.ProductDetails .info_font {
  width: 108px;
  height: 20px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(138, 143, 150, 1);
  line-height: 17px;
  margin-right: 32px;
}
.ProductDetails .info2_font {
  color: #000000;
}
.ProductDetails .pir_price {
  height: 40px;
  width: 100%;
}
.ProductDetails .rmb {
  height: 40px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(119, 85, 99, 1);
  line-height: 25px;
}
.ProductDetails .rmb_value {
  font-size: 28px;
}
.ProductDetails .pir_count {
  padding: 32px 0 16px 0;
  height: 20px;
  border-top: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
  width: 100%;
  margin-bottom: 32px;
}
.ProductDetails .pir_count_Title {
  width: 54px;
  height: 24px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(138, 143, 150, 1);
  line-height: 24px;
  margin-left: 36px;
}

.ProductDetails .pir_count_Inventory {
  height: 24px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(197, 202, 213, 1);
  line-height: 24px;
  margin-left: 24px;
}

.ProductDetails .i_btn {
  width: 180px;
  height: 40px;
  background: rgba(242, 238, 240, 1);
  border-radius: 20px;
  border: 1px solid rgba(119, 85, 99, 1);
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(119, 85, 99, 1);
}
.ProductDetails .i_btn2 {
  background: rgba(119, 85, 99, 1);
  border: 1px solid rgba(119, 85, 99, 1);
  color: #fff;
  margin-left: 32px;
}

/* 商品信息详细 */
.ProductDetails .pid_title {
  height: 25px;
  line-height: 25px;
  padding-bottom: 25px;
  margin-bottom: 32px;
  padding-left: 32px;
}

.ProductDetails .pid_left {
  font-size: 18px;
  font-family: PingFangSCSemibold-;
  line-height: 25px;
  color: rgba(119, 85, 99, 1);
  /* margin-right: 152px; */
}
.ProductDetails .PIDChoose0 {
  height: 31px;
}
.ProductDetails .PIDChoose0:hover {
  cursor: pointer;
}

.ProductDetails .PIDChoose1 {
  border-bottom: 2px rgba(119, 85, 99, 1) solid;
  color: rgba(119, 85, 99, 1);
}
.ProductDetails .PIDChoose2 {
  color: #8a8f96;
}
.ProductDetails .PIDMargin {
  margin-left: 32px;
}

/* 产品详情 */
.ProductDetails .m_introduction {
  /* width: 100%; */
  /* height: 232px; */
  padding: 32px 32px 56px 32px;
  background: rgba(248, 248, 248, 1);
  margin-bottom: 56px;
}
.ProductDetails .m_introduction2 {
  padding: 0 32px 0 32px;
  /* width: 100%; */
}
.ProductDetails .rate_orign {
  padding-left: 32px;
}

.ProductDetails .mi_title {
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(17, 26, 52, 1);
  line-height: 25px;
}
.ProductDetails .mi_title2 {
  margin-bottom: 32px;
}

.ProductDetails .mi_content {
}
.ProductDetails .mi_content2 {
  margin-bottom: 32px;
}

.ProductDetails .perMic {
  height: 20px;
  padding: 32px 0 15px 0;
  border-bottom: 1px solid #e2e2e2;
}
.ProductDetails .perMic_child {
  width: 356px;
  margin-right: 16px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(138, 143, 150, 1);
  line-height: 20px;
}
/* 产品介绍 */
.ProductDetails .mi_content2_font {
  width: 100%;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(90, 97, 107, 1);
  line-height: 32px;
  letter-spacing: 1px;
  text-align: justify;
}
.ProductDetails .mipi_left {
  margin-right: 113px;
}

.ProductDetails .mipi {
  margin-bottom: 32px;
}
.ProductDetails .mipi_img {
  width: 562px;
  height: 562px;
}
.ProductDetails .mipi_right {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(90, 97, 107, 1);
  letter-spacing: 1px;
  width: 410px;
  text-align: justify;
  height: 562px;
  line-height: 562px;
}
.ProductDetails .mipi_right_child {
  line-height: 24px;
  margin: 60% 0;
}

/* ****** 评价 评分 */
.ProductDetails .productGrade {
  width: 100%;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(226, 226, 226, 1);
}
.ProductDetails .pg_left {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(17, 26, 52, 1);
  line-height: 20px;
  margin-right: 20px;
}
/* **** */
.ProductDetails .productContent {
}
.ProductDetails .rd_text {
  margin-top: 16px;
  margin-bottom: 16px;
  width: 1136px;
  /* height: 64px; */
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(90, 97, 107, 1);
  line-height: 32px;
  letter-spacing: 1px;
  text-align: justify;
}
.ProductDetails .rd_imgs {
  margin-bottom: 18px;
}
.ProductDetails .perRateDataImg {
}
.ProductDetails .rate_img {
  width: 80px;
  height: 80px;
  margin-right: 16px;
}
.ProductDetails .rd_date {
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(197, 202, 213, 1);
  line-height: 17px;
  letter-spacing: 1px;
}
/* ******* 客服咨询-按钮 */
.ProductDetails .CustomerService_bg {
  position: fixed;
  right: 0;
  top: 45vh;
}
.ProductDetails .CustomerService {
  width: 20px;
  margin: 0 auto;
  padding: 16px;
  line-height: 24px;
  font-size: 20px;
  background-color: #775563;
  color: #fff;
  border-radius: 10px;
}
.ProductDetails .CustomerService:hover {
  cursor: pointer;
  opacity: 0.9;
}
</style>

