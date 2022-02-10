import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/",
      name: "quickBuy",
      component: () => import("@/views/QuickBuy/index.vue")
    }
  ]
});
