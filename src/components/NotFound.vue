<template>
  <div>
    <p>Такой страницы не существует!</p>
    <router-link to="/">На главную</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>

<style scoped>
div {
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 18px;
}
</style>
