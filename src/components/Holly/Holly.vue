<!-- Parent component to everything: Holly (landing) and InfoScreen!!! -->

<template>
  <div class="home">
    <HollyMap
      @$setLandingFalse="setLanding(false)"
      @$markerClicked="markerClicked"
      :landing="landing"
      :category="category"
      :markerIsActive="markerIsActive"
      :searchQuery="searchQuery"
    />
    <HollyLanding
      v-if="landing"
      @$setLandingFalse="setLanding(false)"
      @$categorySelected="categorySelected"
      @$searchForQuery="searchForQuery"
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
      this.setLanding(false);
      this.setCategory(id);
      this.setSearchQuery(null);
    },
    markerClicked: function(placeData) {
      this.placeData = placeData;
      this.setMarkerIsActive(true);
    },
    closeInfoContainer: function() {
      this.setMarkerIsActive(false);
    },
    searchForQuery: function(query) {
      this.setLanding(false);
      this.setSearchQuery(query);
      this.setCategory(null);
    },
    setLanding: function(bool) {
      if(bool) {
        this.setSearchQuery(null);
        this.landing = true;
        this.setMarkerIsActive(false)
      }else {
        this.landing = false;
      }
    },
    setMarkerIsActive: function(bool) {
      bool ? this.markerIsActive = true : this.markerIsActive = false;
    },
    setCategory: function(value) {
      value = null ? this.category = null : this.category = value;
    },
    setSearchQuery: function(value) {
      value == null ? this.searchQuery = "" : this.searchQuery = value;
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