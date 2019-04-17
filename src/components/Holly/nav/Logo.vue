<template>
  <div :class="{logoLinkLanding: landingIsActive, logoLinkInfo: !landingIsActive}">
    <img
      @click="setLandingTrue"
      :class="{logoLanding: landingIsActive, logoInfo: !landingIsActive}"
      src="../../../assets/holly/logo-final.png"
      alt="RAd: Rotorua Adventure"
    >
  </div>
</template>

<script>
export default {
  name: "Logo",

  props: {
    landingIsActive: Boolean
  },
  
  methods: {
    /**
     * Emits method call to display landing screen.
     */
    setLandingTrue: function() {
      this.$emit("$setLandingTrue");
    }
  }
};
</script>

<style scoped src="../styles/nav.css">
</style>