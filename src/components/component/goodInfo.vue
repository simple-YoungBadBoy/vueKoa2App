<template>

  <!--Hot Area-->
  <div @click="toGoodsDetails">
    <img v-lazy="goodsImage" width="90%" alt="">
    <p>{{goodsName}}</p>
  </div>
</template>

<script>
export default {
  props: ["goodsImage", "goodsName", "goodsPrice", "goodsId"],
  methods: {
    toGoodsDetails() {
      console.log(this.goodsId);
      this.$router.push({ name: "goods", query: { goodsId: this.goodsId } });
    }
  }
};
</script>

<style scoped>
p {
  font-size: 14px;
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 0;
}
</style>