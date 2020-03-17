<template>
  <div class="Search height_auto">
    <el-container class="height_auto">
      <el-header class="common">
        <HeaderModule id="navigation"></HeaderModule>
      </el-header>
      <!-- <el-main class="common"> -->
      <router-view />
      <!-- </el-main> -->
      <!-- <div class="el-main common">
        <router-view />
      </div>-->
    </el-container>
  </div>
</template>
<script>
import HeaderModule from "@/components/HeaderModule";
// import FooterModule from "@/components/FooterModule";
export default {
  name: "Search",
  components: {
    HeaderModule
    // FooterModule
  },

  data() {
    return {};
  },
  mounted() {
    let vm = this;
    // 标题title浮动初始化
    this.$Utils.TitleInit();
  },
  methods: {}
};
</script>
<style></style>
<style scoped></style>
