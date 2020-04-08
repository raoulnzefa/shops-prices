<template>
  <div id="app">
    <Menu />
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from './components/Menu/Menu'

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

*::-webkit-scrollbar {
  width: 8px;
  background-color: #f0f0f0;
}

*::-webkit-scrollbar-thumb {
  background-color: #cdcdcd;
}

#app {
  font-family: 'Fira Sans',sans-serif;
  display: flex;
}
</style>
