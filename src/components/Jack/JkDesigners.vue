<template>
<div>
  <div class="designer-header">
  <JkHeader />
  </div>

  <div class="jk-designer-bar"> 
  <h1>Our Designers</h1>
  <p>Based in our wellington branch.</p>
  </div>
<div class="jk-testy">
  <div class="jk-designers" v-for="user in users" v-bind:key="user.id">
    <img target="_blank" v-bind:src="user.images[115]">
    <h4 target="_blank" >{{ user.username }}</h4>
    <p></p>
    <p></p>
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
      users: []
    };
  },
  components: {
    JkHeader
  },
  methods: {
    getDesigners: function() {
      this.$http
        .get("https://behance-mock-api.glitch.me/api/users")
        .then(function(data) {
          this.users = data.body.users;
        });
    },
    getProjectsByUser: function() {

    }
  },
  created: function() {
    this.getDesigners();
  }
};
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