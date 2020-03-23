<template>
  <div class="OrderDetails height_auto">
    <vue-headful title="订单详情"></vue-headful>
    <el-header class="common">
      <HeaderModule id="navigation"></HeaderModule>
    </el-header>
    <el-main class="common">
      <TopSearchBox :searchType="'OrderDetails'" :categories="[]"></TopSearchBox>
      <div v-if="ifShopping != true || ifOverShopping == true" class="pc_content">
        <PageFlow :Flow1="'首页'" :Flow2="'我的订单'" :Flow3="'订单详情'"></PageFlow>
      </div>
      <div
        v-if="ifShopping == true && ifOverShopping == false"
        class="textAlignCenter_w100p steps_settings"
      >
        <el-steps :active="2" align-center>
          <el-step title="我的购物车" description></el-step>
          <el-step title="核对订单" description></el-step>
          <el-step title="提交订单" description></el-step>
        </el-steps>
      </div>

      <div class="od_content">
        <div class="sTitle1">订单详情</div>
        <div class="odcCommonFont odc_0">
          <div>订单编号：{{ OrderNumber }}</div>
          <div v-if="ifShopping != true">支付方式：{{ Payment }}</div>
          <div v-if="ifShopping == true && ifOverShopping == true">支付方式：微信支付</div>
          <div>
            交易状态：
            <span
              v-if="ifShopping == true && ifOverShopping == false"
              class="m_TransactionStatus1"
            >待付款</span>
            <!-- <span v-if="ifOverShopping == true" class="m_TransactionStatus2">已完成</span> -->
            <!-- 后面为了区分 购买页面过来 和 个人中心过来 -->
            <span
              v-if="
                ifShopping == true &&
                  ifOverShopping == true &&
                  TransactionStatus != '待收货'
              "
              class="m_TransactionStatus3"
            >待收货</span>
            <span
              v-if="
                TransactionStatus == '待付款' &&
                  ifShopping != true &&
                  ifOverShopping == false
              "
              class="m_TransactionStatus1"
            >{{ TransactionStatus }}</span>
            <!-- <span
              v-if="TransactionStatus == '待付款'"
              class="m_TransactionStatus1"
            >{{TransactionStatus}}</span>-->
            <span
              v-if="TransactionStatus == '已完成'"
              class="m_TransactionStatus2"
            >{{ TransactionStatus }}</span>
            <span
              v-if="TransactionStatus == '待收货'"
              class="m_TransactionStatus3"
            >{{ TransactionStatus }}</span>
            <span
              v-if="TransactionStatus == '已取消'"
              class="m_TransactionStatus4"
            >{{ TransactionStatus }}</span>
            <span
              v-if="TransactionStatus == '待评价'"
              class="m_TransactionStatus5"
            >{{ TransactionStatus }}</span>
            <span
              v-if="
                TransactionStatus == '-' &&
                  ifShopping != true &&
                  ifOverShopping == false
              "
            >{{ TransactionStatus }}</span>
          </div>
          <div>买家留言：{{ OrderRemark }}</div>
        </div>
        <div class="sTitle1">收货人信息</div>
        <div class="odcCommonFont odc_0">
          <div>收货人：{{ receiver }}</div>
          <div>收货地址：{{ shippingAddress }}</div>
          <div>联系方式：{{ phone }}</div>
        </div>
        <div class="sTitle1 sTitle2">商品清单</div>
        <div class="odc_0">
          <div class="ms_table">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column header-align="center" label="商品" width="400">
                <template slot-scope="scope">
                  <div class="inlineBlock_verTopP">
                    <div class="Shopping_img_p">
                      <img class="Shopping_img" :src="scope.row.ImgUrl" alt />
                    </div>
                    <div class="product_text">{{ scope.row.productInfo }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="单价" width="250">
                <template slot-scope="scope">
                  <div>
                    <div class="m_unitPriceHistory">￥{{ scope.row.unitPriceHistory }}</div>
                    <div class="m_unitPrice">￥{{ scope.row.unitPrice }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="数量" width="250">
                <template slot-scope="scope">
                  <div>{{ scope.row.count }}</div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="总价" width="250">
                <template slot-scope="scope">
                  <div>￥{{ scope.row.totalPrices }}</div>
                  <!-- <div>{{ Number(freight) +  Number(unitPrice)  }}</div> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>

      <div class="shopping_over">
        <div class="soa1">
          <span>运费：</span>
          <span class="soa2">￥</span>
          <span class="soa3">{{ Number(freight) }}</span>
        </div>
        <div class="soa1 sob1">
          <span>应付总金额（含运费）：</span>
          <span class="soa2">￥</span>
          <span class="soa3">{{ Number(freight) + Number(totalValue) }}</span>
        </div>
        <!-- <div v-if="ifShopping !=  true &&  ifOverShopping == false" class> -->
        <!-- <div
          v-if="ifShopping !=  true &&  ifOverShopping == false && TransactionStatus =='待评价'"
          class
        >
          <button class="m_btn1 m_btn1b" @click="CustomerServiceManage('none')">售后</button>
          <button @click="MakeComments()" class="m_btn1 m_btn2 m_btn1b m_btn2b">评价</button>
        </div>-->
        <div v-if="TransactionStatus == '待评价'" class>
          <button class="m_btn1 m_btn1b" @click="CustomerServiceManage('none')">售后</button>
          <button @click="MakeComments()" class="m_btn1 m_btn2 m_btn1b m_btn2b">评价</button>
        </div>
        <div v-if="TransactionStatus == '待收货'" class>
          <button @click="ConfirmReceipt()" class="m_btn1 m_btn2 m_btn1b m_btn2b">确认收货</button>
        </div>
        <div v-if="TransactionStatus == '已完成'" class>
          <button @click="EvaluationDetails()" class="m_btn1 m_btn2 m_btn1b m_btn2b">我的评论</button>
        </div>
      </div>

      <div class v-if="ifShopping == true && ifOverShopping == false">
        <div class="ms_title TextAlignRight">选择支付方式</div>
        <!-- <div style="height:32px;"></div> -->
        <div class="payfor_btns TextAlignRight">
          <button class="inlineBlock_verTopP m_btn1 m_btnb" @click="PayFor('wechat')">
            <div class="WXImgUrl_p">
              <img class="WXImgUrl" :src="WXImgUrl" alt />
            </div>
            <div class="wx_text">微信支付</div>
          </button>
          <button class="inlineBlock_verTopP m_btn1 m_btnb m_btnb2" @click="PayFor('Alipay')">
            <div class="WXImgUrl_p">
              <img class="WXImgUrl" :src="ZFBImgUrl" alt />
            </div>
            <div class="wx_text">支付宝支付</div>
          </button>
          <!-- <button class="m_btn1" @click="PayFor('wechat')">在线支付</button> -->
          <!-- <button class="m_btn1 m_btn2" @click="PayFor('offline')">货到付款</button> -->
        </div>
      </div>
    </el-main>
    <!-- 二维码弹窗 -->
    <div v-show="DialogQRCode == true" class="DialogQRCode">
      <div class="DialogQRCode_bg">
        <h3>扫描二维码进行支付</h3>
        <img v-show="payForType == 'wechat'" class="img_Dialog" :src="img_Dialog" alt />
        <!-- <div v-show="payForType == 'Alipay'" class="AlipayHtml" v-html="AliPayHtml"></div> -->
        <el-button class="closeBtn" @click="CancelPayFor()">关闭({{ shoppingCount }}s)</el-button>
      </div>
    </div>

    <!-- <button @click="ifOverShoppingManage(1)">测试1</button> -->
    <!-- <button @click="ifOverShoppingManage(2)">测试2</button> -->
    <!-- <button @click="ifOverShoppingManage(3)">测试3</button> -->

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
import Vue from "vue";
import {
  refresh_token,
  payment_wechat,
  payment_alipay,
  //  WechatNotify
  SingleOrderStatus,
  patchReceipt,
  patchReplied,
  patchCancel
} from "@/api/api";

export default {
  name: "OrderDetails",
  components: {
    HeaderModule,
    TopSearchBox,
    FooterNav,
    FooterModule,
    PageFlow
  },
  data() {
    return {
      ifShopping: false, // false - 用户中心-查看订单详情    true - 结算使的订单
      OrderNumber: "-",
      // ImgUrl: "-",
      Payment: "-",
      freight: "",
      TransactionStatus: "-",
      OrderRemark: "-", // OrderRemark
      receiver: "-",
      shippingAddress: "-",
      phone: "-",
      totalValue: "-",
      tableData: [
        {
          ImgUrl: require("@/assets/pic/product.png"),
          productInfo: "-",
          unitPriceHistory: "-",
          unitPrice: "-",
          count: "-",
          totalPrices: "-"
        }
      ],
      OrderId: null,
      img_Dialog: require("@/assets/pic/product.png"),
      DialogQRCode: false,
      ifSuccess: false,
      WXImgUrl: require("@/assets/pic/wxpic.png"),
      ZFBImgUrl: require("@/assets/pic/zfbpic.png"),
      ifOverShopping: false, // 用于支付后改变当前页面显示状态
      initCountDown: 120, // 倒计时-支付时间
      shoppingCount: 0,
      payForType: "wechat", // wechat    Alipay
      AliPayHtml: ""
    };
  },
  mounted() {
    let vm = this;
    // 标题title浮动初始化
    this.$Utils.TitleInit();
    console.log("mounted");

    // ▲▲▲▲▲跳转到订单详情页统一设置token刷新判断，以防后面一系列token问题
    let token = vm.$Utils.getCookie("user_token");
    let newToken = token.replace('"', "").replace('"', "");
    if (vm.$TokenJudgment(token)) {
      refresh_token(newToken)
        .then(function(response) {
          console.log("~~~~~rr");
          vm.$Utils.setCookie(
            "user_token",
            JSON.stringify(response.data.access_token),
            60
          );

          let token = vm.$Utils.getCookie("user_token");
          let newToken = token.replace('"', "").replace('"', "");

          setTimeout(function() {
            let temp_ifShopping = vm.$route.query.ifShopping;
            if (temp_ifShopping != undefined && temp_ifShopping != null) {
              // 从结算页过来 ifShopping - true
              // vm.ifShopping = temp_ifShopping;

              console.log("~~~1");
              let queryData = vm.$route.query;
              console.log(queryData);
              if (temp_ifShopping == "true" || temp_ifShopping == true) {
                vm.ifShopping = true;
                vm.ifOverShopping = false; // 初始化-是否购买完成
                console.log("~~~2");
                vm.TransactionStatus = queryData.TransactionStatus;
                vm.OrderId = queryData.OrderId;
                vm.OrderNumber = queryData.OrderNumber;
                vm.OrderRemark = queryData.OrderRemark;
                vm.receiver = queryData.receiver;
                vm.shippingAddress = queryData.shippingAddress;
                vm.phone = queryData.phone;
                vm.totalValue = queryData.totalValue;
                vm.freight = queryData.freight;
                let temp_tableData = JSON.parse(queryData.tableData);
                let tableData_length = temp_tableData.length;
                vm.tableData = [];
                for (let i = 0; i < tableData_length; i++) {
                  vm.tableData.push(temp_tableData[i]);
                }

                console.log("~~~3");
              }
            } else {
              // 从用户中心 ifShopping 不设置
              if (
                vm.$route.query.OrderNumber != undefined &&
                vm.$route.query.OrderNumber != null
              ) {
                let temp_tableData = JSON.parse(vm.$route.query.tableData);

                console.log("~~~a");
                console.log("temp_tableData");
                console.log(temp_tableData);
                vm.OrderId = temp_tableData.OrderId;
                vm.OrderNumber = temp_tableData.OrderNumber;
                vm.Payment = temp_tableData.Payment;
                vm.freight = temp_tableData.freight;
                vm.TransactionStatus = temp_tableData.TransactionStatus;
                vm.OrderRemark = temp_tableData.OrderRemark; // 订单备注
                vm.receiver = temp_tableData.receiver;
                vm.shippingAddress = temp_tableData.shippingAddress;
                vm.phone = temp_tableData.phone;
                // vm.totalValue = vm.$route.query.totalValue;
                vm.totalValue = temp_tableData.total_amount;

                // // ▲ 代付款 => 可支付
                vm.ifShopping = false;
                if (vm.TransactionStatus == "待付款") {
                  vm.ifShopping = true;
                }

                console.log(vm.TransactionStatus);
                console.log(vm.ifShopping);
                console.log(vm.ifOverShopping);

                // // 商品数据Table Arr
                let GoodsArr = temp_tableData.GoodsArr;
                let Glength = GoodsArr.length;
                vm.tableData = []; // 初始化商品数据
                for (let i = 0; i < Glength; i++) {
                  let good = GoodsArr[i].good;
                  let goodFirstImg = require("@/assets/pic/product.png"); //无图处理
                  try {
                    goodFirstImg = global.IMGPrefix + good.images[0].image;
                  } catch (error) {
                    console.log(error);
                  }
                  let productInfo =
                    good.art +
                    "," +
                    good.title +
                    "," +
                    // good.created_at +
                    good.time +
                    "," +
                    good.quality;
                  let obj = {};
                  obj.ImgUrl = goodFirstImg;
                  obj.productInfo = productInfo;
                  obj.unitPriceHistory = good.price;
                  obj.unitPrice = good.price * good.discount;
                  obj.count = GoodsArr[i].amount; // 购买数量：amount
                  // obj.totalPrices = GoodsArr[i].ProductPrice;
                  // obj.totalPrices = GoodsArr[i].amount * good.price; // 订单中 某商品 总价
                  obj.totalPrices = GoodsArr[i].amount * good.price * good.discount; // 订单中 某商品 总价

                  Vue.set(vm.tableData, i, obj);
                }

                // ******历史
                // vm.OrderNumber = vm.$route.query.OrderNumber;
                // vm.Payment = vm.$route.query.Payment;
                // vm.freight = vm.$route.query.freight;
                // vm.TransactionStatus = vm.$route.query.TransactionStatus;
                // vm.OrderRemark = vm.$route.query.OrderRemark;
                // vm.receiver = vm.$route.query.receiver;
                // vm.shippingAddress = vm.$route.query.shippingAddress;
                // vm.phone = vm.$route.query.phone;
                // vm.totalValue = vm.$route.query.totalValue;
                // // 商品数据Table Arr
                // let obj = {};
                // obj.ImgUrl = vm.$route.query.ImgUrl;
                // obj.productInfo = vm.$route.query.productInfo;
                // obj.unitPriceHistory = vm.$route.query.unitPriceHistory;
                // obj.unitPrice = vm.$route.query.unitPrice;
                // obj.count = vm.$route.query.count;
                // obj.totalPrices = vm.$route.query.ProductPrice;
                // Vue.set(vm.tableData, 0, obj);
              } else {
                console.log("未设置");
              }
            }

            // ****** 支付完成后-防止刷新操作=》使状态不变
            //  （其他：main.js中 delCookieCry删指定cookies）
            let tem_ifOverShopping = vm.$Utils.getCookieCry("ifOverShopping");
            let tem_MOrderId = vm.$Utils.getCookieCry("MOrderId");
            console.log(tem_ifOverShopping);
            console.log(tem_MOrderId);
            if (tem_ifOverShopping == "true") {
              // cookies
              if (Number(tem_MOrderId) == Number(vm.OrderId)) {
                vm.ifOverShopping = true;
                vm.TransactionStatus = "待收货";
                vm.ifShopping = true;
              }
            }
          }, 500);
          // ******
        })
        .catch(function(error) {
          console.info(error);
        });
    }
  },
  // 清除定时器！
  beforeDestroy() {
    clearInterval(this.pf_timer);
    this.pf_timer = null;
  },
  methods: {
    CancelPayFor() {
      let vm = this;
      this.$message("取消支付。");
      vm.shoppingCount = -1; // 直接使return  -- 0会有提示
      vm.DialogQRCode = false;
    },
    EvaluationDetails() {
      let vm = this;
      let tableData = vm.$route.query.tableData;
      vm.$router.push({
        path: "/evaluationdetails",
        query: {
          OrderId: vm.OrderId,
          OrderNumber: vm.OrderNumber,
          // tableData: JSON.stringify(tableData)
          tableData: tableData
        }
      });
    },
    router_toSpec(str, activeName) {
      let vm = this;
      vm.$router.push({
        path: str,
        query: {
          activeName: activeName
        }
      });
    },
    // 确认收货
    ConfirmReceipt() {
      let vm = this;
      let token = vm.$Utils.getCookie("user_token");
      let newToken = token.replace('"', "").replace('"', "");
      if (vm.$TokenJudgment(token)) {
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
              no: vm.OrderNumber
            };
            let id = vm.OrderId;
            patchReceipt(newToken, temp, id)
              .then(function(response) {
                console.log(response);
                vm.$message("确认收货成功!");
                setTimeout(function() {
                  vm.router_toSpec("/personalcenter", "2");
                }, 500);
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
    ifOverShoppingManage(type) {
      let vm = this;
      if (type == 1) {
        this.ifOverShopping = true;
        this.$Utils.setCookieCry("ifOverShopping", "true", 1);
      }
      if (type == 2) {
        this.ifOverShopping = false;
        this.$Utils.delCookieCry("ifOverShopping");
      }
      if (type == 3) {
        // this.ifOverShopping = true;
        // this.$Utils.setCookieCry("ifOverShopping", "true", 1);
        vm.TransactionStatus = "待收货";
      }
    },
    MakeComments() {
      let vm = this;
      vm.$router.push({
        path: "/makecomments",
        query: {
          tableData: vm.$route.query.tableData // 直接传原  JSON.stringify
        }
      });
    },
    CustomerServiceManage(CSType) {
      let vm = this;
      if (CSType == "none") {
        this.$message("功能开发中，敬请期待。");
        return;
      }
    },
    PayFor(PFType) {
      let vm = this;
      if (PFType == "none") {
        this.$message("功能开发中，敬请期待。");
        return;
      }
      // if (PFType == "Alipay") {
      //   this.$message("支付宝支付");
      //   return;
      // }
      if (PFType == "wechat" || PFType == "Alipay") {
        let token = vm.$Utils.getCookie("user_token");
        let newToken = token.replace('"', "").replace('"', "");
        if (vm.$TokenJudgment(token)) {
          refresh_token(newToken)
            .then(function(response) {
              if (response.status == 200) {
                vm.$Utils.setCookie(
                  "user_token",
                  JSON.stringify(response.data.access_token),
                  60
                );
                setTimeout(function() {
                  let token = vm.$Utils.getCookie("user_token");
                  let newToken = token.replace('"', "").replace('"', "");
                  let OrderId = vm.OrderId;
                  // var formData = new FormData();
                  // var formData = new window.FormData();
                  // formData.append("type", "wechat");
                  // payment(newToken, OrderId, formData)

                  if (PFType == "wechat") {
                    payment_wechat(newToken, OrderId)
                      .then(function(response) {
                        console.log("payment_wechat");
                        console.log(response);
                        // data:
                        //   appid: "wx6bc424019aa5f8ca"
                        //   code_url: "weixin://wxpay/bizpayurl?pr=bLbJQhC"
                        //   mch_id: "1432605102"
                        //   nonce_str: "Pl90QDzaAhK0rZQ4"
                        //   prepay_id: "wx10163911406445cf930960241729604000"
                        //   result_code: "SUCCESS"
                        //   return_code: "SUCCESS"
                        //   return_msg: "OK"
                        //   sign: "3ACB7A4500E324CC4C5295D7827B2A50"
                        //   trade_type: "NATIVE"

                        if (response.status == 200) {
                          vm.$message("请扫码二维码进行支付");
                          setTimeout(function() {
                            // 弹出二维码
                            vm.img_Dialog = response.data;
                            vm.payForType = "wechat";
                            vm.DialogQRCode = true;
                            // 开启二维码扫描情况监听
                            vm.watch_QrCodeScanning("wechat"); // 监听二维码扫描
                          }, 1000);
                        }
                      })
                      .catch(function(error) {
                        console.info(error);
                        // vm.$message("支付失败，请重试！");
                      });
                  } else if (PFType == "Alipay") {
                    payment_alipay(newToken, OrderId)
                      .then(function(response) {
                        console.log("payment_alipay");
                        console.log(response);
                        if (response.status == 200) {
                          // vm.$message("请扫码二维码进行支付");
                          setTimeout(function() {
                            // 弹出二维码
                            // vm.img_Dialog = response.data;
                            vm.AliPayHtml = response.data;
                            // vm.payForType = "Alipay";
                            // vm.DialogQRCode = true;
                            // 开启二维码扫描情况监听
                            // vm.watch_QrCodeScanning("Alipay"); // 监听二维码扫描
                            //支付宝支付

                            // 方法1 - vue
                            let routerData = vm.$router.push({
                              path: "/financeapplytext",
                              query: { htmls: vm.AliPayHtml }
                            });

                            // 方法3 - vue+中间页面！？   --问题：双页面
                            // let routerData = vm.$router.resolve({
                            //   path: "/financeapplytext",
                            //   query: { htmls: vm.AliPayHtml }
                            // });
                            // window.open(routerData.href, "_blank");
                            // const div = document.createElement("div");
                            // div.innerHTML = vm.AliPayHtml;
                            // document.body.appendChild(div);
                            // document.forms[0].submit();

                            // 方法3 - 快速页面
                            // vm.$("body").append(response.data);
                            // vm.$("form").attr("target", "_blank");

                            // 方法4 - 快速页面
                            // let routerData = vm.$router.resolve({
                            //   path: "/financeapplytext",
                            //   query: { htmls: vm.AliPayHtml }
                            // });
                            // const newTab = window.open(
                            //   routerData.href,
                            //   "_blank"
                            // );
                            // const div = document.createElement("div");
                            // div.innerHTML = response.data; // html code
                            // newTab.document.body.appendChild(div);
                            // newTab.document.forms.alipaysubmit.submit();
                          }, 1000);
                        }
                      })
                      .catch(function(error) {
                        console.info(error);
                        vm.$message("支付失败，请重试！");
                      });
                  }
                }, 500);
              }
            })
            .catch(function(error) {
              console.info(error);
            });
        }
      }
      if (PFType == "offline") {
        vm.$message("开发中！敬请期待！");
      }
    },
    router_to(str) {
      let vm = this;
      vm.$router.push({ path: str });
    },
    watch_QrCodeScanning(mPayForType) {
      let vm = this;
      console.log("~~~~1");
      vm.shoppingCount = vm.initCountDown;
      if (mPayForType == "wechat") {
        this.$nextTick(function() {
          setInterval(this.pf_timer, 1000);
        });
      }
    },
    pf_timer() {
      let vm = this;
      // console.log("~~~~2");
      // WechatNotify()
      //   .then(function(response) {
      //     console.log("WechatNotify");
      //     console.log(response);
      //   })
      //   .catch(function(error) {
      //     console.info(error);
      //   });
      vm.shoppingCount--;
      if (vm.shoppingCount == 0) {
        vm.$message("支付超时，请稍后尝试！");
        vm.DialogQRCode = false;
        clearInterval(vm.pf_timer);
        vm.pf_timer = null;
        return;
      }
      if (vm.shoppingCount <= 0) {
        return;
      }

      if (vm.ifSuccess != true) {
        let token = vm.$Utils.getCookie("user_token");
        let newToken = token.replace('"', "").replace('"', "");
        let id = vm.OrderId;
        SingleOrderStatus(newToken, id)
          .then(function(response) {
            console.log("SingleOrderStatus");
            console.log(response);
            if (response.status == 200) {
              if (response.data[0] == "订单未支付") {
                // Do Nothing.
                console.log("订单未支付");
              } else if (
                response.data[0] == "订单已支付" ||
                response.data[1] == "订单已支付"
              ) {
                clearInterval(vm.pf_timer);
                vm.pf_timer = null;
                // 过几秒跳转！
                vm.DialogQRCode = false;
                // vm.$message("支付成功，即将为您跳转首页！");
                vm.$message("支付成功！");
                vm.shoppingCount = -1; // ▲防止支付完成关闭后-提示"支付超时"
                vm.ifSuccess = true;
                setTimeout(function() {
                  // vm.router_to("/");
                  // vm.$router.push({
                  //   path: "/orderdetails",
                  //   query: {
                  //     tableData: JSON.stringify(row),
                  //     OrderNumber: row.OrderNumber
                  //   }
                  // });

                  vm.ifOverShopping = true;
                  vm.$Utils.setCookieCry("ifOverShopping", "true", 1);
                  vm.$Utils.setCookieCry("MOrderId", String(vm.OrderId), 1);
                  let tem_ifOverShopping = vm.$Utils.getCookieCry(
                    "ifOverShopping"
                  );
                  let tem_MOrderId = vm.$Utils.getCookieCry("MOrderId");
                  console.log(tem_ifOverShopping);
                  console.log(tem_MOrderId);
                  // 状态改成 "待收货"
                  vm.TransactionStatus = "待收货";
                  // 回到订单页
                  vm.router_toSpec("/personalcenter", "2");
                }, 2000);
              }
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
.OrderDetails .el-table td {
  text-align: center;
}
/* ***** 进度条 */
.OrderDetails .el-step__head.is-finish {
  color: #775563;
  border-color: #775563;
}
.OrderDetails .el-step__title.is-finish {
  color: #775563;
}
</style>

<style scoped>
.OrderDetails {
}
.OrderDetails .sTitle1 {
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(17, 26, 52, 1);
  line-height: 25px;
  margin-bottom: 32px;
}
.OrderDetails .sTitle2 {
  margin-bottom: 16px;
}
.OrderDetails .odc_0 {
  padding-left: 16px;
  padding-bottom: 16px;
  margin-bottom: 32px;
  border-bottom: 1px solid #e2e2e2;
}

.OrderDetails .odcCommonFont > div {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(65, 72, 93, 1);
  line-height: 20px;
  margin-bottom: 16px;
}

.OrderDetails .m_TransactionStatus1 {
  color: #ff4e18 !important;
}
.OrderDetails .m_TransactionStatus2 {
  color: #45b0ff !important;
}
.OrderDetails .m_TransactionStatus3 {
  color: #72e594 !important;
}
.OrderDetails .m_TransactionStatus4 {
  color: #41485d !important;
}
.OrderDetails .m_TransactionStatus5 {
  color: #faad93 !important;
}
/* ***** 表格 */
.OrderDetails .Shopping_img_p {
  margin: 20px 16px 20px 0;
}

.OrderDetails .Shopping_img {
  width: 80px;
  height: 80px;
}
.OrderDetails .product_text {
  margin-top: 14%;
  width: 155px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(17, 26, 52, 1);
  line-height: 20px;
  text-align: justify;
}
.OrderDetails .m_unitPriceHistory {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(197, 202, 213, 1);
  line-height: 20px;
  text-decoration: line-through;
  margin-bottom: 3px;
}
.OrderDetails .m_unitPrice {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(17, 26, 52, 1);
  line-height: 20px;
}
.OrderDetails .m_operation:hover {
  color: #ff260a;
  text-decoration: underline;
  cursor: pointer;
}
.OrderDetails {
}
.OrderDetails .money_top {
  margin-bottom: 8px;
}
.OrderDetails .money_left {
  width: 80px;
  text-align: right;
}
.OrderDetails .money_right {
  width: 80px;
  text-align: left;
}
.OrderDetails .m_TransactionStatus:hover {
  /* text-decoration: underline; */
  /* cursor: pointer; */
}
.OrderDetails .m_TransactionStatus1 {
  color: #ff4e18;
}
.OrderDetails .m_TransactionStatus2 {
  color: #45b0ff;
}
.OrderDetails .m_TransactionStatus3 {
  color: #72e594;
}
.OrderDetails .m_TransactionStatus4 {
  color: #41485d;
}
.OrderDetails .m_TransactionStatus5 {
  color: #faad93;
}
.OrderDetails .operationColor0:hover {
  text-decoration: underline;
  cursor: pointer;
}
.OrderDetails .operationColor1 {
  color: #775563;
  margin-bottom: 16px;
}
.OrderDetails .operationColor2 {
  color: #99c2c7;
}
/* **** 表格补充 */
.OrderDetails .money_top {
  margin-bottom: 8px;
}
.OrderDetails .money_left {
  width: 80px;
  text-align: right;
}
.OrderDetails .money_right {
  width: 80px;
  text-align: left;
}

/* **** 购物over */
.OrderDetails .shopping_over {
  text-align: right;
}
.OrderDetails .soa1 {
  height: 25px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(65, 72, 93, 1);
  line-height: 20px;
  margin-bottom: 2px;
}
.OrderDetails .sob1 {
  margin-bottom: 32px;
}
.OrderDetails .soa2 {
  color: #775563;
}
.OrderDetails .soa3 {
  font-size: 18px;
  color: #775563;
}
.OrderDetails .m_btn1 {
  width: 180px;
  height: 40px;
  border: 0;
  border-radius: 6px;
  border: 1px solid rgba(119, 85, 99, 1);

  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(119, 85, 99, 1);
}
.OrderDetails .m_btnb {
  color: #ffff;
  background-color: #539820;
  border: 1px solid #539820;
}
.OrderDetails .m_btnb2 {
  color: #ffff;
  background-color: #00aaef;
  border: 1px solid #00aaef;
  margin-left: 16px;
}
.OrderDetails .m_btn1b {
  width: 120px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid rgba(119, 85, 99, 1);

  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(119, 85, 99, 1);
  background: rgba(255, 255, 255, 1);
}
.OrderDetails .m_btn2 {
  background: rgba(119, 85, 99, 1);
  color: rgba(255, 255, 255, 1);
  margin-left: 56px;
}

.OrderDetails .m_btn2b {
  margin-left: 32px;
}
/* **** 支付方式  */
.OrderDetails .ms_title {
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(17, 26, 52, 1);
  line-height: 25px;
  margin-bottom: 12px;
  text-align: right;
}
.OrderDetails .payfor_btns {
  margin-bottom: 56px;
  line-height: 40px;
}

/* *****二维码弹窗 */

.OrderDetails .DialogQRCode {
  top: 0;
  padding-top: 200px;
  position: fixed;
  text-align: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1000;
}
.OrderDetails .DialogQRCode_bg {
  height: 300px;
  width: 200px;
  text-align: center;
  padding: 64px 100px;
  background-color: #ffffff;
  margin: 0 auto;
  border-radius: 10px;
}
.OrderDetails .img_Dialog {
  height: 200px;
  width: 200px;
}
.OrderDetails .closeBtn {
  margin-top: 16px;
}

/* *** 微信按钮 */
.OrderDetails .WXImgUrl_p {
  height: 30px;
  line-height: 30px;
  margin-top: 4px;
  margin-right: 15px;
}
.OrderDetails .WXImgUrl {
  height: 30px;
  width: 30px;
}
.OrderDetails .wx_text {
  line-height: 38px;
}
.OrderDetails .CustomerService_bg {
  position: fixed;
  right: 0;
  top: 45vh;
}
.OrderDetails .CustomerService {
  width: 20px;
  margin: 0 auto;
  padding: 16px;
  line-height: 24px;
  font-size: 20px;
  background-color: #775563;
  color: #fff;
  border-radius: 10px;
}
.OrderDetails .CustomerService:hover {
  cursor: pointer;
  opacity: 0.9;
}
.OrderDetails .AlipayHtml {
  height: 1000px;
  width: 1000px;
}
</style>
