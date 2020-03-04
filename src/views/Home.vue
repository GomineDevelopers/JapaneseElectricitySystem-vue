<template>
  <div class="Home height_auto">
    <el-container class="height_auto">
      <el-header  class="common">
        <HeaderModule></HeaderModule>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer class="el-footer">
        <FooterModule></FooterModule>
      </el-footer>
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

.el-main {
  width: 62.5%;
  min-width: 1200px;
  margin: 0 auto;
  padding: 0;
  overflow: inherit;
}

</style>
<style scoped></style>
