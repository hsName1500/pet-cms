import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 引入axios模块
import axios from "axios";
import VueAxios from "vue-axios";



// 配置基础路径
Vue.prototype.axios = axios;
Vue.use(VueAxios, axios);
axios.defaults.baseURL = 'http://127.0.0.1:4021/v1/'

Vue.config.productionTip = false;
//to.meta.rootlogin
router.beforeEach((to, from, next) => {
  console.log(to.meta.rootlogin)
  if (to.meta.rootlogin==true) {
    // 需要权限
    //判断当前是否拥有权限
    if ( window.sessionStorage.getItem('userid') ) {
      next();
    } else {
      // 无权，跳转登录
      next({
        path: "/",
      });
    }
  } else {
    // 不需要权限，直接访问
    next();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
