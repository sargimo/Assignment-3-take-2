<template>
  <div>
    <div :key="index" v-for="(sources, index) in source" :style="styles[index]">
      <img
        @click="featureIconClicked"
        :class="{iconActive:iconActive==index}"
        class="featured-icon"
        :id="index"
        :ref="index"
        src="../../../assets/geoff/geoff-map-marker.png"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "GeoffFeatureMapIcons",
  props: {
    source: Array
  },
  data: function() {
    return {
      styles: [],
      iconActive: 0
    };
  },
  watch: {
    source: function() {
      this.getStyles();
    }
  },
  methods: {
    /**
     * Gets click event to take the id of the clicked item, emit to parent for
     * data retrieval and then uses iconActive for active state of icons.
     * @param {Event} evt
     */
    featureIconClicked: function(evt) {
      this.$emit("$featureIconClicked", evt.target.id);
      this.iconActive = evt.target.id;
    },

    //Uses hard coded absolute positioning from JSON to position markers. Certainly
    //not the most robust solution but a choice was made that function was more
    //important due to time restraints.
    getStyles: function() {
      let that = this;
      this.styles = [];
      $.each(that.source, function(i, venue) {
        let style = JSON.parse(venue.style);
        that.styles.push(style);
      });
    }
  },
  created: function() {
    this.getStyles();
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
