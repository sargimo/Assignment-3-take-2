<template>
  <div class="activity-info-container">
    <i @click="closeInfoContainer" class="fas fa-times-circle close-button"></i>
    <div class="title-container">
      <h1 v-if="placeData.name" class="name">{{ placeData.name }}</h1>
      <h2 v-if="placeData.category" class="category">{{ placeData.category }}</h2>
    </div>
    <div class="place-container">
      <div v-if="placeData.photos" class="img-container">
        <img :src="placePhotos" class="img" alt="Activity image">
      </div>
      <div class="place-details">
        <div v-if="placeData.address">
          <p>
            <i class="fas fa-map-marker-alt"></i>
            {{ placeData.address }}
          </p>
        </div>
        <div v-if="placeData.phoneNumber">
          <p>
            <i class="fas fa-mobile-alt"></i>
            {{ placeData.phoneNumber }}
          </p>
        </div>
        <div v-if="placeData.openTimes">
          <p v-if="placeData.openNow">
            <i class="fas fa-check-circle"></i>
            <span>Open now!</span>
          </p>
          <p v-if="!placeData.openNow">
            <i class="fas fa-times-circle"></i>
            <span>Closed right now!</span>
          </p>
        </div>
        <div v-if="placeData.rating" class="rating">
          <p class="stars">
            <span class="stars-outer">
              <span :style="{ width: starWidth + '%' }" class="stars-inner"></span>
            </span>
          </p>
          <span v-if="placeData.userRatings" class="rated-by">Rated by {{ placeData.userRatings }}</span>
        </div>
        <div v-if="placeData.website" class="website">
          <a :href="placeData.website" target="_blank">Check it out!</a>
        </div>
      </div>
    </div>
    <button @click="getDirections" class="directions-button">
      <i class="fas fa-location-arrow"></i>GET DIRECTIONS
    </button>
  </div>
</template>

<script>
export default {
  name: "HollyActivityInfoContainer",

  props: {
    placeData: Object
  },

  data: function() {
    return {
      // Star rating data
      starTotal: 5,
      starWidth: Number
    };
  },

  computed: {
    /**
     * @return {String} placePhotos
     */
    placePhotos: function() {
      return this.placeData.photos[0].getUrl();
    }
  },

  watch: {
    /**
     * Calculates star rating according to current place.
     */
    placeData: function() {
      this.convertRating();
    }
  },

  methods: {
    /**
     * Emits method call to close activity information container.
     */
    closeInfoContainer: function() {
      this.$emit("$closeInfoContainer");
    },

    /**
     * Converts a rating out of 5 to a percentage in order to fill stars.
     * Code sourced from:
     * https://webdesign.tutsplus.com/tutorials/a-simple-javascript-technique-for-filling-star-ratings--cms-29450
     */
    convertRating: function() {
      let starPercentage = (this.placeData.rating / this.starTotal) * 100;
      let starPercentRounded = `${Math.round(starPercentage / 10) * 10}`;
      this.starWidth = starPercentRounded;
    },

    /**
     * Emits method call to get and display directions on map.
     */
    getDirections: function() {
      this.$emit("$getDirections");
    }
  }
};
</script>

<style scoped src="./styles/activityInfoContainer.css">
</style>