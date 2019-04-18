<template>
  <transition name="fade" mode="out-in">
    <div class="category-landing">
      <GeoffFeatureDetails
        v-if="categoryId&&selectedCategoryData"
        :index="selectedIndex"
        :source="selectedCategoryData"
      />
      <GeoffFeatureMapIcons
        v-if="!isMobile"
        @$featureIconClicked="featureIconClicked"
        :source="selectedCategoryData"
      />
      <GeoffFeaturedList
        v-if="isMobile"
        @$featureItemClicked="featureIconClicked"
        :source="selectedCategoryData"
      />
    </div>
  </transition>
</template>

<script>
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
        musicSchoolData.venues
      ],
      selectedCategoryData: [],
      //used for active states of static map icons
      selectedIndex: 0,
      viewPortWidth: 0,
      isMobile: false
    };
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
  },
  methods: {
    //called on categoryId changing from previous page. Takes id from $route
    //params and stores it for use in category data.
    getCategoryId: function() {
      this.categoryId = this.$route.params.categoryId;
    },

    //handles active states for static map icons
    featureIconClicked: function(id) {
      this.selectedIndex = parseInt(id);
    },

    //uses the categoryId from the previous page to select the correct JSON file
    //and send the data to child components
    setCategory: function() {
      this.selectedCategoryData = this.categoryData[this.categoryId];
    },
    changeViewportWidth: function() {
      this.viewPortWidth = window.innerWidth;
    }
  },
  created: function() {
    this.getCategoryId();
    this.setCategory();
    window.addEventListener("resize", this.changeViewportWidth);
    this.changeViewportWidth();
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 1s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.category-landing {
  background-image: url("../../../assets/geoff/category-landing-bg.jpg");
  background-size: cover;
  background-position: left;
  height: 100vh;
  width: 100vw;
}

@media only screen and (max-width: 1050px) {
  .category-landing {
    background-image: none;
    background-color: #222;
  }
}
</style>
