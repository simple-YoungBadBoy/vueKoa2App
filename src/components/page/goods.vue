
<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="topImage-div">
      <img :src="goodsInfo.IMAGE1" width="100%" alt="">
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格：¥{{goodsInfo.PRESENT_PRICE | moneyFilter}}元</div>
    <div>
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL">
          </div>
        </van-tab>
        <van-tab title='评论'>
          评论制作ing...
        </van-tab>
      </van-tabs>
    </div>
    <div class="goods-bottom">
      <div>
        <van-button size='large' @click="addShoppingCart" type='primary'>加入购物车</van-button>
      </div>
      <div>
        <van-button size='large' type='danger'>直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { URL } from "@/URL.config.js";
import { Toast } from "vant";
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  data() {
    return {
      goodsId: "",
      goodsInfo: {} //商品详细数据
    };
  },
  created() {
    this.goodsId = this.$route.query.goodsId
      ? this.$route.query.goodsId
      : this.$route.params.goodsId;
    console.log(this.goodsId);

    this.getInfo();
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getInfo() {
      axios({
        url: URL.getDetailGoodsInfo,
        method: "post",
        data: {
          goodsId: this.goodsId
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code == 200 && res.data.message) {
            this.goodsInfo = res.data.message;
          } else {
            Toast("数据库错误，请求失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 添加商品到购物车
    addShoppingCart() {
      let cartInfo = localStorage.cartInfo
        ? JSON.parse(localStorage.cartInfo)
        : [];
      console.log(cartInfo);

      let isHaveInfo = cartInfo.find(
        element => element.goodsId == this.goodsId
      );
      console.log(isHaveInfo);
      console.log(this.goodsInfo);
      if (!isHaveInfo) {
        let newGoodsInfo = {
          goodsId: this.goodsId,
          name: this.goodsInfo.NAME,
          price: this.goodsInfo.ORI_PRICE,
          image: this.goodsInfo.IMAGE1,
          count: 1
        };
        cartInfo.push(newGoodsInfo);
        localStorage.cartInfo = JSON.stringify(cartInfo);
        Toast.success("添加购物车成功");
      } else {
        Toast.success("购物车已有数据");
      }
      this.$router.push({ name: "cart" });
    }
  }
};
</script>

<style scoped lang='scss'>
.goods-name,
.goods-price {
  background-color: #fff;
}
.detail {
  font-size: 0;
}
.goods-bottom {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  > div {
    flex: 1;
    padding: 5px;
  }
}
</style>
