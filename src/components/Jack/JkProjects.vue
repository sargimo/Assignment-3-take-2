<template>
<div>
  <div class="designer-header">
  <JkHeader />
  </div>

  <div class="jk-designer-bar"> 
  <h1>Their Projects</h1>
  <p>Based in our wellington branch.</p>
  </div>
<div class="jk-testy">
  <div class="jk-designers" v-for="project in projects" v-bind:key="project.id">
    <!-- <img target="_blank""> -->
    <h4 target="_blank" >{{ project.name }}</h4>
    <p></p>
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
      users: []
    };
  },
  components: {
    JkHeader
  },
  methods: {
    getProjects: function() {
      if (this.$route.params.UserValue) {
        this.$http
          .get("https://behance-mock-api.glitch.me/api/users/" + UserValue + "/projects")
          .then(function(data) {
          this.projects = data.body.projects;
        });
    }
  },
  created: function() {
    this.getProjects();
  },
}
}
</script>

<style>
.designer-header, .jk-designer-bar {
  background-color: black;
}

.jk-designer-bar  {
  color: #fff;
  padding-top: 2em;
  padding-bottom: 2em;
  padding-left: 2em;
}

.jk-designer-bar  h1 {
  font-size: 60px;
  margin-bottom: -10px;
}

.jk-designer-bar  p {
  font-size: 9px;
  margin-bottom: 0;
}

.jk-testy {
  display: flex;
  flex-direction: row;
}

</style>