<template>
  <div>
    <div class="designer-header">
      <JkHeader/>
    </div>

    <div class="jk-designer-bar">
      <div>
        <h1>{{ project.name }}</h1>
      </div>
      <div class="jk-previous-button">
        <a class="nav-item nav-link">
          <router-link v-bind:to="'/jkdesigners'">Previous Page</router-link>
        </a>
      </div>
    </div>
    <div class="project-images container" v-for="image in project.modules" v-bind:key="image.sizes">
      <img class="shadow-sm" v-bind:src="image.sizes.original">
    </div>
  </div>
</template>

<script>
import JkHeader from "./JkHeader.vue";

export default {
  name: "JkDesigners",
  data: function() {
    return {
      project: []
    };
  },
  components: {
    JkHeader
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
    // console.log("params", this.$route.params.projectId)
    this.getProject(this.$route.params.projectId);
  }
};
</script>

<style>
.designer-header,
.jk-designer-bar {
  background-color: black;
}

.jk-designer-bar {
  color: #fff;
  padding-top: 2em;
  padding-bottom: 2em;
  padding-left: 2em;
}

.jk-designer-bar h1 {
  font-size: 60px;
  margin-bottom: -10px;
}

.jk-designer-bar p {
  font-size: 9px;
  margin-bottom: 0;
}

.jk-users {
  display: flex;
  flex-direction: row;
}

.jk-designers {
  padding: 10em 2em 0em 2em;
}

.jk-designers img {
  width: 300px;
}

.jk-designers p {
  margin: 2px 0 0 0;
  font-size: 10px;
  color: #abafb5;
}

.jk-designers p,
.jk-designers h4 {
  font-family: acumin-pro, sans-serif;
}

.jk-designers h4 {
  font-weight: 700;
}

.project-images img {
  max-width: 100%;
  height: auto;
  max-height: 100%;
}
</style>