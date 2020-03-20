<template>
  <div class="ShoppingTrolley height_auto">
    <vue-headful title="购物车"></vue-headful>
    <el-header class="common">
      <HeaderModule id="navigation"></HeaderModule>
    </el-header>
    <el-main class="common">
      <TopSearchBox :searchType="'ShoppingTrolley'" :categories="[]"></TopSearchBox>

      <div class="textAlignCenter_w100p steps_settings">
        <el-steps :active="0" align-center>
          <el-step title="我的购物车" description></el-step>
          <el-step title="核对订单" description></el-step>
          <el-step title="提交订单" description></el-step>
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
                    <img class="Shopping_img" :src="scope.row.ImgUrl" alt />
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
                    @change="handleChange($event, scope.row.id)"
                    :min="1"
                    :max="Number(scope.row.stock)"
                    label="商品数量"
                  ></el-input-number>
                </div>
              </template>
            </el-table-column>
            <el-table-column header-align="center" label="总价" width="150">
              <template slot-scope="scope">
                <!-- <div>{{ scope.row.totalPrices.toFixed(2) }}</div> -->
                <!-- <div>{{ scope.row.count * scope.row.unitPrice }}</div> -->
                <div>{{ (scope.row.count * scope.row.unitPrice).toFixed(2) }}</div>
              </template>
            </el-table-column>
            <el-table-column header-align="center" label="操作" width="150">
              <template slot-scope="scope">
                <div
                  @click="deleteProduct(scope.row.id)"
                  class="m_operation"
                >{{ scope.row.operation }}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="textAlignCenter_w100p inlineBlock_verTopP buy_settings">
        <!-- <div class="inlineBlock_verTopP bs_left">
          <div class="bsl_1">
            <el-checkbox
              @change="ChooseCheckboxManage(ifChoosel_checkbox)"
              v-model="ifChoosel_checkbox"
            >全选</el-checkbox>
          </div>
          <div class="bsl_2">删除</div>
        </div>-->

        <div class="inlineBlock_verTopP bs_right">
          <div class="bsr_1">
            应付总金额（不含运费）：
            <span class="bsr_1b">¥</span>
            <span class="bsr_1c">{{ totalValue }}</span>
          </div>
          <div class="bsr_2">
            <button v-show="ifOk" @click="Settlement()" class="bs_btn">下一步</button>
            <button v-show="!ifOk" class="bs_btn bs_btn2">下一步</button>
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
import Vue from "vue";

import {
  refresh_token,
  getCartList,
  deleteProductById,
  // updateProductById
  addToCart,
  orders,
  getCartIndexArr
} from "@/api/api";

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
        // {
        //   ImgUrl: require("@/assets/pic/product.png"),
        //   productInfo: "李新建珠峰瑞祥, 2015布面油画",
        //   unitPriceHistory: 45415,
        //   unitPrice: 41213,
        //   inventory: 12,
        //   count: 1,
        //   totalPrices: 41213,
        //   operation: "删除"
        // },
        // {
        //   ImgUrl: require("@/assets/pic/product.png"),
        //   productInfo: "李新建珠峰瑞祥, 2015布面油画",
        //   unitPriceHistory: 45415,
        //   unitPrice: 41213,
        //   inventory: 12,
        //   count: 1,
        //   totalPrices: 41213,
        //   operation: "删除"
        // }
        // ///// 实际数据
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
      multipleSelection: [],
      ifChoosel_checkbox: false,
      totalValue: 0,
      CurrentCartIndexArr: [],
      // 定时Door
      // 时间优化 2~3s 定时1s 自减1 => 300ms 定时100ms  自减100s
      timing: 100, // 定时器间隔 1000ms => 100ms
      mInitTime: 300, // 3=》  300（ms）
      differ: 100, // 1 =》 100（ms）
      criticalValue: 100, // 临界值 1 => 100(ms)
      mTime: null,
      mTimeDoor: true,
      CurrentCount: null,
      CurrentGid: null,
      ifFirst: true,
      ifOk: true,
      // 购物车勾选框重置-（由于重置了tableData数据导致的）
      historyChooseGId: []
    };
  },

  mounted() {
    let vm = this;
    // 标题title浮动初始化
    this.$Utils.TitleInit();
    // 初始化Door时间
    vm.mTime = vm.mInitTime;
    this.$nextTick(function() {
      setInterval(this.timer, vm.timing);
    });
    // 初始化购物车
    this.refresh_getCartList();
  },
  watch: {
    // 支持异步
    multipleSelection: {
      deep: true, //深度监听设置为 true
      handler: function(newValue, OldValue) {
        let vm = this;
        setTimeout(function() {
          console.log(newValue);
          let length = newValue.length;
          if (length > 0) {
            let t_totalValue = 0;
            for (let i = 0; i < length; i++) {
              t_totalValue += newValue[i].totalPrices;
            }
            vm.totalValue = t_totalValue.toFixed(2);
          } else {
            // vm.totalValue = 0; // 关掉-防闪烁至0
          }
        }, 500);
      }
    }
    // tableData: {
    //   deep: true, //深度监听设置为 true
    //   handler: function(newValue, OldValue) {
    //     let vm = this;
    //     setTimeout(function() {
    //       console.log(newValue);
    //       // let length = newValue.length;
    //       // if (length > 0) {
    //       //   let t_totalValue = 0;
    //       //   for (let i = 0; i < length; i++) {
    //       //     t_totalValue += newValue[i].totalPrices;
    //       //   }
    //       //   vm.totalValue = t_totalValue.toFixed(2);
    //       // } else {
    //       //   vm.totalValue = 0;
    //       // }
    //     }, 200);
    //   }
    // }
  },
  // computed: { // 不支持异步
  //   multipleSelection: function() {
  //     return this.message
  //       .split("")
  //       .reverse()
  //       .join("");
  //   }
  // },
  methods: {
    timer() {
      let vm = this;
      try {
        if (this.mTime > 0) {
          let temp_countDown = this.mTime;
          this.mTime -= vm.differ;
          if (temp_countDown == vm.criticalValue) {
            this.mTimeDoor = true;
            if (vm.ifFirst == false) {
              vm.addToCart(vm.CurrentCount, vm.CurrentGid);
            } else {
              vm.ifFirst = false;
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    // timer() {
    //   let vm = this;
    //   try {
    //     if (this.mTime > 0) {
    //       let temp_countDown = this.mTime;
    //       this.mTime--;
    //       if (temp_countDown == 1) {
    //         this.mTimeDoor = true;
    //         if (vm.ifFirst == false) {
    //           // vm.$message("非第一次，操作");
    //           // console.log("~~~~~~!");
    //           // console.log(vm.CurrentCount);
    //           // console.log(vm.CurrentGid);
    //           vm.addToCart(vm.CurrentCount, vm.CurrentGid);
    //         } else {
    //           // vm.$message("第一次，不操作");
    //           vm.ifFirst = false;
    //         }
    //       }
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    handleChange(count, id) {
      let vm = this;

      // 记录历史勾选状态（by Gid）
      vm.historyChooseGId = [];
      let length = vm.multipleSelection.length;
      for (let i = 0; i < length; i++) {
        vm.historyChooseGId.push(vm.multipleSelection[i].id);
      }
      console.log(vm.historyChooseGId);
      // console.log(count);
      // console.log(id);
      // let index = this.returnIndex_ByCurrentGid(id);

      // ▲▲▲▲▲防止数量使劲加使劲减 导致api疯狂请求！这里加个定时Door
      vm.CurrentCount = count;
      vm.CurrentGid = id;
      // if (vm.mTimeDoor == true) {
      vm.mTimeDoor = false;
      // vm.$message("关门");
      vm.mTime = vm.mInitTime;
      vm.ifOk = false;
      // vm.addToCart(count, id); // 提到开门后！
      // }
    },
    // returnIndex_ByCurrentGid(id) {
    //   let vm = this;
    //   let length = vm.tableData.length;
    //   console.log(vm.tableData);
    //   for (let i = 0; i < length; i++) {
    //     if (vm.tableData[i].id == id) {
    //       return i;
    //     }
    //   }
    // },
    addToCart(count, Cid) {
      let vm = this;
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
                // let temp = {
                //   amount: count
                // };
                var formData = new FormData();
                var formData = new window.FormData();
                formData.append("good_id", Cid);
                formData.append("amount", count);
                formData.append("cartExist", 1);
                // cartExist 0=>未在购物车页面，1=>在购物车页面 (0-自增 1-赋值)
                addToCart(newToken, formData)
                  .then(function(response) {
                    console.log("addToCart");
                    console.log(response);
                    if (response.status == 201) {
                      // vm.refresh_getCartList();
                      console.log("商品数量修改成功！");
                      // vm.$message("商品数量修改成功！");
                      vm.getCartList(); // 成功后不刷新！由于设置了TimeDoor
                      // vm.getCartIndexArr();
                      // vm.getCartList(); // 刷新购物车
                    }
                  })
                  .catch(function(error) {
                    console.info(error);
                    // 如果数量改变失败 - 还原count计数！
                    vm.$message("商品数量修改失败，请重试！");
                    // 刷新列表...
                    vm.getCartList();
                  });
                // }, 200);
              }, 0); // 购物车数量增减优化
            }
          })
          .catch(function(error) {
            console.info(error);
          });
      }
    },

    deleteProduct(Cid) {
      // console.log(Cid);
      let vm = this;
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
              // 删除
              setTimeout(function() {
                let token = vm.$Utils.getCookie("user_token");
                let newToken = token.replace('"', "").replace('"', "");
                deleteProductById(newToken, Cid)
                  .then(function(response) {
                    console.log("deleteProductById");
                    console.log(response);
                    if (response.status == 204) {
                      setTimeout(function() {
                        vm.$message("商品删除成功！");
                        vm.getCartList(); //  刷新购物车列表
                        // vm.getCartIndexArr(); // 获取购物车“快捷信息”
                      }, 500);
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
    // 获取购物车“快捷信息” --暂时没用到
    getCartIndexArr() {
      let vm = this;
      let token = vm.$Utils.getCookie("user_token");
      let newToken = token.replace('"', "").replace('"', "");
      getCartIndexArr(newToken)
        .then(function(response) {
          console.log("getCartIndexArr");
          console.log(response);
          if (response.status == 200) {
          }
        })
        .catch(function(error) {
          console.info(error);
        });
    },
    refresh_getCartList() {
      let vm = this;
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
              // 获取购物车列表
              setTimeout(function() {
                vm.getCartList();
                // vm.getCartIndexArr(); // 获取购物车“快捷信息”
              }, 200);
            }
          })
          .catch(function(error) {
            console.info(error);
          });
      }
    },
    getCartList() {
      let vm = this;
      let token = vm.$Utils.getCookie("user_token");
      let newToken = token.replace('"', "").replace('"', "");
      getCartList(newToken)
        .then(function(response) {
          console.log("getCartList");
          console.log(response);

          let temp_totalValue = 0;
          if (response.status == 200) {
            vm.tableData = [];
            vm.multipleSelection = []; // 初始化历史选中
            // vm.tableData.splice(0); // 改变长度
            let temp_multipleSelection = [];
            let data = response.data.data;
            let length = data.length;
            for (let i = 0; i < length; i++) {
              // vm.OldCounArr.push(data[i].amount);
              let good = data[i].good;
              let image = require("@/assets/pic/product.png");
              try {
                image = global.IMGPrefix + data[i].good.images[0].image; // 待api添加
              } catch (error) {
                console.log(error);
              }
              // ******** 立即购买判断
              function ManageTableData(t_ifBuyNow) {
                let obj = {
                  stock: good.stock,
                  id: data[i].good_id,
                  // id: data[i].id,
                  ImgUrl: image,
                  productInfo:
                    good.art +
                    "," +
                    good.title +
                    "," +
                    // good.created_at +
                    good.time +
                    "," +
                    good.quality,
                  inventory: good.stock,
                  count: data[i].amount,
                  unitPriceHistory: good.price,
                  unitPrice: Number(good.price) * Number(good.discount),
                  totalPrices: data[i].amount * Number(good.price),
                  operation: "删除"
                };
                if (t_ifBuyNow == 1) {
                  vm.tableData.push(obj);
                }
                if (t_ifBuyNow != 1) {
                  // 历史选中状态 - 还原
                  // console.log("★★★★★★★★★★★");
                  // console.log(vm.historyChooseGId);

                  vm.tableData.push(obj);
                  if (vm.historyChooseGId.indexOf(obj.id) > -1) {
                    // console.log("★★★★");
                    // console.log(obj.id);
                    // console.log("★★★★");

                    vm.multipleSelection.push(obj);
                  }
                  console.log(vm.multipleSelection);
                  temp_multipleSelection = vm.multipleSelection;
                }
              }
              let ifBuyNow = 0;
              // let routeValue = vm.$route.query;
              let routeValue = vm.$route.params;
              console.log(routeValue);
              if (
                routeValue.ifBuyNow != undefined &&
                routeValue.ifBuyNow != null &&
                routeValue.ifBuyNow != ""
              ) {
                if (routeValue.ifBuyNow == "1") {
                  console.log("ifBuyNow ~!");
                  ifBuyNow = 1;
                }
              }
              // ..
              if (ifBuyNow == 1) {
                console.log("ifBuyNow");
                if (Number(data[i].good_id) == Number(routeValue.id)) {
                  // 只传入立即购买的商品id
                  ManageTableData(ifBuyNow);
                  temp_totalValue = data[i].amount * Number(good.price);
                  // vm.totalValue = temp_totalValue; // 总价 // =》勾选才计算！
                  // 进行普通跳转结算即可！
                  console.log(vm.tableData);
                  let temp_tableData = JSON.stringify(vm.tableData); // 只传入选中的！
                  setTimeout(function() {
                    vm.$router.push({
                      path: "/checkorderinformation",
                      query: {
                        tableData: temp_tableData,
                        totalValue: vm.totalValue
                      }
                    });
                  }, 200);
                  break;
                }
              } else if (ifBuyNow != 1) {
                ManageTableData(ifBuyNow); // 传入所有购物车商品id
                temp_totalValue += vm.tableData[i].totalPrices;
                vm.ifOk = true;
              }

              // ******** 立即购买判断 （over）
            }
            console.log(vm.tableData);
            // 由于multipleTable直接赋值-checkbox勾选视觉效果-还是用原配函数
            function toggleSelection(rows) {
              if (rows) {
                rows.forEach(row => {
                  vm.$refs.multipleTable.toggleRowSelection(row);
                });
              } else {
                vm.$refs.multipleTable.clearSelection();
              }
            }
            // toggleSelection([tableData[1], tableData[2]]);
            setTimeout(function() {
              console.log("***********************");
              console.log("temp_multipleSelection");

              toggleSelection(temp_multipleSelection);
            }, 200);

            // 计算总价格（不含运费）
            // vm.totalValue = temp_totalValue.toFixed(2); // =》勾选才计算！
          }
        })
        .catch(function(error) {
          console.info(error);
        });
    },
    // 结算
    Settlement() {
      let vm = this;
      // global.tableData = vm.tableData;
      // let temp_tableData = JSON.stringify(vm.tableData);
      // console.log(vm.tableData);
      console.log(this.multipleSelection);
      let temp_tableData = JSON.stringify(this.multipleSelection); // 只传入选中的！
      if (this.multipleSelection.length == 0) {
        this.$message("请选择商品！");
      } else {
        setTimeout(function() {
          // vm.router_to("/checkorderinformation");
          vm.$router.push({
            path: "/checkorderinformation",
            query: {
              tableData: temp_tableData,
              totalValue: vm.totalValue
            }
          });
        }, 500);
      }
    },
    router_to(str) {
      let vm = this;
      vm.$router.push({ path: str });
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
      let vm = this;
      console.log(val);
      this.multipleSelection = val;
    },
    ChooseCheckboxManage(ifChoosel_checkbox) {
      console.log(ifChoosel_checkbox);
      if (ifChoosel_checkbox) {
        this.multipleSelection = this.tableData;
      } else {
        this.multipleSelection = [];
      }
    }
  }
};
</script>
<style>
/* 每一页设置min-height不同 - .mac 指定页*/
.mac .ShoppingTrolley .common.el-main {
  /* min-height: 550px; */
}

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
  width: 120px;
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
.ShoppingTrolley .bs_btn2 {
  background: rgba(165, 165, 165, 1);
  border: 1px solid rgba(165, 165, 165, 1);
}
</style>
