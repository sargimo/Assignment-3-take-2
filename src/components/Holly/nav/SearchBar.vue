<template>
  <form
    @submit.prevent="searchForQuery"
    class="input-group md-form form-sm form-2 pl-0"
    :class="{searchLanding: landing, searchInfo: !landing}"
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
    landing: Boolean,
    searchQuery: null
  },
  methods: {
    searchForQuery: function() {
      let query = this.$refs.searchBar.value;
      this.$emit("$searchForQuery", query);
    },
    setCategoryNull: function() {
      this.$emit("$setCategoryNull");
    }
  },
  created: function() {
    if (this.searchQuery != null) {
      this.$nextTick(function() {
        return this.$refs.searchBar.focus();
      });
    }
  }
};
</script>

<style scoped src="../constants/navCSS.css">
</style>

