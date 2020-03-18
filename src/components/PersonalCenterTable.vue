<template>
  <div class="PersonalCenterTable">
    <div class="ms_table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column header-align="center" label="订单号" width="150">
          <template slot-scope="scope">
            <div>{{ scope.row.OrderNumber }}</div>
          </template>
        </el-table-column>
        <el-table-column header-align="center" label="商品" width="300">
          <!-- <template slot-scope="scope">
            <div class="inlineBlock_verTopP">
              <div class="Shopping_img_p">
                <img class="Shopping_img" :src="scope.row.ImgUrl " alt />
              </div>
              <div class="product_text">{{ scope.row.productInfo }}</div>
            </div>
          </template>-->
          <!-- Arr化 -->
          <template slot-scope="scope">
            <template v-for="(item,index) in scope.row.ImgUrl ">
              <div
                class="inlineBlock_verTopP orderPerProduct"
                @click="orderPerProduct(scope.row.good_id[index])"
                :key=" index + 'iu' "
              >
                <div class="Shopping_img_p">
                  <img class="Shopping_img" :src="scope.row.ImgUrl[index]" alt />
                </div>
                <!-- <div class="product_text">
                  {{ scope.row.productInfo[index] }}
                  (原价：{{ scope.row.unitPriceHistory[index] }}/
                  现价：{{ scope.row.unitPrice[index] }}/
                  购买数量：{{ scope.row.count[index] }})
                </div>-->
                <div class="product_text">
                  {{ scope.row.productInfo[index] }}
                  <br />
                  ({{ scope.row.unitPrice[index] }} x{{ scope.row.count[index] }}，￥{{ scope.row.totalValue[index] }})
                </div>
              </div>
            </template>
          </template>
        </el-table-column>
        <el-table-column header-align="center" label="支付方式" width="120">
          <template slot-scope="scope">
            <div>{{ scope.row.Payment }}</div>
          </template>
        </el-table-column>
        <el-table-column header-align="center" label="金额" width="200">
          <template slot-scope="scope">
            <div>
              <div class="inlineBlock_verTopP money_top">
                <div class="money_left">订单金额：</div>
                <!-- 注意！是所有产品的总金额！ -->
                <div class="money_right m_AmountOfProduct">￥{{ scope.row.total_amount }}</div>
              </div>
              <div class="inlineBlock_verTopP">
                <div class="money_left">运费：</div>
                <div class="money_right m_FreightCharge">￥{{ scope.row.freight }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column header-align="center" label="交易状态" width="120">
          <template slot-scope="scope">
            <div
              v-show="scope.row.TransactionStatus == '待付款'"
              class="m_TransactionStatus m_TransactionStatus1"
            >{{ scope.row.TransactionStatus }}</div>
            <div
              v-show="scope.row.TransactionStatus == '已完成'"
              class="m_TransactionStatus m_TransactionStatus2"
            >{{ scope.row.TransactionStatus }}</div>
            <div
              v-show="scope.row.TransactionStatus == '待收货'"
              class="m_TransactionStatus m_TransactionStatus3"
            >{{ scope.row.TransactionStatus }}</div>
            <div
              v-show="scope.row.TransactionStatus == '已取消'"
              class="m_TransactionStatus m_TransactionStatus4"
            >{{ scope.row.TransactionStatus }}</div>
            <div
              v-show="scope.row.TransactionStatus == '待评价'"
              class="m_TransactionStatus m_TransactionStatus5"
            >{{ scope.row.TransactionStatus }}</div>
            <div
              v-show="scope.row.TransactionStatus == '状态异常'"
              class="m_TransactionStatus m_TransactionStatus6"
            >{{ scope.row.TransactionStatus }}</div>
            <div
              v-show="scope.row.TransactionStatus == '已关闭'"
              class="m_TransactionStatus m_TransactionStatus4"
            >{{ scope.row.TransactionStatus }}</div>
          </template>
        </el-table-column>

        <el-table-column header-align="center" label="操作" width="120">
          <template slot-scope="scope">
            <div v-show="scope.row.TransactionStatus =='已关闭'"></div>
            <div v-show="scope.row.TransactionStatus !='已关闭'">
              <div
                class="operationColor0 operationColor00"
                @click="CustomerServiceManage('none')"
              >联系客服</div>
              <!-- 已完成不显示操作1 -->
              <div
                v-show="scope.row.operation1 != '查看订单'"
                @click="operationManage(scope.row,scope.row.operation1)"
                class="operationColor0 operationColor1"
              >{{ scope.row.operation1 }}</div>
              <!-- <div
              v-show="scope.row.TransactionStatus == '已完成'"
              @click="operationManage(scope.row,scope.row.operation1)"
              class="operationColor0 operationColor1 operationColor1b"
              >{{ scope.row.operation1 }}</div>-->
              <div
                @click="detailsRouter(scope.row)"
                class="operationColor0 operationColor2"
              >{{ scope.row.operation2 }}</div>
              <div
                v-show="scope.row.TransactionStatus == '待付款'"
                class="operationColor0 operationColor2 operationColor2b"
                @click="patchCancelManage(scope.row)"
              >取消订单</div>
              <div
                v-show="scope.row.TransactionStatus == '待收货'"
                class="operationColor0 operationColor2 operationColor3b"
                @click="checkTheLogistics(scope.row)"
              >查看物流</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getGoodById } from "@/api/api";

import { patchCancel, refresh_token } from "@/api/api";

export default {
  name: "PersonalCenterTable",
  props: ["tableData"],
  data() {
    return {};
  },
  mounted() {
    let vm = this;
    console.log("PersonalCenterTable");
    console.log(vm.tableData);
  },
  methods: {
    CustomerServiceManage(CSType) {
      let vm = this;
      if (CSType == "none") {
        this.$message("功能开发中，敬请期待。");
        return;
      }
    },
    checkTheLogistics(row) {
      this.$message("功能开发中，敬请期待。");
    },
    patchCancelManage(row) {
      let vm = this;
      let token = vm.$Utils.getCookie("user_token");
      let newToken = token.replace('"', "").replace('"', "");
      if (token != undefined && token != null && token != "") {
        refresh_token(newToken)
          .then(function(response) {
            vm.$Utils.setCookie(
              "user_token",
              JSON.stringify(response.data.access_token),
              60
            );
            let token = vm.$Utils.getCookie("user_token");
            let newToken = token.replace('"', "").replace('"', "");
            let temp = {
              // no: vm.OrderNumber
              no: row.OrderNumber
            };
            // let id = vm.OrderId;
            let id = row.OrderId;
            patchCancel(newToken, temp, id)
              .then(function(response) {
                vm.$message("取消订单成功!");
                // vm.$emit("func",参数)
                vm.$emit("func");
              })
              .catch(function(error) {
                console.info(error);
              });
          })
          .catch(function(error) {
            console.info(error);
          });
      }
    },
    orderPerProduct(good_id) {
      let vm = this;
      console.log("good_id");
      console.log(good_id);
      getGoodById(good_id)
        .then(function(response) {
          console.log(response);
          // ▲▲ 格式仿照 HomePage传参！
          if (response.status == 200) {
            let initObj = response.data; // data[i] =》 initObj
            let image = require("@/assets/pic/product.png");
            try {
              image = global.IMGPrefix + initObj.images[0].image;
            } catch (error) {
              console.log(error);
            }
            let images = [require("@/assets/pic/product.png")];
            try {
              images = [];
              let length = initObj.images.length;
              for (let j = 0; j < length; j++) {
                images.push(global.IMGPrefix + initObj.images[j].image);
              }
            } catch (error) {
              console.log(error);
              images = [];
              // images = [require("@/assets/pic/product.png")];
            }
            let dataObj = {};
            // dataObj = initObj;

            dataObj = {
              art: initObj.art, // 创作者  // ★★★首页数据
              category_id: initObj.category_id, // 分类id
              content: initObj.content, // 产品介绍
              // created_at: initObj.created_at, // 创建时间  // ★★★首页数据
              created_at: initObj.time, // 创作时间  => time 不是  created_at
              description: initObj.description, // 产品描述（关键字）
              discount: initObj.discount, // 折扣（最大为1）
              id: initObj.id, // 产品id  // ★★★首页数据
              on_sale: initObj.on_sale, // 是否在售 - bool
              price: initObj.price, // 单价   （折后价=单价*折扣）  // ★★★首页数据
              quality: initObj.quality, // 材质
              rating: Number(initObj.rating), // 评分等级 --组件需要为Number类型
              review_count: initObj.review_count, // 评论数
              size: initObj.size, // 尺寸
              sold_count: initObj.sold_count, // 销售数量
              stock: initObj.stock, // 库存
              style: initObj.style, // 风格
              time: initObj.time, // 创作时间
              title: initObj.title, // 产品名称   // ★★★首页数据
              type: initObj.type, // 作品类型
              theme: initObj.theme, // 题材
              updated_at: initObj.updated_at, // 更新时间
              // ImgUrl: require("@/assets/pic/product.png") // 产品图（需要Arr）// ★★★首页数据
              ImgUrl: image, // 产品图（需要Arr）// ★★★首页数据
              ImgUrls: images
            };

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
          }
        })
        .catch(function(error) {
          console.info(error);
        });
    },
    operationManage(row, operation1) {
      let vm = this;
      console.log(operation1);
      console.log(typeof operation1);
      switch (operation1) {
        case "立即支付":
          this.$message("跳转中...");
          vm.goShopping(row);
          break;
        case "查看物流":
          // this.$message("查看物流");
          this.$message("功能开发中，敬请期待。");
          break;
        case "前往评价":
          // this.$message("前往评价");
          this.MakeComments(row);
          break;
        case "确认收货":
          // this.$message("确认收货");
          this.ConfirmReceipt(row);
          break;
        case "查看订单":
          this.$message("查看订单");
          vm.ViewOrder(row);
          break;
        default:
          console.log("***");
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleChange(value) {
      console.log(value);
    },
    MakeComments(row) {
      let vm = this;
      setTimeout(function() {
        vm.ViewOrder(row);
      }, 500);
    },
    ConfirmReceipt(row) {
      let vm = this;
      // this.$message("确认收货成功");
      setTimeout(function() {
        vm.ViewOrder(row);
      }, 100);
    },
    // 查看订单
    ViewOrder(row) {
      let temp_OrderNumber;
      temp_OrderNumber = row.OrderNumber;
      this.$router.push({
        path: "/orderdetails",
        query: {
          // tableData: JSON.stringify(vm.tableData),
          tableData: JSON.stringify(row),
          OrderNumber: temp_OrderNumber
        }
      });
    },
    // 支付
    goShopping(row) {
      this.$router.push({
        path: "/orderdetails",
        query: {
          tableData: JSON.stringify(row),
          OrderNumber: row.OrderNumber
        }
      });
    },
    detailsRouter(row) {
      let vm = this;
      console.log(row);
      if (row.TransactionStatus == "已完成") {
        vm.ViewOrder(row);
      }
      if (row.TransactionStatus == "待付款") {
        vm.goShopping(row);
      }
      if (row.TransactionStatus == "待收货") {
        vm.ViewOrder(row);
      }
      if (row.TransactionStatus == "已取消") {
        vm.ViewOrder(row);
      }
      if (row.TransactionStatus == "待评价") {
        vm.ViewOrder(row);
      }
      // this.$router.push({
      //   path: "/orderdetails",
      //   query: {
      //     OrderNumber: row.OrderNumber,
      //     ImgUrl: row.ImgUrl,
      //     productInfo: row.productInfo,
      //     Payment: row.Payment,
      //     ProductPrice: row.ProductPrice,
      //     freight: row.freight,
      //     count: row.count,
      //     TransactionStatus: row.TransactionStatus,
      //     OrderRemark: row.OrderRemark,
      //     receiver: row.receiver,
      //     shippingAddress: row.shippingAddress,
      //     phone: row.phone,
      //     unitPriceHistory: row.unitPriceHistory,
      //     unitPrice: row.unitPrice,
      //     totalValue: row.totalValue
      //   }
      // });
    }
  }
};
</script>
<style >
/* **** 表格 table */
.PersonalCenterTable .el-table td {
  text-align: center;
}
</style>

<style scoped>
.PersonalCenterTable {
}
/* ***** 表格 */
.PersonalCenterTable .Shopping_img_p {
  margin: 20px 16px 20px 0;
}

.PersonalCenterTable .Shopping_img {
  width: 80px;
  height: 80px;
}
.PersonalCenterTable .product_text {
  margin-top: 14%;
  width: 155px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(17, 26, 52, 1);
  line-height: 20px;
  text-align: justify;
}
.PersonalCenterTable .m_unitPriceHistory {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(197, 202, 213, 1);
  line-height: 20px;
  text-decoration: line-through;
  margin-bottom: 3px;
}
.PersonalCenterTable .m_unitPrice {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(17, 26, 52, 1);
  line-height: 20px;
}
.PersonalCenterTable .m_operation:hover {
  color: #ff260a;
  text-decoration: underline;
  cursor: pointer;
}
.PersonalCenterTable {
}
.PersonalCenterTable .money_top {
  margin-bottom: 8px;
}
.PersonalCenterTable .money_left {
  width: 80px;
  text-align: right;
}
.PersonalCenterTable .money_right {
  width: 80px;
  text-align: left;
}
.PersonalCenterTable .m_TransactionStatus:hover {
  /* text-decoration: underline; */
  /* cursor: pointer; */
}
.PersonalCenterTable .m_TransactionStatus1 {
  color: #ff4e18;
}
.PersonalCenterTable .m_TransactionStatus2 {
  color: #45b0ff;
}
.PersonalCenterTable .m_TransactionStatus3 {
  color: #72e594;
}
.PersonalCenterTable .m_TransactionStatus4 {
  color: #41485d;
}
.PersonalCenterTable .m_TransactionStatus5 {
  color: #faad93;
}
.PersonalCenterTable .m_TransactionStatus6 {
  color: red;
}

.PersonalCenterTable .operationColor0:hover {
  text-decoration: underline;
  cursor: pointer;
}
.PersonalCenterTable .operationColor00 {
  color: #45b0ff;
  margin-bottom: 16px;
}
.PersonalCenterTable .operationColor1 {
  color: #775563;
  margin-bottom: 16px;
}
.PersonalCenterTable .operationColor1b {
  color: #775563;
  margin-bottom: 0px;
}
.PersonalCenterTable .operationColor2 {
  color: #99c2c7;
}
.PersonalCenterTable .operationColor2b {
  margin-top: 16px;
  color: red;
}
.PersonalCenterTable .operationColor3b {
  margin-top: 16px;
  color: #faad93;
}
/* *** */
.PersonalCenterTable .orderPerProduct:hover {
  cursor: pointer;
  background-color: #d8c0c0;
  border-radius: 10px;
}
</style>

