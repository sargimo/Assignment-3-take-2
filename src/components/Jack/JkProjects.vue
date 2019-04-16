<template>
  <div>
    <div class="designer-header">
      <JkHeader/>
    </div>

    <div class="jk-designer-bar">
      <div>
        <h1>Their Projects</h1>
        <p>Based in our wellington branch.</p>
      </div>
      <div class="jk-previous-button">
        <a class="nav-item nav-link">
          <router-link v-bind:to="'/jkdesigners'">Previous Page</router-link>
        </a>
      </div>
    </div>

    <div class="jk-project container">
      <div
        class="jk-designers"
        v-for="project in projects"
        v-bind:key="project.id"
        v-on:click="getTheProject(project.id)"
      >
        <img target="_blank" v-bind:src="project.covers[404]">
        <h4 target="_blank">{{ project.name }}</h4>
        <p
          target="_blank"
        >Views: {{ project.stats.views }} | Appreciations: {{ project.stats.appreciations }}</p>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script>
import JkHeader from "./JkHeader.vue";

export default {
  name: "JkProjects",
  data: function() {
    return {
      projects: []
    };
  },
  components: {
    JkHeader
  },
  methods: {
    getProjects: function(userId) {
      this.$http
        .get(
          "https://behance-mock-api.glitch.me/api/users/" + userId + "/projects"
        )
        .then(function(data) {
          this.projects = data.body.projects;
        });
    },
    getTheProject: function(projectId) {
      this.$router.push({
        name: "jkuserproject",
        params: { projectId: projectId }
      });
    }
  },
  created: function() {
    // console.log("params", this.$route.params.userId)
    this.getProjects(this.$route.params.userId);
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
  display: flex;
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

.jk-project {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>