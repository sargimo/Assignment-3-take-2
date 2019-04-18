<template>
  <transition name="panel-transition" mode="in-out">
    <div class="place-container">
      <button class="back-btn" @click="emitBack">X</button>
      <div class="details">
        <transition name="fade" mode="out-in">
          <div v-if="placeData.name" :key="placeData.name" class="title-text">
            <h1 class="name-text">{{placeData.name}}</h1>
            <p class="category-text">{{placeData.category}}</p>
            <hr class="hrule">
          </div>
        </transition>
        <transition name="fade" mode="out-in">
          <div v if="gPlaceData.address" :key="gPlaceData.address" class="details-text">
            <p v-if="gPlaceData.address">
              <span class="detail-title">ADDRESS:</span>
              {{gPlaceData.address}}
            </p>
            <p v-if="gPlaceData.desc">{{gPlaceData.desc}}</p>
            <p v-if="gPlaceData.distance">
              <span class="detail-title">DISTANCE:</span>
              {{gPlaceData.distance}}m
            </p>
            <p v-if="gPlaceData.phoneNumber">
              <span class="detail-title">PHONE NUMBER:</span>
              {{gPlaceData.phoneNumber}}
            </p>
            <p v-if="gPlaceData.openNow">
              <span class="detail-title open-now">OPEN NOW!</span>
            </p>
            <p v-if="gPlaceData.openTimes">
              <span class="detail-title">OPEN TIMES:</span>
              <br>
              {{gPlaceData.openTimes[0]}}
              <br>
              {{gPlaceData.openTimes[1]}}
              <br>
              {{gPlaceData.openTimes[2]}}
              <br>
              {{gPlaceData.openTimes[3]}}
              <br>
              {{gPlaceData.openTimes[4]}}
              <br>
              {{gPlaceData.openTimes[5]}}
              <br>
              {{gPlaceData.openTimes[6]}}
              <br>
            </p>
            <p v-if="gPlaceData.userRatings">
              <span class="detail-title">USER RATINGS:</span>
              {{gPlaceData.userRatings}}
            </p>
            <p v-if="gPlaceData.website">
              <span class="detail-title">
                <a class="detail-title" :href="this.gPlaceData.website">WEBSITE</a>
              </span>
            </p>
            <!-- <p v-if="gPlaceData.photos">PHOTOS: {{gPlaceData.photos}}</p> -->
            <p v-if="gPlaceData.rating">
              <span class="detail-title">RATING:</span>
              <span class="stars-outer">
                <span :style="{ width: width + '%' }" class="stars-inner"></span>
              </span>
            </p>
            <!-- <p v-if="gPlaceData.reviews">REVIEWS: {{gPlaceData.reviews}}</p> -->
          </div>
        </transition>
      </div>
      <div class="directions">
        <button @click="getDirections">GET DIRECTIONS</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "GeoffPlaceInformation",
  props: {
    placeData: Object,
    gPlaceData: {}
  },
  data: function() {
    return {
      starTotal: 5,
      //used in star conversion
      width: Number
    };
  },
  watch: {
    //converts number into star visual each time a new venue is clicked
    gPlaceData: function() {
      this.convertRating();
    }
  },
  methods: {
    //https://webdesign.tutsplus.com/tutorials/a-simple-javascript-technique-for-filling-star-ratings--cms-29450?fbclid=IwAR2MtEKi2gEQh0miXwm4BZkOsJKBwJQyuGAYmuvHzzXfslrRLHPYFkJQhpk
    //turns a number rating into a visual representation of stars, above link for reference.
    convertRating: function() {
      let starPercentage = (this.gPlaceData.rating / this.starTotal) * 100;
      let starPercentRounded = `${Math.round(starPercentage / 10) * 10}`;
      this.width = starPercentRounded;
    },

    //emits to parent to close info panel
    emitBack: function() {
      this.$emit("$closeInfoPanel");
    },

    //emits to parent get directions has been clicked
    getDirections: function() {
      this.$emit("$getDirections");
    }
  }
};
</script>

<style scoped src="../constants/customFonts.css">
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.place-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  font-family: "Hind Madurai", sans-serif;
  justify-content: center;
  align-items: center;
  z-index: 1;
  right: 0;
  top: 0;
  height: 100vh;
  width: 500px;
  background-color: #222;
  color: #fff;
  padding-top: 150px;
}

.panel-transition-enter-active,
.panel-transition-leave-active {
  transition: width 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.panel-transition-enter,
.panel-transition-leave-to {
  width: 0%;
}

.details {
  width: 70%;
}

.name-text {
  font-family: "BigNoodleTitling", sans-serif;
  text-align: right;
  font-size: 50px;
  line-height: 43px;
}

.category-text {
  font-family: "BigNoodleTitling", sans-serif;
  margin-top: -12px;
  font-size: 20px;
  width: 100%;
  text-align: right;
  color: #ffe96b;
}

.hrule {
  width: 100%;
  border-top: 3px solid #383838;
  padding-bottom: 20px;
}

.detail-title {
  font-family: "BigNoodleTitling", sans-serif;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 2px;
  padding-right: 20px;
  text-decoration: none;
  cursor: pointer !important;
}

.detail-title a {
  color: #3fcbca;
  cursor: pointer !important;
  transform: scale(1);
  transition: all 0.2s linear;
}

.detail-title a:hover {
  transform: scale(1.1);
  color: #ffe96b;
}

.open-now {
  color: #ffe96b;
}

.stars-outer {
  display: inline-block;
  position: relative;
  font-family: "Font Awesome 5 Free";
  font-weight: 200;
  color: #233;
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
  color: #ffe96b;
  font-weight: 900;
}

.directions {
  display: flex;
  justify-content: center;
  align-items: center;
}

.directions button {
  font-family: "BigNoodleTitling", sans-serif;
  font-size: 23px;
  color: #222;
  background-color: #ffe96b;
  text-align: center;
  padding: 5px 60px;
  margin-top: 25px;
  border: none;
  border-radius: 10px;
  transform: scale(1);
  transition: all 0.2s linear;
}

.directions button:hover {
  background-color: #3fcbca;
  color: #fff;
  transform: scale(1.1);
}

.back-btn {
  background: none;
  border: none;
  color: #fff;
  position: absolute;
  top: 130px;
  left: 30px;
}

.back-btn:focus {
  outline: none;
}

@media only screen and (max-width: 1200px) {
  .place-container {
    padding-top: 25px;
  }

  .back-btn {
    top: 50px;
  }
}

@media only screen and (max-width: 800px) {
  .place-container {
    width: 100vw;
  }
}

@media only screen and (max-width: 400px) {
  .name-text {
    font-size: 38px;
    line-height: 34px;
  }
  .category-text {
    font-size: 16px;
  }
}
</style>
