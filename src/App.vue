<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  }, //为子页面刷新提供机制
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    //为子页面刷新提供机制
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
<style>
#app {
  font-family: "Roboto";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #41485d;
  height: 100%;
  /* font-size: 1rem; */
  font-size: 28px;
}

</style>
