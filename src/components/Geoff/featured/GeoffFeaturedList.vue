<template>
  <div>
    <ul class="featured-list">
      <li
        @click="featureItemClicked"
        :key="index"
        v-for="(sources, index) in source"
        :class="{iconActive:iconActive==index}"
        :id="index"
      >{{source[index].name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GeoffFeaturedList",
  props: {
    source: Array
  },
  data: function() {
    return {
      iconActive: 0
    };
  },
  methods: {
    /**
     * Gets click event to take the id of the clicked item, emit to parent for
     * data retrieval and then uses iconActive for active state of icons.
     * @param {Event} evt
     */
    featureItemClicked: function(evt) {
      this.$emit("$featureItemClicked", evt.target.id);
      this.iconActive = evt.target.id;
    }
  }
};
</script>

<style scoped>
.featured-list {
  display: flex;
  flex-direction: row;
  text-decoration: none;
  flex-direction: flex-start;
  position: absolute;
  top: 15%;
  left: 10%;
  max-width: 75%;
  overflow: auto;
  white-space: nowrap;
  list-style-type: none;
  text-align: center;
  padding: 10px;
}

.featured-list li {
  font-family: "BigNoodleTitling", sans-serif;
  font-size: 25px;
  padding: 0 20px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  position: relative;
}

.featured-list li:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #333;
  visibility: hidden;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transition: all 0.2s ease-in-out 0s;
  transition: all 0.2s ease-in-out 0s;
}

.featured-list li:hover:before {
  visibility: visible;
  background-color: #3fcbca;
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}

.featured-list li.iconActive {
  background-color: #ffe96b;
  border: 1px solid #ffe96b;
  color: #222;
  border-radius: 10px;
}

.featured-list::-webkit-scrollbar {
  height: 3px;
}

.featured-list::-webkit-scrollbar-track {
  background: #333;
}

.featured-list::-webkit-scrollbar-thumb {
  background: #555;
}
</style>
