<template>
  <div id="app">
     <router-view ></router-view >
  </div>
</template>

<script>

export default {
  name: "App",
  components: {
  },
  data: function() {
    return {
      landing: true,
      info: false
    }
  }
};
</script>

<style>
</style>
