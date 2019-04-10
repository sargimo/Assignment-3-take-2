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
      <router-link :to="'/jkprojects'" exact>
        <img v-bind:title="user.id" target="_blank" v-on:click="getProjectsByUser" v-bind:src="user.images[115]">
        <h4 target="_blank" >{{ user.username }}</h4>
        <p></p>
        <p></p>
      </router-link>
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
    /** 
      * switch to turn title into category. Used due to being unable to recieve to attributes from the evt.target. There will be a better way 
      * @param {evt} event
    */
    getProjectsByUser: function(evt) {
      let UserValue;
      switch (evt.target.title) {
        case "a4d57bd1-a9b9-4c6c-af55-767537bab564":
          UserValue = "a4d57bd1-a9b9-4c6c-af55-767537bab564";
          break;
      }
      this.$router.push({name: "jkprojects", params: { UserValue: UserValue } });
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