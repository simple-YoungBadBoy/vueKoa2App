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
              <p>${{item.price}}(${{item.mallPrice}})</p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <!-- 数据楼层 -->
    <div class="floor">
      <div class="floor-anomaly">
        <div class="floor-one">
          <img :src='floor1_0.image' width='100%'>
        </div>
        <div class="floor-right">
          <div class="floor-tow">
            <img :src='floor1_1.image' width='100%'>
          </div>
          <div>
            <img :src='floor1_2.image' width='100%'>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import { URL } from "@/URL.config.js";
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
      floor1: [],
      floor1_0: [],
      floor1_1: [],
      floor1_2: []
    };
  },
  components: {
    swiper,
    swiperSlide
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

          // 楼层数据
          this.floor1 = res.data.data.floor1; //楼层1数据
          this.floor1_0 = this.floor1[0];
          this.floor1_1 = this.floor1[1];
          this.floor1_2 = this.floor1[2];
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

.floor-anomaly {
  display: flex;
  flex-direction:row;
        background-color: #fff;
        border-bottom:1px solid #ddd;
}
.floor-one {
  border-right: 1px solid #f1f1f1;
}
.floor-tow {
  border-bottom: 1px solid #f1f1f1;
}


</style>