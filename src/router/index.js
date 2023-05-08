import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/table",
    name: "图表",
    meta:{
      tb:true,
      rootlogin:true,
    },
    component: () => import("../views/Home.vue"),
  },
  {
    path: '/',
    name: '登录',
    component: () => import('../views/Login.vue'), 
  },
  {
    path: "/home",
    name: "主页",
    meta:{
      rootlogin:true,
    },
    component: () => import("../views/Nav.vue"),
    redirect: "/nav",
  },
  {
    path: "/nav",
    name: "后台导航栏",
    meta:{
      rootlogin:true,
    },
    component: () => import("../views/Nav.vue"),
    redirect: "/nav/doc",
    children: [
      {
        path: "support",
        name: "客服",
        meta:{
          sup:true,
          rootlogin:true,
        },
        component: () => import("../views/support.vue"),
      },
      {
        path: "super",
        name: "超级管理员",
        component: () => import("../views/Super.vue"),
        meta:{
          rootlogin:true,
        },
      },
      {
        path: "doc",
        name: "医生",
        component: () => import("../views/Doctor.vue"),
        meta:{
          rootlogin:true,
        },
      },
      {
        path: "pet",
        name: "宠物管理",
        component: () => import("../views/Pet.vue"),
        meta:{
          rootlogin:true,
        },
      },
      {
        path: "ok",
        name: "已就诊病例",
        component: () => import("../views/Ok.vue"),
        meta:{
          rootlogin:true,
        },
      },
      {
        path: "pre",
        name: "预约管理",
        component: () => import("../views/Pre.vue"),
        meta:{
          rootlogin:true,
        },
      },
      {
        path: "finish",
        name: "已完成订单",
        component: () => import("../views/PreOk.vue"),
        meta:{
          rootlogin:true,
        },
      },
      {
        path: "lose",
        name: "过期订单",
        component: () => import("../views/PreLose.vue"),
        meta:{
          rootlogin:true,
        },
      },
      {
        path: "hospital",
        name: "医院管理医生列表",
        component: () => import("../views/Hospital.vue"),
        meta:{
          rootlogin:true,
        },
      },
      {
        path: "product",
        name: "商品信息",
        component: () => import("../views/Product.vue"),
        meta:{
          rootlogin:true,
        },
      },
      {
        path: "server",
        name: "宠物服务",
        component: () => import("../views/PetServer.vue"),
        meta:{
          rootlogin:true,
        },
      },
    ],
  },

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
