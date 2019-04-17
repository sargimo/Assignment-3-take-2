<template>
  <div>
    <div class="designer-header">
      <JkHeader/>
    </div>

    <div class="jk-designer-bar">
      <div class="jk-left-div">
        <h1>Our Designers</h1>
        <p>Based in our wellington branch.</p>
      </div>
    </div>
    <div class="jk-users container">
      <div
        class="jk-designers"
        v-for="user in users"
        v-bind:key="user.id"
        v-on:click="getProjectsByUser(user.id)"
      >
        <img v-bind:title="user.id" target="_blank" v-bind:src="user.images[138]">
        <p target="_blank">Web Developer</p>
        <h4 target="_blank">{{ user.username }}</h4>

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
      users: {}
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
    getProjectsByUser: function(userId) {
      this.$router.push({ name: "jkprojects", params: { userId: userId } });
    }
  },
  created: function() {
    this.getDesigners();
  }
};
</script>

<style>
.designer-header,
.jk-designer-bar {
  background-color: black;
}


/* Global CSS for the Designer bar */
.jk-designer-bar {
  color: #fff;
  padding-top: 2em;
  padding-bottom: 2em;
  padding-left: 2em;
  display: flex;
}

.jk-designer-bar h1 {
  font-size: 60px;
  width: 1200px;
  margin-bottom: -10px;
}

.jk-designer-bar p {
  font-size: 9px;
  margin-bottom: 0;
}

.jk-designer-bar a {
  font-size: 12px;
}

.jk-previous-button {
  padding-top: 3em;
  padding-left: 30em;
  height: 35px;
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

.jk-users {
  display: flex;
  flex-direction: row;
}
</style>