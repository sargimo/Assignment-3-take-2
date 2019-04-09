
<template>
  <div
    :class="{buttonLanding: this.$parent.$parent.$parent.$data.landing, buttonInfo: this.$parent.$parent.$parent.$data.info,
            buttonIsActive: buttonIsActive}"
  >
    <img
      @click="categorySelected"
      id="0"
      :class="{buttonImgLanding: this.$parent.$parent.$parent.$data.landing, buttonImgInfo: this.$parent.$parent.$parent.$data.info,
                buttonImgIsActive: buttonIsActive}"
      src="../../../assets/holly/button-bike.png"
    >
    <p class="buttonTitle">MOUNTAIN BIKING</p>
  </div>
</template>

<script>
export default {
  name: "ButtonBike",
  props: { 
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
