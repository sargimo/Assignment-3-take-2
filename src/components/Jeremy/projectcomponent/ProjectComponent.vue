<template>
  <div>
    <h3>Projects Component</h3>

    <div v-for="project in projects" v-bind:key="project.id">
      <div class="d-inline-flex ddelement justify-content-around align-items-center">
        <div class="project-photos-cover">
          <h2 v-bind:href="project.name" target="_blank">{{ project.name }}</h2>
          <img class="project-cover" v-bind:src="project.covers[230]">
        </div>
        <div>
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
        <div class="tags">
          <h6>Tags</h6>
          <ul>
            <li v-bind:href="project.tags" target="_blank">{{ project.tags[0] }}</li>
            <li v-bind:href="project.tags" target="_blank">{{ project.tags[1] }}</li>
            <li v-bind:href="project.tags" target="_blank">{{ project.tags[2] }}</li>
            <li v-bind:href="project.tags" target="_blank">{{ project.tags[3] }}</li>
            <li v-bind:href="project.tags" target="_blank">{{ project.tags[4] }}</li>
          </ul>
        </div>
      </div> -->

      <div class="d-flex justify-content-around">
        <div v-for="photo in project.modules" v-bind:key="photo.sizes" class="project-photos-cover">
          <img class="project-images" v-bind:src="photo.sizes.max_1200">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectComponent",
  data: function() {
    return {
      projects: [],
      designerId: ""
    };
  },
  created: function() {
    // console.log('params', this.$route.params);
    if (this.$route.params.designerId) {
      this.designerId = this.$route.params.designerId;
      let array = [];
      //gets api data based on url tag and filters the data based on category
      this.$http.get(
        "https://behance-mock-api.glitch.me/api/users/" +
          this.designerId +
          "/projects"
      );
    }
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

.project-cover {
  height: 110px;
}

.designer-element {
  margin: 15px;
}

.ddelement {
  width: 100vw;
  padding: 20px;
  background-color: #dbdbdb;
  /* text-align: center; */
}

.ddelement:hover {
  box-shadow: none;
}
</style>
