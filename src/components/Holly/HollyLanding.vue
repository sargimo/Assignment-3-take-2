<template>
    <div class="landing">
      <router-link class="homeButton" :to="'/'">
        <i class="fas fa-chevron-left"></i>
      </router-link>
      <Logo @$setLandingTrue="setLandingTrue" :landing="landing"/>
      <div>
        <h1>Find your next adventure...</h1>
      </div>
      <SearchBar @$searchForQuery="searchForQuery" :landing="landing"/>
      <div :class="{buttonsLanding: landing, buttonsInfo: !landing}">
        <ButtonBike @$categorySelected="categorySelected" :landing="landing"/>
        <ButtonHiking @$categorySelected="categorySelected" :landing="landing"/>
        <ButtonWater @$categorySelected="categorySelected" :landing="landing"/>
        <ButtonActivities @$categorySelected="categorySelected" :landing="landing"/>
      </div>
      <button @click="getLucky" class="feeling-lucky-button">FEELING LUCKY?</button>
    </div>
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
  props: {
    landing: Boolean
  },
  methods: {
    categorySelected: function(id) {
      this.$emit("$categorySelected", id);
    },
    setLandingTrue: function() {
      location.reload();
      this.$emit("$setLandingTrue");
    },
    searchForQuery: function(query) {
      this.$emit("$searchForQuery", query);
    },
    getLucky: function() {
      this.$emit('$getLucky');
    }
  }
};
</script>

<style scoped src="./constants/navCSS.css">
</style>