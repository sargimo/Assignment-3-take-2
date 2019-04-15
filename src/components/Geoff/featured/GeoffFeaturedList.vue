<template>
  <div>
    <ul class="featured-list">
      <li @click="featureItemClicked" :key="index" v-for="(sources, index) in source" :class="{iconActive:iconActive==index}" :id="index">{{source[index].name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GeoffFeaturedList",
  props: {
    'source': Array
  },
  data: function() {
    return {
      iconActive: 0
    }
  },
  methods: {
    /** 
      * Gets click event to take the id of the clicked item, emit to parent for 
      * data retrieval and then uses iconActive for active state of icons.
      * @param {Event} evt
    */
    featureItemClicked(evt){
      this.$emit("$featureItemClicked", evt.target.id);
      this.iconActive = evt.target.id;
    }
  },
};
</script>

<style scoped>
.featured-list {
    text-decoration: none;
    position: absolute;
    top: 30%;
    left: 5%;
    max-width: 25%;
    list-style-type: none;
}

.featured-list li {
    font-family: "BigNoodleTitling", sans-serif;
    font-size: 25px;
    background-color: rgba(63, 63, 63, 0.2);
    margin-bottom: 15px;
    padding: 10px 5px;
    text-align: center;
    color: #fff;
    border: 1px solid #3fcbca;
    transition: all 0.2s linear;
    cursor: pointer;
    border-radius: 50px;
}

.featured-list li.iconActive {
    background-color: #ffe96b;
    border: 1px solid #ffe96b;
    color: #222;
    border-radius: 50px;
}
</style>
