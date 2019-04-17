<template>
  <div class="info-screen">
    <div class="lhs-nav" :class="{navIsHidden: mobileNavIsActive && !mobileNavIsDisplayed}">
      <i
        class="fas fa-chevron-left closeNav"
        v-if="mobileNavIsActive && mobileNavIsDisplayed"
        @click="setMobileNavIsDisplayed(false)"
      ></i>
      <i
        class="fas fa-chevron-right openNav"
        v-if="mobileNavIsActive && !mobileNavIsDisplayed"
        @click="setMobileNavIsDisplayed(true)"
      ></i>
      <transition name="fade" mode="out-in">
        <Logo
          v-if="!mobileNavIsActive || mobileNavIsDisplayed"
          @$setLandingTrue="setLandingTrue"
          :landing-is-active="landingIsActive"
        />
      </transition>
      <transition name="fade" mode="out-in">
        <SearchBar
          v-if="!mobileNavIsActive || mobileNavIsDisplayed"
          @$searchForQuery="searchForQuery"
          @setCategoryNull="setCategoryNull"
          :landing-is-active="landingIsActive"
          :search-query="searchQuery"
        />
      </transition>
      <transition name="fade" mode="out-in">
        <div
          v-if="!mobileNavIsActive || mobileNavIsDisplayed"
          :class="{buttonsLanding: landingIsActive, buttonsInfo: !landingIsActive}"
        >
          <ButtonBike
            :button-is-active="category == 0"
            @$categorySelected="categorySelected"
            :landing-is-active="landingIsActive"
          />
          <ButtonHiking
            :button-is-active="category == 1"
            @$categorySelected="categorySelected"
            :landing-is-active="landingIsActive"
          />
          <ButtonWater
            :button-is-active="category == 2"
            @$categorySelected="categorySelected"
            :landing-is-active="landingIsActive"
          />
          <ButtonActivities
            :button-is-active="category == 3"
            @$categorySelected="categorySelected"
            :landing-is-active="landingIsActive"
          />
        </div>
      </transition>
    </div>
    <transition name="slide-in" mode="out-in">
      <HollyActivityInfoContainer
        @$closeInfoContainer="closeInfoContainer"
        @$getDirections="getDirections"
        :place-data="placeData"
        v-show="markerIsActive && !isGettingDirections"
        class="activity-info-container"
      />
    </transition>
  </div>
</template>

<script>
import Logo from "./nav/Logo.vue";
import SearchBar from "./nav/SearchBar.vue";
import ButtonBike from "./nav/ButtonBike.vue";
import ButtonHiking from "./nav/ButtonHiking.vue";
import ButtonWater from "./nav/ButtonWater.vue";
import ButtonActivities from "./nav/ButtonActivities.vue";
import HollyActivityInfoContainer from "./HollyActivityInfoContainer.vue";

export default {
  name: "HollyInfoScreen",

  components: {
    Logo,
    SearchBar,
    ButtonBike,
    ButtonHiking,
    ButtonWater,
    ButtonActivities,
    HollyActivityInfoContainer
  },

  props: {
    landingIsActive: Boolean,
    category: null,
    markerIsActive: Boolean,
    placeData: Object,
    searchQuery: null,
    isGettingDirections: Boolean
  },

  data: function() {
    return {
      // Handling responsiveness
      mobileNavIsActive: false,
      mobileNavIsDisplayed: false,
      viewPortWidth: 0
    };
  },

  watch: {
    /**
     * Determines viewport width and sets responsive states accordingly.
     */
    viewPortWidth: function() {
      if (this.viewPortWidth <= 550) {
        this.mobileNavIsActive = true;
        this.setMobileNavIsDisplayed(false);
      } else {
        this.mobileNavIsActive = false;
        this.setMobileNavIsDisplayed(false);
      }
    }
  },
  
  methods: {
    /**
     * Sets states and emits method call to handle category selection (or deselection).
     * @param {Number} id
     */
    categorySelected: function(id) {
      this.setMobileNavIsDisplayed(false);
      this.$emit("$categorySelected", id);
    },

    /**
     * Emits method call to handle changing to landing screen.
     */
    setLandingTrue: function() {
      this.$emit("$setLandingTrue");
    },

    /**
     * Sets states and emits method call to handle user closing activity information container.
     */
    closeInfoContainer: function() {
      this.setMobileNavIsDisplayed(false);
      this.$emit("$closeInfoContainer");
    },

    /**
     * Sets states and emits method call to handle user searching a query.
     * @param {String} query
     */
    searchForQuery: function(query) {
      if (this.mobileNavIsActive) {
        this.setMobileNavIsDisplayed(false);
      }
      this.$emit("$searchForQuery", query);
    },

    /**
     * Emits method call to handle setting category to default value (null).
     */
    setCategoryNull: function() {
      this.$emit("$setCategoryNull");
    },

    /**
     * Handles UI and emits method call to handle user clicking "Get Directions" button.
     */
    getDirections: function() {
      this.setMobileNavIsDisplayed(false);
      this.$emit("$getDirections");
    },

    /**
     * Toggles display/hiding of left-hand-side navigation panel for mobile viewport screens.
     * @param {Boolean} bool
     */
    setMobileNavIsDisplayed: function(bool) {
      bool
        ? (this.mobileNavIsDisplayed = true)
        : (this.mobileNavIsDisplayed = false);
    },

    /**
     * Sets value of viewPortWidth.
     */
    changeViewportWidth: function() {
      this.viewPortWidth = window.innerWidth;
    }
  },
  /**
   * Sets initial viewPortWidth and adds resize listener.
   * Sets responsiveness states for left-hand-side navigation panel.
   */
  created: function() {
    let that = this;
    window.addEventListener("resize", this.changeViewportWidth);
    this.changeViewportWidth();
    setTimeout(function() {
      that.setMobileNavIsDisplayed(false);
    }, 1);
  }
};
</script>

<style scoped src="./styles/nav.css">
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease-in-out, transform 1.5s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: width 0.2s ease-in-out, transform 0.2s ease-in-out;
}

.slide-in-enter,
.slide-in-leave-to {
  width: 0%;
}
</style>