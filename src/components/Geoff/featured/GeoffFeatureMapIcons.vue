<template>
  <div>
    <div :key="index" v-for="(sources, index) in source" :style="styles[index]">
      <img @click="featureIconClicked" :id="index" src="../../../assets/geoff/geoff-map-marker.png">
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
  methods: {
    featureIconClicked(evt){
      this.$emit("$featureIconClicked", evt.target.id)
    },
    getStyles() {
      let that = this;
      this.styles = [];
      $.each(that.source, function(i, venue) {
        let style = JSON.parse(venue.style)
        that.styles.push(style);
      })
    }
  },
  created: function () {
    this.getStyles();
  },
  watch: {
    source: function() {
      this.getStyles();
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
