<template>
  <div class="jack-body">
    <JkHeader/>

    <div class="jack-landing-content container">
      <h1>We're passionate in helping you create great things.</h1>
    </div>

    <div class="container jack-take-a-peek">
      <a>
        <router-link v-bind:to="'/jkdesigners'">
          <p>Take A Peek</p>
        </router-link>
      </a>
      <a>
        <router-link v-bind:to="'/jkdesigners'">
          <div class="arrow bounce"></div>
        </router-link>
      </a>
    </div>
  </div>
</template>

<script>
import JkHeader from "./JkHeader.vue";

export default {
  name: "JkLanding",
  components: {
    JkHeader
  }
};
</script>

<style>
.jack-body {
  background-image: url("../../assets/jack/jack-background.jpg");
  width: 100%;
  height: 100%;
  background-size: cover;
  position: absolute;
}

.jack-landing-content {
  color: white;
}

.jack-landing-content h1 {
  font-size: 55px;
  padding-top: 5.5em;
  padding-bottom: 6.2em;
}

.jack-take-a-peek {
  text-align: center;
}
.jack-take-a-peek p {
  margin: 0;
}

.jack-take-a-peek a {
  color: #fff;
  font-style: italic;
  text-decoration: none;
  font-size: 20px;
}

.jack-take-a-peek a:hover {
  color: #ffff33;
}

/* Code for arrow below courtesy of Sebastian Laube */
/* https://codepen.io/bitstarr/pen/XjaJGz */

.arrow {
  position: relative;
  bottom: -2rem;
  left: 50%;
  margin-left: -20px;
  width: 40px;
  height: 30px;
  filter: saturate(3);

  /**
   * Dark Arrow Down
   */
  background-image: url("../../assets/jack/jack-downarrow.png");
}

.bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}
</style>