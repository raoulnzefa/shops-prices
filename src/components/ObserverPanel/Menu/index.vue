<template>
  <div>
    <ShopsMenu
      :isOpen="isOpen"
      @closeMenu="closeMenu"
    />
    <MenuExpandButton
      :isOpen="isOpen"
      @toggleMenu="toggleMenu"
    />
  </div>
</template>

<script>
import ShopsMenu from './ShopsMenu.vue'
import MenuExpandButton from './MenuExpandButton.vue'

export default {
  name: 'Menu',
  components: {
    ShopsMenu,
    MenuExpandButton
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    closeMenu() {
      this.isOpen = false
    },
    toggleMenu() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>
