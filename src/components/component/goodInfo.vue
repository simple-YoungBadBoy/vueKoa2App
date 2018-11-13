<template>

  <!--Hot Area-->
  <div class="hot-area">
    <div class="hot-title">热卖商品</div>
    <div class="hot-goods">
      <!--这里需要一个list组件-->
      <van-list>
        <van-row gutter='0'>
          <van-col span='12' v-for="(item,index) in hotGoods" :key="index">
            <img v-lazy="item.image" width="90%" alt="">
            <p>{{item.name}}</p>
          </van-col>
        </van-row>
      </van-list>
    </div>

  </div>
</template>

<script>
export default {
  props: ["hotGoods"]
};
</script>

<style scoped>
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
p {
  font-size: 14px;
  overflow: hidden;
  width:100%;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>