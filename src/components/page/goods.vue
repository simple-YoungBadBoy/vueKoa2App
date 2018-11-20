
<template>
  <div>
    商品详情页面
  </div>
</template>

<script>
import axios from "axios";
import { URL } from "@/URL.config.js";
export default {
  data() {
    return {
      goodsId: ""
    };
  },
  created() {
    this.goodsId = this.$route.query.goodsId;
    console.log(this.goodsId);

    this.getInfo();
  },
  methods: {
    getInfo() {
      axios({
        url: URL.getDetailGoodsInfo,
        method: "post",
        data: {
          goodsId: this.goodsId
        }
      })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
</style>
