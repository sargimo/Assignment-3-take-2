<template>
  <div>
    <Mynav/>
    <h1>this is the portfolio page</h1>
    <h1>Behance Projects</h1>

    <ProjectComponent />
    <div v-for="project in projects" v-bind:key="project.id">
      <!-- <div>
        <h4 v-bind:href="project.name" target="_blank">{{ project.name }}</h4>
        <h6>
          <a v-bind:href="project.url" target="_blank">{{ project.url }}</a>
        </h6>

        <div><img v-for:href="project in projects" :src="covers["202"]" :alt="image.alt" /></div>

        <ul>
            <li v-for:href="project.covers" target="_blank">{{ project.covers }}</li>
        </ul>
      </div> -->
    </div>

    <CallToAction/>
    <Myfooter/>
  </div>
</template>

<script>
import Mynav from ".././mynav/Mynav.vue";
import Myfooter from ".././myfooter/Myfooter.vue";
import CallToAction from ".././calltoaction/CallToAction.vue";
import ProjectComponent from ".././projectcomponent/ProjectComponent.vue";

export default {
  name: "DesignerPorfolio",
  components: {
    Mynav,
    Myfooter,
    CallToAction,
    ProjectComponent
  },
 
};
</script>

<style scoped>
</style>
