<template>
  <div>
    <div class="navBar-div">
      <van-nav-bar title="购物车"></van-nav-bar>
    </div>
    <div class="cleanCart">
      <van-button type="warning" size="small" @click="clearCart">清空购物车</van-button>
    </div>
    <div class="content">
      <nav v-for="(item,index) in cartInfo" :key="index">
        <div class="left">
          <img :src="item.image" alt="">
        </div>
        <div class="right">
          <div class="nameAndPrice">
            <p class="name">{{item.name}}</p>
            <div class="priceAndMoney">
              <p class="price">¥{{item.price | moneyFilter}}</p>
              <p>x{{item.count}}</p>
              <p class="allPrice">¥{{item.price * item.count | moneyFilter}}</p>
            </div>
          </div>
          <div class="priceAndCount">
            <van-stepper v-model="item.count" />
          </div>
        </div>
      </nav>
    </div>
    <div class="totalMoney">
      商品总价：¥{{totalMoney | moneyFilter}}
    </div>
  </div>
</template>

<script>
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  data() {
    return {
      cartInfo: [], //购物车信息
      isEmpty: false //购物车是否为空
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  created() {
    this.getCartInfo();
  },
  computed: {
    totalMoney() {
      let allMoney = 0;
      this.cartInfo.forEach(ele => {
        allMoney += ele.price * ele.count;
      });
      localStorage.cartInfo = JSON.stringify(this.cartInfo);
      return allMoney;
    }
  },
  methods: {
    // 获取到本地储存的数据，如果有isEmpty为true/反之为false
    getCartInfo() {
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      console.log(JSON.stringify(this.cartInfo));
      this.isEmpty = this.cartInfo.length > 0 ? true : false;
    },
    // 清空购物车
    clearCart() {
      this.isEmpty = false;
      localStorage.clear("cartInfo");
      this.cartInfo = [];
    }
  }
};
</script>

<style scoped lang='scss'>
.cleanCart {
  text-align: right;
  padding: 10px;
}
.content {
  nav {
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    align-items: center;
    padding-right: 1rem;
    .left {
      img {
        width: 50px;
        height: 50px;
      }
    }
    .right {
      flex: 2;
      .nameAndPrice {
        > * {
          display: inline-block;
        }
        justify-content: space-between;
        .name {
          font-size: 14px;
          margin: 5px;
          flex: 6;
        }
      }
      .priceAndMoney {
        float: right;
        p {
          margin: 0;
          font-size: 14px;
          text-align: right;
        }
        .allPrice {
          color: red;
        }
      }
    }
  }
  .priceAndCount {
    margin: 0.7rem;
    display: flex;
    align-items: center;
  }
  .totalMoney {
    text-align: right;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
  }
}
</style>