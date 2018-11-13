// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;

import { Button, Row, Col, Icon, Field, SwipeItem, Swipe, Lazyload, List } from "vant";
Vue.use(Button)
  .use(Row)
  .use(Col)
  .use(Field)
  .use(SwipeItem)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(List)
  .use(Icon);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
