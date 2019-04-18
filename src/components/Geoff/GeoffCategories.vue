<template>
  <transition name="page-fade-in" mode="out-in">
    <div class="categories-container">
      <router-link :to="'/geoff'" exact>
        <GeoffBackBtn/>
      </router-link>
      <div id="0" @click="getCategoryId('0')" class="category festivals">
        <router-link :to="'/geofffeaturelanding'" exact>
          <div @click="getCategoryId('0')" class="cat-title">
            <h3>FESTIVALS</h3>
            <p>THE BIGGEST EVENTS IN WELLINGTON</p>
          </div>
        </router-link>
      </div>
      <div @click="getCategoryId('1')" class="category music-venues" id="1">
        <router-link :to="'/geofffeaturelanding'" exact>
          <div @click="getCategoryId('1')" class="cat-title">
            <h3>
              MUSIC
              <br>VENUES
            </h3>
            <p>LIVE WEEKEND MUSIC VENUES</p>
          </div>
        </router-link>
      </div>
      <div @click="getCategoryId('2')" class="category record-stores" id="2">
        <router-link :to="'/geofffeaturelanding'" exact>
          <div @click="getCategoryId('2')" class="cat-title">
            <h3>
              RECORD
              <br>STORES
            </h3>
            <p>VINYL, CDS AND EVERYTHING INBETWEEN</p>
          </div>
        </router-link>
      </div>
      <div @click="getCategoryId('3')" class="category music-shops" id="3">
        <router-link :to="'/geofffeaturelanding'" exact>
          <div @click="getCategoryId('3')" class="cat-title">
            <h3>
              MUSIC
              <br>SHOPS
            </h3>
            <p>FOR ALL YOUR MUSICAL NEEDS</p>
          </div>
        </router-link>
      </div>
      <div @click="getCategoryId('4')" class="category music-schools" id="4">
        <router-link :to="'/geofffeaturelanding'" exact>
          <div @click="getCategoryId('4')" class="cat-title">
            <h3>
              MUSIC
              <br>SCHOOLS
            </h3>
            <p>LEARN FROM THE BEST</p>
          </div>
        </router-link>
      </div>
    </div>
  </transition>
</template>

<script>
import festivalData from "./constants/festivalData.json";
import GeoffBackBtn from "./GeoffBackBtn.vue";

export default {
  name: "GeoffCategories",
  components: {
    GeoffBackBtn
  },
  data: function() {
    return {
      catId: null
    };
  },
  watch: {
    catId: function() {
      this.$router.push({
        name: "geofffeaturelanding",
        params: { categoryId: this.catId }
      });
    }
  },
  methods: {
    getCategoryId: function(value) {
      this.catId = value;
    }
  }
};
</script>

<style scoped src="./constants/customFonts.css">
</style>

<style scoped>
a:hover {
  text-decoration: none;
}

.categories-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.page-fade-in-enter-active,
.page-fade-in-leave-active {
  transition: opacity 1.5s ease-in-out, transform 1.5s ease-in-out;
}

.page-fade-in-enter,
.page-fade-in-leave-to {
  opacity: 0;
}

.festivals {
  transition: all 0.5s linear;
  background-color: gray;
  background-blend-mode: luminosity;
  background-image: url(../../assets/geoff/category-festivals.jpg);
  background-position: 30% 0%;
}

.festivals:hover {
  transition: all 0.5s linear;
  background-color: transparent;
  background-blend-mode: normal;
}

.music-venues {
  background-image: url(../../assets/geoff/category-music-venues.jpg);
  background-color: gray;
  background-blend-mode: luminosity;
  transition: all 0.5s linear;
  background-position: 40% 100%;
}

.music-venues:hover {
  transition: all 0.5s linear;
  background-color: transparent;
  background-blend-mode: normal;
}

.record-stores {
  background-image: url(../../assets/geoff/category-record.jpg);
  background-color: gray;
  background-blend-mode: luminosity;
  background-size: cover;
  transition: all 0.5s linear;
  background-position: 59% 20%;
}

.record-stores:hover {
  transition: all 0.5s linear;
  background-color: transparent;
  background-blend-mode: normal;
}

.music-shops {
  background-image: url(../../assets/geoff/category-music-shop.jpg);
  background-color: gray;
  background-blend-mode: luminosity;
  transition: all 0.5s linear;
  background-position: 43% 10%;
}

.music-shops:hover {
  transition: all 0.5s linear;
  background-color: transparent;
  background-blend-mode: normal;
}

.music-schools {
  background-image: url(../../assets/geoff/category-music-schools.jpg);
  background-color: gray;
  background-blend-mode: luminosity;
  transition: all 0.5s linear;
  background-position: 10% 0%;
}

.music-schools:hover {
  transition: all 0.5s linear;
  background-color: transparent;
  background-blend-mode: normal;
}

.category {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  position: relative;
  flex: 1;
  text-align: center;
  transition: 0.3s;
  max-width: 20%;
  height: 100vh;
  min-width: 10%;
}

.category:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
}

.category:hover:before {
  transition: all 0.5s linear;
  background: none;
}

.category:hover {
  transition: 0.5s;
  max-width: 40%;
  flex-grow: 2;
  cursor: pointer;
}

.category:hover .cat-title {
  transition: all 0.3s linear;
  transform: translateY(-50px);
}

.cat-title {
  font-family: "BigNoodleTitling", sans-serif;
  font-size: 25px;
  transition: all 0.3s linear;
  position: relative;
  z-index: 1;
}

.cat-title p {
  color: #ffe96b;
  font-size: 20px;
  padding-top: 15px;
}

.cat-title h3 {
  color: #fff;
  font-size: 2em;
  margin: auto;
}

@media only screen and (max-width: 850px) {
  .category {
    max-height: 20%;
    width: 100vw;
    min-height: 10%;
    height: 20vh;
    max-width: 100vw;
  }
  .cat-title h3 {
    font-size: 30px;
  }

  .cat-title p {
    padding-top: 5px;
    font-size: 18px;
  }

  .categories-container {
    flex-flow: column;
  }

  .category:hover {
    transition: 0.5s;
    max-height: 40% !important;
    height: 40vh;
    max-width: 100%;
    width: 100vw;
  }

  .category:hover .cat-title {
    transform: translateY(-5px);
  }
}
</style>
