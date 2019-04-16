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
        :landing-is-active="landingIsActive"
        :category="category"
        :marker-is-active="markerIsActive"
        :search-query="searchQuery"
        :is-getting-lucky="isGettingLucky"
        :is-getting-directions="isGettingDirections"
      />
      <HollyLanding
        v-if="landingIsActive"
        @$setLandingFalse="setLanding(false)"
        @$categorySelected="categorySelected"
        @$searchForQuery="searchForQuery"
        @$getLucky="getLucky"
        :landing-is-active="landingIsActive"
      />
      <HollyInfoScreen
        v-if="!landingIsActive"
        @$setLandingFalse="setLanding(false)"
        @$setLandingTrue="setLanding(true)"
        @$categorySelected="categorySelected"
        @$closeInfoContainer="closeInfoContainer"
        @$searchForQuery="searchForQuery"
        @$setCategoryNull="setCategory(null)"
        @$getDirections="getDirections"
        :landing-is-active="landingIsActive"
        :category="category"
        :marker-is-active="markerIsActive"
        :search-query="searchQuery"
        :is-getting-directions="isGettingDirections"
        :place-data="placeData"
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
      landingIsActive: true,
      category: null,
      markerIsActive: false,
      searchQuery: null,
      placeData: {},
      isGettingLucky: false,
      isGettingDirections: false
    };
  },
  
  methods: {
    /**
     * Handles states when a category is selected (or deselected).
     * @param {Number} id
     */
    categorySelected: function(id) {
      this.setLanding(false);
      this.setCategory(id);
      this.setSearchQuery(null);
    },

    /**
     * Handles marker click events, updating states and current place data.
     * @param {Object} placeData
     */
    markerClicked: function(placeData) {
      this.placeData = placeData;
      this.setMarkerIsActive(true);
    },

    /**
     * Handles closing of activity information container.
     */
    closeInfoContainer: function() {
      this.setIsGettingDirections(false);
      this.setMarkerIsActive(false);
    },

    /**
     * Handles user submitting a search query.
     * @param {String} query
     */
    searchForQuery: function(query) {
      this.setLanding(false);
      this.setSearchQuery(query);
      this.setCategory(null);
    },

    /**
     * Handles user clicking "Feeling Lucky?" button.
     */
    getLucky: function() {
      this.setIsGettingLucky(true);
      this.setLanding(false);
    },

    /**
     * Handles user clicking "Get Directions" button.
     */
    getDirections: function() {
      this.setIsGettingDirections(true);
    },

    /**
     * Handles states for whether or not landing screen is displayed.
     * @param {Boolean} bool
     */
    setLanding: function(bool) {
      if (bool) {
        this.setSearchQuery(null);
        this.setLandingIsActive(true);
        this.setCategory(null);
        this.setMarkerIsActive(false);
      } else {
        this.setLandingIsActive(false);
      }
    },

    /**
     * Sets markerIsActive state according to whether or not a marker is active (clicked on).
     * @param {Boolean} bool
     */
    setMarkerIsActive: function(bool) {
      bool ? (this.markerIsActive = true) : (this.markerIsActive = false);
    },

    /**
     * Sets category value according to user selection (or deselection). May be null.
     * @param {Number} value
     */
    setCategory: function(value) {
      value == null ? (this.category = null) : (this.category = value);
    },

    /**
     * Sets value of searchQuery according to user input. May be null.
     * @param {String} value
     */
    setSearchQuery: function(value) {
      value == null ? (this.searchQuery = null) : (this.searchQuery = value);
    },

    /**
     * Sets isGettingLucky state regarding user clicking "Feeling Lucky?" button.
     * @param {Boolean} bool
     */
    setIsGettingLucky: function(bool) {
      bool ? (this.isGettingLucky = true) : (this.isGettingLucky = false);
    },

    /**
     * Sets isGettingDirections state regarding user clicking "Get Directions" button.
     * @param {number} id
     */
    setIsGettingDirections: function(bool) {
      bool
        ? (this.isGettingDirections = true)
        : (this.isGettingDirections = false);
    },

    /**
     * Sets landingIsActive state regarding whether landing screen is displayed.
     * @param {Boolean} bool
     */
    setLandingIsActive: function(bool) {
      bool ? (this.landingIsActive = true) : (this.landingIsActive = false);
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