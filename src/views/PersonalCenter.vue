<template>
  <div class="PersonalCenter height_auto">
    <vue-headful title="个人中心"></vue-headful>
    <el-header class="common">
      <HeaderModule id="navigation"></HeaderModule>
    </el-header>
    <el-main class="common">
      <TopSearchBox
        :searchType="'PersonalCenter'"
        :categories="[]"
      ></TopSearchBox>
      <div class="pc_content">
        <PageFlow
          :Flow1="'首页'"
          :Flow2="'个人中心'"
          :Flow3="Flow3_Setting"
        ></PageFlow>
      </div>

      <div class="mainTabs">
        <el-tabs
          :tab-position="tabPosition"
          style="height: 200px;"
          v-model="activeName1"
        >
          <el-tab-pane name="1">
            <span slot="label">
              <i class="el-icon-user-solid"></i>&nbsp;&nbsp;用户资料
            </span>
            <!-- **** 用户资料 -->
            <div class="left_pane_content ui_commonFont">
              <div class="sTitle1">当前头像</div>
              <div class="avatar_img_p">
                <img class="avatar_img" :src="avatarURL" alt />
                <!-- <div @click="uploadAvatar()" class="avatar_img_edit">上传头像</div> -->
                <div class="avatar_img_edit">
                  <el-upload
                    action="alert"
                    :before-upload="value => beforeAvatarUpload(value, 1)"
                    :on-change="
                      (file, fileList) => loadJsonFromFile(file, fileList, 1)
                    "
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    >上传头像</el-upload
                  >
                </div>
              </div>

              <div class="sTitle2">手机号：{{ user_phone }}</div>
              <div class="sTitle1">*昵称：</div>
              <div class="ui_input_p">
                <input
                  class="ui_input"
                  placeholder="请输入"
                  v-model="uiInput1"
                  type="text"
                />
              </div>
              <div class="sTitle1">真实姓名：</div>
              <div class="ui_input_p">
                <input
                  class="ui_input"
                  placeholder="请输入"
                  v-model="uiInput2"
                  type="text"
                />
              </div>
              <div class="sTitle1">*性别：</div>
              <div class="radio_box">
                <el-radio-group v-model="sex">
                  <!-- <el-radio :label="0">保密</el-radio> -->
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </div>
              <div>
                <button @click="saveChange()" class="save_btn">保存</button>
              </div>
            </div>

            <!-- **** 用户资料 收尾 -->
          </el-tab-pane>
          <el-tab-pane name="2">
            <span slot="label">
              <i class="el-icon-s-order"></i>&nbsp;&nbsp;我的订单
            </span>
            <!-- **** 我的订单 -->

            <div class="child_tabs">
              <el-tabs :tab-position="tabPosition2" style="height: 200px;">
                <el-tab-pane label="全部订单">
                  <!-- *** -->
                  <div class="pane_content">
                    <el-row class="flex searchInput">
                      <el-row class="input_content flex_1">
                        <el-input
                          v-model="input1"
                          placeholder="请输入"
                        ></el-input>
                      </el-row>
                      <el-button class="search_button">订单搜索</el-button>
                    </el-row>
                    <!-- *  -->
                    <PersonalCenterTable
                      @func="initOrderList"
                      :tableData="tableData1"
                    ></PersonalCenterTable>
                  </div>
                  <!-- *** -->
                </el-tab-pane>
                <el-tab-pane label="待付款">
                  <!-- *** -->
                  <div class="pane_content">
                    <el-row class="flex searchInput">
                      <el-row class="input_content flex_1">
                        <el-input
                          v-model="input1"
                          placeholder="请输入"
                        ></el-input>
                      </el-row>
                      <el-button class="search_button">订单搜索</el-button>
                    </el-row>
                    <!-- *  -->
                    <PersonalCenterTable
                      @func="initOrderList"
                      :tableData="tableData2"
                    ></PersonalCenterTable>
                  </div>
                  <!-- *** -->
                </el-tab-pane>
                <el-tab-pane label="待发货">
                  <!-- *** -->
                  <div class="pane_content">
                    <el-row class="flex searchInput">
                      <el-row class="input_content flex_1">
                        <el-input
                          v-model="input1"
                          placeholder="请输入"
                        ></el-input>
                      </el-row>
                      <el-button class="search_button">订单搜索</el-button>
                    </el-row>
                    <!-- *  -->
                    <PersonalCenterTable
                      @func="initOrderList"
                      :tableData="tableData7"
                    ></PersonalCenterTable>
                  </div>
                  <!-- *** -->
                </el-tab-pane>
                <el-tab-pane label="待收货">
                  <!-- *** -->
                  <div class="pane_content">
                    <el-row class="flex searchInput">
                      <el-row class="input_content flex_1">
                        <el-input
                          v-model="input1"
                          placeholder="请输入"
                        ></el-input>
                      </el-row>
                      <el-button class="search_button">订单搜索</el-button>
                    </el-row>
                    <!-- *  -->
                    <PersonalCenterTable
                      @func="initOrderList"
                      :tableData="tableData3"
                    ></PersonalCenterTable>
                  </div>
                  <!-- *** -->
                </el-tab-pane>
                <el-tab-pane label="待评价">
                  <!-- *** -->
                  <div class="pane_content">
                    <el-row class="flex searchInput">
                      <el-row class="input_content flex_1">
                        <el-input
                          v-model="input1"
                          placeholder="请输入"
                        ></el-input>
                      </el-row>
                      <el-button class="search_button">订单搜索</el-button>
                    </el-row>
                    <!-- *  -->
                    <PersonalCenterTable
                      @func="initOrderList"
                      :tableData="tableData4"
                    ></PersonalCenterTable>
                  </div>
                  <!-- *** -->
                </el-tab-pane>
                <el-tab-pane label="已完成">
                  <!-- *** -->
                  <div class="pane_content">
                    <el-row class="flex searchInput">
                      <el-row class="input_content flex_1">
                        <el-input
                          v-model="input1"
                          placeholder="请输入"
                        ></el-input>
                      </el-row>
                      <el-button class="search_button">订单搜索</el-button>
                    </el-row>
                    <!-- *  -->
                    <PersonalCenterTable
                      @func="initOrderList"
                      :tableData="tableData5"
                    ></PersonalCenterTable>
                  </div>
                  <!-- *** -->
                </el-tab-pane>
                <el-tab-pane label="已取消">
                  <!-- *** -->
                  <div class="pane_content">
                    <el-row class="flex searchInput">
                      <el-row class="input_content flex_1">
                        <el-input
                          v-model="input1"
                          placeholder="请输入"
                        ></el-input>
                      </el-row>
                      <el-button class="search_button">订单搜索</el-button>
                    </el-row>
                    <!-- *  -->
                    <PersonalCenterTable
                      @func="initOrderList"
                      :tableData="tableData6"
                    ></PersonalCenterTable>
                  </div>
                  <!-- *** -->
                </el-tab-pane>
              </el-tabs>
            </div>
            <!-- **** 我的订单  收尾 -->
          </el-tab-pane>
          <el-tab-pane name="3">
            <span slot="label">
              <i class="el-icon-truck"></i>&nbsp;&nbsp;收货地址
            </span>
            <!-- **** 收货地址 -->

            <div class="left_pane_content">
              <div class="address_title">收货地址</div>
              <!-- 遍历 -->
              <template v-for="(item, index) in AddressArr">
                <div
                  class="inlineBlock_verTopP aa_commonFont"
                  :key="index + 'aa'"
                >
                  <div>
                    <span v-if="item.chooseType == true" class="default_font"
                      >默认</span
                    >
                    <span
                      >{{ item.province }}{{ item.city }}{{ item.district
                      }}{{ item.address }}</span
                    >
                    <span>（{{ item.name }}）</span>
                    <span>{{ item.phone }}</span>
                  </div>
                  <!--  -->
                  <div class="operation">
                    <span
                      class="operation_font"
                      @click="
                        addressEditDialog(
                          'edit',
                          item.id,
                          item.name,
                          item.phone,
                          item.province,
                          item.city,
                          item.district,
                          item.address,
                          item.chooseType,
                          item.zip
                        )
                      "
                      >编辑</span
                    >
                    <span
                      @click="deleteAssignAddress(item.id)"
                      class="operation_font operation_font2"
                      >删除</span
                    >
                    <span
                      @click="defaultAssignAddress(item.id)"
                      class="operation_font operation_font3"
                      >设为默认地址</span
                    >
                  </div>
                </div>
              </template>

              <div class="add_new_address">
                <button
                  class="btn_add_address"
                  @click="addressEditDialog('new')"
                >
                  新增地址
                </button>
              </div>
            </div>
            <!-- **** 收货地址 收尾 -->
          </el-tab-pane>
        </el-tabs>
      </div>

      <!-- 对话框 -->
      <el-dialog
        :title="addressEditType + '收货地址'"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <div class="textAlignCenter_w100p dialogContent">
          <div class="inlineBlock_verTopP dcPerRow">
            <div class="dc_sTtile">收货人姓名：</div>
            <div>
              <input
                v-model="u_name"
                class="dc_input"
                placeholder="请输入"
                type="text"
              />
            </div>
          </div>

          <div class="inlineBlock_verTopP dcPerRow">
            <div class="dc_sTtile">电话号码：</div>
            <div>
              <input
                v-model="u_phone"
                class="dc_input"
                placeholder="请输入"
                type="text"
              />
            </div>
          </div>

          <div class="inlineBlock_verTopP dcPerRow">
            <div class="dc_sTtile">收货地址：</div>
            <div>
              <div class="linkage">
                <el-select
                  v-model="sheng"
                  @change="choseProvince"
                  placeholder="省级地区"
                >
                  <el-option
                    v-for="item in province"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <br />
                <el-select
                  v-model="shi"
                  @change="choseCity"
                  placeholder="市级地区"
                >
                  <el-option
                    v-for="item in shi1"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <br />
                <el-select
                  v-model="qu"
                  @change="choseBlock"
                  placeholder="区级地区"
                >
                  <el-option
                    v-for="item in qu1"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>

          <div class="inlineBlock_verTopP dcPerRow">
            <div class="dc_sTtile">详细地址：</div>
            <div>
              <input
                v-model="u_address"
                class="dc_input"
                placeholder="请输入"
                type="text"
              />
            </div>
          </div>

          <!-- <div v-show="!ifNewAddress" class="buy_settings">
            <el-checkbox v-model="ifChoosel_checkbox">
              <span class="checkBox_font">设为默认收货地址</span>
            </el-checkbox>
          </div>-->
        </div>
        <span slot="footer">
          <button class="btn_save" @click="AddressSave()">保存</button>
        </span>
      </el-dialog>
      <!-- 对话框 -->
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

import PersonalCenterTable from "@/components/PersonalCenterTable";
import m_city from "@/static/json/map.json";

import {
  getUserInfo,
  refresh_token,
  upload_avatar,
  update_users,
  add_address,
  getAddressList,
  // getAddressById,
  updateAddressById,
  deleteAddressById,
  set_addressDefault,
  getOrderList
} from "@/api/api";

export default {
  name: "PersonalCenter",
  components: {
    HeaderModule,
    TopSearchBox,
    FooterNav,
    FooterModule,
    PageFlow,
    PersonalCenterTable
  },
  data() {
    return {
      activeName1: "2",
      Flow3_Setting: "我的订单",
      tabPosition: "left",
      tabPosition2: "top",

      // 用户资料
      avatarURL: require("@/assets/pic/avatar.png"),
      user_phone: "",
      uiInput1: "",
      uiInput2: "",
      sex: 1, // 0-保密（已经去掉） 1- 男 2-女
      uploadImgFile: null,
      // 我的订单

      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",

      tableData1: [
        // {
        //   OrderId:1   // ▲ new
        //   OrderNumber: "105016464644696",
        //   ImgUrl: require("@/assets/pic/product.png"),
        //   productInfo: "李新建珠峰瑞祥, 2015布面油画",
        //   Payment: "在线支付",
        //   ProductPrice: 41213.0,
        //   count: 1,
        //   freight: 0,
        //   TransactionStatus: "待付款",
        //   operation1: "立即支付",
        //   operation2: "订单详情",
        //   OrderRemark: "",
        //   receiver: "管浩",
        //   shippingAddress: "广东省东莞市石排镇复兴路323号",
        //   phone: "13477060542",
        //   unitPriceHistory: "45415",
        //   unitPrice: "41213",
        //   totalValue: "41213"
        // },
        // {
        //   OrderNumber: "105016464644696",
        //   ImgUrl: require("@/assets/pic/product.png"),
        //   productInfo: "李新建珠峰瑞祥, 2015布面油画",
        //   Payment: "在线支付",
        //   ProductPrice: 41213.0,
        //   count: 1,
        //   freight: 0,
        //   TransactionStatus: "待付款",
        //   operation1: "立即支付",
        //   operation2: "订单详情",
        //   OrderRemark: "",
        //   receiver: "管浩",
        //   shippingAddress: "广东省东莞市石排镇复兴路323号",
        //   phone: "13477060542",
        //   unitPriceHistory: "45415",
        //   unitPrice: "41213",
        //   totalValue: "41213"
        // },
        // {
        //   OrderNumber: "105016464644785",
        //   ImgUrl: require("@/assets/pic/product.png"),
        //   productInfo: "李新建珠峰瑞祥, 2015布面油画",
        //   Payment: "在线支付",
        //   ProductPrice: 41213.0,
        //   count: 1,
        //   freight: 0,
        //   TransactionStatus: "待收货",
        //   operation1: "查看物流",
        //   operation2: "订单详情",
        //   OrderRemark: "",
        //   receiver: "管浩",
        //   shippingAddress: "广东省东莞市石排镇复兴路323号",
        //   phone: "13477060542",
        //   unitPriceHistory: "45415",
        //   unitPrice: "41213",
        //   totalValue: "41213"
        // },
        // {
        //   OrderNumber: "105016464644785",
        //   ImgUrl: require("@/assets/pic/product.png"),
        //   productInfo: "李新建珠峰瑞祥, 2015布面油画",
        //   Payment: "在线支付",
        //   ProductPrice: 41213.0,
        //   count: 1,
        //   freight: 0,
        //   TransactionStatus: "待评价",
        //   operation1: "查看物流",
        //   operation2: "订单详情",
        //   OrderRemark: "",
        //   receiver: "管浩",
        //   shippingAddress: "广东省东莞市石排镇复兴路323号",
        //   phone: "13477060542",
        //   unitPriceHistory: "45415",
        //   unitPrice: "41213",
        //   totalValue: "41213"
        // },
        // {
        //   OrderNumber: "105016464644785",
        //   ImgUrl: require("@/assets/pic/product.png"),
        //   productInfo: "李新建珠峰瑞祥, 2015布面油画",
        //   Payment: "在线支付",
        //   ProductPrice: 41213.0,
        //   count: 1,
        //   freight: 0,
        //   TransactionStatus: "已完成",
        //   operation1: "评价",
        //   operation2: "订单详情",
        //   OrderRemark: "",
        //   receiver: "管浩",
        //   shippingAddress: "广东省东莞市石排镇复兴路323号",
        //   phone: "13477060542",
        //   unitPriceHistory: "45415",
        //   unitPrice: "41213",
        //   totalValue: "41213"
        // },
        // {
        //   OrderNumber: "105016464644785",
        //   ImgUrl: require("@/assets/pic/product.png"),
        //   productInfo: "李新建珠峰瑞祥, 2015布面油画",
        //   Payment: "在线支付",
        //   ProductPrice: 41213.0,
        //   count: 1,
        //   freight: 0,
        //   TransactionStatus: "已取消",
        //   operation1: "查看物流",
        //   operation2: "订单详情",
        //   OrderRemark: "",
        //   receiver: "",
        //   shippingAddress: "",
        //   phone: "",
        //   unitPriceHistory: "",
        //   unitPrice: ""
        // }
      ],
      tableData2: [],
      tableData7: [],

      tableData3: [],
      tableData4: [],
      tableData5: [],
      tableData6: [],

      // 收货地址
      AddressArr: [
        // {
        //   id: 1,
        //   chooseType: true,
        //   province: "福建省",
        //   city: "宁德市",
        //   district: "寿宁县",
        //   address: "富强路52号",
        //   name: "苗海琬",
        //   phone: "15481891688",
        //   zip: 000000
        // },
        // {
        //   id: 2,
        //   chooseType: false,
        //   province: "上海",
        //   city: "上海市",
        //   district: "松江区",
        //   address: "人民胡同175号",
        //   name: "荀美东",
        //   phone: "15481891688"
        //   zip: 000000
        // },
        // {
        //   id: 3,
        //   chooseType: false,
        //   province: "贵州省",
        //   city: "贵阳市",
        //   district: "观山湖区",
        //   address: "观山大道28号",
        //   name: "苗海琬",
        //   phone: "15481891688"
        //   zip: 000000
        // }
      ],
      dialogVisible: false,
      ifNewAddress: true,
      addressEditType: "新增",
      assignAddressId: null,
      ifChoosel_checkbox: false,
      mapJson: "../static/json/map.json",
      province: "",
      sheng: "",
      shi: "",
      shi1: [],
      qu: "",
      qu1: [],
      city: "",
      block: "",
      u_name: "",
      u_phone: "",
      u_address: "",
      zip: null, // 邮编 - 传入Number
      zip_shengArr: [
        // {
        //      zip: item,
        //     text: data[item]
        // }
      ], // 用于 省zip 找对应的省string
      zip_shiArr: [],
      zip_quArr: []
    };
  },
  created() {
    this.getCityData();
  },
  watch: {
    activeName1(newValue, oldValue) {
      if (newValue == "1") {
        this.Flow3_Setting = "用户资料";
      }
      if (newValue == "2") {
        this.Flow3_Setting = "我的订单";
      }
      if (newValue == "3") {
        this.Flow3_Setting = "收货地址";
      }
      this.$route.query.activeName = newValue;
    }
  },
  mounted() {
    let vm = this;
    // 标题title浮动初始化
    this.$Utils.TitleInit();
    let activeName = this.$route.query.activeName;
    if (activeName != undefined && activeName != null && activeName != "") {
      this.activeName1 = activeName;
    }

    // 获取个人信息-用户资料-信息填充
    let token = vm.$Utils.getCookie("user_token");
    let newToken = token.replace('"', "").replace('"', "");
    if (token != undefined && token != null && token != "") {
      refresh_token(newToken)
        .then(function(response) {
          if (response.status == 200) {
            // 刷新成功
            vm.$Utils.setCookie(
              "user_token",
              JSON.stringify(response.data.access_token),
              60
            );
            vm.initOrderList();
          }
        })
        .catch(function(error) {
          console.info(error);
        });
    }
  },
  methods: {
    initOrderList() {
      let vm = this;
      vm.initUserInfo(); // 获取用户信息
      vm.getAddressList(); // 获取用户地址列表
      vm.getOrderList(); // 获取订单列表表
      setTimeout(function() {
        vm.manageTransactionStatus();
      }, 2000);
    },
    manageTransactionStatus() {
      // 处理各“交易状态”
      let length = this.tableData1.length;
      this.tableData2 = []; // 初始化
      this.tableData3 = [];
      this.tableData4 = [];
      this.tableData5 = [];
      this.tableData6 = [];
      for (let i = 0; i < length; i++) {
        if (this.tableData1[i].TransactionStatus == "待付款") {
          this.tableData2.push(this.tableData1[i]);
        }
        if (this.tableData1[i].TransactionStatus == "待发货") {
          this.tableData7.push(this.tableData1[i]);
        }
        if (this.tableData1[i].TransactionStatus == "待收货") {
          this.tableData3.push(this.tableData1[i]);
        }
        if (this.tableData1[i].TransactionStatus == "待评价") {
          this.tableData4.push(this.tableData1[i]);
        }
        if (this.tableData1[i].TransactionStatus == "已完成") {
          this.tableData5.push(this.tableData1[i]);
        }
        if (this.tableData1[i].TransactionStatus == "已取消") {
          this.tableData6.push(this.tableData1[i]);
        }
      }
    },
    getOrderList() {
      let vm = this;
      let token = vm.$Utils.getCookie("user_token");
      let newToken = token.replace('"', "").replace('"', "");
      getOrderList(newToken)
        .then(function(response) {
          console.log("getOrderList");
          console.log(response);
          if (response.status == 200) {
            let data = response.data.data;
            let length = data.length;
            vm.tableData1 = []; // 初始化
            for (let i = 0; i < length; i++) {
              let productInfoArr = [];
              let imageArr = [];
              let amountArr = [];
              let priceArr = [];
              let discountArr = [];
              let unitPriceArr = [];
              let totalValueArr = [];
              let good_idArr = [];
              // ******** 商品Arr化 （good1）
              let good_length = data[i].items.length;
              for (let k = 0; k < good_length; k++) {
                let item = data[i].items[k];
                let good1 = data[i].items[k].good;
                // ▲▲▲ 个人中心-我的订单--暂只展示一个商品
                let productInfo;
                productInfo =
                  good1.art +
                  "," +
                  good1.title +
                  "," +
                  // good1.created_at +
                  good1.time +
                  "," +
                  good1.quality;

                productInfoArr.push(productInfo);

                let image = require("@/assets/pic/product.png");
                try {
                  image = global.IMGPrefix + good1.images[0].image;
                } catch (error) {
                  console.log(error);
                }
                imageArr.push(image);

                let amount = item.amount;
                amountArr.push(amount);
                let price = good1.price;
                priceArr.push(price);
                let discount = good1.discount;
                discountArr.push(price);
                unitPriceArr.push(Number(price) * Number(discount));
                totalValueArr.push(Number(price) * Number(discount) * amount);
                let good_id = item.good_id;
                good_idArr.push(good_id);
              }
              // ******** 商品Arr化 （收）

              // ●●●●●●●●●●●●● 支付状态
              let payment_method;
              if (data[i].payment_method == "wechat") {
                payment_method = "微信支付";
              } else if (data[i].payment_method == null) {
                payment_method = "无";
              } else {
                payment_method = "其他";
              }
              // ●●●●●●●●●●●●● 交易状态
              let TransactionStatus = "状态异常";
              // cancel 是否取消订单 -- 针对待付款
              console.log("~~~~~~~~~~~~~");
              if (data[i].cancel == 1) {
                console.log("已取消");
                TransactionStatus = "已取消";
              } else if (data[i].cancel == 0) {
                console.log("非-已取消");
                // paid_at 是否付款
                if (data[i].paid_at != null && data[i].paid_at != "") {
                  console.log("非-待付款");
                  // TransactionStatus = "已完成"; // 暂时
                  // received_status 是否收货
                  if (data[i].received_status == 0) {
                    console.log("待收货");
                    TransactionStatus = "待收货";
                  } else if (data[i].received_status == 1) {
                    console.log("非-待收货");
                    // TransactionStatus = "待评价";
                    // 是否评价
                    if (data[i].reply_status == 0) {
                      TransactionStatus = "待评价";
                    } else if (data[i].reply_status == 1) {
                      TransactionStatus = "已完成";
                    }
                  }
                } else {
                  console.log("待付款");
                  TransactionStatus = "待付款"; // 暂时
                }
              }
              //  ●●●●●●●●●●●●● 操作（对应交易状态）
              let operation1 = "";
              switch (TransactionStatus) {
                case "待付款":
                  operation1 = "立即支付";
                  break;
                case "待收货":
                  operation1 = "确认收货";
                  break;
                case "待评价":
                  operation1 = "前往评价";
                  break;
                case "已完成":
                  operation1 = "查看订单";
                  break;
                case "已取消":
                  operation1 = "查看订单";
                  break;
                case "状态异常":
                  operation1 = "查看订单";
                  break;
                default:
                  console.log("***");
              }

              // console.log("~~~~~~~~~~~~~~~~~~~1");
              // console.log(data[i]);
              let GoodsArr = [];
              let length = data[i].items.length;
              for (let k = 0; k < length; k++) {
                // console.log("~~~~~~~~~~~~~~~~~~~2");
                // console.log(data[i].items[k]);
                // console.log(...data[i].items);
                GoodsArr.push(data[i].items[k]);
              }
              // console.log("■■■■■■■■■■■");
              // console.log(length);
              // console.log(GoodsArr);

              vm.tableData1.push({
                OrderId: data[i].id,
                OrderNumber: data[i].no,

                // ImgUrl: require("@/assets/pic/product.png"), // 暂时 // 待完善 Arr[]
                // ImgUrl: image, // 待完善 Arr[]
                // productInfo: productInfo, // 待完善 Arr[]
                // count: 1, // 待完善 Arr[]
                // unitPriceHistory: "0",
                // unitPrice: "41213", // 待完善 Arr[]
                // totalValue: "41213", // 待完善 Arr[]

                ImgUrl: imageArr,
                productInfo: productInfoArr,
                count: amountArr,
                unitPriceHistory: priceArr,
                unitPrice: unitPriceArr,
                totalValue: totalValueArr,

                Payment: payment_method,
                freight: 0, // 差运费 // ▲▲ 临时
                TransactionStatus: TransactionStatus, // ★★★ 待后台添加监听器！
                operation1: operation1,
                operation2: "订单详情",
                OrderRemark: data[i].remark,
                receiver: data[i].address.contact_name,
                shippingAddress: data[i].address.address,
                phone: data[i].address.contact_phone,
                zip: data[i].address.zip,
                GoodsArr: GoodsArr,
                total_amount: data[i].total_amount,
                ProductPrice: data[i].total_amount,
                good_id: good_idArr
              });
              console.log("~~~~~:" + TransactionStatus);
            }
            console.log(vm.tableData1);

            // items: 订单 - 商品（分 good_id 如  29,28 情况）
            // data
            //   data [0]
            //       address: {address: "北京市北京市东城区22hao", zip: "110101", contact_name: "yy", contact_phone: "123456789"}
            //       closed: false
            //       created_at: "2020-03-10 21:01:53"
            //       extra: null
            //       id: 32
            //       items: [{…}]
            //       no: "20200310210153591848"
            //       paid_at: "2020-03-10 21:02:16"   // ★★★ 支付状态 有时间-已支付 没时间-未支付
            //       payment_method: "wechat"
            //       payment_no: "4200000501202003107854430649"
            //       refund_no: null    // 是否退款
            //       refund_status: "pending"  // 退款状态 --'pending' 未执行退款
            //       remark: null    // 评论内容
            //       reviewed: false      // ★ 是否评论
            //       ship_data: null
            //       ship_status: "pending"
            //       total_amount: "0.01"
            //       updated_at: "2020-03-10 21:02:16"
            //       user: {id: 1, name: "yiduang", phone: "18742257174", avatar: "https://cdn.learnku.com/uploads/images/201710/30/1/TrJS40Ey5k.png", created_at: "2009-05-18 15:02:08", …}
            //       user_id: 1
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

    defaultAssignAddress(id) {
      let vm = this;
      this.assignAddressId = id;
      let token = vm.$Utils.getCookie("user_token");
      let newToken = token.replace('"', "").replace('"', "");
      if (token != undefined && token != null && token != "") {
        refresh_token(newToken)
          .then(function(response) {
            if (response.status == 200) {
              // 刷新成功
              vm.$Utils.setCookie(
                "user_token",
                JSON.stringify(response.data.access_token),
                60
              );
              // 设置默认指定id 地址
              let token = vm.$Utils.getCookie("user_token");
              let newToken = token.replace('"', "").replace('"', "");
              let id = vm.assignAddressId;
              set_addressDefault(newToken, id)
                .then(function(response) {
                  console.log(response);
                  if (response.status == 200) {
                    vm.getAddressList(); // 获取用户地址列表
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
      }
    },
    deleteAssignAddress(id) {
      let vm = this;
      this.assignAddressId = id;
      let token = vm.$Utils.getCookie("user_token");
      let newToken = token.replace('"', "").replace('"', "");
      if (token != undefined && token != null && token != "") {
        refresh_token(newToken)
          .then(function(response) {
            if (response.status == 200) {
              // 刷新成功
              vm.$Utils.setCookie(
                "user_token",
                JSON.stringify(response.data.access_token),
                60
              );
              // 删除指定id 地址
              let token = vm.$Utils.getCookie("user_token");
              let newToken = token.replace('"', "").replace('"', "");
              let id = vm.assignAddressId;
              deleteAddressById(newToken, id)
                .then(function(response) {
                  console.log(response);
                  if (response.status == 204) {
                    vm.getAddressList(); // 获取用户地址列表
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
      }
    },
    AddressSave() {
      let vm = this;
      let token = vm.$Utils.getCookie("user_token");
      let newToken = token.replace('"', "").replace('"', "");

      if (this.$UninputJudgment(vm.u_name, "请输入收货人姓名！")) {
        return;
      }
      if (this.$UninputJudgment(vm.u_phone, "请输入电话号码！")) {
        return;
      }
      if (this.$UninputJudgment(vm.sheng, "请选择省！")) {
        return;
      }
      if (this.$UninputJudgment(vm.shi, "请选择市！")) {
        return;
      }
      if (this.$UninputJudgment(vm.qu, "请选择区！")) {
        return;
      }

      if (token != undefined && token != null && token != "") {
        refresh_token(newToken)
          .then(function(response) {
            if (response.status == 200) {
              // 刷新成功
              vm.$Utils.setCookie(
                "user_token",
                JSON.stringify(response.data.access_token),
                60
              );
              if (vm.ifNewAddress == true) {
                // 新增地址
                // "new"
                vm.add_address();
              } else if (vm.ifNewAddress == false) {
                // 编辑地址
                // "edit"
                vm.updateAddressById();
              }
            }
          })
          .catch(function(error) {
            console.info(error);
          });
      }

      this.dialogVisible = false;
    },
    getAddressList() {
      let vm = this;
      let token = vm.$Utils.getCookie("user_token");
      let newToken = token.replace('"', "").replace('"', "");
      getAddressList(newToken)
        .then(function(response) {
          console.log("getAddressList");
          console.log(response);
          // 数组编辑ing
          if (response.status == 200) {
            vm.AddressArr = []; // 地址初始化
            let data = response.data.data;
            for (let i = 0; i < data.length; i++) {
              vm.AddressArr.push({
                id: data[i].id, // 地址id  // 暂不用管 user_id
                chooseType: data[i].default_address, // 是否默认 1-默认 0-不默认
                province: data[i].province,
                city: data[i].city,
                district: data[i].district,
                address: data[i].address,
                name: data[i].contact_name,
                phone: data[i].contact_phone,
                zip: data[i].zip
              });
            }
            console.log(vm.AddressArr);
            // 默认地址-置顶操作ing  --- 待优化
          }
        })
        .catch(function(error) {
          console.info(error);
        });
    },
    // 编辑地址
    updateAddressById() {
      let vm = this;
      let token = vm.$Utils.getCookie("user_token");
      let newToken = token.replace('"', "").replace('"', "");
      // console.log(
      //   vm.u_name,
      //   vm.u_phone,
      //   vm.sheng,
      //   vm.shi,
      //   vm.qu,
      //   vm.u_address,
      //   vm.zip
      // );
      // var formData = new FormData();
      // var formData = new window.FormData();
      // formData.append("contact_name", vm.u_name);
      // formData.append("contact_phone", vm.u_phone);
      // formData.append("province", vm.sheng);
      // formData.append("city", vm.shi);
      // formData.append("district", vm.qu);
      // formData.append("address", vm.u_address);
      // formData.append("zip", vm.zip);
      // console.log(formData);

      let id = vm.assignAddressId;
      let temp = {
        contact_name: vm.u_name,
        contact_phone: vm.u_phone,
        province: vm.sheng,
        city: vm.shi,
        district: vm.qu,
        address: vm.u_address,
        zip: vm.zip
      };
      // updateAddressById(newToken, id, formData)
      updateAddressById(newToken, id, temp)
        .then(function(response) {
          console.log("updateAddressById");
          console.log(response);
          if (response.status == 200) {
            vm.getAddressList(); // 获取用户地址列表
          }
        })
        .catch(function(error) {
          console.info(error);
        });
    },
    // 新增地址
    add_address() {
      let vm = this;
      let token = vm.$Utils.getCookie("user_token");
      let newToken = token.replace('"', "").replace('"', "");
      var formData = new FormData();
      var formData = new window.FormData();
      formData.append("contact_name", vm.u_name);
      formData.append("contact_phone", vm.u_phone);
      formData.append("province", vm.sheng);
      formData.append("city", vm.shi);
      formData.append("district", vm.qu);
      formData.append("address", vm.u_address);
      formData.append("zip", vm.zip);
      console.log(formData);
      add_address(newToken, formData)
        .then(function(response) {
          console.log("add_address");
          console.log(response);
          if (response.status == 200) {
            vm.getAddressList(); // 获取用户地址列表
          }
        })
        .catch(function(error) {
          console.info(error);
        });
    },
    // 编辑地址 - 对话框初始化
    addressEditDialog(
      addressType,
      id,
      name,
      phone,
      province,
      city,
      district,
      address,
      chooseType,
      zip
    ) {
      // addressType - 地址类型 "new"-新增  "edit"-编辑
      if (addressType == "edit") {
        this.assignAddressId = id;
        this.dialogVisible = true;
        this.ifNewAddress = false;
        this.addressEditType = "编辑";
        this.u_name = name;
        this.u_phone = phone;
        this.sheng = province;
        this.shi = city;
        this.qu = district;
        this.u_address = address;
        // console.log(chooseType);
        this.ifChoosel_checkbox = chooseType;
        this.zip = zip;
      } else if (addressType == "new") {
        this.dialogVisible = true;
        this.ifNewAddress = true;
        this.addressEditType = "新增";
        this.u_name = "";
        this.u_phone = "";
        this.sheng = "";
        this.shi = "";
        this.qu = "";
        this.u_address = "";
        this.ifChoosel_checkbox = false;
        // this.add_address();
        // this.zip = zip;
        this.zip = null;
      }
    },
    saveChange() {
      // 保存修改 （控制3个参数：昵称、姓名、保密 ， 保存4个：+头像）
      let vm = this;
      let token = vm.$Utils.getCookie("user_token");
      let newToken = token.replace('"', "").replace('"', "");
      if (token != undefined && token != null && token != "") {
        refresh_token(newToken)
          .then(function(response) {
            // console.log(response);
            if (response.status == 200) {
              vm.$Utils.setCookie(
                "user_token",
                JSON.stringify(response.data.access_token),
                60
              );
              // 保存 用户信息
              let token = vm.$Utils.getCookie("user_token");
              let newToken = token.replace('"', "").replace('"', "");
              if (
                vm.uiInput1 == "" ||
                vm.uiInput1 == " " ||
                vm.uiInput1 == null ||
                vm.uiInput1 == undefined
              ) {
                vm.$message("请输入昵称！");
                return;
              }
              let temp = {
                name: vm.uiInput1,
                real_name: vm.uiInput2,
                gender: vm.sex
              };
              update_users(newToken, temp)
                .then(function(response) {
                  console.log(response);
                  if (response.status == 200) {
                    vm.$message("保存成功！");
                    setTimeout(function() {
                      vm.initUserInfo(); //刷新个人信息
                    }, 1000);
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
      }
    },

    uploadAvatar() {
      // 上传头像 （单独api）
      let vm = this;
      let token = vm.$Utils.getCookie("user_token");
      let newToken = token.replace('"', "").replace('"', "");

      if (token != undefined && token != null && token != "") {
        refresh_token(newToken)
          .then(function(response) {
            console.log(response);
            if (response.status == 200) {
              var formData = new FormData();
              var formData = new window.FormData();
              formData.append("image", vm.uploadImgFile);
              formData.append("type", "avatar"); // "avatar" - 默认类型
              vm.$Utils.setCookie(
                "user_token",
                JSON.stringify(response.data.access_token),
                60
              );
              let token = vm.$Utils.getCookie("user_token");
              let newToken = token.replace('"', "").replace('"', "");
              upload_avatar(newToken, formData)
                .then(function(response) {
                  console.log(response);
                  if (response.status == 201) {
                    // data: {…}, status: 201, statusText: "Created", headers: {…}, config: {…}, …}
                    //   config: {url: "http://shop.zidata.cn/api/v2.0.0/images", method: "post", data: FormData, headers: {…}, baseURL: "http://shop.zidata.cn/api/v2.0.0", …}
                    //   data:
                    //   created_at: "2020-03-08 14:24:05"
                    //   id: 1
                    //   path: "http://shop.zidata.cn/uploads/images/avatars/202003/08/1_1583648644_JifOCU5XZw.jpg"
                    //   type: "avatar"
                    //   updated_at: "2020-03-08 14:24:05"
                    //   user_id: 1
                    vm.avatarURL = response.data.path; // 上传成功后返回的地址
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
      }
    },
    initUserInfo() {
      let vm = this;
      // 获取用户信息
      let token = vm.$Utils.getCookie("user_token");
      let newToken = token.replace('"', "").replace('"', "");
      getUserInfo(newToken)
        .then(function(response) {
          console.log(response);
          if (response.status == 200) {
            // data:
            //   avatar: "https://cdn.learnku.com/uploads/images/201710/30/1/TrJS40Ey5k.png"
            //   created_at: "2020-03-08 13:36:24"
            //   id: 1
            //   name: "yiduang"
            //   phone: "18342987174"
            //   updated_at: "2020-03-08 13:36:24"
            //   user_info:
            //     created_at: "2020-03-08 13:36:24"
            //     gender: 0
            //     id: 1
            //     real_name: null
            //     updated_at: "2020-03-08 13:36:24"
            //     user_id: 1
            // 获取成功
            vm.avatarURL = response.data.avatar;
            vm.user_phone = response.data.phone;
            vm.uiInput1 = response.data.name;
            vm.uiInput2 = response.data.user_info.real_name;
            vm.sex = response.data.user_info.gender;
          }
        })
        .catch(function(error) {
          console.info(error);
        });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      // this.dialogImageUrl = file.url;
      console.log(file);
    },
    loadJsonFromFile(file, fileList, id) {
      console.log(file);
      console.log(fileList);
      console.log(id);
      // this.uploadFilename = file.name;
      // this.uploadFiles = fileList;
      // if (id == 1) {
      //   this.dialogImageUrl = URL.createObjectURL(file.raw);
      // }
    },
    beforeAvatarUpload(file, id) {
      let vm = this;
      console.log(file);
      console.log(id);
      this.uploadImgFile = file;
      setTimeout(function() {
        vm.uploadAvatar();
      }, 1000);

      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        // this.$message.error('上传头像图片只能是 JPG 格式!');
        console.log("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        // this.$message.error('上传头像图片大小不能超过 2MB!');
        console.log("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleChange(value) {
      console.log(value);
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    return_zip_sheng(zip) {
      let length = this.zip_shengArr.length;
      for (let i = 0; i < length; i++) {
        if (zip == this.zip_shengArr[i].zip) {
          return this.zip_shengArr[i].text;
        }
      }
    },
    return_zip_shi(zip) {
      let length = this.zip_shiArr.length;
      for (let i = 0; i < length; i++) {
        if (zip == this.zip_shiArr[i].zip) {
          return this.zip_shiArr[i].text;
        }
      }
    },
    return_zip_qu(zip) {
      let length = this.zip_quArr.length;
      for (let i = 0; i < length; i++) {
        if (zip == this.zip_quArr[i].zip) {
          return this.zip_quArr[i].text;
        }
      }
    },
    // ///
    // 加载china地点数据，三级
    getCityData: function() {
      var that = this;
      // axios
      //   .get(this.mapJson)
      //   .then(function(response) {
      // if (response.status == 200) {
      // var data = response.data;
      var data = m_city;

      that.province = [];
      that.city = [];
      that.block = [];
      // 省市区数据分类
      for (var item in data) {
        if (item.match(/0000$/)) {
          //省
          that.province.push({
            id: item,
            // id: {
            //   id: item,
            //   value: data[item]
            // },
            value: data[item],
            // value: {
            //   value: data[item],
            //   id: item
            // },

            children: []
          });
          this.zip_shengArr.push({
            zip: item,
            text: data[item]
          });
        } else if (item.match(/00$/)) {
          //市
          that.city.push({ id: item, value: data[item], children: [] });
          this.zip_shiArr.push({
            zip: item,
            text: data[item]
          });
        } else {
          //区
          that.block.push({ id: item, value: data[item] });
          this.zip_quArr.push({
            zip: item,
            text: data[item]
          });
        }
      }
      console.log(that.province[0]);

      // 分类市级
      for (var index in that.province) {
        for (var index1 in that.city) {
          if (
            that.province[index].id.slice(0, 2) ===
            that.city[index1].id.slice(0, 2)
          ) {
            that.province[index].children.push(that.city[index1]);
          }
          // if (
          //   that.province[index].id.id.slice(0, 2) ===
          //   that.city[index1].id.slice(0, 2)
          // ) {
          //   that.province[index].children.push(that.city[index1]);
          // }
        }
      }
      // 分类区级
      for (var item1 in that.city) {
        for (var item2 in that.block) {
          if (
            that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)
          ) {
            that.city[item1].children.push(that.block[item2]);
          }
        }
      }
      // } else {
      // console.log(response.status);
      // }
      // })
      // .catch(function(error) {
      //   console.log(typeof +error);
      // });
    },
    // 选省
    choseProvince: function(e) {
      // console.log(e);
      // console.log(typeof e);
      // console.log(e.value);
      this.sheng = this.return_zip_sheng(e);
      console.log(e);
      console.log(this.sheng);

      for (var index2 in this.province) {
        if (e === this.province[index2].id) {
          this.shi1 = this.province[index2].children;
          this.shi = this.province[index2].children[0].value;
          this.qu1 = this.province[index2].children[0].children;
          this.qu = this.province[index2].children[0].children[0].value;
          this.E = this.qu1[0].id;
          // console.log(this.E);
          // console.log(typeof this.E);
          this.zip = Number(this.E);
        }
      }
    },
    // 选市
    choseCity: function(e) {
      this.shi = this.return_zip_shi(e);
      console.log(e);
      console.log(this.shi);
      for (var index3 in this.city) {
        if (e === this.city[index3].id) {
          this.qu1 = this.city[index3].children;
          this.qu = this.city[index3].children[0].value;
          this.E = this.qu1[0].id;
          // console.log(this.E)
          this.zip = Number(this.E);
        }
      }
    },
    // 选区
    choseBlock: function(e) {
      this.qu = this.return_zip_qu(e);
      console.log(e);
      console.log(this.qu);
      this.E = e;
      // console.log(this.E);
      this.zip = Number(this.E);
    }
  }
};
</script>
<style>
/* ***** 左侧Tabs */
.PersonalCenter .el-tabs--left {
  height: auto !important;
}
/* ***** 左侧Tabs 箭头 */
.PersonalCenter .el-tabs--left .el-tabs__active-bar.is-left {
  width: 0;
  height: 0 !important;
  border-right: 10px solid #775563;
  border-top: 7px solid #fff;
  border-bottom: 7px solid #fff;
  margin-top: 13px;
}
/* ***** 左侧Tabs 文字和标签 */
.PersonalCenter .el-tabs__item {
  font-size: 16px;
  font-weight: 400;
}
.PersonalCenter .el-tabs__item.is-active {
  color: #775563;
  font-size: 16px;
  font-weight: bold;
}
.PersonalCenter .el-tabs__item {
  height: 52px;
}
.PersonalCenter .el-tabs__nav-wrap::after {
  background-color: #e2e2e2;
}

/* ***** 次级Tabs  */

.PersonalCenter .child_tabs .el-tabs--top {
  height: auto !important;
}
.PersonalCenter .child_tabs .el-tabs__active-bar {
  background-color: #775563;
  display: none;
}
.PersonalCenter .child_tabs .el-tabs__item {
  padding-left: 0;
  padding-right: 0;
  margin-left: 20px;
  margin-right: 20px;
}
.PersonalCenter .child_tabs .el-tabs__item.is-active {
  border-bottom: 2px solid #775563;
}

.PersonalCenter .child_tabs .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  margin-left: 28px;
}
.PersonalCenter .child_tabs .el-tabs--top .el-tabs__item {
  margin-right: 64px;
}

.PersonalCenter .child_tabs .el-tabs__content {
  padding-left: 28px;
}
.PersonalCenter .child_tabs .el-tabs__nav-wrap::after {
  background-color: #fff;
}

/* ***** 输入框 */
.PersonalCenter .child_tabs .searchInput {
  width: 368px;
  margin-bottom: 16px;
}
.PersonalCenter .child_tabs .input_content > .el-input input {
  border-radius: 60px 0px 0px 60px !important;
  font-size: 14px;
  background: #fff;
}
.PersonalCenter .child_tabs .input_content {
  box-sizing: border-box;
  padding: 2px 0px 2px 2px;
  border-radius: 60px 0px 0px 60px !important;
  background-color: #775563;

  height: 42px;
  margin-top: 1px;
  padding: 1px 0px 1px 1px;
}
.PersonalCenter .search_button {
  /* width: 17%; */
  width: 100px;
  height: 44px;
  margin-left: -1px;
  background-color: #775563;

  border-radius: 0px 60px 60px 0px;
  color: #fff;
  font-size: 14px;
  text-align: center;

  padding-left: 15px;
}
/* ***** 对话框 */
.PersonalCenter .el-dialog {
  width: 720px !important;
  height: 650px;
}

.PersonalCenter .el-dialog__title {
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(17, 26, 52, 1);
  line-height: 25px;
}
.PersonalCenter .el-dialog__header {
  border: 1px solid #e2e2e2;
}
.PersonalCenter .el-dialog__footer {
  text-align: center;
}

/* ***** checkbox */
.PersonalCenter
  .buy_settings
  .el-checkbox__input.is-checked
  .el-checkbox__inner,
.PersonalCenter
  .buy_settings
  .el-checkbox__input.is-indeterminate
  .el-checkbox__inner {
  background-color: #775563;
  border-color: #775563;
}
.PersonalCenter
  .buy_settings
  .el-checkbox__input.is-checked
  + .el-checkbox__label {
  color: #775563;
}

/* ****** 当前 messagebox 按钮 颜色 */
/* .el-button--primary { */
.el-message-box__btns button:nth-child(2) {
  color: #fff;
  background-color: #775563;
  border-color: #775563;
}
/* ***** el-select */
.PersonalCenter .el-select {
  width: 320px;
  border: 1px solid rgba(204, 193, 198, 1);
  margin-bottom: 5px;
}
.PersonalCenter .el-select .el-input__inner {
  border: 0;
  padding: 0 10px;
}

/* ***** 改变普通输入框input的placeholder 颜色 --对el-input无效(能改一个，使两者两者统一就行~) */
input::-webkit-input-placeholder {
  color: #c0c7da;
}
input::-moz-input-placeholder {
  color: #c0c7da;
}
input::-ms-input-placeholder {
  color: #c0c7da;
}

/* ****** 上传图片 */
.PersonalCenter .el-upload {
  width: 100px;
}
</style>

<style scoped>
/* ******* 用户资料 */
.PersonalCenter .left_pane_content {
  margin-left: 32px;
}
.PersonalCenter .ui_commonFont {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(65, 72, 93, 1);
}
.PersonalCenter .sTitle1 {
  margin-bottom: 16px;
}
.PersonalCenter .avatar_img_p {
  margin-bottom: 32px;
  width: 100px;
  height: 100px;
}
.PersonalCenter .avatar_img {
  width: 100px;
  height: 100px;
  border: 1px solid #f2f2f2;
  border-radius: 10px;
}
/* .PersonalCenter .avatar_img:hover {
  cursor: pointer;
} */
.PersonalCenter .avatar_img_edit {
  text-align: center;
  position: absolute;
  height: 20px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(119, 85, 99, 1) 100%
  );
  width: 101px;
  border-radius: 0 0 10px 10px;
  margin-top: -25px;
  color: #fff;
}
.PersonalCenter .avatar_img_edit:hover {
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
}

.PersonalCenter .sTitle2 {
  margin-bottom: 32px;
}
.PersonalCenter .ui_input_p {
  margin-bottom: 32px;
}

.PersonalCenter .ui_input {
  width: 300px;
  height: 42px;
  border-radius: 4px;
  border: 1px solid rgba(204, 193, 198, 1);
  text-indent: 10px;
}
.PersonalCenter .radio_box {
  margin-bottom: 56px;
}

.PersonalCenter .el-radio__input.is-checked .el-radio__inner {
  border-color: #775563;
  background: #775563;
}
.PersonalCenter .el-radio__input.is-checked + .el-radio__label {
  color: #775563;
}
.PersonalCenter .save_btn {
  width: 120px;
  height: 40px;
  background: rgba(119, 85, 99, 1);
  border-radius: 20px;
  border: 1px solid rgba(119, 85, 99, 1);
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}

/* ******* 收货地址 */
.PersonalCenter .address_title {
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(17, 26, 52, 1);
  line-height: 25px;

  margin-bottom: 32px;
}

.PersonalCenter .aa_commonFont {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(65, 72, 93, 1);
  line-height: 20px;
  padding: 13px 0 13px 16px;
  box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.07);
}
.PersonalCenter .aa_commonFont:hover {
  background: rgba(249, 249, 249, 1);
}
.PersonalCenter .aa_commonFont .operation {
  display: none;
  margin-left: 56px;
  margin-right: 16px;
  color: #45b0ff;
}
.PersonalCenter .aa_commonFont:hover .operation {
  display: inherit;
  display: inline-block;
  vertical-align: top;
}

.PersonalCenter .aa_commonFont .operation_font:hover {
  text-decoration: underline;
  cursor: pointer;
}
.PersonalCenter .aa_commonFont .operation_font2 {
  color: #ff4e18;
  margin-left: 16px;
}
.PersonalCenter .aa_commonFont .operation_font3 {
  color: #1fe72f;
  margin-left: 16px;
}
.PersonalCenter .default_font {
  width: 28px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(119, 85, 99, 1);
  line-height: 20px;
  margin-right: 16px;
}

/* ***** 对话框 */
.PersonalCenter .dialogContent {
  padding: 32px 0 0 0;
}
.PersonalCenter .dcPerRow {
  /* height: 42px; */
  line-height: 42px;
  margin-bottom: 32px;
}
.PersonalCenter .dc_sTtile {
  width: 100px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(17, 26, 52, 1);
  line-height: 20px;
  text-align: right;
  margin-right: 8px;
  margin-top: 11px;
}
.PersonalCenter .dc_input {
  width: 320px;
  height: 42px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(204, 193, 198, 1);
  text-indent: 10px;
}
.PersonalCenter .linkage {
  width: 320px;
  line-height: 42px;
}

.PersonalCenter .btn_save {
  width: 120px;
  height: 40px;
  background: rgba(119, 85, 99, 1);
  border-radius: 20px;
  border: 1px solid rgba(119, 85, 99, 1);

  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.PersonalCenter .checkBox_font {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(17, 26, 52, 1);
  line-height: 20px;
}

.PersonalCenter .btn_add_address {
  width: 120px;
  height: 40px;
  background: rgba(119, 85, 99, 1);
  border-radius: 20px;
  border: 1px solid rgba(119, 85, 99, 1);

  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  margin-top: 16px;
}
</style>
