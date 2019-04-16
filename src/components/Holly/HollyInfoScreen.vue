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
          :landing="landing"
        />
      </transition>
      <transition name="fade" mode="out-in">
        <SearchBar
          v-if="!mobileNavIsActive || mobileNavIsDisplayed"
          @$searchForQuery="searchForQuery"
          @setCategoryNull="setCategoryNull"
          :landing="landing"
          :searchQuery="searchQuery"
        />
      </transition>
      <transition name="fade" mode="out-in">
        <div
          v-if="!mobileNavIsActive || mobileNavIsDisplayed"
          :class="{buttonsLanding: landing, buttonsInfo: !landing}"
        >
          <ButtonBike
            :buttonIsActive="category == 0"
            @$categorySelected="categorySelected"
            :landing="landing"
          />
          <ButtonHiking
            :buttonIsActive="category == 1"
            @$categorySelected="categorySelected"
            :landing="landing"
          />
          <ButtonWater
            :buttonIsActive="category == 2"
            @$categorySelected="categorySelected"
            :landing="landing"
          />
          <ButtonActivities
            :buttonIsActive="category == 3"
            @$categorySelected="categorySelected"
            :landing="landing"
          />
        </div>
      </transition>
    </div>
    <!-- Transition on v-if?? -->
    <transition name="slide-in" mode="out-in">
      <HollyActivityInfoContainer
        @$closeInfoContainer="closeInfoContainer"
        @$getDirections="getDirections"
        :placeData="placeData"
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
    landing: Boolean,
    category: null,
    markerIsActive: Boolean,
    placeData: Object,
    searchQuery: null,
    isGettingDirections: Boolean
  },
  data: function() {
    return {
      mobileNavIsActive: false,
      mobileNavIsDisplayed: false,
      viewPortWidth: 0
    };
  },
  watch: {
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
    categorySelected: function(id) {
      this.$emit("$categorySelected", id);
      this.setMobileNavIsDisplayed(false);
    },
    setLandingTrue: function() {
      this.$emit("$setLandingTrue");
    },
    closeInfoContainer: function() {
      this.setMobileNavIsDisplayed(false);
      this.$emit("$closeInfoContainer");
    },
    searchForQuery: function(query) {
      if(this.mobileNavIsActive) {
        this.setMobileNavIsDisplayed(false);
      }
      this.$emit("$searchForQuery", query);
    },
    setCategoryNull: function() {
      this.$emit("$setCategoryNull");
    },
    getDirections: function() {
      this.setMobileNavIsDisplayed(false);
      this.$emit("$getDirections");
    },
    setMobileNavIsDisplayed: function(bool) {
      bool
        ? (this.mobileNavIsDisplayed = true)
        : (this.mobileNavIsDisplayed = false);
    },
    changeViewportWidth: function() {
      this.viewPortWidth = window.innerWidth;
    }
  },
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

<style scoped src="./constants/navCSS.css">
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