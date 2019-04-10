<template>
  <div class="activity-info-container">
    <button @click="closeInfoContainer" class="close-button">X</button>
    <div class="place-container">
      <h1 v-if="placeData.name" class="name">{{ placeData.name }}</h1>
      <div v-if="placeData.photos" class="img-container">
        <img :src="placePhotos" class="img">
      </div>
      <div v-if="placeData.website" class="website">
        <a :href="placeData.website" target="_blank">Visit site</a>
      </div>
      <div>
        <p>{{ placeData.rating }}/5</p>
      </div>
    </div>
  </div>
</template>

// { "height": 2988, "html_attributions": [ "<a href=\"https://maps.google.com/maps/contrib/113517593786235636064/photos\">Brenda Neville</a>" ], "width": 5312 }

<script>
export default {
  name: "ActivityInfoContainer",
  props: {
    placeData: Object
  },
  computed: {
    placePhotos: function() {
      return this.placeData.photos[0].getUrl();
    }
  },
  methods: {
    closeInfoContainer: function() {
      this.$emit("$closeInfoContainer");
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
  text-align: right;
}
.img {
  width: 100% !important;
  border-radius: 20px;
  border: #ddd 1px solid;
  box-shadow: 0px 0px 1px 1px #000;
  margin-bottom: 4%;
}
.name,
.website {
  text-align: right;
}
.name {
  font-size: 1.6rem;
  margin-bottom: 8%;
}
a {
  color: #c7800e;
  /* text-decoration: underline; */
}
</style>


