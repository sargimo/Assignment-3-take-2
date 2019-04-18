import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import Home from "./components/Home.vue";
import Geoff from "./components/Geoff/Geoff.vue";
import GeoffCategories from "./components/Geoff/GeoffCategories.vue";
import GeoffMapLoader from "./components/Geoff/map/GeoffMapLoader.vue";
import GeoffMapCategories from "./components/Geoff/map/GeoffMapCategories";
import GeoffFeatureLanding from "./components/Geoff/featured/GeoffFeatureLanding.vue";
import GeoffBackBtn from "./components/Geoff/GeoffBackBtn.vue";
import Holly from "./components/Holly/Holly.vue";
import Jack from "./components/Jack/Jack.vue";
import Jeremy from "./components/Jeremy/Jeremy.vue";
import ProjectComponent from "./components/Jeremy/projectcomponent/ProjectComponent.vue";
import SingleProject from "./components/Jeremy/singleproject/SingleProject.vue";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  { path: "/", component: Home },
  { path: "/geoff", component: Geoff },
  { path: "/geoffcategories", component: GeoffCategories },
  { path: "/geoffmaploader", component: GeoffMapLoader, name: "geoffmaploader", props: true },
  { path: "/geoffmapcategories", component: GeoffMapCategories, name: "geoffmapcategories", props: true },
  { path: "/geofffeaturelanding", component: GeoffFeatureLanding, name: "geofffeaturelanding", props: true },
  { path: "/geoffbackbtn", component: GeoffBackBtn },
  { path: "/holly", component: Holly },
  { path: "/jack", component: Jack },
  { path: "/jeremy", component: Jeremy},
  {
    name: "projectcomponent",
    path: "/projectcomponent",
    component: ProjectComponent,
    props: true
  },
  {
    name: "singleproject",
    path: "/singleproject",
    component: SingleProject,
    props: true
  },
  
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

$(document).ready(function() {
  new Vue({
    render: h => h(App), 
    router
  }).$mount("#app");
});