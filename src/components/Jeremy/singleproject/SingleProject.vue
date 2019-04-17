<template>
  <div>
    <Mynav/>
<!-- displays project heading and information and images from the project. Please note that heading information is hard coded lorem ipsum text -->
    <div class="project-list-container">
      <div class="project-list-details">
        <h1>{{ project.name }}</h1>
        <hr>
        <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</h6>
      </div>
<!-- below line of code is redlined because v-bind causes an error in console -->
      <div class="single-project-images margin15" v-for="image in project.modules" v-bind:key="image.sizes.original"> 
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
    // gets project information and images from API
    getProject: function(projectId) {
      this.$http
        .get("https://behance-mock-api.glitch.me/api/projects/" + projectId)
        .then(function(data) {
          this.project = data.body.project;
        });
    }
  },
  created: function() {
    // console.log("params", this.$route.params.projectId);
    this.getProject(this.$route.params.projectId);
  }
};
</script>

<style scoped>

h6{
  color: #444;
}

.project-list-container {
  margin: auto;
  width: 60%;
  padding-bottom: 30px;
}
.project-list-details {
  text-align: center;
  margin: 30px;
}

.margin15 {
  margin: 15px;
}
.single-project-images {
  max-width: 900px;
  margin: 0 auto;
}

.looped-images {
  width: 900px;
  height: 100%;
  margin: 10px;
}
</style>
