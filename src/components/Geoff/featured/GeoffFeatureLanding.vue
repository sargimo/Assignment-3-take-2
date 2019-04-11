<template>
  <div class="category-landing">
    <!-- <button @click="getCategoryId">test</button> -->
    <GeoffFeatureDetails v-if="categoryId&&selectedCategoryData" :index="selectedIndex" :source="selectedCategoryData"/>
    <GeoffFeatureMapIcons :source="selectedCategoryData"/>
  </div>
</template>

<script>
import GeoffFeatureHeroImage from "./GeoffFeatureHeroImage.vue";
import GeoffFeatureDetails from "./GeoffFeatureDetails.vue";
import GeoffFeatureMapImage from "./GeoffFeatureMapImage.vue";
import GeoffFeatureMapIcons from "./GeoffFeatureMapIcons.vue";
import festivalData from "../constants/festivalData.json";
import musicVenueData from "../constants/musicVenueData.json";
import recordStoresData from "../constants/recordStoreData.json";
import musicShopData from "../constants/musicShopData.json";
import musicSchoolData from "../constants/musicSchoolData.json";


export default {
  name: "GeoffFeatureLanding",
  components: {
    GeoffFeatureHeroImage,
    GeoffFeatureDetails,
    GeoffFeatureMapImage,
    GeoffFeatureMapIcons
  },
  data: function() {
    return {
      categoryId: "",
      categoryData: [festivalData.venues, musicVenueData.venues, recordStoresData.venues, musicShopData.venues, musicSchoolData.venues],
      selectedCategoryData: [],
      selectedIndex: 0
    };
  },
    created: function() {
      this.getCategoryId();     
    },
  methods: {
    getCategoryId() {
      this.categoryId = this.$route.params.categoryId;
    }
  },
  watch: {
    categoryId: function() {
      this.selectedCategoryData = this.categoryData[this.categoryId];
    }
  }
};
</script>

<style scoped>
.category-landing {
  background-image: url("../../../assets/geoff/category-landing-bg.jpg");
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
}
</style>
