import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect:"/dealersList",
    children:[
      {
        path: '/dealersList',
        name: "经销商列表",
        component: (resolve) => require(['../views/dealers/dealersList'], resolve)
      },
      {
        path: '/dealersDetail',
        name: "经销商详情",
        component: (resolve) => require(['../views/dealers/dealersDetail'], resolve)
      },
    ]
  },
  
];

const router = new VueRouter({
  routes
});

export default router;
