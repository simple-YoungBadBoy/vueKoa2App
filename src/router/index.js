import Vue from "vue";
import Router from "vue-router";
import index from "@/components/index";
import register from "@/components/page/register";
import login from "@/components/page/login";
import goods from "@/components/page/goods";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: index
    },
    {
      path: "/register",
      name: "register",
      component: register
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/goods",
      name: "goods",
      component: goods
    }
  ]
});
