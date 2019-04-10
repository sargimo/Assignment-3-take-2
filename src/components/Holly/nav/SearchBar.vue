<template>
  <form
    @submit.prevent="searchForQuery"
    class="input-group md-form form-sm form-2 pl-0"
    :class="{searchLanding: this.$parent.$parent.$parent.$data.landing, searchInfo: !this.$parent.$parent.$parent.$data.landing}"
  >
    <input
      class="form-control my-0 py-1 amber-border"
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
  methods: {
    searchForQuery: function() {
      this.$refs.searchBar.focus();
      let query = this.$refs.searchBar.value;
      this.$emit('$searchForQuery', query);
    }
  }
};
</script>

<style scoped src="../constants/navCSS.css">
</style>
