<template>
  <div>
    <div :key="index" v-for="(sources, index) in source" :style="styles[index]">
      <img @click="featureIconClicked" :class="{iconActive:iconActive==index}" class="featured-icon" :id="index" :ref="index" src="../../../assets/geoff/geoff-map-marker.png">
    </div>
  </div>
</template>

<script>
export default {
  name: "GeoffFeatureMapIcons",
  props: ['source'],
  data: function() {
    return {
      styles: [],
      iconActive: 0
    }
  },
  methods: {
    featureIconClicked(evt){
      let selected = evt.target.id;
      this.$emit("$featureIconClicked", evt.target.id);
      this.iconActive = evt.target.id;
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
.featured-icon {
  transform: scale(1);
  width: 100%;
  transition: all 0.2s linear;
  padding: 5px;
  cursor: pointer;
}

.featured-icon:hover {
  transform: scale(1.3);
  border: 3px solid #3fcbca;  
  border-radius: 50px;
}

.iconActive {
  transform: scale(1.3);
  border: 3px solid #ffe96b;
  border-radius: 50px;
}
</style>
