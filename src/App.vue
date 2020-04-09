<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
@font-face {
  font: {
    family: 'Lucida Sans Unicode';
    weight: normal;
    style: normal;
    display: swap;
  }
  src: url('./assets/fonts/Lucida-Sans-Unicode.ttf') format('truetype');
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #f0f0f0;
}

*::-webkit-scrollbar-thumb {
  background-color: #cdcdcd;
}

#app {
  font-family: sans-serif;
}
</style>
