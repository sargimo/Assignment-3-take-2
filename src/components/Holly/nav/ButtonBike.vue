<template>
  <div :class="{buttonLanding: landing, buttonInfo: !landing, buttonIsActive: buttonIsActive}">
    <img
      @click="categorySelected"
      id="0"
      :class="{buttonImgLanding: landing, buttonImgInfo: !landing, buttonImgIsActive: buttonIsActive}"
      src="../../../assets/holly/button-bike.png"
    >
    <p class="buttonTitle">MOUNTAIN BIKING</p>
  </div>
</template>

<script>
export default {
  name: "ButtonBike",
  props: {
    landing: Boolean,
    buttonIsActive: Boolean
  },
  methods: {
    categorySelected: function(evt) {
      this.$emit("$categorySelected", evt.target.id);
    }
  }
};
</script>

<style scoped src="../constants/navCSS.css">
</style>