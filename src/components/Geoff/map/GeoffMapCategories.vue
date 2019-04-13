<template>
  <div>
    <div class="filters">
      <div class="filters-container">
        <div class="row">
          <div class="col">
            <select class="dropdown" @change="radiusChanged">
              <option value="1000">WITHIN 1KM</option>
              <option value="5000">WITHIN 5KM</option>
              <option value="10000">WITHIN 10KM</option>
              <option value="20000">WITHIN 20K</option>
            </select>
          </div>
          <div class="col">
            <button
              @click.prevent="categoryClickHandler"
              :class="{active: buttonIsActive[0]}"
              id="0"
              value="festivals"
              class="category-btn"
            >MUSIC FESTIVALS</button>
          </div>
          <div class="col">
            <button
              @click.prevent="categoryClickHandler"
              :class="{active: buttonIsActive[1]}"
              id="1"
              value="music venues"
              class="category-btn"
            >MUSIC VENUES</button>
          </div>
          <div class="col">
            <button
              @click.prevent="categoryClickHandler"
              :class="{active: buttonIsActive[2]}"
              id="2"
              value="record stores"
              class="category-btn"
            >RECORD STORES</button>
          </div>
          <div class="col">
            <button
              @click.prevent="categoryClickHandler"
              :class="{active: buttonIsActive[3]}"
              id="3"
              value="music stores"
              class="category-btn"
            >MUSIC STORES</button>
          </div>
          <div class="col">
            <button
              @click.prevent="categoryClickHandler"
              :class="{active: buttonIsActive[4]}"
              id="4"
              value="music schools"
              class="category-btn"
            >MUSIC SCHOOLS</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GeoffMapCategories",

  methods: {
    categoryClickHandler: function(evt) {
      // console.log(evt)
      this.$emit(
        "$categoryClickHandler",
        evt.target.id,
        evt.target.value,
        evt.target.ref
      );
      this.setActive(evt);
    },
    // festivalsClickHandler(evt) {
    //   this.$emit("$festivalsClickHandler", evt.target.id);
    //   this.setActive(evt);
    // },
    radiusChanged: function(evt) {
      this.$emit("$radiusChanged", evt.target.value);
    },
    setActive(evt) {
      let value = evt.target.value;
      switch (value) {
        case "festivals":
          this.buttonIsActive = [true, false, false, false, false];
          break;
        case "music venues":
          this.buttonIsActive = [false, true, false, false, false];
          break;
        case "record stores":
          this.buttonIsActive = [false, false, true, false, false];
          break;
        case "music stores":
          this.buttonIsActive = [false, false, false, true, false];
          break;
        case "music schools":
          this.buttonIsActive = [false, false, false, false, true];
          break;
      }
    }
  },
  data: function() {
    return {
      buttonIsActive: [false, false, false, false]
    };
  }
};
</script>

<style scoped>
.filters-container {
  max-width: 75%;
  margin: 0 auto;
}
.filters {
  position: absolute;
  z-index: 2;
  top: 0;
  width: 100vw;
  height: 100px;
  background-color: #fff;
}

.dropdown {
  font-family: "Hind Madurai", sans-serif;
}

.category-btn {
  font-family: "Oswald", sans-serif;
  font-size: 15px;
  border-radius: 10px;
  background-color: transparent;
  padding: 5px 30px;
  border: 1px solid lightgray;
}

.category-btn:focus {
  outline: none;
}

.category-btn.active {
  background-color: #ffe96b;
}
</style>
