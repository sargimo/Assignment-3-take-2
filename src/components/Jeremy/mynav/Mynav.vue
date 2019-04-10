<template>
  <div>
    <nav>
      <ul>
        <li>
            <router-link v-bind:to="'/jeremy'"><img
              src="../../../assets/jeremy/dzigncologo.png"
              alt="DZignCo Logo"
              height="26"
              width="200"
            ></router-link>
        </li>

        <div class="d-flex justify-content-end">
          <li>
             <router-link v-bind:to="'/jeremy'">Designers</router-link>
          </li>
          <li>
           <router-link v-bind:to="'/'">About</router-link>
          </li>
        </div>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Mynav",
  components: {}
};
</script>

<style scoped>


ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: #111;
}
</style>