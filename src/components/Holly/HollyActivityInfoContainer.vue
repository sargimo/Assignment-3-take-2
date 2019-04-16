<template>
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
      starTotal: 5,
      starWidth: Number,

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
      this.starWidth = starPercentRounded;
    },
    getDirections: function() {
      this.$emit("$getDirections");
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
  position: absolute;
  z-index: 3;
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
  color: #edca2f;
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
  z-index: 4;
  width: 50%;
  padding: 2.5% 1.5%;
  font-size: 1.2rem;
  border-radius: 8px;
  background: #edca2f;
  border: #f4f4f4 solid 1px;
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
  border: #291e02 solid 1px;
}

/* Media queries */
@media screen and (max-width: 1900px) {
  .activity-info-container {
    width: 30%;
  }
  .place-container {
    height: 70%;
  }
  .directions-button {
    width: 50%;
    padding: 2% 0;
    font-size: 1.3rem;
  }
}
@media screen and (max-width: 1700px) {
  .activity-info-container {
    width: 40%;
  }
  .place-container {
    height: 68%;
  }
  .directions-button {
    width: 40%;
    padding: 2% 0;
    font-size: 1.3rem;
  }
}
@media screen and (max-width: 1400px) {
  .activity-info-container {
    width: 40%;
  }
  .place-container {
    height: 68%;
  }
  .directions-button {
    width: 48%;
    padding: 2% 0;
    font-size: 1.3rem;
  }
}
@media screen and (max-width: 1200px) {
  .activity-info-container {
    width: 77%;
    height: 100%;
    border-radius: 0;
  }
  .place-container{
    height: 66%;
  }
  .img-container {
    margin-bottom: 4%;
  }
  .name {
    font-size: 2.4rem;
  }
  .category {
    font-size: 1.6rem;
    margin-bottom: 1%;
  }
  .directions-button {
    width: 40%;
    padding: 1.8% 0;
    font-size: 1.3rem;
  }
}
@media screen and (max-width: 800px) {
  .activity-info-container {
    width: 70%;
    height: 100%;
    border-radius: 0;
  }
  .place-container {
    height: 65%;
  }
  .directions-button {
    width: 64%;
    padding: 2% 0;
    font-size: 1.4rem;
  }
}
@media screen and (max-width: 550px) {
  .activity-info-container {
    width: 100%;
    height: 100%;
    border-radius: 0;
    border-right: #c7800e solid 8px;
  }
  .place-container {
    height: 64%;
  }
  .place-details {
    height: 35%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .place-details p {
    font-size: 1rem;
  }
  .name {
    font-size: 2rem;
    margin-bottom: 1%;
  }
  .category {
    font-size: 1.2rem;
    margin-bottom: 2%;
  }
  a {
    font-size: 1.3rem;
  }
  .stars-outer {
    font-size: 1.8rem;
  }
  .stars {
    margin-bottom: 1%;
  }
  .rated-by {
    font-size: 0.8rem;
    margin-bottom: 2%;
  }
  .directions-button {
    width: 70%;
    padding: 4%;
    font-size: 1.4rem;
  }
}
@media screen and (max-width: 400px) {
  .activity-info-container {
    width: 100%;
    height: 100%;
    border-radius: 0;
    border-right: #c7800e solid 8px;
  }
  .title-container {
    margin-top: -3%;
  }
  .place-container {
    height: 60%;
  }
  .name {
    font-size: 1.4rem;
  }
  .category {
    font-size: 1rem;
    margin-bottom: 6%;
  }
  .img {
    margin-bottom: 2%;
  }
  .stars-outer {
    font-size: 1.4rem;
  }
  .directions-button {
    font-size: 1rem;
    width: 60%;
    padding: 2%;
  }
}
</style>