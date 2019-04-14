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
  background: rgba(0, 0, 0, 0.55);
}
.homeButton {
  align-self: flex-start;
  margin: 2%;
  margin-bottom: 0;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 2rem;
}
.homeButton:focus {
  outline: none;
}
.feeling-lucky-button {
  margin-top: 2%;
  background: #edca2f;
  border-radius: 4px;
  padding: 0.5% 1%;
  color: #291e02;
  font-size: 1.4rem;
  border: #ffffff solid 1px;
}
.feeling-lucky-button:hover {
  background: #c78003;
  color: #f4f4f4;
}
.feeling-lucky-button:focus {
  outline: none;
}
.feeling-lucky-button:active {
  border: #edca2f solid 1px;
}

</style>