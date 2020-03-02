<template>
  <div class="Home height_auto">
    <el-container class="height_auto">
      <el-header><HeaderModule></HeaderModule></el-header>
      <el-main><router-view /></el-main>
      <el-footer class="el-footer"><FooterModule></FooterModule></el-footer>
    </el-container>
  </div>
</template>
<script>
import HeaderModule from "@/components/HeaderModule";
import FooterModule from "@/components/FooterModule";
export default {
  name: "Home",
  components: {
    HeaderModule,
    FooterModule
  },

  data() {
    return {};
  },
  mounted() {
    let vm = this;
  },
  methods: {}
};
</script>
<style>
.el-header {
  height: 44px !important;
  background-color: #fff;
  line-height: 44px;
  padding: 0;
  border-bottom: 1px solid #646464;
}
.el-main {
  width: 62.5%;
  min-width: 1200px;
  margin: 0 auto;
  padding: 0;
}
.el-footer {
  background-color: #2b2a2f;
  height: 112px !important;
  color: #fff8f8;
}
</style>
<style scoped></style>
