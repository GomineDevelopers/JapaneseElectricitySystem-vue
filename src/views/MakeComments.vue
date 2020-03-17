<template>
  <div class="MakeComments">
    <vue-headful title="发表评论"></vue-headful>
    <el-header class="common">
      <HeaderModule id="navigation"></HeaderModule>
    </el-header>
    <el-main class="common">
      <TopSearchBox :searchType="'MakeComments'" :categories="[]"></TopSearchBox>
      <div class="pc_content">
        <PageFlow :Flow1="'首页'" :Flow2="'我的订单'" :Flow3="'商品评价'"></PageFlow>
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
          >
            <el-table-column header-align="center" label="订单号" width="150">
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
                  <div class="product_text">{{scope.row.productInfo }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column header-align="center" label="商品/服务/时效评分" width="180">
              <template slot-scope="scope">
                <div>
                  <el-rate
                    v-model="scope.row.RateValue1"
                    text-color="#775563"
                    score-template="{value}"
                    :colors="colors"
                  ></el-rate>
                  <el-rate
                    v-model="scope.row.RateValue2"
                    text-color="#775563"
                    score-template="{value}"
                    :colors="colors"
                  ></el-rate>
                  <el-rate
                    v-model="scope.row.RateValue3"
                    text-color="#775563"
                    score-template="{value}"
                    :colors="colors"
                  ></el-rate>
                </div>
              </template>
            </el-table-column>
            <el-table-column header-align="center" label="上传图片" width="200">
              <template slot-scope="scope">
                <div>
                  <div class="commentsDetails">
                    <div class="imgs_upload imgs_upload2">
                      <el-upload
                        action="alert"
                        list-type="picture-card"
                        :auto-upload="false"
                        :before-upload="(value)=> beforeAvatarUpload(value,scope.row.index)"
                        :on-change="(file, fileList)=> loadJsonFromFile(file, fileList,scope.row.index)"
                        :on-preview="(file) => handlePictureCardPreview(file, scope.row.index)"
                        :on-remove="handleRemove"
                      >
                        <i class="el-icon-plus"></i>
                      </el-upload>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column header-align="center" label="输入评价" width="200">
              <template slot-scope="scope">
                <div>
                  <div class="commentsDetails">
                    <div class="m_input m_input2">
                      <textarea
                        v-model="scope.row.m_comments"
                        placeholder="请输入商品评价"
                        name
                        id
                        rows="5"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column header-align="center" label="发表评论" width="150">
              <template slot-scope="scope">
                <div>
                  <div class="shopping_over">
                    <div class>
                      <button
                        @click="make_comments(scope.row.Gid,scope.row.index)"
                        class="m_btn1 m_btn2 m_btn1b m_btn2b m_btn3"
                      >发表评论</button>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- <div class="commentsDetails">
          <div class="imgs_upload">
            <div class="upload_title">上传图片</div>
            <el-upload
              action="alert"
              list-type="picture-card"
              :auto-upload="false"
              :before-upload="(value)=> beforeAvatarUpload(value,1)"
              :on-change="(file, fileList)=> loadJsonFromFile(file, fileList,1)"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </div>
        <div class="commentsDetails">
          <div class="m_input">
            <textarea v-model="m_comments" placeholder="请输入商品评价" name id rows="5"></textarea>
          </div>
        </div>
        <div class="shopping_over">
          <div class>
            <button @click="make_comments()" class="m_btn1 m_btn2 m_btn1b m_btn2b">发表评论</button>
          </div>
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
import { refresh_token, ToReplies, patchReplied } from "@/api/api";
import Vue from "vue";

export default {
  name: "MakeComments",
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
        //   index: 0,
        //   OrderNumber: "105016464644696",
        //   ImgUrl: require("@/assets/pic/product.png"),
        //   productInfo: "李新建珠峰瑞祥, 2015布面油画",
        //   RateValue1: 0,
        //   RateValue2: 0,
        //   RateValue3: 0,
        //   dialogImageUrl: "",
        //   m_comments: ""
        // }
      ],

      colors: ["#775563", "#775563", "#775563"],
      // 图片上传内容
      dialogVisible: false
    };
  },
  mounted() {
    let vm = this;
    // 标题title浮动初始化
    this.$Utils.TitleInit();
    vm.init_tableData();
  },
  methods: {
    init_tableData() {
      let vm = this;
      console.log(JSON.parse(vm.$route.query.tableData));
      let temp_tableData = JSON.parse(vm.$route.query.tableData);
      console.log(temp_tableData);
      let GoodsArr = temp_tableData.GoodsArr;
      let length = GoodsArr.length;
      for (let i = 0; i < length; i++) {
        let good = GoodsArr[i].good;
        let ImgUrl = require("@/assets/pic/product.png");
        try {
          ImgUrl = global.IMGPrefix + good.images[0].image;
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
        obj.index = i;
        obj.OrderNumber = temp_tableData.OrderNumber;
        obj.ImgUrl = ImgUrl;
        obj.productInfo = productInfo;
        obj.Gid = GoodsArr[i].good_id;
        obj.m_comments = "";
        vm.tableData.push(obj);
        vm.OrderNumber = temp_tableData.OrderNumber;
        vm.OrderId = temp_tableData.OrderId;
      }
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
    patchReplied() {
      let vm = this;

      let token = vm.$Utils.getCookie("user_token");
      let newToken = token.replace('"', "").replace('"', "");
      let temp = {
        no: vm.OrderNumber
      };
      let id = vm.OrderId;
      patchReplied(newToken, temp, id)
        .then(function(response) {
          console.log(response);
          vm.$message("评论成功！");
          setTimeout(function() {
            vm.router_toSpec("/personalcenter", "2");
          }, 500);
        })
        .catch(function(error) {
          console.info(error);
        });
    },
    make_comments(Gid, index) {
      let vm = this;
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
              let token = vm.$Utils.getCookie("user_token");
              let newToken = token.replace('"', "").replace('"', "");
              let id = Gid;
              let m_comments = vm.tableData[index].m_comments;
              var formData = new FormData();
              var formData = new window.FormData();
              formData.append("good_id", id);
              // formData.append("replyContent", vm.m_comments);
              formData.append("replyContent", m_comments);

              setTimeout(function() {
                ToReplies(newToken, formData)
                  .then(function(response) {
                    console.log("ToReplies");
                    console.log(response);
                    if (response.status == 201) {
                      vm.patchReplied(); // 评论后置订单评论状态为1
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
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file, index) {
      // this.dialogImageUrl = file.url;
      let obj = vm.tableData[index];
      obj.dialogImageUrl = file.url;
      Vue.set(vm.tableData, index, obj);
      this.dialogVisible = true;
    },
    loadJsonFromFile(file, fileList, index) {
      let vm = this;
      console.log(file);
      console.log(fileList);
      console.log(index);
      this.uploadFilename = file.name;
      this.uploadFiles = fileList;
      // this.dialogImageUrl = URL.createObjectURL(file.raw);
      let obj = vm.tableData[index];
      obj.dialogImageUrl = URL.createObjectURL(file.raw);
      Vue.set(vm.tableData, index, obj);
    },
    beforeAvatarUpload(file, index) {
      console.log(file);
      console.log(index);
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
    }
  }
};
</script>
<style >
/* **** 表格 table */
.MakeComments .el-table td {
  text-align: center;
}
/* ***** 评分Rate */
.MakeComments .el-rate {
  height: 24px;
  line-height: 24px;
  border-bottom: 1px solid #f3f3f3;
}
.MakeComments .el-rate__text {
  font-size: 18px;
}
.MakeComments .el-rate__icon {
  font-size: 24px;
}
/* ***** 相机 icon */
.MakeComments .camera_icon .el-icon-camera-solid {
  font-size: 16px;
  color: #775563;
}
</style>
<style scoped>
.MakeComments {
}
.MakeComments .sTitle {
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
.MakeComments .Shopping_img_p {
  margin: 20px 16px 20px 0;
}

.MakeComments .Shopping_img {
  width: 80px;
  height: 80px;
}
.MakeComments .product_text {
  margin-top: 14%;
  width: 155px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(17, 26, 52, 1);
  line-height: 20px;
  text-align: justify;
  /* margin-top: 1px; */
}
/* ***** 评论详细 */
.MakeComments .commentsDetails {
  background: rgba(249, 249, 249, 1);
}

.MakeComments .rd_text {
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
.MakeComments .rd_imgs {
  margin-bottom: 18px;
}
.MakeComments .perRateDataImg {
}
.MakeComments .rate_img {
  width: 80px;
  height: 80px;
  margin-right: 16px;
}
.MakeComments .rd_date {
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(197, 202, 213, 1);
  line-height: 17px;
  letter-spacing: 1px;
}

/* ****** 评价 评分 */
.MakeComments .productGrade {
  width: 100%;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(226, 226, 226, 1);
}
.MakeComments .pg_left {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(17, 26, 52, 1);
  line-height: 20px;
  margin-right: 20px;
}

/* *****评论框 */
.MakeComments .m_input {
  margin-top: 16px;
  padding: 0 32px;
  width: 100%;
}

.MakeComments textarea {
  /* width: 1136px; */
  /* height: 172px; */
  /* color: rgba(204, 193, 198, 1); */

  width: 1104px;
  height: 140px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(204, 193, 198, 1);
  text-indent: 10px;
  padding: 16px 16px 60px 16px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 20px;
}
.MakeComments .m_input2 {
  padding: 0;
}
.MakeComments .m_input2 textarea {
  width: 140px;
  height: 80px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(204, 193, 198, 1);
  text-indent: 10px;
  padding: 16px 16px 60px 16px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 20px;
}

.MakeComments .upload_imgs {
  position: absolute;
  margin-top: -40px;
  margin-left: 27px;
  line-height: 20px;
}
.MakeComments .camera_icon {
  margin-right: 10px;
}
.MakeComments .camera_text {
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(138, 143, 150, 1);
  line-height: 17px;
}

.MakeComments .camera_icon:hover {
  cursor: pointer;
}
.MakeComments .camera_text:hover {
  cursor: pointer;
}

/* **** 购物over */
.MakeComments .shopping_over {
  text-align: right;
}

.MakeComments .m_btn1 {
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
.MakeComments .m_btn1b {
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
.MakeComments .m_btn2 {
  background: rgba(119, 85, 99, 1);
  color: rgba(255, 255, 255, 1);
  margin-left: 56px;
}

.MakeComments .m_btn2b {
  margin-left: 32px;
  margin-right: 32px;
  margin-top: 32px;
}
.MakeComments .m_btn3 {
  margin: 0;
}
/* ****  */
.MakeComments .upload_title {
  width: 72px;
  height: 20px;
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 500;
  color: rgba(17, 26, 52, 1);
  line-height: 20px;
  margin-bottom: 16px;
}
.MakeComments .imgs_upload {
  padding-top: 16px;
  padding-left: 32px;
}
.MakeComments .imgs_upload2 {
  padding-top: 0px;
  padding-left: 0px;
}
</style>

