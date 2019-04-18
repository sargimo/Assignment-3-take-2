<template>
  <div>
    <div class="navbar navbar-expand-lg">
      <a class="jack-main-logo">
        <img src="../../assets/jack/jack-logo.png">
      </a>
      <div class="navbar-nav ml-auto">
        <a class="nav-item nav-link">
          <router-link v-bind:to="'/jack'">Home</router-link>
        </a>
        <a class="nav-item nav-link">
          <router-link v-bind:to="'/'">About Us</router-link>
        </a>
        <a class="nav-item nav-link">
          <router-link v-bind:to="'/jkdesigners'">Our Designers</router-link>
        </a>
        <a class="nav-item nav-link">
          <router-link v-bind:to="'/'">Testimonials</router-link>
        </a>
        <a class="nav-item nav-link">
          <router-link v-bind:to="'/'">Contact Us</router-link>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "JkHeader",
  components: {}
};
</script>

<style>
.jack-main-logo img {
  width: 180px;
}

.nav-item a {
  color: #ffffff;
  text-decoration: none;
}

.nav-item a:hover {
  color: #ffff33;
}
</style>