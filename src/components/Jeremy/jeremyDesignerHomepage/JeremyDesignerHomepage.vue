<template>
  <div>
    <div class="hero">
      <img class="hero" src="../../../assets/jeremy/jeremy-hero.jpg" alt>
    </div>

    <!-- <div
      class="h7 text-center"
    >DZign.Co is an innovative design firm featuring some of the most talented designers in New Zealand. Our team have won countless awards and worked on majore corporate projects.</div>-->

    <div class="designer-component">
      <div class="text-center">
        <h1>Our Designers</h1>
      </div>

      <div v-for="user in users" v-bind:key="user.id" class="d-inline-flex designer-element">
        <router-link to="/designerportfolio">
          <div class="ddelement container row">
            <div class="p-2">
              <img class="user-image" v-bind:src="user.images[138]">
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

      <div class="row">
        <router-link v-bind:to="'/designerportfolio'">
          <div class="designer d-flex flex-row col-md">
            <div class="designer-image">
              <img class="userImage" src="../../../assets/jeremy/designer1.png" alt>
            </div>
            <div class="designer-details">
              <h3>Dudley Dawson</h3>
              <h5>UX Designer</h5>

              <h6>Specialises in:</h6>
              <ul>
                <li>User Experience</li>
                <li>User Interface</li>
                <li>Web Design</li>
              </ul>
            </div>
          </div>
        </router-link>

        <router-link v-bind:to="'/designerportfolio'">
          <div class="designer d-flex flex-row col-md">
            <div class="designer-image">
              <img class="userImage" src="../../../assets/jeremy/designer3.png" alt>
            </div>
            <div class="designer-details">
              <h3>Samantha Spectre</h3>
              <h5>Graphic Designer</h5>

              <h6>Specialises in:</h6>
              <ul>
                <li>Logo Design</li>
                <li>Knolling Design</li>
                <li>Document Design</li>
              </ul>
            </div>
          </div>
        </router-link>

        <router-link v-bind:to="'/designerportfolio'">
          <div class="designer d-flex flex-row col-md">
            <div class="designer-image">
              <img class="userImage" src="../../../assets/jeremy/designer2.png" alt>
            </div>
            <div class="designer-details">
              <h3>Albert Jacobs</h3>
              <h5>Image Expert</h5>

              <h6>Specialises in:</h6>
              <ul>
                <li>Photography</li>
                <li>Publications</li>
                <li>UX Design</li>
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
    getUsers: function() {
      console.log("get");

      this.$http
        .get("https://behance-mock-api.glitch.me/api/users")
        .then(function(data) {
          console.log("data", data);
          this.users = data.body.users;
        });
    }
  },
  created: function() {
    this.getUsers();
  }
};
</script>

<style scoped>

.designer-element{
  margin: 15px;
}

.ddelement {
  padding: 50px;
  margin: 50px;
  border-radius: 25px;
  box-shadow: -1px -1px 5px 5px rgba(0, 0, 0, 0.21);
}

.ddelement:hover {
  box-shadow: none;
}

.designer-component {
  margin-top: 70px;
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
