import Vue from "vue";
import Router from "vue-router";
import index from "@/components/index";
import register from "@/components/page/register";
import login from "@/components/page/login";
import goods from "@/components/page/goods";
import categrayList from "@/components/page/categrayList";
import cart from "@/components/page/Cart";
import main from "@/components/page/Main";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/main",
      name: "main",
      component: main,
      children: [
        {
          path: "/",
          name: "index",
          component: index
        },
        {
          path: "/categrayList",
          name: "categrayList",
          component: categrayList
        },
        {
          path: "/cart",
          name: "cart",
          component: cart
        }
      ]
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
