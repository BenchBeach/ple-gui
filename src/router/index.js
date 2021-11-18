import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

let routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: "/",
    name: "index",
    component: () => import("@/views/index"),
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/MainView"),
        meta: {
          title: "首页",
          requireAuth: true,
          normalAuthPass: true,
          icon: 'mdi-home'
        },
      }
    ]
  },
  // 请将404放在最后
  {
    path: "*",
    name: "404",
    component: () => import("@/views/404"),
    meta: {
      title: "404",
      requireAuth: false,
      normalAuthPass: true,
    },
  }
];
const router = new VueRouter({
  routes,
});

export default router;
