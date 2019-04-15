<template>
  <div class="category-landing">
    <router-link :to="'/GeoffCategories'" exact>
      <GeoffBackBtn/>
    </router-link>
    <GeoffFeatureDetails
      v-if="categoryId&&selectedCategoryData"
      :index="selectedIndex"
      :source="selectedCategoryData"
    />
    <GeoffFeatureMapIcons v-if="!isMobile" @$featureIconClicked="featureIconClicked" :source="selectedCategoryData"/>
    <GeoffFeaturedList v-if="isMobile" @$featureItemClicked="featureIconClicked" :source="selectedCategoryData" />
  </div>
</template>

<script>
import GeoffBackBtn from "../GeoffBackBtn.vue";
import GeoffFeatureDetails from "./GeoffFeatureDetails.vue";
import GeoffFeatureMapIcons from "./GeoffFeatureMapIcons.vue";
import GeoffFeaturedList from "./GeoffFeaturedList.vue";
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
    GeoffFeatureMapIcons,
    GeoffFeaturedList
  },
  data: function() {
    return {
      categoryId: Number,
      categoryData: [
        festivalData.venues,
        musicVenueData.venues,
        recordStoresData.venues,
        musicShopData.venues,
        musicSchoolData.venues,
      ],
      selectedCategoryData: [],
      //used for active states of static map icons
      selectedIndex: 0,
      viewPortWidth: 0,
      isMobile: false
    };
  },
  created: function() {
    this.getCategoryId();
    this.setCategory();
    window.addEventListener("resize", this.changeViewportWidth);
    this.changeViewportWidth();
  },
  methods: {
    //called on categoryId changing from previous page. Takes id from $route
    //params and stores it for use in category data.
    getCategoryId() {
      this.categoryId = this.$route.params.categoryId;
    },

    //handles active states for static map icons
    featureIconClicked(id) {
      this.selectedIndex = (parseInt(id));
    },

    //uses the categoryId from the previous page to select the correct JSON file
    //and send the data to child components
    setCategory() {
      this.selectedCategoryData = this.categoryData[this.categoryId];
    },
    changeViewportWidth() {
      this.viewPortWidth = window.innerWidth;
    }
  },
  watch: {
    categoryId: function() {
      this.setCategory();
    },
    viewPortWidth: function() {
      if (this.viewPortWidth < 1050) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    }
  }
};
</script>

<style scoped>
.category-landing {
  background-image: url("../../../assets/geoff/category-landing-bg.jpg");
  background-size: cover;
  background-position: left;
  height: 100vh;
  width: 100vw;
}
</style>
