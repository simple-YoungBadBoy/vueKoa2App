<template>
  <!-- 数据楼层 -->
  <div class="floor">
    <div class="floor-title"> {{floorTitle}} </div>
    <div class="floor-anomaly">
      <div class="floor-one">
        <img :src='floor1.image' width='100%'>
      </div>
      <div class="floor-right">
        <div class="floor-tow">
          <img :src='floor2.image' width='100%'>
        </div>
        <div>
          <img :src='floor3.image' width='100%'>
        </div>
      </div>
    </div>
    <div class="floor-bottom">
      <div v-for="(item,index) in floorData.slice(3)" :key="index">
        <img :src='item.image' width="100%" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["floorData", "floorTitle"],
  data() {
    return {
      floor1: {},
      floor2: {},
      floor3: {}
    };
  },
  watch: {
    floorData: function(val) {
      this.floor1 = this.floorData[0];
      this.floor2 = this.floorData[1];
      this.floor3 = this.floorData[2];
    }
  }
};
</script>

<style scoped lang='scss'>
$borderColor: #f1f1f1;
$bgColor: #fff;

.floor-title {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
.floor-anomaly {
  display: flex;
  flex-direction: row;
  background-color: $bgColor;
  border-bottom: 1px solid $borderColor;
}
.floor-one {
  border-right: 1px solid $borderColor;
}
.floor-tow {
  border-bottom: 1px solid $borderColor;
}
.floor-bottom {
  display: flex;
  flex-direction: row;
  justify-content: center;
  & > div:nth-child(odd) {
    border-right: 1px solid $borderColor;
  }
  div {
    background: $bgColor;
  }
}
</style>