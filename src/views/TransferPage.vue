<template>
  <div class="TransferPage">
    <vue-headful title="商城"></vue-headful>
  </div>
</template>
<script>
export default {
  name: "TransferPage",

  data() {
    return {};
  },
  mounted() {
    let vm = this;
    let targetPage = this.$route.query.targetPage;
    let query = this.$route.query;
    console.log("TransferPage");
    console.log(query);
    vm.$router.push({ path: targetPage, query: query });
  },
  methods: {}
};
</script>
<style scoped>
.TransferPage {
}
</style>

