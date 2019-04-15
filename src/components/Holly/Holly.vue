<!-- Parent component to everything: Holly (landing) and InfoScreen!!! -->

<template>
  <transition name="fade" mode="out-in">

  <div class="home">
    <HollyMap
      @$setLandingFalse="setLanding(false)"
      @$markerClicked="markerClicked"
      @$setMarkerFalse="setMarkerIsActive(false)"
      @$setIsGettingLuckyFalse="setIsGettingLucky(false)"
      @$setIsGettingDirectionsFalse="setIsGettingDirections(false)"
      @$setCategoryNull="setCategory(null)"
      :landing="landing"
      :category="category"
      :markerIsActive="markerIsActive"
      :searchQuery="searchQuery"
      :isGettingLucky="isGettingLucky"
      :isGettingDirections="isGettingDirections"
    />
    <HollyLanding
      v-if="landing"
      @$setLandingFalse="setLanding(false)"
      @$categorySelected="categorySelected"
      @$searchForQuery="searchForQuery"
      @$getLucky="getLucky"
      :landing="landing"
    />
    <HollyInfoScreen
      v-if="!landing"
      @$setLandingFalse="setLanding(false)"
      @$setLandingTrue="setLanding(true)"
      @$categorySelected="categorySelected"
      @$closeInfoContainer="closeInfoContainer"
      @$searchForQuery="searchForQuery"
      @$setCategoryNull="setCategory(null)"
      @$getDirections="getDirections"
      :landing="landing"
      :category="category"
      :placeData="placeData"
      :markerIsActive="markerIsActive"
      :searchQuery="searchQuery"
      :isGettingDirections="isGettingDirections"
    />
  </div>
    </transition>

</template>

<script>
import HollyMap from "./HollyMap.vue";
import HollyLanding from "./HollyLanding.vue";
import HollyInfoScreen from "./HollyInfoScreen.vue";

export default {
  name: "Holly",
  components: {
    HollyMap,
    HollyLanding,
    HollyInfoScreen
  },
  data: function() {
    return {
      landing: true,
      category: null,
      markerIsActive: false,
      searchQuery: null,
      placeData: {},
      isGettingLucky: false,
      isGettingDirections: false
    };
  },
  methods: {
    categorySelected: function(id) {
      this.setLanding(false);
      this.setCategory(id);
      this.setSearchQuery(null);
    },
    markerClicked: function(placeData) {
      this.placeData = placeData;
      this.setMarkerIsActive(true);
    },
    closeInfoContainer: function() {
      this.setIsGettingDirections(false);
      this.setMarkerIsActive(false);
    },
    searchForQuery: function(query) {
      this.setLanding(false);
      this.setSearchQuery(query);
      this.setCategory(null);
    },
    getLucky: function() {
      this.isGettingLucky = true;
      this.setLanding(false);
    },
    getDirections: function() {
      this.setIsGettingDirections(true);
    },
    setLanding: function(bool) {
      if(bool) {
        this.setSearchQuery(null);
        this.landing = true;
        this.setCategory(null);
        this.setMarkerIsActive(false)
      }else {
        this.landing = false;
      }
    },
    setMarkerIsActive: function(bool) {
      bool ? this.markerIsActive = true : this.markerIsActive = false;
    },
    setCategory: function(value) {
      value == null ? this.category = null : this.category = value;
    },
    setSearchQuery: function(value) {
      value == null ? this.searchQuery = null : this.searchQuery = value;
    },
    setIsGettingLucky: function(bool) {
      bool ? this.isGettingLucky = true : this.isGettingLucky = false;
    },
    setIsGettingDirections: function(bool) {
      bool ? this.isGettingDirections = true : this.isGettingDirections = false;
    }
  }
};
</script>

<style scoped>
.home {
  font-family: "Spinnaker", sans-serif;
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