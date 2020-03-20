<template>
  <div class="CheckOrderInformation height_auto">
    <vue-headful title="核对订单信息"></vue-headful>
    <el-header class="common">
      <HeaderModule id="navigation"></HeaderModule>
    </el-header>
    <el-main class="common">
      <TopSearchBox :searchType="'CheckOrderInformation'" :categories="[]"></TopSearchBox>

      <div class="textAlignCenter_w100p steps_settings">
        <el-steps :active="1" align-center>
          <el-step title="我的购物车" description></el-step>
          <el-step title="核对订单" description></el-step>
          <el-step title="提交订单" description></el-step>
        </el-steps>
      </div>

      <div class="textAlignCenter_w100p myShopping_settings">
        <div class="ms_title">确认收货地址</div>
        <div class="inlineBlock_verTopP address_all">
          <div class="inlineBlock_verTopP address_new_event">
            <div class="ade_left">收货人信息</div>
            <div @click="addressEditDialog('new')" class="ade_right">
              <i class="el-icon-plus"></i> 新增收货地址
            </div>
          </div>

          <div class="inlineBlock_verTopP address_change">
            <div class="adc_left">
              <span class="adc_font1">寄送至</span>
              <span class="adc_font2">
                {{ CheckedAddress }}
                <span v-show="default_radio == address_raido">默认地址</span>
              </span>
            </div>
            <div class="adc_right" @click="addressEditDialog('edit')">修改地址</div>
          </div>
          <div class="all_address">
            <el-radio-group v-model="address_raido" @change="radioChange">
              <template v-for="(item, index) in ALL_Address">
                <div class="perRadio" :key="index + 'ad'">
                  <el-radio :label="index">
                    <span class="address_detail">
                      {{ item.text }}&nbsp;({{ item.name }})&nbsp;{{
                      item.phone
                      }}
                    </span>
                  </el-radio>
                </div>
              </template>
            </el-radio-group>
          </div>
        </div>

        <div class="ms_title">确认订单信息</div>
        <div style="height:32px;"></div>
        <div class="ms_table">
          <el-table
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column header-align="center" label="商品" width="500">
              <template slot-scope="scope">
                <div class="inlineBlock_verTopP">
                  <div class="Shopping_img_p">
                    <img class="Shopping_img" :src="scope.row.ImgUrl" alt />
                  </div>
                  <div class="product_text">{{ scope.row.productInfo }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column header-align="center" label="单价" width="220">
              <template slot-scope="scope">
                <div>
                  <div class="m_unitPriceHistory">￥{{ scope.row.unitPriceHistory }}</div>
                  <div class="m_unitPrice">￥{{ scope.row.unitPrice }}</div>
                </div>
              </template>
            </el-table-column>

            <el-table-column header-align="center" label="数量" width="220">
              <template slot-scope="scope">
                <div class="m_count">{{ scope.row.count }}</div>
              </template>
            </el-table-column>
            <el-table-column header-align="center" label="总价" width="215">
              <template slot-scope="scope">
                <div>{{ scope.row.totalPrices }}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="inlineBlock_verTopP remark_p">
          <div class="remark">订单备注：</div>
          <div>
            <textarea v-model="OrderRemark" placeholder="给卖家留言" name id cols="50" rows="5"></textarea>
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
          <div class>
            <button class="m_btn1 m_btn1b" @click="router_to('/shoppingtrolley')">上一步</button>
            <button class="m_btn1 m_btn2 m_btn1b m_btn2b" @click="Settlement()">提交订单</button>
          </div>
        </div>
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
              <input v-model="u_name" class="dc_input" placeholder="请输入" type="text" />
            </div>
          </div>

          <div class="inlineBlock_verTopP dcPerRow">
            <div class="dc_sTtile">手机号码：</div>
            <div>
              <input v-model="u_phone" class="dc_input" placeholder="请输入" type="text" />
            </div>
          </div>

          <div class="inlineBlock_verTopP dcPerRow">
            <div class="dc_sTtile">收货地址：</div>
            <div>
              <div class="linkage">
                <el-select v-model="sheng" @change="choseProvince" placeholder="省级地区">
                  <el-option
                    v-for="item in province"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <br />
                <el-select v-model="shi" @change="choseCity" placeholder="市级地区">
                  <el-option
                    v-for="item in shi1"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <br />
                <el-select v-model="qu" @change="choseBlock" placeholder="区级地区">
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
              <input v-model="u_address" class="dc_input" placeholder="请输入" type="text" />
            </div>
          </div>
          <!-- <div class="buy_settings">
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

import m_city from "@/static/json/map.json";
import {
  refresh_token,
  orders,
  getAddressDefault,
  getAddressList,
  add_address,
  updateAddressById
} from "@/api/api";

export default {
  name: "CheckOrderInformation",
  components: {
    HeaderModule,
    TopSearchBox,
    FooterNav,
    FooterModule
  },
  data() {
    return {
      ALL_Address: [
        // {
        //   raido: 1,
        //   text: "上海上海市松江区人民胡同175号",
        //   name: "荀美东",
        //   phone: "13336793998"
        // },
        // {
        //   raido: 2,
        //   text: "福建省宁德市寿宁县自强大道141号",
        //   name: "优乐美",
        //   phone: "13666711172"
        // },
        // {
        // raido: i,
        // id: data[i].id, // 地址id  // 暂不用管 user_id
        // chooseType: data[i].default_address, // 是否默认 1-默认 0-不默认
        // // 省市区+详细地址
        // text: text,
        // province: data[i].province,
        // city: data[i].city,
        // district: data[i].district,
        // address: data[i].address,
        // name: data[i].contact_name,
        // phone: data[i].contact_phone,
        // zip: data[i].zip
        // }
      ],
      // CheckedAddress: "上海上海市松江区人民胡同175号（荀美东）13336793998",
      CheckedAddress: "",
      default_radio: 0,
      address_raido: 0,
      tableData: [
        // {
        //   ImgUrl: require("@/assets/pic/product.png"),
        //   productInfo: "李新建珠峰瑞祥, 2015布面油画",
        //   unitPriceHistory: 45415,
        //   unitPrice: 41213,
        //   inventory: 12,
        //   count: 1,
        //   totalPrices: 41213
        // },
        // {
        //   ImgUrl: require("@/assets/pic/product.png"),
        //   productInfo: "李新建珠峰瑞祥, 2015布面油画",
        //   unitPriceHistory: 45415,
        //   unitPrice: 41213,
        //   inventory: 12,
        //   count: 1,
        //   totalPrices: 41213
        // }
        // ///// 实际数据 （by ShoppingTrolley页）
        //  stock: good.stock,
        //     id: data[i].good_id,
        //     // id: data[i].id,
        //     ImgUrl: require("@/assets/pic/product.png"),
        //     productInfo:
        //       good.art +
        //       "," +
        //       good.title +
        //       "," +
        //       good.created_at +
        //       "," +
        //       good.quality,
        //     inventory: good.stock,
        //     count: data[i].amount,
        //     unitPriceHistory: good.price,
        //     unitPrice: Number(good.price) * Number(good.discount),
        //     totalPrices: data[i].amount * Number(good.price),
        //     operation: "删除"
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
      zip_quArr: [],
      ifFirst: true,
      OrderRemark: "", // 订单备注
      freight: 0, // 运费
      totalValue: 82426 // 商品总价(不含运费)
    };
  },
  created() {
    this.getCityData();
  },
  mounted() {
    let vm = this;
    // 标题title浮动初始化
    this.$Utils.TitleInit();
    // 商品数据
    let temp_tableData = JSON.parse(this.$route.query.tableData);
    console.log(temp_tableData);
    let length = temp_tableData.length;
    for (let i = 0; i < length; i++) {
      vm.tableData.push(temp_tableData[i]);
    }
    // 总费用 = 商品总价(不含运费)
    vm.totalValue = this.$route.query.totalValue;
    // 运费 --待后台返回 （freight）

    setTimeout(function() {
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
                vm.getAddressDefault(); //获取默认地址
                vm.getAddressList(); // 获取用户地址列表
              }, 100);
            }
          })
          .catch(function(error) {
            console.info(error);
          });
      }
    }, 100);
  },

  methods: {
    AddressSave() {
      let vm = this;
      let token = vm.$Utils.getCookie("user_token");
      let newToken = token.replace('"', "").replace('"', "");

      if (this.$UninputJudgment(vm.u_name, "请输入收货人姓名！")) {
        return;
      }
      if (this.$PhoneJudgment(vm.u_phone, "请输入正确的手机号码！")) {
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
      if (this.$UninputJudgment(vm.u_address, "请输入详细地址")) {
        return;
      }
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

      // let id = vm.assignAddressId;
      let id = vm.ALL_Address[vm.address_raido].id;
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
            vm.getAddressDefault(); //获取默认地址
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
            vm.getAddressDefault(); //获取默认地址
            vm.getAddressList(); // 获取用户地址列表
          }
        })
        .catch(function(error) {
          console.info(error);
        });
    },
    // 编辑地址 - 对话框初始化
    addressEditDialog(addressType) {
      let vm = this;
      // addressType - 地址类型 "new"-新增  "edit"-编辑
      if (addressType == "edit") {
        let M_Data = vm.ALL_Address[vm.address_raido];
        this.dialogVisible = true;
        this.ifNewAddress = false;
        this.addressEditType = "编辑";

        this.u_name = M_Data.name;
        this.u_phone = M_Data.phone;
        this.sheng = M_Data.province;
        this.shi = M_Data.city;
        this.qu = M_Data.district;
        this.u_address = M_Data.address;
        // console.log(chooseType);
        // this.ifChoosel_checkbox = chooseType;
        this.zip = M_Data.zip;
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
        this.zip = null;
      }
    },
    radioChange(e) {
      console.log(e);
      let vm = this;
      vm.CheckedAddressManage(e);
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
            vm.ALL_Address = []; // 地址初始化
            let data = response.data.data;
            let currentDefault_i = 0;
            for (let i = 0; i < data.length; i++) {
              if (data[i].default_address == 1) {
                // 默认地址 i
                currentDefault_i = i;
              }
              let text =
                data[i].province +
                data[i].city +
                data[i].district +
                data[i].address;
              vm.ALL_Address.push({
                raido: i,
                id: data[i].id, // 地址id  // 暂不用管 user_id
                chooseType: data[i].default_address, // 是否默认 1-默认 0-不默认
                // 省市区+详细地址
                text: text,
                province: data[i].province,
                city: data[i].city,
                district: data[i].district,
                address: data[i].address,
                name: data[i].contact_name,
                phone: data[i].contact_phone,
                zip: data[i].zip
              });
            }
            // --只有第一次会添加！
            if (vm.ifFirst == true) {
              vm.CheckedAddressManage(currentDefault_i);
              vm.default_radio = currentDefault_i; // 默认 radio （之后不变动）
              vm.address_raido = currentDefault_i; // 显示 radio （之后会变动）
              vm.ifFirst = false;
            }
            vm.CheckedAddressManage(vm.address_raido); // 修改当前显示的
            // console.log(vm.AddressArr);
            // 默认地址-置顶操作ing  --- 待优化
          }
        })
        .catch(function(error) {
          console.info(error);
        });
    },
    // CheckedAddress 显示处理
    CheckedAddressManage(currentDefault_i) {
      let vm = this;
      vm.CheckedAddress =
        vm.ALL_Address[currentDefault_i].text +
        "" +
        "（" +
        vm.ALL_Address[currentDefault_i].name +
        "）" +
        "" +
        vm.ALL_Address[currentDefault_i].phone;
    },
    getAddressDefault() {
      let vm = this;
      let token = vm.$Utils.getCookie("user_token");
      let newToken = token.replace('"', "").replace('"', "");
      getAddressDefault(newToken)
        .then(function(response) {
          console.log("getAddressDefault");
          console.log(response);
          if (response.status == 200) {
            vm.AddressDefaultId = response.data.id;
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
    Settlement() {
      let vm = this;

      // 结算
      let token = vm.$Utils.getCookie("user_token");
      let newToken = token.replace('"', "").replace('"', "");
      if (vm.$TokenJudgment(token)) {
        refresh_token(newToken)
          .then(function(response) {
            console.log(response);
            if (response.status == 200) {
              vm.$Utils.setCookie(
                "user_token",
                JSON.stringify(response.data.access_token),
                60
              );
              setTimeout(function() {
                let token = vm.$Utils.getCookie("user_token");
                let newToken = token.replace('"', "").replace('"', "");
                let temp_address_id = "";
                try {
                  temp_address_id = vm.ALL_Address[vm.address_raido].id;
                } catch (error) {
                  console.log(error);
                  vm.$message("请新增地址！");
                  return;
                }
                // let temp_good_ids = [[3, 29, 3, 1]]; // pass
                // let temp_good_ids = "34,36";
                let temp_good_ids = "";
                let ProductData_length = vm.tableData.length;
                for (let i = 0; i < ProductData_length; i++) {
                  if (i < ProductData_length - 1) {
                    temp_good_ids += String(vm.tableData[i].id) + ",";
                  } else {
                    temp_good_ids += String(vm.tableData[i].id);
                  }
                }
                console.log("提交订单-参数");
                console.log(temp_address_id);
                console.log(temp_good_ids);
                console.log(vm.OrderRemark);

                if (
                  temp_address_id == "" ||
                  temp_address_id == undefined ||
                  temp_address_id == null
                ) {
                  // vm.$message("请新增地址！");
                  return;
                }

                var formData = new FormData();
                var formData = new window.FormData();
                formData.append("address_id", temp_address_id);
                formData.append("good_ids", temp_good_ids);
                formData.append("remark", vm.OrderRemark);
                orders(newToken, formData)
                  .then(function(response) {
                    console.log("orders");
                    console.log(response);
                    if (response.status == 201) {
                      vm.$message("提交订单成功,即将跳转支付页面");
                      setTimeout(function() {
                        // data:
                        //   address: {address: "江苏省南京市玄武区南路12号", zip: "320102", contact_name: "willem", contact_phone: "147852777"}
                        //   created_at: "2020-03-10 15:12:04"
                        //   id: 3
                        //   no: "20200310151203926273"
                        //   remark: null
                        //   total_amount: 0.03
                        //   updated_at: "2020-03-10 15:12:04"
                        //   user: {id: 1, name: "yiduang", phone: "18742257174", avatar: "https://cdn.learnku.com/uploads/images/201710/30/1/TrJS40Ey5k.png", created_at: "2009-05-18 15:02:08", …}
                        //   user_id: 1
                        let data = response.data;
                        let temp_receiver =
                          vm.ALL_Address[vm.address_raido].name;
                        let temp_phone = vm.ALL_Address[vm.address_raido].phone;
                        let temp_shippingAddress =
                          vm.ALL_Address[vm.address_raido].text;

                        vm.$router.push({
                          path: "/OrderDetails",
                          query: {
                            ifShopping: true,
                            OrderId: data.id,
                            OrderNumber: data.no,
                            OrderRemark: vm.OrderRemark,
                            receiver: temp_receiver,
                            shippingAddress: temp_shippingAddress,
                            phone: temp_phone,
                            totalValue: vm.totalValue,
                            freight: vm.freight,
                            tableData: JSON.stringify(vm.tableData)
                          }
                        });
                      }, 1500);
                    }
                  })
                  .catch(function(error) {
                    vm.$message("提交订单失败,请重试");
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
/* ***** 进度条 */
.CheckOrderInformation .el-step__head.is-finish {
  color: #775563;
  border-color: #775563;
}
.CheckOrderInformation .el-step__title.is-finish {
  color: #775563;
}
/* ***** 表格 table */
.CheckOrderInformation .el-table td {
  text-align: center;
}
/* ***** 表格 checkbox */
.CheckOrderInformation .el-checkbox__input.is-checked .el-checkbox__inner,
.CheckOrderInformation
  .el-checkbox__input.is-indeterminate
  .el-checkbox__inner {
  background-color: #775563;
  border-color: #775563;
}
/* ***** 对话框 */
.CheckOrderInformation .el-dialog {
  width: 720px !important;
  height: 650px;
}

.CheckOrderInformation .el-dialog__title {
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(17, 26, 52, 1);
  line-height: 25px;
}
.CheckOrderInformation .el-dialog__header {
  border: 1px solid #e2e2e2;
}
.CheckOrderInformation .el-dialog__footer {
  text-align: center;
}

/* ***** checkbox 单独 */
.CheckOrderInformation
  .buy_settings
  .el-checkbox__input.is-checked
  .el-checkbox__inner,
.CheckOrderInformation
  .buy_settings
  .el-checkbox__input.is-indeterminate
  .el-checkbox__inner {
  background-color: #775563;
  border-color: #775563;
}
.CheckOrderInformation
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
.CheckOrderInformation .el-select {
  width: 320px;
  border: 1px solid rgba(204, 193, 198, 1);
  margin-bottom: 5px;
}
.CheckOrderInformation .el-select .el-input__inner {
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
</style>

<style scoped>
.CheckOrderInformation {
}

/* ***** 进度条 */
.CheckOrderInformation .steps_settings {
  margin-top: 32px;
  margin-bottom: 32px;
}

/* ***** 确认收货地址 */
.CheckOrderInformation .myShopping_settings {
  text-align: left;
}
.CheckOrderInformation .address_all {
  /* width: 100%; */
  margin-bottom: 56px;
}

.CheckOrderInformation .address_new_event {
  width: 100%;
  padding: 20px 0 8px 16px;
  border-bottom: 1px solid #e2e2e2;
}

.CheckOrderInformation .ms_title {
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(17, 26, 52, 1);
  line-height: 25px;
  margin-bottom: 12px;
  text-align: left;
}
.CheckOrderInformation .ade_right {
  /* margin-left: 80%; */
  position: relative;
  left: 984px;
  color: #775563;
}
.CheckOrderInformation .ade_right:hover {
  cursor: pointer;
}

.CheckOrderInformation .address_change {
  width: 100%;
  padding: 32px 0 16px 32px;
  height: 25px;
  border-bottom: 1px solid #e2e2e2;
}

.CheckOrderInformation .adc_font1 {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(65, 72, 93, 1);
  line-height: 20px;
}
.CheckOrderInformation .adc_font2 {
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(17, 26, 52, 1);
  line-height: 25px;
}
.CheckOrderInformation .adc_right {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(119, 85, 99, 1);
  line-height: 20px;
  width: 100px;

  /* margin-left: 20%; */
  position: relative;
  left: 508px;
}
.CheckOrderInformation .adc_right:hover {
  cursor: pointer;
}
.CheckOrderInformation .all_address {
  padding-left: 32px;
}
.CheckOrderInformation .address_detail {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(65, 72, 93, 1);
  line-height: 20px;
}
.CheckOrderInformation .perRadio {
  margin-top: 16px;
}

.CheckOrderInformation .payfor_btns {
  margin-bottom: 56px;
}
.CheckOrderInformation .m_btn1 {
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
.CheckOrderInformation .m_btn1b {
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
.CheckOrderInformation .m_btn2 {
  background: rgba(119, 85, 99, 1);
  color: rgba(255, 255, 255, 1);
  margin-left: 56px;
}

.CheckOrderInformation .m_btn2b {
  margin-left: 32px;
}

/* **** table 相关 */
.CheckOrderInformation .ms_table {
  margin-bottom: 13px;
}
.CheckOrderInformation .Shopping_img_p {
  margin: 20px 16px 20px 0;
}

.CheckOrderInformation .Shopping_img {
  width: 80px;
  height: 80px;
}
.CheckOrderInformation .product_text {
  margin-top: 8%;
  width: 155px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(17, 26, 52, 1);
  line-height: 20px;
  text-align: justify;
}
.CheckOrderInformation .m_unitPriceHistory {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(197, 202, 213, 1);
  line-height: 20px;
  text-decoration: line-through;
  margin-bottom: 3px;
}
.CheckOrderInformation .m_unitPrice {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(17, 26, 52, 1);
  line-height: 20px;
}
.CheckOrderInformation .remark_p {
  margin-top: 32px;
}
.CheckOrderInformation .remark {
  /* height: 20px; */
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(17, 26, 52, 1);
  line-height: 20px;
}
.CheckOrderInformation textarea {
  text-indent: 5px;
}

/* **** 购物over */
.CheckOrderInformation .shopping_over {
  text-align: right;
}
.CheckOrderInformation .soa1 {
  height: 25px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(65, 72, 93, 1);
  line-height: 20px;
  margin-bottom: 2px;
}
.CheckOrderInformation .sob1 {
  margin-bottom: 32px;
}
.CheckOrderInformation .soa2 {
  color: #775563;
}
.CheckOrderInformation .soa3 {
  font-size: 18px;
  color: #775563;
}

/* ***** 对话框 */
.CheckOrderInformation .dialogContent {
  padding: 32px 0 0 0;
}
.CheckOrderInformation .dcPerRow {
  /* height: 42px; */
  line-height: 42px;
  margin-bottom: 32px;
}
.CheckOrderInformation .dc_sTtile {
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
.CheckOrderInformation .dc_input {
  width: 320px;
  height: 42px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(204, 193, 198, 1);
  text-indent: 10px;
}
.CheckOrderInformation .linkage {
  width: 320px;
  line-height: 42px;
}

.CheckOrderInformation .btn_save {
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
.CheckOrderInformation .checkBox_font {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(17, 26, 52, 1);
  line-height: 20px;
}
</style>
