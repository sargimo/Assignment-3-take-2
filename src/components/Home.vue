<template>
  
    <div class="background">
      <transition name="home" mode="out-in">
      <div class="my-container">
        <div class="row">
          <div class="column col-md-6 col-sm-12 geoff">
              <router-link :to="'/geoff'"><div class="name">GEOFF</div></router-link>
          </div>
          <div class="column col-md-6 col-sm-12 holly">
              <router-link :to="'/holly'"><div class="name">HOLLY</div></router-link>
          </div>
          <div class="column col-md-6 col-sm-12 jack">
              <router-link :to="'/jack'"><div class="name">JACK</div></router-link>
          </div>
          <div class="column col-md-6 col-sm-12 jeremy">
              <router-link :to="'/jeremy'"><div class="name">JEREMY</div></router-link>
          </div>
        </div>
      </div>
      </transition>
    </div>
  
</template>

<script>
export default {
  name: "Home",
  components: {}
};
</script>

<style scoped>
.background {
  width: 100vw;
  height: 100vh;
}
.my-container {
  height: 100%;
  width: 100%;
  text-align: center;
}
.home-enter-active,
.home-leave-active {
  transition: opacity 1.5s ease-in-out, transform 0.8s ease-in-out;
}
.home-enter,
.home-leave-to {
  opacity: 0;
}
a {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 5rem;
}
a:hover {
  text-decoration: none;
}
.column {
  height: 50vh;
}
.row {
  margin: 0 !important;
}
.geoff, .holly, .jack, .jeremy {
  background: black;
  transition: background 0.5s linear;
}
.geoff:hover, .holly:hover, .jack:hover, .jeremy:hover {
  background: black;
}
.geoff:hover {
  background: url('../assets/geoff/geoff-tiger.jpg') bottom / cover no-repeat;
}
.holly:hover {
  background: url('../assets/holly/holly-tiger.jpg') center / cover no-repeat;
}
.jack:hover {
  background: url('../assets/jack/jack-yes.jpg') center / cover no-repeat;
}
.jeremy:hover {
  background: url('../assets/jeremy/goose.jpg') center / cover no-repeat;
  color: black;
}
.name {
  color: #fff;
}
.geoff:hover .name, .holly:hover .name, .jack:hover .name, .jeremy:hover .name {
  color: black;
}
</style>