import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";

import Home from "./components/Home.vue";

import Geoff from "./components/Geoff/Geoff.vue";
import GeoffCategories from "./components/Geoff/GeoffCategories.vue";
import GeoffMap from "./components/Geoff/map/GeoffMap.vue";
import GeoffFeatureLanding from "./components/Geoff/featured/GeoffFeatureLanding.vue";
import Holly from "./components/Holly/Holly.vue";
import Jack from "./components/Jack/Jack.vue";
import Jeremy from "./components/Jeremy/Jeremy.vue";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  { path: "/", component: Home },
  { path: "/geoff", component: Geoff },
  { path: "/geoffcategories", component: GeoffCategories },
  { path: "/geoffmap", component: GeoffMap },
  { path: "/geofffeaturelanding", component: GeoffFeatureLanding, name: "geofffeaturelanding", props: true },
  { path: "/holly", component: Holly },
  { path: "/jeremy", component: Jeremy },
  { path: "/jack", component: Jack},
  { path: "/jkdesigners", component: JkDesigners},
  { path: "/jkprojects", component: JkProjects, name: "jkprojects", props: true },
  { path: "/jkuserproject", component: JkUserProject, name: "jkuserproject", props: true }
];

// Jack Routing
import JkDesigners from "./components/Jack/JkDesigners.vue";
import JkProjects from "./components/Jack/JkProjects.vue";
import JkUserProject from "./components/Jack/JkUserProject.vue";

const router = new VueRouter({
  routes,
  mode: "history"
});

new Vue({
  render: h => h(App), 
  router
}).$mount("#app");
