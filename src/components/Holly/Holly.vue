<!-- Parent component to everything: Holly (landing) and InfoScreen!!! -->

<template>
  <div class="home">
    <HollyMap
      @$setLandingFalse="setLandingFalse"
      @$markerClicked="markerClicked"
      :landing="landing"
      :category="category"
      :markerIsActive="markerIsActive"
      :searchQuery="searchQuery"
    />
    <HollyLanding
      v-if="landing"
      @$setLandingFalse="setLandingFalse"
      @$categorySelected="categorySelected"
      @$searchForQuery="searchForQuery"
      :landing="landing"
    />
    <HollyInfoScreen
      v-if="!landing"
      @$setLandingFalse="setLandingFalse"
      @$setLandingTrue="setLandingTrue"
      @$categorySelected="categorySelected"
      @$closeInfoContainer="closeInfoContainer"
      @$searchForQuery="searchForQuery"
      :landing="landing"
      :category="category"
      :placeData="placeData"
      :markerIsActive="markerIsActive"
      :searchQuery="searchQuery"
    />
  </div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";
import HollyMap from "./HollyMap.vue";
import HollyLanding from "./HollyLanding.vue";
import HollyInfoScreen from "./HollyInfoScreen.vue";
import { mapSettings } from "./constants/mapSettings.js";
import { CENTER_LAT_LONG } from "./constants/data.js";

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
      searchQuery: "",
      placeData: {}
    };
  },
  methods: {
    categorySelected: function(id) {
      this.setLandingFalse();
      this.category = id;
    },
    setLandingTrue: function() {
      this.landing = true;
      this.markerIsActive = false;
    },
    setLandingFalse: function() {
      this.landing = false;
    },
    markerClicked: function(placeData) {
      this.placeData = placeData;
      this.markerIsActive = true;
    },
    closeInfoContainer: function() {
      this.markerIsActive = false;
    },
    searchForQuery: function(query) {
      this.setLandingFalse();
      this.searchQuery = query;
      this.category = null;
    }
  }
};
</script>


<style scoped>
.home {
  font-family: "Amatic SC", cursive;
  font-family: "Cabin", sans-serif;
  /* search */
  /* font-family: 'Cuprum', sans-serif; */
  /* font-family: 'Dokdo', cursive; */
  /* search? */
  /* font-family: 'Exo', sans-serif; */
  /* font-family: 'Indie Flower', cursive; */
  /* best */
  /* font-family: 'Istok Web', sans-serif; */
  /* font-family: 'Julius Sans One', sans-serif; */
  /* font-family: 'Nanum Gothic', sans-serif; */
  /* other best */
  /* font-family: 'Nobile', sans-serif; */
  /* font-family: 'Raleway', sans-serif; */
  /* font-family: 'Reenie Beanie', cursive; */
  /* font-family: 'Source Code Pro', monospace; */
  font-family: "Spinnaker", sans-serif;
  /* font-family: 'Viga', sans-serif; */
}
</style>