<template>
  <div class="Home">
    <vue-headful title="首页"></vue-headful>
    <el-container>
      <el-aside width="240px">
        <AsideNav></AsideNav>
      </el-aside>
      <el-container>
        <el-header>
          <TopHeader></TopHeader>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import AsideNav from "@/components/AsideNav";
import TopHeader from "@/components/TopHeader";

export default {
  name: "Home",
  components: {
    AsideNav,
    TopHeader
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
<style scoped>
.Home {
}
</style>

