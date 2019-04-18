<template>
  <form
    @submit.prevent="searchForQuery"
    class="input-group md-form form-sm form-2 pl-0"
    :class="{searchLanding: landingIsActive, searchInfo: !landingIsActive}"
  >
    <input
      @click="setCategoryNull"
      :value="searchQuery"
      class="form-control my-0 py-1"
      ref="searchBar"
      type="text"
      placeholder="Search"
      aria-label="Search"
    >
    <div class="input-group-append">
      <button type="submit" class="input-group-text amber lighten-3" id="basic-text1">
        <i class="fas fa-search text-grey" aria-hidden="true"></i>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "SearchBar",

  props: {
    landingIsActive: Boolean,
    searchQuery: null
  },

  methods: {
    /** 
    * Passes input search query and emits method call to handle search.
    */
    searchForQuery: function() {
      let query = this.$refs.searchBar.value;
      this.$emit("$searchForQuery", query);
    },

    /** 
    * Emits method call to reset category value to null.
    */
    setCategoryNull: function() {
      this.$emit("$setCategoryNull");
    }
  },
  
  /** 
  * Sets focus to search query input element on infoscreen page if user search query from landing.
  */
  created: function() {
    if (this.searchQuery != null) {
      this.$nextTick(function() {
        return this.$refs.searchBar.focus();
      });
    }
  }
};
</script>

<style scoped src="../styles/nav.css">
</style>