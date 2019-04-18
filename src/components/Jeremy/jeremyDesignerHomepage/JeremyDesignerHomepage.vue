<template>
  <div>
    <div class="hero">
      <img class="hero" src="../../../assets/jeremy/jeremy-hero.jpg" alt>
    </div>
<!-- displays the designers from API -->
    <div class="designer-component">
      <div class="text-center">
        <h1>Our Designers</h1>
      </div>

      <div v-for="user in users" v-bind:key="user.id" class="d-inline-flex">
        <router-link to="/projectcomponent" exact>
          <div @click="getProjectsByUser(user.id);" class="ddelement container row">
            <div class="p-2">
              <img :id="user.id" class="user-image" v-bind:src="user.images[138]">
            </div>

            <div class="p-2">
              <h4 v-bind:href="user.display_name" target="_blank">{{ user.display_name }}</h4>
              <h6>Specialises in:</h6>
              <ul>
                <li v-bind:href="user.fields" target="_blank">{{ user.fields[0] }}</li>
                <li v-bind:href="user.fields" target="_blank">{{ user.fields[1] }}</li>
                <li v-bind:href="user.fields" target="_blank">{{ user.fields[2] }}</li>
              </ul>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "JeremyDesignerHomepage",
  props: ["source"],
  data: function() {
    return {
      users: []
    };
  },
  methods: {
    // retrieves designer information from API
    getUsers: function() {
      this.$http
        .get("https://behance-mock-api.glitch.me/api/users")
        .then(function(data) {
          this.users = data.body.users;
        });
    },
    // pushes the designers id onto next page
    getProjectsByUser: function(userId) {
      this.$router.push({
        name: "projectcomponent",
        params: { userId: userId }
      });
    }
  },
  created: function() {
    // initiates get user
    this.getUsers();
  }
};
</script>

<style scoped>

li, h4, h6{
  text-align:left;
}

/* h6{
  text-align:left;
} */

.ddelement {
  padding: 20px;
  margin: 50px;
  box-shadow: none;
  transition: box-shadow 0.5s ease;
}

.ddelement:hover {
  box-shadow: -1px -1px 5px 5px rgba(0, 0, 0, 0.21);
}

.designer-component {
  margin-top: 70px;
  text-align: center;
}

.designer {
  margin-top: 50px;
  margin-bottom: 120px;
  margin-left: 60px;
  margin-right: 60px;
}
.designer-details {
  margin-left: 10px;
}
.userImage {
  box-shadow: -4px 4px 5px 0px rgba(0, 0, 0, 0.4);
}

.hero {
  max-width: 100%;
  height: auto;
}

.h7 {
  background-color: #dbdbdb;
  padding: 100px;
  color: #474747;
  font-size: 20px;
}

a {
  color: #000;
}
</style>
