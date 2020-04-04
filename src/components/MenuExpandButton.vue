<template>
  <button v-on:click="emitToggleMenu" class="menu-expand" :class="{ 'active' : isActive}">
    <div class="burger-box">
      <div class="burger-inner"></div>
    </div>
  </button>
</template>

<script>
import { bus } from '../main'

export default {
  name: 'MenuExpandButton',
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    emitToggleMenu() {
      this.isActive = !this.isActive
      bus.$emit('toggleMenu')
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-expand {
  display: none;
  justify-content: center;
  align-items: center;
  position: fixed;
  border: none;
  right: 20px;
  bottom: 20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #ececec;
  box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.3);
  outline: none;
  cursor: pointer;
}

@media screen and (max-width: 892px) {
  .menu-expand {
    display: flex;
  }
}

.burger-box {
  position: relative;
  width: 30px;
}

.burger-inner,
.burger-inner:before,
.burger-inner:after {
  position: absolute;
  width: 30px;
  height: 4px;
  transition-property: transform;
  border-radius: 4px;
  background-color: #000;
}

.burger-inner {
  margin-top: -2px;
  transition-timing-function: cubic-bezier(.55,.055,.675,.19);
  transition-duration: 75ms;
  &:before {
    content: "";
    display: block;
    top: -8px;
    transition: top 75ms ease .12s,opacity 75ms ease;
  }
  &:after {
    content: "";
    display: block;
    bottom: -8px;
    transition: bottom 75ms ease .12s,transform 75ms cubic-bezier(.55,.055,.675,.19);
  }
}

.active {
  .burger-inner {
    transition-delay: .12s;
    transition-timing-function: cubic-bezier(.215,.61,.355,1);
    transform: rotate(45deg);
    &:before {
      top: 0;
      transition: top 75ms ease,opacity 75ms ease .12s;
      opacity: 0;
    }
    &:after {
      bottom: 0;
      transition: bottom 75ms ease,transform 75ms cubic-bezier(.215,.61,.355,1) .12s;
      transform: rotate(-90deg);
    }
  }
}
</style>