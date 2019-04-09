<template>
  <div class="info-screen">
    <div class="lhs-nav">
      <Logo @$goHome="goHome"/>
      <SearchBar @$searchForQuery="searchForQuery" />
      <div
        :class="{buttonsLanding: this.$parent.$parent.$data.landing, buttonsInfo: this.$parent.$parent.$data.info}"
      >
        <ButtonBike :buttonIsActive="category==0" @$categorySelected="categorySelected"/>
        <ButtonHiking :buttonIsActive="category==1" @$categorySelected="categorySelected"/>
        <ButtonWater :buttonIsActive="category==2" @$categorySelected="categorySelected"/>
        <ButtonActivities :buttonIsActive="category==3" @$categorySelected="categorySelected"/>
      </div>
    </div>
    <!-- Transition on v-if?? -->
    <ActivityInfoContainer @$closeInfoContainer="closeInfoContainer" :placeData="placeData" v-show="markerIsActive" class="activity-info-container" />
  </div>
</template>

<script>
import Logo from "./nav/Logo.vue";
import SearchBar from "./nav/SearchBar.vue";
import ButtonBike from "./nav/ButtonBike.vue";
import ButtonHiking from "./nav/ButtonHiking.vue";
import ButtonWater from "./nav/ButtonWater.vue";
import ButtonActivities from "./nav/ButtonActivities.vue";
import ActivityInfoContainer from "./ActivityInfoContainer.vue";

export default {
  name: "HollyInfoScreen",
  props: {
    category: null,
    markerIsActive: Boolean,
    placeData: Object
  },
  components: {
    Logo,
    SearchBar,
    ButtonBike,
    ButtonHiking,
    ButtonWater,
    ButtonActivities,
    ActivityInfoContainer
  },
  methods: {
    categorySelected: function(id) {
      this.$emit("$categorySelected", id);
    },
    goHome: function() {
      this.$emit("$goHome");
    },
    closeInfoContainer: function() {
      this.$emit('$closeInfoContainer');
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
.info-screen {
  width: 100%;
  height: 100%;
}
.lhs-nav {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  width: 18vw;
  height: 100vh;
  overflow: hidden;
  background: #c7800e;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
}
.activity-info-container {
  position: absolute;
  z-index: 100;
}
</style>

