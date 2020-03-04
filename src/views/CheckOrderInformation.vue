<template>
  <div class="CheckOrderInformation">
    <vue-headful title="核对订单信息"></vue-headful>
    <el-header class="common">
      <HeaderModule></HeaderModule>
    </el-header>
    <el-main>
      <TopSearchBox></TopSearchBox>

      <div class="textAlignCenter_w100p steps_settings">
        <el-steps :active="1" align-center>
          <el-step title="我的购物车" description></el-step>
          <el-step title="核对订单" description></el-step>
          <el-step title="成功提交订单" description></el-step>
        </el-steps>
      </div>

      <div class="textAlignCenter_w100p myShopping_settings">
        <div class="ms_title">确认收货地址</div>
        <div class="inlineBlock_verTopP address_all">
          <div class="inlineBlock_verTopP address_new_event">
            <div class="ade_left">收货人信息</div>
            <div @click="dialogVisible = true" class="ade_right">
              <i class="el-icon-plus"></i> 新增收货地址
            </div>
          </div>

          <div class="inlineBlock_verTopP address_change">
            <div class="adc_left">
              <span class="adc_font1">寄送至</span>
              <span class="adc_font2">上海上海市松江区人民胡同175号（荀美东）13336793998 默认地址</span>
            </div>
            <div class="adc_right">修改地址</div>
          </div>
          <div class="all_address">
            <el-radio-group v-model="address_raido">
              <template v-for="(item,index) in ALL_Address">
                <div class="perRadio" :key="index+ 'ad'">
                  <el-radio :label="index">
                    <span
                      class="address_detail"
                    >{{item.text}}&nbsp;({{item.name}})&nbsp;{{item.phone}}</span>
                  </el-radio>
                </div>
              </template>
            </el-radio-group>
          </div>
        </div>

        <div class="ms_title">选择支付方式</div>
        <div style="height:32px;"></div>
        <div class="payfor_btns">
          <button class="m_btn1">在线支付</button>
          <button class="m_btn1 m_btn2">货到付款</button>
        </div>
        <div class="ms_title">确认订单信息</div>
        <div style="height:32px;"></div>
        <div class="ms_table">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column header-align="center" label="商品" width="500">
              <template slot-scope="scope">
                <div class="inlineBlock_verTopP">
                  <div class="Shopping_img_p">
                    <img class="Shopping_img" :src="scope.row.ImgUrl " alt />
                  </div>
                  <div class="product_text">{{ scope.row.productInfo }}</div>
                </div>
                <div class="inlineBlock_verTopP">
                  <div class="remark">订单备注：</div>
                  <div>
                    <textarea placeholder="给卖家留言" name id cols="30" rows="5"></textarea>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column header-align="center" label="单价" width="200">
              <template slot-scope="scope">
                <div>
                  <div class="m_unitPriceHistory">￥{{ scope.row.unitPriceHistory }}</div>
                  <div class="m_unitPrice">￥{{ scope.row.unitPrice }}</div>
                </div>
              </template>
            </el-table-column>

            <el-table-column header-align="center" label="数量" width="200">
              <template slot-scope="scope">
                <div class="m_count">{{ scope.row.count }}</div>
              </template>
            </el-table-column>
            <el-table-column header-align="center" label="总价" width="200">
              <template slot-scope="scope">
                <div>{{ scope.row.totalPrices }}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="shopping_over">
          <div class="soa1">
            <span>运费：</span>
            <span class="soa2">￥</span>
            <span class="soa3">0</span>
          </div>
          <div class="soa1 sob1">
            <span>应付总金额（含运费）：</span>
            <span class="soa2">￥</span>
            <span class="soa3">82,426</span>
          </div>
          <div class>
            <button class="m_btn1 m_btn1b">上一步</button>
            <button class="m_btn1 m_btn2 m_btn1b m_btn2b">提交订单</button>
          </div>
        </div>
      </div>

      <!-- 对话框 -->
      <el-dialog title="收货地址" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <div class="textAlignCenter_w100p dialogContent">
          <div class="inlineBlock_verTopP dcPerRow">
            <div class="dc_sTtile">收货人姓名：</div>
            <div>
              <input class="dc_input" placeholder="请输入" type="text" />
            </div>
          </div>

          <div class="inlineBlock_verTopP dcPerRow">
            <div class="dc_sTtile">电话号码：</div>
            <div>
              <input class="dc_input" placeholder="请输入" type="text" />
            </div>
          </div>

          <div class="inlineBlock_verTopP dcPerRow">
            <div class="dc_sTtile">收货地址：</div>
            <div>
              <!-- <input class="dc_input" placeholder="请输入" type="text" /> -->
              <!-- <select class="my_select" :value="province" onChange="this.provinceChange">
                <option key="test-positionChange" defaultValue="selected">请选择</option>
                <template v-for="(item,index) in provinceS">
                  <option :key="'ps' + index" :value="item.label">{{item.label}}</option>
                </template>
              </select>
              <select class="my_select" :value="city" @Change="cityChange">
                <option key="test-positionChange2" defaultValue="selected">请选择</option>
                <template v-for="(item,index) in cityS">
                  <option :key="'cs' + index" :value="item">{{item}}</option>
                </template>
              </select>-->
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
              <input class="dc_input" placeholder="请输入" type="text" />
            </div>
          </div>

          <div class="buy_settings">
            <el-checkbox v-model="ifChoosel_checkbox">
              <span class="checkBox_font">设为默认收货地址</span>
            </el-checkbox>
          </div>
        </div>
        <span slot="footer">
          <button class="btn_save" @click="dialogVisible = false">保存</button>
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

import { city, data_positionS, data_provinceS } from "@/utils/mydata.js";
import axios from "axios";
// import { m_city } from "@/static/json/map.js";
import m_city from "@/static/json/map.json";

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
        {
          raido: 1,
          text: "上海上海市松江区人民胡同175号",
          name: "荀美东",
          phone: "13336793998"
        },
        {
          raido: 2,
          text: "福建省宁德市寿宁县自强大道141号",
          name: "优乐美",
          phone: "13666711172"
        }
      ],
      address_raido: 1,
      tableData: [
        {
          ImgUrl: require("@/assets/pic/product.png"),
          productInfo: "李新建珠峰瑞祥, 2015布面油画",
          unitPriceHistory: 45415,
          unitPrice: 41213,
          inventory: 12,
          count: 1,
          totalPrices: 41213
        },
        {
          ImgUrl: require("@/assets/pic/product.png"),
          productInfo: "李新建珠峰瑞祥, 2015布面油画",
          unitPriceHistory: 45415,
          unitPrice: 41213,
          inventory: 12,
          count: 1,
          totalPrices: 41213
        }
      ],
      dialogVisible: false,
      ifChoosel_checkbox: false,
      // 省市区
      // provinceS: data_provinceS,
      // cityS: [],
      // province: "请选择省",
      // city: "请选择市"
      mapJson: "../static/json/map.json",
      province: "",
      sheng: "",
      shi: "",
      shi1: [],
      qu: "",
      qu1: [],
      city: "",
      block: ""
    };
  },
  mounted() {
    let vm = this;
  },
  created() {
    this.getCityData();
  },
  methods: {
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
    provinceChange(e) {
      let value = e.target.value;
      this.province = value;
      console.log(e);

      //////////////////处理 city
      let tempData = city;
      // 将Object的属性输出成Array
      function objOfPropertyToArr(object) {
        var arr = [];
        var i = 0;
        for (var item in object) {
          arr[i] = item;
          i++;
        }
        return arr;
      }
      // 将Object的属性值输出成Array
      function objOfValueToArr(object) {
        var arr = [];
        var i = 0;
        for (var item in object) {
          arr[i] = object[item];
          i++;
        }
        return arr;
      }
      let temp = objOfPropertyToArr(tempData);
      let temp2 = objOfValueToArr(tempData);
      let i;
      let length = temp.length;
      let tem;
      let temp_data_cityS = [];
      for (i = 0; i < length; i++) {
        let jsonTest = JSON.stringify(temp2[i]);
        if (jsonTest === "[]") {
          continue;
        } else {
          try {
            tem = {
              provinceName: temp[i],
              CityNameArr: temp2[i]
            };
            temp_data_cityS.push(tem);
          } catch (error) {
            console.log(error);
          }
        }
      } //for
      let k;
      for (k = 0; k < length; k++) {
        if (temp_data_cityS[k].provinceName === value) {
          // this.setState({ cityS: temp_data_cityS[k].CityNameArr });
          this.cityS = temp_data_cityS[k].CityNameArr;
        }
      }
      console.log(this.cityS);
    },
    cityChange(e) {
      let value = e.target.value;
      this.city = value;
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
            value: data[item],
            children: []
          });
        } else if (item.match(/00$/)) {
          //市
          that.city.push({ id: item, value: data[item], children: [] });
        } else {
          //区
          that.block.push({ id: item, value: data[item] });
        }
      }
      // 分类市级
      for (var index in that.province) {
        for (var index1 in that.city) {
          if (
            that.province[index].id.slice(0, 2) ===
            that.city[index1].id.slice(0, 2)
          ) {
            that.province[index].children.push(that.city[index1]);
          }
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
      for (var index2 in this.province) {
        if (e === this.province[index2].id) {
          this.shi1 = this.province[index2].children;
          this.shi = this.province[index2].children[0].value;
          this.qu1 = this.province[index2].children[0].children;
          this.qu = this.province[index2].children[0].children[0].value;
          this.E = this.qu1[0].id;
        }
      }
    },
    // 选市
    choseCity: function(e) {
      for (var index3 in this.city) {
        if (e === this.city[index3].id) {
          this.qu1 = this.city[index3].children;
          this.qu = this.city[index3].children[0].value;
          this.E = this.qu1[0].id;
          // console.log(this.E)
        }
      }
    },
    // 选区
    choseBlock: function(e) {
      this.E = e;
      // console.log(this.E)
    }
  }
};
</script>





<style >
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

/* ***** checkbox 全选 单独 */
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

.el-main {
  width: 62.5%;
  min-width: 1200px;
  margin: 0 auto;
  padding: 0;
  overflow: inherit;
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

