<template>
  <div :class="{logoLinkLanding: landing, logoLinkInfo: !landing}">
    <img @click="setLandingTrue" :class="{logoLanding: landing, logoInfo: !landing}" src="../../../assets/holly/logo-final.png">
  </div>
</template>

<script>
export default {
    name: "Logo",
    props: {
      landing: Boolean
    },
    methods: {
      setLandingTrue: function() {
        this.$emit("$setLandingTrue");
      }
    }
};
</script>

<style scoped src="../constants/navCSS.css">
</style>