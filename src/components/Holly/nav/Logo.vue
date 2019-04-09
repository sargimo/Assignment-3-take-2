<template>
  <div :class="{logoLinkLanding: this.$parent.$parent.$parent.$data.landing, logoLinkInfo: this.$parent.$parent.$parent.$data.info}">
    <img @click="goHome" :class="{logoLanding: this.$parent.$parent.$parent.$data.landing, logoInfo: this.$parent.$parent.$parent.$data.info}" src="../../../assets/holly/logo-final.png">
  </div>
</template>

<script>
export default {
    name: "Logo",
    methods: {
      goHome: function() {
        this.$emit("$goHome");
      }
    }
};
</script>

<style scoped src="../constants/navCSS.css">
</style>

<style scoped>

</style>

