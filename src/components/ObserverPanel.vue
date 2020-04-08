<template>
  <div>
    <Menu />
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from './components/Menu/Menu'

export default {
  name: 'ObserverPanel',
  components: {
    Menu
  }
}
</script>
