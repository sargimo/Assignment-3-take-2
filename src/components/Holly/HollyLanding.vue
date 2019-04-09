<template>
  <transition name="fade" mode="out-in">
    <div class="landing">
      <router-link class="homeButton" :to="'/'"><i class="fas fa-chevron-left"></i></router-link>
      <Logo @$goHome="goHome"/>
      <div>
        <h1>Find your next adventure...</h1>
      </div>
      <SearchBar @$searchForQuery="searchForQuery"/>
      <div
        :class="{buttonsLanding: this.$parent.$parent.$data.landing, buttonsInfo: this.$parent.$parent.$data.info}"
      >
        <ButtonBike @$categorySelected="categorySelected"/>
        <ButtonHiking @$categorySelected="categorySelected"/>
        <ButtonWater @$categorySelected="categorySelected"/>
        <ButtonActivities @$categorySelected="categorySelected"/>
      </div>
    </div>
  </transition>
</template>

<script>
import Logo from "./nav/Logo.vue";
import SearchBar from "./nav/SearchBar.vue";
import ButtonBike from "./nav/ButtonBike.vue";
import ButtonHiking from "./nav/ButtonHiking.vue";
import ButtonWater from "./nav/ButtonWater.vue";
import ButtonActivities from "./nav/ButtonActivities.vue";

export default {
  name: "HollyLanding",
  components: {
    Logo,
    SearchBar,
    ButtonBike,
    ButtonHiking,
    ButtonWater,
    ButtonActivities
  },
  methods: {
    categorySelected: function(id) {
      this.$emit("$categorySelected", id);
    },
    goHome: function() {
      location.reload();
      this.$emit('$goHome');
    },
    searchForQuery: function(query) {
      this.$emit('$searchForQuery', query);
    }
  }
};
</script>

<style scoped src="./constants/navCSS.css">
</style>

<style scoped>
.landing {
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
}
.homeButton {
  align-self: flex-start;
  margin: 2%;
  margin-bottom: 0;
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
}
.homeButton:focus {
  outline: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease-in-out, transform 1.5s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>