<template>
  <div class="cta d-inline-flex p-2">

   

      <div class="d-flex justify-content-center align-self-center cta-details">

        <div class="cta-paragraph col-sm">
          <h2>
            Our Designer have had years of industry experience.
            It is with these experiences that we are able to provide you with the most innovative designs.
          </h2>
        </div>

        <div class="cta-button col-sm align-self-center cta-details">
          <button type="button" class="btn btn-primary btn-lg">Contact Us Now</button>
        </div>
      </div>

  </div>
</template>

<script>
export default {
  name: "CallToAction"
};
</script>

<style scoped>
.center-block {
  display: block;
  margin-right: auto;
  margin-left: auto;
}

h2 {
  color: #fff;
}

.cta {
  background-image: url("../../../assets/jeremy/cta.jpg");
  height: 500px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.cta-details{
    margin-left: 180px;
}
</style>

