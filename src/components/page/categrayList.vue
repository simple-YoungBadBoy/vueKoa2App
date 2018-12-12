<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title='类别列表'></van-nav-bar>
    </div>
    <div>
      <van-row>
        <van-col span='6'>
          <div id="leftNav" ref="leftNav">
            <ul>
              <li @click="clickCategory(index,item.ID)" :class="{categoryActive : categoryIndex == index}" v-for="(item,index) in categoryList" :key="index">
                {{item.MALL_CATEGORY_NAME}}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span='18'>
          <div class="tabCategorySub">
            <van-tabs v-model="active" @click="onClickCategorySub">
              <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
            </van-tabs>
          </div>
          <div id="list-div" ref="listDiv">
            <van-pull-refresh v-model="isRefresh" @refresh='onRefresh'>
              <van-list v-model="loading" :finished='finished' @load="onLoad">
                <div class='list-item' @click="goToGoodsInfo(item.ID)" v-for="(item,index) in goodList" :key="index">
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror='errorImg'>
                  </div>
                  <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div>¥{{item.ORI_PRICE | moneyFilter}}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { URL } from "@/URL.config.js";
import { Toast } from "vant";
import { toMoney } from "@/filter/moneyFilter";
export default {
  data() {
    return {
      categoryList: [],
      categoryIndex: 0,
      categorySub: [], //小类类别
      active: 0, //激活标签
      loading: false, //上拉加载loading效果
      finished: false, //上拉加载是否有数据
      list: [], //商品数据
      isRefresh: false, //下拉刷新
      page: 1, //页数
      goodList: [], //商品列表信息
      categorySubID: "", //商品子类id
      sizePage: 10, //商品加载条数
      errorImg: 'this.src="' + require("@/assets/errorimg.png") + '"'
    };
  },
  created() {
    this.getCategoryList();
  },
  mounted() {
    // 获取页面高度
    let winHeight = document.documentElement.clientHeight;
    // 设置左侧高度
    this.$refs.leftNav.style.height = winHeight - 46 - 50 + "px";
    // 获取右侧高度
    this.$refs.listDiv.style.height = winHeight - 90 - 50 + "px";
  },
  methods: {
    // 获取左侧大类列表数据
    getCategoryList() {
      axios({
        url: URL.getCategoryList,
        method: "get"
      })
        .then(res => {
          console.log(res);
          if (res.data.code == 200 && res.data.message) {
            this.categoryList = res.data.message;
            this.getCategorySubList(this.categoryList[0].ID);
          } else {
            Toast("网络错误，请检查您的网络或联系网站管理员");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击左侧大类列表数据请求右侧小类数据
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      this.finished = false;
      this.page = 1;
      this.goodList = [];
      this.getCategorySubList(categoryId);
    },
    // 右侧数据获取
    getCategorySubList(categoryId) {
      axios({
        url: URL.getCategorySubList,
        method: "post",
        data: {
          categoryId: categoryId
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code == 200 && res.data.message) {
            this.active = 0;
            this.categorySub = res.data.message;
            this.categorySubID = this.categorySub[0].ID;
            this.onLoad();
          } else {
            Toast("网络错误，请检查您的网络或联系网站管理员");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 上拉加载
    onLoad() {
      setTimeout(() => {
        this.categorySubID = this.categorySubID
          ? this.categorySubID
          : this.categorySub[0].ID;
        this.getGoodsListByCategorySubID();
      }, 500);
    },

    // 下拉刷新方法
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.goodList = [];
        this.page = 1;
        this.onLoad();
      }, 500);
    },
    // 加载商品数据
    getGoodsListByCategorySubID() {
      let params = {
        categorySubID: this.categorySubID,
        page: this.page,
        sizePage: this.sizePage
      };
      console.log(params);

      axios({
        url: URL.getGoodsListByCategorySubID,
        method: "post",
        data: params
      })
        .then(res => {
          console.log(res);
          if (res.data.code == 200 && res.data.message.length) {
            this.page++;
            this.goodList = this.goodList.concat(res.data.message);
          } else {
            this.finished = true;
            // Toast("网络错误，请检查您的网络或联系网站管理员");
          }
          this.loading = false;
        })
        .catch(err => {
          Toast(err);
        });
    },
    onClickCategorySub(index, title) {
      this.categorySubID = this.categorySub[index].ID;
      console.log("categorySubID:" + this.categorySubID);
      this.goodList = [];
      this.finished = false;
      this.page = 1;
      this.onLoad();
    },
    goToGoodsInfo(id) {
      this.$router.push({ name: "goods", params: { goodsId: id } });
    }
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  }
};
</script>

<style scoped lang='scss'>
#leftNav {
  background: aliceblue;
  ul {
    li {
      line-height: 2rem;
      border-bottom: 1px solid #e4e7ed;
      padding: 3px;
      font-size: 0.8rem;
      text-align: center;
    }
  }
}
.categoryActive {
  background: #fff;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
#list-div {
  overflow: scroll;
}
</style>