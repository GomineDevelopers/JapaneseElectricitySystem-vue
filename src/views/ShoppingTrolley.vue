<template>
  <div class="ShoppingTrolley">
    <vue-headful title="购物车"></vue-headful>
    <el-header  class="common">
      <HeaderModule></HeaderModule>
    </el-header>
    <el-main>
      <TopSearchBox></TopSearchBox>

      <div class="textAlignCenter_w100p steps_settings">
        <el-steps :active="0" align-center>
          <el-step title="我的购物车" description></el-step>
          <el-step title="核对订单" description></el-step>
          <el-step title="成功提交订单" description></el-step>
        </el-steps>
      </div>
      <div class="textAlignCenter_w100p myShopping_settings">
        <div class="ms_title">我的购物车</div>
        <div class="ms_table">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column header-align="center" label="商品" width="360">
              <template slot-scope="scope">
                <div class="inlineBlock_verTopP">
                  <div class="Shopping_img_p">
                    <img class="Shopping_img" :src="scope.row.ImgUrl " alt />
                  </div>
                  <div class="product_text">{{ scope.row.productInfo }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column header-align="center" label="单价" width="150">
              <template slot-scope="scope">
                <div>
                  <div class="m_unitPriceHistory">￥{{ scope.row.unitPriceHistory }}</div>
                  <div class="m_unitPrice">￥{{ scope.row.unitPrice }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column header-align="center" label="库存" width="150">
              <template slot-scope="scope">
                <div>{{ scope.row.inventory }}</div>
              </template>
            </el-table-column>
            <el-table-column header-align="center" label="数量" width="180">
              <template slot-scope="scope">
                <div class="pir_count_Count">
                  <!-- {{ scope.row.count }} -->
                  <el-input-number
                    v-model="scope.row.count"
                    @change="handleChange"
                    :min="1"
                    :max="99"
                    label="商品数量"
                  ></el-input-number>
                </div>
              </template>
            </el-table-column>
            <el-table-column header-align="center" label="总价" width="150">
              <template slot-scope="scope">
                <div>{{ scope.row.totalPrices }}</div>
              </template>
            </el-table-column>
            <el-table-column header-align="center" label="操作" width="150">
              <template slot-scope="scope">
                <div class="m_operation">{{ scope.row.operation }}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="textAlignCenter_w100p inlineBlock_verTopP buy_settings">
        <div class="inlineBlock_verTopP bs_left">
          <div class="bsl_1">
            <el-checkbox v-model="ifChoosel_checkbox">全选</el-checkbox>
          </div>
          <div class="bsl_2">删除</div>
        </div>
        <div class="inlineBlock_verTopP bs_right">
          <div class="bsr_1">
            应付总金额（不含运费）：
            <span class="bsr_1b">¥</span>
            <span class="bsr_1c">41,213</span>
          </div>
          <div class="bsr_2">
            <button class="bs_btn">结算</button>
          </div>
        </div>
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

export default {
  name: "ShoppingTrolley",
  components: {
    HeaderModule,
    TopSearchBox,
    FooterNav,
    FooterModule
  },
  data() {
    return {
      tableData: [
        {
          ImgUrl: require("@/assets/pic/product.png"),
          productInfo: "李新建珠峰瑞祥, 2015布面油画",
          unitPriceHistory: 45415,
          unitPrice: 41213,
          inventory: 12,
          count: 1,
          totalPrices: 41213,
          operation: "删除"
        },
        {
          ImgUrl: require("@/assets/pic/product.png"),
          productInfo: "李新建珠峰瑞祥, 2015布面油画",
          unitPriceHistory: 45415,
          unitPrice: 41213,
          inventory: 12,
          count: 1,
          totalPrices: 41213,
          operation: "删除"
        }
      ],
      multipleSelection: [],
      ifChoosel_checkbox: false
    };
  },
  mounted() {
    let vm = this;
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
<style >
/* ***** 进度条 */
.ShoppingTrolley .el-step__head.is-finish {
  color: #775563;
  border-color: #775563;
}
.ShoppingTrolley .el-step__title.is-finish {
  color: #775563;
}
/* ***** 表格 table */
.ShoppingTrolley .el-table td {
  text-align: center;
}
/* ***** 表格 checkbox */
.ShoppingTrolley .el-checkbox__input.is-checked .el-checkbox__inner,
.ShoppingTrolley .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #775563;
  border-color: #775563;
}

/* ***** 计数器 样式 */
.ShoppingTrolley .el-input-number {
  width: 88px;
}
.ShoppingTrolley .pir_count_Count {
  height: 30px;
  line-height: 30px;
}
.ShoppingTrolley .pir_count_Count div,
.ShoppingTrolley .pir_count_Count span,
.ShoppingTrolley .pir_count_Count i,
.ShoppingTrolley .pir_count_Count input {
  height: 17px;
  line-height: 17px;
}
.ShoppingTrolley .pir_count_Count .el-input-number .el-input,
.ShoppingTrolley .el-input-number .el-input__inner {
  height: 20px;
  line-height: 20px;
  border: 0;
  padding: 0;
}
.ShoppingTrolley .el-input-number__decrease {
  border-radius: 100px;
  height: 18px !important;
  width: 18px !important;
  color: #775563;
  background-color: #fff;
  border: 1px #c5cad5 solid;
  font-weight: bold;
}
.ShoppingTrolley .el-input-number__increase {
  border-radius: 100px;
  height: 18px !important;
  width: 18px !important;
  color: #fff;
  background-color: #775563;
  border: 1px #775563 solid;
  font-weight: bold;
}

/* ***** checkbox 全选 单独 */
.ShoppingTrolley
  .buy_settings
  .el-checkbox__input.is-checked
  .el-checkbox__inner,
.ShoppingTrolley
  .buy_settings
  .el-checkbox__input.is-indeterminate
  .el-checkbox__inner {
  background-color: #775563;
  border-color: #775563;
}
.ShoppingTrolley
  .buy_settings
  .el-checkbox__input.is-checked
  + .el-checkbox__label {
  color: #775563;
}
</style>

<style scoped>
.ShoppingTrolley {
}

.el-main {
  width: 62.5%;
  min-width: 1200px;
  margin: 0 auto;
  padding: 0;
  overflow: inherit;
}

/* ***** 进度条 */
.ShoppingTrolley .steps_settings {
  margin-top: 32px;
  margin-bottom: 32px;
}
/* ***** 我的购物车 */
.ShoppingTrolley .ms_title {
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(17, 26, 52, 1);
  line-height: 25px;
  margin-bottom: 12px;
  text-align: left;
}
.myShopping_settings {
  margin-bottom: 32px;
}

/* ***** 购买操作 */
.ShoppingTrolley .buy_settings {
  height: 48px;
  line-height: 48px;
}
.ShoppingTrolley .Shopping_img_p {
  margin: 20px 16px 20px 0;
}

.ShoppingTrolley .Shopping_img {
  width: 120px;
  height: 120px;
}
.ShoppingTrolley .product_text {
  margin-top: 18%;
  width: 155px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(17, 26, 52, 1);
  line-height: 20px;
  text-align: justify;
}
.ShoppingTrolley .m_unitPriceHistory {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(197, 202, 213, 1);
  line-height: 20px;
  text-decoration: line-through;
  margin-bottom: 3px;
}
.ShoppingTrolley .m_unitPrice {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(17, 26, 52, 1);
  line-height: 20px;
}
.ShoppingTrolley .m_operation:hover {
  color: #ff260a;
  text-decoration: underline;
  cursor: pointer;
}

/* **** 下方购买操作 */
.ShoppingTrolley .bs_left {
  /* height: 20px; */
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(65, 72, 93, 1);
  line-height: 20px;
  height: 48px;
  line-height: 48px;
}
.ShoppingTrolley .bs_right {
  height: 48px;
  line-height: 48px;
  margin-left: 58%;
}

.ShoppingTrolley .bsl_1 {
  width: 60px;
  height: 48px;
  line-height: 48px;
}
.ShoppingTrolley .bsl_2 {
  width: 60px;
  height: 48px;
  line-height: 48px;
}
.ShoppingTrolley .bsl_2:hover {
  color: #ff260a;
  text-decoration: underline;
  cursor: pointer;
}
.ShoppingTrolley .bsr_1 {
  /* width: 229px; */
  height: 25px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(65, 72, 93, 1);
  line-height: 20px;
  height: 48px;
  line-height: 48px;
  margin-right: 16px;
}
.ShoppingTrolley .bsr_1b {
  color: #775563;
  font-size: 14px;
}
.ShoppingTrolley .bsr_1c {
  color: #775563;
  font-size: 18px;
}
.ShoppingTrolley .bs_btn {
  width: 120px;
  height: 40px;
  background: rgba(119, 85, 99, 1);
  border-radius: 20px;
  border: 1px solid rgba(119, 85, 99, 1);
  color: #fff;
}
</style>

