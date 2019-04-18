<template>
  <div>
    <div class="designer-header">
      <JkHeader/>
    </div>

    <div class="jk-designer-bar">
      <div class="jk-left-div">
        <h1>{{ project.name }}</h1>
        <p
          class="project-data"
        >{{ project.stats.views }} Views, {{ project.stats.appreciations }} Appreciations, {{ project.stats.views }} Comments</p>
      </div>
      <div class="jk-previous-button">
        <a class="nav-item nav-link">
          <router-link v-bind:to="'/jkdesigners'">Previous Page</router-link>
        </a>
      </div>
    </div>
    <div class="field-tags container">
      <p id="jk-project-tags">Project Tags:</p>
      <div v-for="fields in project.fields" :key="fields">
        <p>{{ fields }}</p>
      </div>
    </div>
    <div class="jk-project-container">
      <div
        class="project-images container"
        v-for="image in project.modules"
        :key="image.sizes.original"
      >
        <img class="shadow-sm" v-bind:src="image.sizes.original">
      </div>
    </div>
  </div>
</template>

<script>
import JkHeader from "./JkHeader.vue";

export default {
  name: "JkDesigners",
  data: function() {
    return {
      project: {
        "stats": {
            "views": 0,
            "appreciations": 0,
            "comments": 0
        }
      }
    }
  },
  components: {
    JkHeader
  },
  methods: {
    // getProject is used to gather the api link so it can be used in the template later on.
    getProject: function(projectId) {
      this.$http
        .get("https://behance-mock-api.glitch.me/api/projects/" + projectId)
        .then(function(data) {
          this.project = data.body.project;
        });
    }
  },
  created: function() {
    // this gathers the project id from the previous route and pushes it into this document
    this.getProject(this.$route.params.projectId);
  }
};
</script>

<style>
#jk-project-tags {
  font-weight: 800;
}

.field-tags {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.field-tags p {
  padding-right: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 0px;
  font-size: 12px;
  color: #abafb5;
}

.designer-header,
.jk-designer-bar {
  background-color: black;
}

.project-data {
  padding-top: 6px;
}

.jk-users {
  display: flex;
  flex-direction: row;
}

.jk-designers p,
.jk-designers h4 {
  font-family: acumin-pro, sans-serif;
}

.project-images img {
  max-width: 100%;
  height: auto;
  max-height: 100%;
}

.jk-project-container {
  padding-bottom: 1em;
}
</style>