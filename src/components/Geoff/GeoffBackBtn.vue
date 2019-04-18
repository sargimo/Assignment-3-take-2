<template>
  <div class="back-btn">
    <i class="fas fa-chevron-circle-left"></i>
    <p>back</p>
  </div>
</template>

<script>
export default {
  name: "GeoffBackBtn"
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
  transform: scale(1);
}

.back-btn p {
  font-size: 12px;
  text-align: center;
}

.back-btn:hover {
  color: #3fcbca;
  transform: scale(1.2);
}
</style>
