import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import routes from "./routes";

const router = new VueRouter({
  mode: "history", // use "real" paths instead of hash URLs
  routes
});

Vue.config.productionTip = false;
Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
