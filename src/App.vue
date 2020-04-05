<template>
  <div id="app">
    <Menu />
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from './components/Menu'

export default {
  name: 'App',
  components: {
    Menu
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: 'Fira Sans',sans-serif;
  display: flex;
}
</style>
