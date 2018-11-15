<template>
  <div>
    <!--search bar layout-->
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <van-icon class="icon" size='1.3rem' color='white' name="location" /></van-col>
        <van-col span="16" class="inputParent">
          <input class="search" placeholder="请输入商品名称" />
          <van-icon class="searchIcon" size="1rem" color='gray' name='search'></van-icon>
        </van-col>
        <van-col span="5">
          <van-icon class="icon" name='contact' @click="() =>{this.$router.push('/login')}" color='white'></van-icon>
        </van-col>
      </van-row>
    </div>
    <shopping-mall></shopping-mall>
  </div>
</template>

<script>
import shoppingMall from "@/components/page/shoppingMall";
export default {
  name: "index",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  components: {
    shoppingMall
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
  .icon {
    line-height: 2.2rem;
  }
  .inputParent {
    position: relative;
    .searchIcon {
      position: absolute;
      top: 0.65rem;
      right: 0.5rem;
    }
  }
}
.search {
  border-radius: 15px;
  border: none;
  height: 1.5rem;
  font-size: 0.8rem;
  padding: 0 1rem;
  width: 100%;
  box-sizing: border-box;
  line-height: 1.5rem;
}
</style>
