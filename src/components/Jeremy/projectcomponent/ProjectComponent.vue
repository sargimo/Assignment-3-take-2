<template>
  <div>
    <Mynav/>

<!-- displays projects from from a particular designer -->
    <div class="d-flex justify-content-around project-elements">
      <div v-for="project in projects" v-bind:key="project.id">
        <div class="p-2">
          <img v-bind:src="project.covers[404]">
          <h2 v-bind:href="project.ame" target="_blank">{{ project.name }}</h2>
          <h4>Behance Link</h4>
          <h6>
            <a v-bind:href="project.url" target="_blank">{{ project.url }}</a>
          </h6>
          <div class="col-sm">
            <h6
              v-bind:href="project.stats.views"
              target="_blank"
              class="color-363636"
            >Views: {{ project.stats.views }}</h6>
            <h6
              v-bind:href="project.stats.appreciations"
              target="_blank"
              class="color-363636"
            >Appreciations: {{ project.stats.appreciations }}</h6>
            <h6
              v-bind:href="project.stats.comments"
              target="_blank"
              class="color-363636"
            >Comments: {{ project.stats.comments }}</h6>
          </div>
          <!-- Button to get a project -->
          <router-link to="/singleproject" exact>
          <button type="button" class="btn btn-primary" v-on:click="getAProject(project.id)">View Project</button>
          </router-link>

        </div>
      </div>

      <!-- Old Original Concept to display API information -->
      <!-- <div class="d-inline-flex ddelement justify-content-around align-items-center row">
        <div class="project-photos-cover col-sm">
          <h2 v-bind:href="project.name" target="_blank">{{ project.name }}</h2>
          <img class="project-cover" v-bind:src="project.covers[202]">
        </div>

        <div class="col-sm">
          <h5>Behance Link:</h5>
          <h6>
            <a v-bind:href="project.url" target="_blank">{{ project.url }}</a>
          </h6>
          <h6
            v-bind:href="project.stats.views"
            target="_blank"
            class="color-363636"
          >Views: {{ project.stats.views }}</h6>
          <h6
            v-bind:href="project.stats.appreciations"
            target="_blank"
            class="color-363636"
          >Appreciations: {{ project.stats.appreciations }}</h6>
          <h6
            v-bind:href="project.stats.comments"
            target="_blank"
            class="color-363636"
          >Comments: {{ project.stats.comments }}</h6>
        </div>

        <div class="col-sm tags">
          <h6>Tags</h6>
          <ul>
            <li v-bind:href="project.tags" target="_blank"  class="color-363636">{{ project.tags[0] }}</li>
            <li v-bind:href="project.tags" target="_blank"  class="color-363636">{{ project.tags[1] }}</li>
            <li v-bind:href="project.tags" target="_blank"  class="color-363636">{{ project.tags[2] }}</li>
            <li v-bind:href="project.tags" target="_blank"  class="color-363636">{{ project.tags[3] }}</li>
            <li v-bind:href="project.tags" target="_blank"  class="color-363636">{{ project.tags[4] }}</li>
          </ul>
        </div>
      </div>-->

      <!-- <div class="d-flex justify-content-around">
        <div v-for="photo in project.modules" v-bind:key="photo.sizes" class="project-photos-cover">
          <img class="project-images" v-bind:src="photo.sizes.max_1200">
        </div>
      </div>-->
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
  name: "ProjectComponent",
  components: {
    Mynav,
    Myfooter,
    CallToAction
  },
  data: function() {
    return {
      projects: []
    };
  },
  methods: {
    // gets projects from particular designer with designer id that was pushed from previous page
    getProjects: function(userId) {
      this.$http
        .get(
          "https://behance-mock-api.glitch.me/api/users/" + userId + "/projects"
        )
        .then(function(data) {
          this.projects = data.body.projects;
        });
    },
    // pushes project id to next page to display images from this particular project
    getAProject: function(projectId) {
      this.$router.push({
        name: "singleproject",
        params: { projectId: projectId }
      });
    }
  },
  created: function() {
    // console.log("params", this.$route.params.userId);
    this.getProjects(this.$route.params.userId);
  }
};
</script>


<style scoped>
.project-photos-cover {
  margin-top: 10px;
  margin-bottom: 10px;
  /* text-align: center; */
}

.color-363636 {
  color: #636363;
}
.project-images {
  /* border-radius: 25px; */
  border-color: #cccccc;
  border-style: solid;
  border-width: 2px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 500px;
  height: 350px;
}

/* .project-cover {
  height: 110px;
} */

.designer-element {
  margin: 15px;
}

.ddelement {
  margin: 5px;
  width: 100vw;
  padding: 20px;
  background-color: #dbdbdb;
  transition: background-color 0.5s ease;
  /* text-align: center; */
}

.ddelement:hover {
  background-color: #8b8b8b;
}

.project-elements {
  padding: 30px;
}

.modal-dialog {
  max-width: 1200px;
  margin: 1.75rem auto;
}

.modal-body {
  text-align: center;
}
</style>
