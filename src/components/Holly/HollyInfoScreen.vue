<template>
  <div class="info-screen">
    <div class="lhs-nav">
      <Logo @$setLandingTrue="setLandingTrue" :landing="landing"/>
      <SearchBar @$searchForQuery="searchForQuery" :landing="landing" :searchQuery="searchQuery"/>
      <div :class="{buttonsLanding: landing, buttonsInfo: !landing}">
        <ButtonBike
          :buttonIsActive="category==0"
          @$categorySelected="categorySelected"
          :landing="landing"
        />
        <ButtonHiking
          :buttonIsActive="category==1"
          @$categorySelected="categorySelected"
          :landing="landing"
        />
        <ButtonWater
          :buttonIsActive="category==2"
          @$categorySelected="categorySelected"
          :landing="landing"
        />
        <ButtonActivities
          :buttonIsActive="category==3"
          @$categorySelected="categorySelected"
          :landing="landing"
        />
      </div>
    </div>
    <!-- Transition on v-if?? -->
    <ActivityInfoContainer
      @$closeInfoContainer="closeInfoContainer"
      :placeData="placeData"
      v-show="markerIsActive"
      class="activity-info-container"
    />
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
    landing: Boolean,
    category: null,
    markerIsActive: Boolean,
    placeData: Object,
    searchQuery: ""
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
    setLandingTrue: function() {
      this.$emit("$setLandingTrue");
    },
    closeInfoContainer: function() {
      this.$emit("$closeInfoContainer");
    },
    searchForQuery: function(query) {
      this.$emit("$searchForQuery", query);
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

