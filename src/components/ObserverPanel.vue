<template>
  <div class="observer-panel">
    <Menu />
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from './Menu/Menu'

export default {
  name: 'ObserverPanel',
  components: {
    Menu
  }
}
</script>

<style scoped>
.observer-panel {
  display: flex;
}
</style>
