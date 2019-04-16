<template>
  <div>
    <Mynav/>
    <h1>hello mars</h1>

    <div class="project-list-container">
      <div class="project-list-details">
      <h1>{{ project.name }}</h1>
      </div>
      <div class="single-project-images" v-for="image in project.modules">
        <img class="looped-images" v-bind:src="image.sizes.original">
      </div>
    </div>
    <CallToAction/>
    <Myfooter/>
  </div>
</template>

<script>
import Mynav from ".././mynav/Mynav.vue";
import Myfooter from ".././myfooter/Myfooter.vue";
import CallToAction from ".././calltoaction/CallToAction.vue";

export default {
  name: "SingleProject",
  data: function() {
    return {
      project: []
    };
  },
  components: {
    Mynav,
    CallToAction,
    Myfooter
  },
  methods: {
    getProject: function(projectId) {
      this.$http
        .get("https://behance-mock-api.glitch.me/api/projects/" + projectId)
        .then(function(data) {
          this.project = data.body.project;
        });
    }
  },
  created: function() {
    console.log("params", this.$route.params.projectId);
    this.getProject(this.$route.params.projectId);
  }
};
</script>

<style scoped>
.single-project-images {
  margin: 15px;
  box-shadow: 1px 5px 5px 4px rgba(135,135,135,0.54);
  max-width: 900px;
  text-align: center;
}

.looped-images {
  width: 900px;
  height: 100%;
  padding: 0px;
}
</style>
