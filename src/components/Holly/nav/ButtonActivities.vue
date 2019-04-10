<template>
  <div :class="{buttonLanding: landing, buttonInfo: !landing, buttonIsActive: buttonIsActive}">
    <img
      @click="categorySelected"
      id="3"
      :class="{buttonImgLanding: landing, buttonImgInfo: !landing, buttonImgIsActive: buttonIsActive}"
      src="../../../assets/holly/button-activities.png"
    >
    <p class="buttonTitle">ACTIVITIES</p>
  </div>
</template>

<script>
export default {
  name: "ButtonActivities",
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
