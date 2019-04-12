<template>
  <div class="category-landing">
    <router-link :to="'/GeoffCategories'" exact> 
      <GeoffBackBtn />
    </router-link>
    <GeoffFeatureDetails v-if="categoryId&&selectedCategoryData" :index="selectedIndex" :source="selectedCategoryData"/>
    <GeoffFeatureMapIcons @$featureIconClicked="featureIconClicked" :source="selectedCategoryData"/>
  </div>
</template>

<script>
import GeoffBackBtn from "../GeoffBackBtn.vue";
import GeoffFeatureDetails from "./GeoffFeatureDetails.vue";
import GeoffFeatureMapIcons from "./GeoffFeatureMapIcons.vue";
import festivalData from "../constants/festivalData.json";
import musicVenueData from "../constants/musicVenueData.json";
import recordStoresData from "../constants/recordStoreData.json";
import musicShopData from "../constants/musicShopData.json";
import musicSchoolData from "../constants/musicSchoolData.json";


export default {
  name: "GeoffFeatureLanding",
  components: {
    GeoffBackBtn,
    GeoffFeatureDetails,
    GeoffFeatureMapIcons
  },
  data: function() {
    return {
      categoryId: Number,
      categoryData: [festivalData.venues, musicVenueData.venues, recordStoresData.venues, musicShopData.venues, musicSchoolData.venues],
      selectedCategoryData: [],
      selectedIndex: 0
    };
  },
    created: function() {
      this.getCategoryId();
      this.setCategory();     
    },
  methods: {
    getCategoryId() {
      // if (this.$route.params.categoryId){
        console.log(this.$route.params.categoryId)
        this.categoryId = this.$route.params.categoryId;
      // }
    },
    featureIconClicked(id){
      this.selectedIndex = id;
    },
    setCategory() {
      this.selectedCategoryData = this.categoryData[this.categoryId];
    }
  },
  watch: {
    categoryId: function() {
      this.setCategory();
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
