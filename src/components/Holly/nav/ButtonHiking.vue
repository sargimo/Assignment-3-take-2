<template>
  <div :class="{buttonLanding: landingIsActive, buttonInfo: !landingIsActive, buttonIsActive: buttonIsActive}">
    <img
      @click="categorySelected"
      id="1"
      :class="{buttonImgLanding: landingIsActive, buttonImgInfo: !landingIsActive, buttonImgIsActive: buttonIsActive}"
      src="../../../assets/holly/button-hiking.png"
    >
    <p class="buttonTitle">HIKING</p>
  </div>
</template>

<script>
export default {
  name: "ButtonHiking",
  props: {
    landingIsActive: Boolean,
    buttonIsActive: Boolean
  },
  methods: {
    /** 
    * Emits method call to set category value according to button click event.
    * @param {click} evt
    */
    categorySelected: function(evt) {
      this.$emit("$categorySelected", evt.target.id);
    }
  }
};
</script>

<style scoped src="../styles/nav.css">
</style>