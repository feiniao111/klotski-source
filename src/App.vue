<template>
  <div id="app">
    <!--<img src="./assets/img/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    // document.ontouchmove = function(e) {
    //   e.preventDefault();
    // }
    //阻止页面的滑动默认事件
    document.addEventListener(
      "touchmove",
      function() {
        event.preventDefault();
      },
      { passive: false }
    );
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
