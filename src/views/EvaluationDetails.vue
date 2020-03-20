<template>
  <div class="EvaluationDetails height_auto">
    <vue-headful title="评价详情"></vue-headful>
    <el-header class="common">
      <HeaderModule id="navigation"></HeaderModule>
    </el-header>
    <el-main class="common">
      <TopSearchBox :searchType="'EvaluationDetails'" :categories="[]"></TopSearchBox>
      <div class="pc_content">
        <PageFlow :Flow1="'首页'" :Flow2="'我的订单'" :Flow3="'评价详情'"></PageFlow>
      </div>

      <div class="mc_content">
        <div class="sTitle">评价详情</div>
        <div class="ms_table">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column header-align="center" label="订单号" width="200">
              <template slot-scope="scope">
                <div>{{ scope.row.OrderNumber }}</div>
              </template>
            </el-table-column>
            <el-table-column header-align="center" label="商品" width="300">
              <template slot-scope="scope">
                <div class="inlineBlock_verTopP">
                  <div class="Shopping_img_p">
                    <img class="Shopping_img" :src="scope.row.ImgUrl" alt />
                  </div>
                  <div class="product_text">{{ scope.row.productInfo }}</div>
                </div>
              </template>
            </el-table-column>
            <!-- <el-table-column header-align="center" label="商品评分" width="200">
              <template slot-scope="scope">
                <div>
                  <el-rate
                    v-model="scope.row.RateValue1"
                    disabled
                    text-color="#775563"
                    score-template="{value}"
                    :colors="colors"
                  ></el-rate>
                </div>
              </template>
            </el-table-column>
            <el-table-column header-align="center" label="服务评分" width="200">
              <template slot-scope="scope">
                <div>
                  <el-rate
                    v-model="scope.row.RateValue2"
                    disabled
                    text-color="#775563"
                    score-template="{value}"
                    :colors="colors"
                  ></el-rate>
                </div>
              </template>
            </el-table-column>
            <el-table-column header-align="center" label="时效评分" width="200">
              <template slot-scope="scope">
                <div>
                  <el-rate
                    v-model="scope.row.RateValue3"
                    disabled
                    text-color="#775563"
                    score-template="{value}"
                    :colors="colors"
                  ></el-rate>
                </div>
              </template>
            </el-table-column>-->
            <el-table-column header-align="center" label="商品/服务/时效评分" width="200">
              <template slot-scope="scope">
                <div>
                  <el-rate
                    v-model="scope.row.RateValue1"
                    disabled
                    text-color="#775563"
                    score-template="{value}"
                    :colors="colors"
                  ></el-rate>
                  <el-rate
                    v-model="scope.row.RateValue2"
                    disabled
                    text-color="#775563"
                    score-template="{value}"
                    :colors="colors"
                  ></el-rate>
                  <el-rate
                    v-model="scope.row.RateValue3"
                    disabled
                    text-color="#775563"
                    score-template="{value}"
                    :colors="colors"
                  ></el-rate>
                </div>
              </template>
            </el-table-column>
            <el-table-column header-align="center" label="评论图片" width="250">
              <template slot-scope="scope">
                <div class="inlineBlock_verTopP">
                  <div v-if=" scope.row.Comments_imgs.length == 0">暂无评论图片</div>
                  <div class="inlineBlock_verTopP" v-if=" scope.row.Comments_imgs.length != 0">
                    <template v-for="(item, index) in scope.row.Comments_imgs">
                      <div class="Shopping_img_p2" :key="index + 'ci'">
                        <img class="Shopping_img" :src="item" alt />
                      </div>
                    </template>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column header-align="center" label="评论内容" width="250">
              <template slot-scope="scope">
                <div>{{ scope.row.content }}</div>
                <div class="rd_date">{{ scope.row.created_at }}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- <div class="commentsDetails">
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
              <div class="rd_date">{{item.created_at}}</div>
            </div>
          </template>
        </div>-->
      </div>
    </el-main>

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
import {
  refresh_token,
  UserReplies,
  getOrderDetailsById,
  getGoodDetailsById,
  AllReplies
} from "@/api/api";

export default {
  name: "EvaluationDetails",
  components: {
    HeaderModule,
    TopSearchBox,
    FooterNav,
    FooterModule,
    PageFlow
  },
  data() {
    return {
      tableData: [
        // {
        //   OrderNumber: "105016464644696",
        //   ImgUrl: require("@/assets/pic/product.png"),
        //   productInfo: "李新建珠峰瑞祥, 2015布面油画",
        //   RateValue1: 4.0,
        //   RateValue2: 4.8,
        //   RateValue3: 4.5,
        //   Comments_imgs: [
        //     require("@/assets/pic/product.png"),
        //     require("@/assets/pic/product.png"),
        //     require("@/assets/pic/product.png"),
        //     require("@/assets/pic/product.png")
        //   ],
        //   content: "非常好！",
        //   created_at: "2019-10-12"
        // },
        // {
        //   OrderNumber: "105016464644696",
        //   ImgUrl: require("@/assets/pic/product.png"),
        //   productInfo: "李新建珠峰瑞祥, 2015布面油画",
        //   RateValue1: 4.0,
        //   RateValue2: 4.8,
        //   RateValue3: 4.5,
        //   Comments_imgs: [
        //     require("@/assets/pic/product.png"),
        //     require("@/assets/pic/product.png")
        //   ],
        //   content: "非常好！",
        //   created_at: "2019-10-12"
        // }
      ],
      RateDataArr: [
        {
          text:
            "当你有一个傻瓜时，你会很痛苦；你有 50 个傻瓜是最幸福的，吃饭、睡觉、上厕所排着队去的；你有一个聪明人时很带劲，你有 50 个聪明人实际上是最痛苦的，谁都不服谁。我在公司里的作用就象水泥，把许多优秀的人才粘合起来，使他们力气往一个地方使",
          imgs: [
            require("@/assets/pic/product.png"),
            require("@/assets/pic/product2.png")
          ],
          created_at: "2019-10-12"
        }
      ],
      colors: ["#775563", "#775563", "#775563"],
      Gid_A_Oid_common: {},

      Gid_A_Oid_spec: {}, // 用于 gid 防重
      Oid: null,
      MData: null
    };
  },
  mounted() {
    let vm = this;
    // 标题title浮动初始化
    this.$Utils.TitleInit();
    console.log(this.$route.query);
    // console.log(JSON.parse(this.$route.query.tableData));

    let temp_tableData = JSON.parse(vm.$route.query.tableData);
    console.log(temp_tableData);
    vm.MData = temp_tableData;
    let OrderId = this.$route.query.OrderId;
    console.log("~~~~!");
    console.log(OrderId);
    vm.Oid = OrderId;
    vm.users_comments();
  },
  methods: {
    // 获取订单号-逻辑不对
    Manage_tableData() {
      // 暂时没用
      let vm = this;
      vm.tableData = [];
      let count = 0;
      let length = vm.Gid_A_Oid_spec.Gid.length;
      callbackFunc(callbackFunc);
      function callbackFunc(callback) {
        if (count < length) {
          console.log(count);
          let Gid = vm.Gid_A_Oid_spec.Gid[count];
          let Oid = vm.Gid_A_Oid_spec.Oid[count];
          let content = vm.Gid_A_Oid_spec.content[count];
          let created_at = vm.Gid_A_Oid_spec.created_at[count];

          let token = vm.$Utils.getCookie("user_token");
          let newToken = token.replace('"', "").replace('"', "");

          // 先弄商品信息
          getGoodDetailsById(Gid)
            .then(function(response) {
              console.log("getGoodDetailsById  ---商品");
              console.log(response);
              // count++;
              // callback(callbackFunc);
              if (response.status == 200) {
                let data = response.data;

                let Oid = vm.Oid; //

                // 后弄订单号！
                getOrderDetailsById(newToken, Oid)
                  .then(function(response2) {
                    console.log("getOrderDetailsById --订单");
                    console.log(response2);
                    count++;
                    callback(callbackFunc);
                    if (response.status == 200) {
                      let data2 = response2.data;
                      let image = require("@/assets/pic/product.png");
                      try {
                        image =
                          global.IMGPrefix + response.data.images[0].image;
                      } catch (error) {
                        console.log(error);
                      }
                      vm.tableData.push({
                        // OrderNumber:data.OrderNumber,
                        // OrderNumber: "temp",
                        OrderNumber: data2.no,
                        // ImgUrl: require("@/assets/pic/product.png"), // api暂无图片
                        ImgUrl: image,
                        productInfo:
                          data.art +
                          "," +
                          data.title +
                          "," +
                          // data.created_at +
                          data.time +
                          "," +
                          data.quality,
                        RateValue1: 0.0, // api暂无
                        RateValue2: 0.0, // api暂无
                        RateValue3: 0.0, // api暂无
                        Comments_imgs: [
                          // temp - 搞定
                          require("@/assets/pic/product.png"),
                          require("@/assets/pic/product2.png")
                        ],
                        content: content,
                        created_at: created_at
                      });
                    }
                  })
                  .catch(function(error) {
                    console.info(error);
                  });
              }
            })
            .catch(function(error) {
              console.info(error);
            });
        } else {
          console.log("over");
        }
      }
    },
    users_comments() {
      let vm = this;
      let token = vm.$Utils.getCookie("user_token");
      let newToken = token.replace('"', "").replace('"', "");
      if (vm.$TokenJudgment(token)) {
        refresh_token(newToken)
          .then(function(response) {
            if (response.status == 200) {
              // 刷新成功
              vm.$Utils.setCookie(
                "user_token",
                JSON.stringify(response.data.access_token),
                60
              );

              let token = vm.$Utils.getCookie("user_token");
              let newToken = token.replace('"', "").replace('"', "");
              setTimeout(function() {
                // AllReplies(newToken)
                //   .then(function(response) {
                //     console.log("AllReplies");
                //     console.log(response);
                //   })
                //   .catch(function(error) {
                //     console.info(error);
                //   });

                UserReplies(newToken)
                  .then(function(response) {
                    console.log("ToReplies");
                    console.log(response);
                    if (response.status == 200) {
                      // console.log("ToReplies 有评论！");
                      let data = response.data;
                      let length = data.length;
                      vm.Gid_A_Oid_spec.Gid = [];
                      vm.Gid_A_Oid_spec.Oid = [];
                      vm.Gid_A_Oid_spec.content = [];
                      vm.Gid_A_Oid_spec.created_at = [];

                      vm.Gid_A_Oid_common.Gid = [];
                      vm.Gid_A_Oid_common.Oid = [];
                      vm.tableData = [];
                      for (let i = 0; i < length; i++) {
                        let Gid = data[i].good_id;
                        let Oid = data[i].id;

                        // if (vm.Gid_A_Oid_spec.Gid.indexOf(Gid) > -1) {
                        // do noting
                        // console.log("同一商品，重复评论！");
                        // } else {
                        // console.log("某商品，第一次评论！");
                        vm.Gid_A_Oid_spec.Gid.push(Gid);
                        vm.Gid_A_Oid_spec.Oid.push(Oid);
                        vm.Gid_A_Oid_spec.content.push(content);
                        vm.Gid_A_Oid_spec.created_at.push(created_at);
                        // }
                        // 通用
                        vm.Gid_A_Oid_common.Gid.push(Gid);
                        vm.Gid_A_Oid_common.Oid.push(Oid);
                        // ▲▲▲ 处理实际显示数据
                        let good = data[i].good; // ▲注意删库会导致good为null
                        let order = data[i].order; // ▲注意删库会导致order为null
                        let image = require("@/assets/pic/product.png");
                        let content = data[i].content;
                        let created_at = data[i].created_at;
                        try {
                          image = global.IMGPrefix + good.images[0].image;
                        } catch (error) {
                          console.log(error);
                        }
                        let Comments_imgs = [];
                        try {
                          if (
                            data[i].images != null &&
                            data[i].images != undefined
                          )
                            Comments_imgs = JSON.parse(data[i].images);
                        } catch (error) {
                          console.log(error);
                        }
                        let order_no = "-";
                        try {
                          order_no = order.no;
                        } catch (error) {
                          console.log(error);
                        }
                        let productInfo = "-";
                        try {
                          productInfo =
                            good.art +
                            "," +
                            good.title +
                            "," +
                            good.time +
                            "," +
                            good.quality;
                        } catch (error) {
                          console.log(error);
                        }

                        vm.tableData.push({
                          OrderNumber: order_no,
                          ImgUrl: image,
                          productInfo: productInfo,
                          RateValue1: 0.0, // api暂无 临时
                          RateValue2: 0.0, // api暂无
                          RateValue3: 0.0, // api暂无
                          Comments_imgs: Comments_imgs,
                          content: content,
                          created_at: created_at
                        });
                      }
                      console.log(vm.Gid_A_Oid_spec);
                      console.log(vm.Gid_A_Oid_common);
                      try {
                        // 根据 Gid_A_Oid_spec处理 tableData by Gid
                        // vm.Manage_tableData();// 暂时不需要
                      } catch (error) {
                        console.log(error);
                      }
                      // data: Array(4)
                      //     0: {id: 1, good_id: 12, user_id: 1, content: "很好", created_at: "2020-03-11 00:46:56", …}
                      //     1: {id: 2, good_id: 12, user_id: 1, content: "good", created_at: "2020-03-11 00:47:38", …}
                      //     2: {id: 3, good_id: 12, user_id: 1, content: "hao!", created_at: "2020-03-11 00:48:42", …}
                      //     3: {id: 4, good_id: 11, user_id: 1, content: "快递迅捷！", created_at: "2020-03-11 01:04:50", …}
                    }
                  })
                  .catch(function(error) {
                    console.info(error);
                  });
              }, 500);
            }
          })
          .catch(function(error) {
            console.info(error);
          });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
<style>
/* **** 表格 table */
.EvaluationDetails .el-table td {
  text-align: center;
}
/* ***** 评分Rate */
.EvaluationDetails .el-rate {
  height: 24px;
  line-height: 24px;
  border-bottom: 1px solid #f3f3f3;
}
.EvaluationDetails .el-rate__text {
  font-size: 18px;
}
.EvaluationDetails .el-rate__icon {
  font-size: 24px;
}
</style>
<style scoped>
.EvaluationDetails {
}
.EvaluationDetails .sTitle {
  width: 72px;
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(17, 26, 52, 1);
  line-height: 25px;
  margin-bottom: 16px;
}

/* ***** 表格 */
.EvaluationDetails .Shopping_img_p {
  margin: 20px 16px 20px 0;
}
.EvaluationDetails .Shopping_img_p2 {
  margin: 16px;
}
.EvaluationDetails .Shopping_img {
  width: 80px;
  height: 80px;
}
.EvaluationDetails .product_text {
  margin-top: 14%;
  width: 155px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(17, 26, 52, 1);
  line-height: 20px;
  text-align: justify;
}
/* ***** 评论详细 */
.EvaluationDetails .commentsDetails {
  background: rgba(249, 249, 249, 1);
}

.EvaluationDetails .rd_text {
  margin-top: 16px;
  margin-bottom: 16px;
  width: 1136px;
  height: 64px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(90, 97, 107, 1);
  line-height: 32px;
  letter-spacing: 1px;
  text-align: justify;
}
.EvaluationDetails .rd_imgs {
  margin-bottom: 18px;
}
.EvaluationDetails .perRateDataImg {
}
.EvaluationDetails .rate_img {
  width: 80px;
  height: 80px;
  margin-right: 16px;
}
.EvaluationDetails .rd_date {
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(197, 202, 213, 1);
  line-height: 17px;
  letter-spacing: 1px;
}

/* ****** 评价 评分 */
.EvaluationDetails .productGrade {
  width: 100%;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(226, 226, 226, 1);
}
.EvaluationDetails .pg_left {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(17, 26, 52, 1);
  line-height: 20px;
  margin-right: 20px;
}
</style>
