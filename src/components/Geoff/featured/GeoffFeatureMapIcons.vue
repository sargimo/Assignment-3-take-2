<template>
  <div>
    <div :key="index" v-for="(sources, index) in source" :style="styles[index]">
      <img src="../../../assets/geoff/geoff-map-marker.png">
    </div>
  </div>
</template>

<script>
export default {
  name: "GeoffFeatureMapIcons",
  props: ['source'],
  data: function() {
    return {
      styles: []
    }
  },
  watch: {
    source: function() {
      let that = this;
      this.styles = [];
      $.each(that.source, function(i, venue) {
        console.log(venue.style)
        let style = JSON.parse(venue.style)
        that.styles.push(style);
      })
    }
  }
};
</script>

<style scoped>
  .mapIcon {
    position: absolute;
    top: 800px;
    left: 200px;
  }
</style>
