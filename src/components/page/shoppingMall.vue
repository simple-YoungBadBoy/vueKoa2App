<template>
  <div class="parent">
    <!--swipwer area-->
    <div class="swiper-area">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="recommend">
      <nav v-for="(item,index) in category" :key="index">
        <img v-lazy='item.image' alt="">
        <p v-text="item.mallCategoryName"></p>
      </nav>
    </div>
    <!-- 广告 -->
    <div class="advertisement">
      <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
    </div>
    <!-- 推荐 -->
    <div class="shopRecommend">
      <header>商品推荐</header>
      <div class="recommend-body">
        <swiper :options='swiperOption'>
          <swiper-slide v-for="(item,index) in  recommendGoods" :key="index">
            <div class="recommend-item">
              <img v-lazy='item.image' width="80%">
              <p>{{item.goodsName}}</p>
              <p>${{item.price | moneyFilter}}(${{item.mallPrice | moneyFilter}})</p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <floor :floorData='floor1' :floorTitle='floorTitle.floor1'></floor>
    <floor :floorData='floor2' :floorTitle='floorTitle.floor2'></floor>
    <floor :floorData='floor3' :floorTitle='floorTitle.floor3'></floor>

    <good-info :hotGoods='hotGoods'></good-info>

  </div>
</template>

<script>
import axios from "axios";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import floor from "./../component/floor";
import goodInfo from "./../component/goodInfo";
import "swiper/dist/css/swiper.css";
import { URL } from "@/URL.config.js";
import { toMoney } from "@/filter/moneyFilter";
export default {
  data() {
    return {
      bannerPicArray: [],
      category: [],
      adBanner: "",
      recommendGoods: [],
      swiperOption: {
        slidesPerView: 3,
        // spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      floorTitle: {},
      floor1: [],
      floor2: [],
      floor3: [],
      hotGoods: [] //热卖商品
    };
  },
  components: {
    swiper,
    swiperSlide,
    floor,
    goodInfo
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  created() {
    axios({
      url: URL.index,
      method: "get"
    })
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          // 轮播图
          this.bannerPicArray = res.data.data.slides;
          // 轮播图下面的推荐
          this.category = res.data.data.category;
          // 广告
          this.adBanner = res.data.data.advertesPicture;
          // 商品推荐
          this.recommendGoods = res.data.data.recommend;

          // 楼层名称
          this.floorTitle = res.data.data.floorName;

          // 楼层数据
          this.floor1 = res.data.data.floor1; //楼层1数据
          this.floor2 = res.data.data.floor2; //楼层1数据
          this.floor3 = res.data.data.floor3; //楼层1数据

          //热卖商品
          this.hotGoods = res.data.data.hotGoods;
          console.log(this.hotGoods);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped lang='scss'>
// .swiper-area{
//   overflow: hidden;
//   clear: both;
// }
.parent {
  background: #f1f1f1;
  min-height: 100vh;
}
.van-swipe {
  height: 9rem;
}
.recommend {
  display: flex;
  justify-content: space-around;
  margin-top: 0.2rem;
  padding: 0.4rem;
  background-color: #fff;
  nav {
    img {
      width: 50px;
    }
    p {
      font-size: 0.7rem;
      margin: 0;
    }
  }
}
.advertisement {
  margin-top: 0.2rem;
}
.shopRecommend {
  background-color: #fff;
  header {
    color: rgb(223, 151, 43);
    text-align: left;
    font-size: 0.8rem;
    padding: 0.2rem 0;
    border-bottom: 1px solid #f1f1f1;
    padding-left: 0.5rem;
  }
  .recommend-body {
    border-bottom: 1px solid #f1f1f1;
  }
  .recommend-item {
    width: 100%;
    margin-top: 0.3rem;
    border-right: 1px solid #f1f1f1;
    p {
      font-size: 0.5rem;
      margin: 0.1rem;
    }
  }
}
</style>