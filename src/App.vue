<template>
  <div id="app">
    <ShopsMenu />
    <router-view></router-view>
  </div>
</template>

<script>
import ShopsMenu from './components/ShopsMenu.vue'

export default {
  name: 'App',
  components: {
    ShopsMenu
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
  display: flex;
}
</style>
