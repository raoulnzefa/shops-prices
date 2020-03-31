<template>
  <div id="app">
    <ShopsMenu />
    <GoodsTable />
  </div>
</template>

<script>
import ShopsMenu from './components/ShopsMenu.vue'
import GoodsTable from './components/GoodsTable.vue'

export default {
  name: 'App',
  components: {
    ShopsMenu,
    GoodsTable
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
