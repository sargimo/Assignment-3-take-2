<template>
  <div :class="{buttonLanding: landing, buttonInfo: !landing, buttonIsActive: buttonIsActive}">
    <img
      @click="categorySelected"
      id="1"
      :class="{buttonImgLanding: landing, buttonImgInfo: !landing, buttonImgIsActive: buttonIsActive}"
      src="../../../assets/holly/button-hiking.png"
    >
    <p class="buttonTitle">HIKING</p>
  </div>
</template>

<script>
export default {
  name: "ButtonHiking",
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