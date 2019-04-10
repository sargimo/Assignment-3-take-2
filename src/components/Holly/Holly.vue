<!-- Parent component to everything: Holly (landing) and InfoScreen!!! -->

<template>
  <div class="home">
    <GoogleMap
      @$landingFalse="landingFalse"
      @$markerClicked="markerClicked"
      :landing="landing"
      :category="category"
      :markerIsActive="markerIsActive"
      :searchQuery="searchQuery"
      :mapConfig="mapConfig"
    />
    <HollyLanding
      @$categorySelected="categorySelected"
      @$searchForQuery="searchForQuery"
      v-if="this.$parent.$data.landing"
    />
    <HollyInfoScreen
      @$goHome="goHome"
      @$categorySelected="categorySelected"
      @$closeInfoContainer="closeInfoContainer"
      @$searchForQuery="searchForQuery"
      :category="category"
      :placeData="placeData"
      :markerIsActive="markerIsActive"
      v-if="this.$parent.$data.info"
    />
  </div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";
import GoogleMap from "./GoogleMap.vue";
import HollyLanding from "./HollyLanding.vue";
import HollyInfoScreen from "./HollyInfoScreen.vue";
import { mapSettings } from "./constants/mapSettings.js";
import { CENTER_LAT_LONG } from "./constants/data.js";

export default {
  name: "Holly",
  components: {
    GoogleMap,
    HollyLanding,
    HollyInfoScreen
  },
  data: function() {
    return {
      category: "",
      landing: false,
      markerIsActive: false,
      searchQuery: "",
      placeData: {}
    };
  },
  computed: {
    mapConfig() {
      return {
        ...mapSettings,
        center: { lat: CENTER_LAT_LONG[0], lng: CENTER_LAT_LONG[1] }
      };
    }
  },
  methods: {
    categorySelected: function(id) {
      this.$parent.$data.landing = false;
      this.$parent.$data.info = true;
      this.category = id;
    },
    goHome: function() {
      this.$parent.$data.landing = true;
      this.$parent.$data.info = false;
      this.landing = true;
      this.markerIsActive = false;
    },
    landingFalse: function() {
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
      this.searchQuery = query;
    }
  }
};
</script>


<style scoped>
.home {
  font-family: "Amatic SC", cursive;
  font-family: 'Cabin', sans-serif;
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
  font-family: 'Spinnaker', sans-serif;
  /* font-family: 'Viga', sans-serif; */
}
</style>