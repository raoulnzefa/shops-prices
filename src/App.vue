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

<style>
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
  font-family: 'Fira Sans',sans-serif;
}
</style>
