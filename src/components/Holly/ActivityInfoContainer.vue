<template>
  <transition name="slide-in" mode="out-in">
    <div class="activity-info-container">
      <button @click="closeInfoContainer" class="close-button">X</button>
      <div class="place-container">
        <h1 v-if="placeData.name" class="name">{{ placeData.name }}</h1>
        <h2 v-if="placeData.category" class="category">{{ placeData.category }}</h2>
        <div v-if="placeData.photos" class="img-container">
          <img :src="placePhotos" class="img">
        </div>
        <div v-if="placeData.website" class="website">
          <a :href="placeData.website" target="_blank">Visit site</a>
        </div>
        <div v-if="placeData.address">
          <p>
            <i class="fas fa-map-marker-alt"></i> {{ placeData.address }}
          </p>
        </div>
        <div v-if="placeData.phoneNumber">
          <p>
            <i class="fas fa-mobile-alt"></i> {{ placeData.phoneNumber }}
          </p>
        </div>
        <div v-if="placeData.openTimes">
          <p v-if="placeData.openNow">
            <i class="fas fa-heart"></i>
            <span>Open now!</span>
          </p>
          <p v-if="!placeData.openNow">
            <i class="fas fa-heart-broken"></i>
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
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ActivityInfoContainer",
  props: {
    placeData: Object
  },
  data: function() {
    return {
      starTotal: 5,
      width: Number
    }
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
    }
  }
};
</script>

<style scoped>
.activity-info-container {
  background: url("../../assets/holly/pattern-background.png") center / cover;
  position: absolute;
  z-index: 1000;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto 0;
  width: 25%;
  height: 75%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border: solid #c7800e 8px;
  color: #fff;
  border-right: none;
  font-family: "Spinnaker", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.place-container {
  position: absolute;
  top: 60px;
  width: 80%;
}
.close-button {
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.img-container {
  width: 100%;
}
.img {
  width: 100% !important;
  /* max-height: 100%; */
  border-radius: 20px;
  border: #ddd 1px solid;
  box-shadow: 0px 0px 1px 1px #000;
  margin-bottom: 4%;
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
  color: #ffd711;
  margin-bottom: 7%;
}
a {
  color: #c7800e;
  /* text-decoration: underline; */
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
  color: #ffd711;
  font-weight: 600;
}
i {
  color: #c7800e;
}
.stars {
  margin-bottom: 0;
}
.rated-by {
  font-size: 0.7rem;
}
</style>


