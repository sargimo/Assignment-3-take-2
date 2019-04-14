<template>
  <transition name="slide-in" mode="out-in">
    <div class="activity-info-container">
      <i @click="closeInfoContainer" class="fas fa-times-circle close-button"></i>
      <div class="title-container">
        <h1 v-if="placeData.name" class="name">{{ placeData.name }}</h1>
        <h2 v-if="placeData.category" class="category">{{ placeData.category }}</h2>
      </div>
      <div class="place-container">
        <div v-if="placeData.photos" class="img-container">
          <img :src="placePhotos" class="img">
        </div>
        <div class="place-details">
          <div v-if="placeData.address">
            <p>
              <i class="fas fa-map-marker-alt"></i>{{ placeData.address }}
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
                <span :style="{ width: width + '%' }" class="stars-inner"></span>
              </span>
            </p>
            <span v-if="placeData.userRatings" class="rated-by">Rated by {{ placeData.userRatings }}</span>
          </div>
          <div v-if="placeData.website" class="website">
            <a :href="placeData.website" target="_blank">Check it out!</a>
          </div>
        </div>
      </div>
      <button @click="getDirections" class="directions-button"><i class="fas fa-location-arrow"></i>GET DIRECTIONS</button>
    </div>
  </transition>
</template>

<script>
export default {
  name: "HollyActivityInfoContainer",
  props: {
    placeData: Object
  },
  data: function() {
    return {
      starTotal: 5,
      width: Number
    };
  },
  computed: {
    placePhotos: function() {
      return this.placeData.photos[0].getUrl();
    }
  },
  watch: {
    placeData: function() {
      this.convertRating();
    }
  },
  methods: {
    closeInfoContainer: function() {
      this.$emit("$closeInfoContainer");
    },
    convertRating: function() {
      let starPercentage = (this.placeData.rating / this.starTotal) * 100;
      let starPercentRounded = `${Math.round(starPercentage / 10) * 10}`;
      this.width = starPercentRounded;
    },
    getDirections: function() {
      this.$emit('$getDirections');
    }
  }
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: #291e02; 
}
::-webkit-scrollbar-thumb {
  background: #c7800e; 
}
::-webkit-scrollbar-thumb:hover {
  background: #ffd711; 
}
.activity-info-container {
  background: url("../../assets/holly/pattern-background.png") center / cover;
  position: relative;
  z-index: 1000;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: auto 0;
  width: 25%;
  height: 75%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border: #c7800e solid 8px;
  color: #f4f4f4;
  border-right: none;
  font-family: "Spinnaker", sans-serif;
  overflow: hidden;
  padding-bottom: 6%;
  padding-right: 0;
}
.title-container,
.place-container {
  width: 82%;
}
.title-container {
  position: relative;
  top: 60px;
}
.place-container {
  position: relative;
  top: 10%;
  height: 75%;
  overflow-y: auto;
  padding-right: 2%;
}
.place-details {
  width: 94%;
  padding-bottom: 2%;
  margin: auto;
}
i.close-button {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 1.2rem;
  cursor: pointer;
  color: #f4f4f4;
}
i.close-button:hover {
  color: #c7800e;
}
.img-container {
  width: 100%;
  text-align: center;
  margin-bottom: 8%;
}
.img {
  width: 100% !important;
  border-radius: 10px;
}
.name,
.category,
.website {
  text-align: right;
}
.name {
  font-size: 1.6rem;
  margin-bottom: 2%;
}
.category {
  font-size: 1rem;
  color: #c7800e;
  margin-bottom: 7%;
}
a {
  color: #edca2f;
  text-decoration: underline;
}
a:hover {
  color: #c7800e;
}
.slide-in-enter-active,
.slide-in-leave-active {
  transition: width 0.2s ease-in-out, transform 0.2s ease-in-out;
}
.slide-in-enter,
.slide-in-leave-to {
  width: 0%;
}
.stars-outer {
  display: inline-block;
  position: relative;
  font-family: "Font Awesome 5 Free";
  color: transparent;
}
.stars-outer:before {
  content: "\f005 \f005 \f005 \f005 \f005";
}
.stars-inner {
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  width: 0;
}
.stars-inner:before {
  content: "\f005 \f005 \f005 \f005 \f005";
  color: #ffe523;
  font-weight: 600;
}
.fas {
  color: #c7800e;
  margin-right: 2%;
}
.stars {
  margin-bottom: 0;
}
.rated-by {
  font-size: 0.7rem;
}
.directions-button {
  position: absolute;
  bottom: 5%;
  z-index: 100;
  width: 50%;
  padding: 2.5% 1.5%;
  font-size: 1.2rem;
  border-radius: 8px;
  background: #edca2f;
  border: #ffffff solid 1px;
  color: #291e02;
}
.directions-button .fas {
  color: #291e02;
}
.directions-button:hover .fas {
  color: #edca2f;
}
.directions-button:hover {
  color: #f4f4f4;
  background: #c7800e;
}
.directions-button:focus {
  outline: none;
}
.directions-button:active {
  border: #edca2f solid 1px;
}
</style>