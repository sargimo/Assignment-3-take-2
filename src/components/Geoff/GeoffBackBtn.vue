<template>
  <div>
      <i class="fas fa-chevron-circle-left back-btn"></i>
  </div>
</template>

<script>
export default {
  name: "GeoffBackBtn",
};
</script>

<style scoped>
  .back-btn {
    position: absolute;
    z-index: 3;
    top: 130px;
    left: 70px;
    font-size: 40px;
    color: #fff;
    transition: all 0.2s linear;
  }

  .back-btn:hover {
      color: #3fcbca;
      font-size: 45px;
  }
</style>
