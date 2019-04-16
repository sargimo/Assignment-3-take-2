<template>
  <div class="landing">
    <router-link class="homeButton" :to="'/'">
      <i class="fas fa-chevron-left"></i>
    </router-link>
    <Logo @$setLandingTrue="setLandingTrue" :landing-is-active="landingIsActive"/>
    <div>
      <h1>Find your next adventure...</h1>
    </div>
    <SearchBar @$searchForQuery="searchForQuery" :landing-is-active="landingIsActive"/>
    <div :class="{buttonsLanding: landingIsActive, buttonsInfo: !landingIsActive}">
      <ButtonBike @$categorySelected="categorySelected" :landing-is-active="landingIsActive"/>
      <ButtonHiking @$categorySelected="categorySelected" :landing-is-active="landingIsActive"/>
      <ButtonWater @$categorySelected="categorySelected" :landing-is-active="landingIsActive"/>
      <ButtonActivities @$categorySelected="categorySelected" :landing-is-active="landingIsActive"/>
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
    landingIsActive: Boolean
  },
  
  methods: {
    /**
     * Emits method call to handle category selection (or deselection).
     * @param {Number} id
     */
    categorySelected: function(id) {
      this.$emit("$categorySelected", id);
    },

    /**
     * Refreshes window and emits method call to handle changing to landing screen.
     */
    setLandingTrue: function() {
      location.reload();
      this.$emit("$setLandingTrue");
    },

    /**
     * Emits method call to handle user searching a query.
     * @param {String} query
     */
    searchForQuery: function(query) {
      this.$emit("$searchForQuery", query);
    },

    /**
     * Emits method call to handle user clicking "Get Lucky" button.
     */
    getLucky: function() {
      this.$emit("$getLucky");
    }
  }
};
</script>

<style scoped src="./styles/nav.css">
</style>