<template>
  <div class="spinner-grow"></div>
</template>

<script>
export default {
  name: 'Spinner',
}
</script>

<style scoped>
.spinner-grow {
  display: inline-block;
  width: 40px;
  height: 40px;
  vertical-align: text-bottom;
  background-color: grey;
  border-radius: 50%;
  opacity: 0;
  animation: spinner-grow 0.75s linear infinite;
}
@keyframes spinner-grow {   
  0% {
    transform: scale(0)
  }
  50% {
    opacity: 1
  }
}
</style>