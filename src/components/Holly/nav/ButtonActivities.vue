<template>
  <div :class="{buttonLanding: landingIsActive, buttonInfo: !landingIsActive, buttonIsActive: buttonIsActive}">
    <img
      @click="categorySelected"
      id="3"
      :class="{buttonImgLanding: landingIsActive, buttonImgInfo: !landingIsActive, buttonImgIsActive: buttonIsActive}"
      src="../../../assets/holly/button-activities.png"
    >
    <p class="buttonTitle">ACTIVITIES</p>
  </div>
</template>

<script>
export default {
  name: "ButtonActivities",
  props: {
    landingIsActive: Boolean,
    buttonIsActive: Boolean
  },
  methods: {
    categorySelected: function(evt) {
      /** 
      * Emits method call to set category value according to button click event.
      * @param {click} evt
      */
      this.$emit("$categorySelected", evt.target.id);
    }
  }
};
</script>

<style scoped src="../styles/nav.css">
</style>