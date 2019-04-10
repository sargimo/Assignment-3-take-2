<template>
  <div :class="{buttonLanding: landing, buttonInfo: !landing, buttonIsActive: buttonIsActive}">
    <img
      @click="categorySelected"
      id="2"
      :class="{buttonImgLanding: landing, buttonImgInfo: !landing, buttonImgIsActive: buttonIsActive}"
      src="../../../assets/holly/button-water.png"
    >
    <p class="buttonTitle">WATER</p>
  </div>
</template>

<script>
export default {
  name: "ButtonWater",
  props: {
    landing: Boolean,
    buttonIsActive: false
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
