<template>
  <div id="app">
    <ShopsMenu />
    <MenuExpandButton />
    <router-view></router-view>
  </div>
</template>

<script>
import ShopsMenu from './components/ShopsMenu.vue'
import MenuExpandButton from './components/MenuExpandButton.vue'

export default {
  name: 'App',
  components: {
    ShopsMenu,
    MenuExpandButton
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
