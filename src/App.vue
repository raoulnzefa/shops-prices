<template>
  <div id="app">
    <ShopsMenu />
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
}
#app {
  display: flex;
}
</style>
