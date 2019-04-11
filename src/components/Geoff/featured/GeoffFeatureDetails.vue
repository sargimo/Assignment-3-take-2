<template>
  <div class="cust-container">
    <div class="details">
      <div class="venue-title">
        <h2 :v-if="source">{{source[index].month}}, {{source[index].location}}</h2>
        <h1>{{source[index].title}}</h1>
      </div>
      <div class="contact-icons">
        <p><a :href="this.source[index].website"><i class="fas fa-globe"></i> {{source[index].website}}</a></p>
        <p v-if="source[index].phoneNumber"><i class="fas fa-phone"></i> {{source[index].phoneNumber}}</p>
        <p><i class="fas fa-envelope-open-text"></i> {{source[index].email}}</p>
      </div>
      <div class="description">
        <p>{{source[index].description}}</p>
      </div>
      <div class="socials">
        <a :href="this.source[index].facebook"><i class="fab fa-facebook"></i></a> <a :href="this.source[index].instagram"><i class="fab fa-instagram"></i></a>
      </div>
      <div class="explore-welly">
        <p>Explore all Wellington has to offer</p>
        <i class="fas fa-grip-lines-vertical"></i>
      </div>
      <div class="button-align">
        <button class="btn-yellow">EXPLORE</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GeoffFeatureDetails",
  components: {},
  props: ['source', 'index'],
};
</script>

<style scoped>
  .cust-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100vw;
    height: 100vh;
    font-family: 'Hind Madurai', sans-serif;
  }
  .details {
    text-align: left;
    max-width: 50%;
    padding-right: 300px;
    color: #fff;
  }

  .venue-title {
    font-family: "Oswald", sans-serif;
  }

  .venue-title h1 {
    font-size: 60px;
  }
  
  .venue-title h2 {
    font-size: 25px;
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
  }

  .button-align {
    display: flex;
    justify-content: center;
    text-align: center;
  }

  .explore-welly {
    padding-top: 60px;
    text-align: center;
  }

  .explore-welly i {
    color: #3fcbca;
    /* font-size: px; */
  }

  .btn-yellow {
  font-family: "Oswald", sans-serif;
  color: #222;
  background-color: #ffe96b;
  text-align: center;
  padding: 10px 60px 10px 60px;
  margin: 20px 0;
  border: none;
  border-radius: 10px;
  }

</style>
