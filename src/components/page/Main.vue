<template>
  <div>
    <div class="mian-div">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <van-tabbar v-model="active" @change="changeTabbar(active)">
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="records" dot>列表</van-tabbar-item>
      <van-tabbar-item icon="cart" info="5">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" info="20">会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      nowPath: "" // 当前路径
    };
  },
  created() {
    this.changeTabbarActive();
  },
  updated() {
    this.changeTabbarActive();
  },
  methods: {
    changeTabbarActive() {
      console.log(this.$route.path);
      this.nowPath = this.$route.path;
      if (this.nowPath == "/cart") {
        this.active = 2;
      }
    },
    changeTabbar(active) {
      switch (active) {
        case 0:
          this.$router.push({ name: "index" });
          break;
        case 1:
          this.$router.push({ name: "categrayList" });
          break;
        case 2:
          this.$router.push({ name: "cart" });
          break;
        // case 3:
        //   this.$router.push({ name: "index" });
        //   break;
      }
    }
  }
};
</script>

<style scoped>
</style>