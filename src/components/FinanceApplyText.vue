<template>
  <div v-html="apply">{{apply}}</div>
</template>
<script>
export default {
  //   name: "FinanceApplyText",
  name: "applyText",
  data() {
    return {
      apply: null
    };
  },
  mounted() {
    let vm = this;
    let form = this.$route.query.htmls;
    this.apply = form;
    this.$nextTick(() => {
      document.forms[0].submit();
    });
  },
  methods: {}
};
</script>
<style scoped>
.FinanceApplyText {
}
</style>

