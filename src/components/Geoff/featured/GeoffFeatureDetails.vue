<template>
  <div class="cust-container">
    <div class="page-title">
      <h1>
        WELLINGTON'S BEST
        <span class="active-category">{{source[index].category}}s</span>
      </h1>
    </div>
    <div class="details">
      <div class="venue-title">
        <h2 :v-if="source">{{source[index].location}}</h2>
        <h1>{{source[index].name}}</h1>
      </div>
      <div class="contact-icons">
        <p>
          <a :href="this.source[index].website">
            <i class="fas fa-globe"></i>
            {{source[index].website}}
          </a>
        </p>
        <p v-if="source[index].phoneNumber">
          <i class="fas fa-phone"></i>
          {{source[index].phoneNumber}}
        </p>
        <p>
          <i class="fas fa-envelope-open-text"></i>
          {{source[index].email}}
        </p>
      </div>
      <div class="description">
        <p>{{source[index].description}}</p>
      </div>
      <div class="socials">
        <a :href="this.source[index].facebook">
          <i class="fab fa-facebook"></i>
        </a>
        <a :href="this.source[index].instagram">
          <i class="fab fa-instagram"></i>
        </a>
      </div>
      <div class="explore-welly">
        <p>Explore all Wellington has to offer</p>
      </div>
      <div class="button-align">
        <router-link :to="'/geoffmaploader'" exact>
          <button
            @click="exploreMapClicked"
            :id="this.source[index].catId"
            class="btn-yellow"
          >EXPLORE</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GeoffFeatureDetails",
  components: {},
  props: {
    "source": Array,
    "index": Number
    },
  methods: {
    /**
     * Click event used to get id from the button to have map ready to deal with
     * a category search and active state upon load
     * @param {Event} evt
     */
    exploreMapClicked(evt) {
      let id = evt.target.id;
      this.$router.push({
        name: "geoffmaploader",
        params: { id: id }
      });
    }
  }
};
</script>

<style scoped src="../constants/customFonts.css">
</style>

<style scoped>
.cust-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-family: "Hind Madurai", sans-serif;
}
.details {
  margin-top: 150px;
  text-align: left;
  max-width: 50%;
  padding-right: 300px;
  color: #fff;
}

.page-title h1 {
  position: absolute;
  color: #fff;
  left: 30%;
  top: 10%;
  font-size: 72px;
  font-family: "BigNoodleTitling", sans-serif;
}

.active-category {
  color: #ffe96b;
}

.venue-title {
  font-family: "BigNoodleTitling", sans-serif;
}

.venue-title h1 {
  font-size: 72px;
  line-height: 65px;
}

.venue-title h2 {
  margin-bottom: -5px;
  font-size: 30px;
  color: #ffe96b;
}

.contact-icons {
  text-decoration: none;
  padding: 20px 0px;
}

.contact-icons i {
  color: #3fcbca;
  font-size: 25px;
  padding-right: 10px;
}

.contact-icons a {
  color: #fff;
}

.socials {
  text-align: right;
}

.socials i {
  color: #3fcbca;
  font-size: 25px;
  padding-left: 10px;
  transform: scale(1);
  transition: all 0.2s linear;
}

.socials i:hover {
  color: #ffe96b;
  transform: scale(1.1);
}

.button-align {
  display: flex;
  justify-content: center;
  text-align: center;
}

.explore-welly {
  padding-top: 30px;
  text-align: center;
}

.btn-yellow {
  font-family: "BigNoodleTitling", sans-serif;
  transform: scale(1);
  font-size: 25px;
  color: #222;
  background-color: #ffe96b;
  text-align: center;
  padding: 5px 60px;
  margin: 5px 0;
  border: none;
  border-radius: 10px;
  transition: all 0.2s linear;
}

.btn-yellow:hover {
  color: #fff;
  background-color: #3fcbca;
  transform: scale(1.1);
}

@media only screen and (max-width: 1400px) {
  .details {
    padding-right: 100px;
    max-width: 60%;
  }
}

@media only screen and (max-width: 1050px) {
  .page-title h1 {
    font-size: 60px;
    left: 23%;
  }

  .venue-title h1 {
    font-size: 60px;
    line-height: 55px;
  }

  .venue-title h2 {
    font-size: 25px;
  }
}

@media only screen and (max-width: 800px) {
  /* .cust-container {
    background-color: rgba(0, 0, 0, 0.2);
  } */
  .page-title h1 {
    font-size: 48px;
    top: 5%;
  }
}
</style>
