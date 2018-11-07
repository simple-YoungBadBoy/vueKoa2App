<template>
  <div class="test">
    <p class="hello">Hello jspang</p>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.test {
  width: 20rem;
  min-height: 10rem;
  background-color: bisque;
  text-align: text；;
  .hello {
    color: red;
    font-size: 1rem;
    margin:0;
  }
}
</style>
