<template>
  <button v-on:click="emitToggleMenu" class="menu-expand">
    <i class="fa fa-bars" aria-hidden="true"></i>
  </button>
</template>

<script>
import { bus } from '../main'

export default {
  name: 'MenuExpandButton',
  methods: {
    emitToggleMenu() {
      bus.$emit('toggleMenu')
    }
  }
}
</script>

<style scoped>
.menu-expand {
  display: none;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  position: fixed;
  border: none;
  right: 20px;
  bottom: 20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #ececec;
  box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.3);
}

@media screen and (max-width: 892px) {
  .menu-expand {
    display: flex;
  }
}
</style>