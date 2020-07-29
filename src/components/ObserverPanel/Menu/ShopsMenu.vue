<template>
  <nav ref="sidebar" class="shops-nav" :class="{ 'open': isOpen }">
    <h2>Магазины</h2>
      <ul class="shops-list">
        <li class="shop-item">
          <router-link
            to="/shop/beru"
            v-slot="{ href, route, navigate, isActive }"
          >
            <div v-on:click="emitCloseMenu">
              <a :href="href" @click="navigate" class="shop-link beru-color">БЕРУ</a>
              <button v-if="isActive" v-on:click="throttledUpdateTables" class="update-button">
                <i class="icon-refresh" aria-hidden="true"></i>
              </button>
            </div>
          </router-link>
          <span class="shop-info">Обновлено: {{ beruTime | with-preposition }}</span>
        </li>
        <li class="shop-item">
          <router-link
            to="/shop/wildberries"
            v-slot="{ href, route, navigate, isActive }"
          >
            <div v-on:click="emitCloseMenu">
              <a :href="href" @click="navigate" class="shop-link wildberries-color">WILDBERRIES</a>
              <button v-if="isActive" v-on:click="throttledUpdateTables" class="update-button">
                <i class="icon-refresh" aria-hidden="true"></i>
              </button>
            </div>
          </router-link>
          <span class="shop-info">Обновлено: {{ wildberriesTime | with-preposition }}</span>
        </li>
        <li class="shop-item">
          <router-link
            to="/shop/t-mall"
            v-slot="{ href, route, navigate, isActive }"
          >
            <div v-on:click="emitCloseMenu">
              <a :href="href" @click="navigate" class="shop-link t-mall-color">T-MALL</a>
              <button v-if="isActive" v-on:click="throttledUpdateTables" class="update-button">
                <i class="icon-refresh" aria-hidden="true"></i>
              </button>
            </div>
          </router-link>
          <span class="shop-info">Обновлено: {{ tmallTime | with-preposition }}</span>
        </li>
      </ul>
  </nav>
</template>

<script>
import axios from 'axios'
import throttle from 'lodash.throttle'

import { bus } from '@/main'

export default {
  name: 'ShopsMenu',
  props: {
    isOpen: Boolean
  },
  data() {
    return {
      beruTime: '...',
      wildberriesTime: '...',
      tmallTime: '...',
      touchStartCoords: {},
      touchEndCoords: {}
    }
  },
  filters: {
    withPreposition(value) {
      return value.replace(' ', ' в ')
    }
  },
  computed: {
    throttledUpdateTables() {
      return throttle(this.updateTables, 1000, { 'trailing': false });
    }
  },
  created() {
    axios
      .get(`${process.env.VUE_APP_API_BASE_PATH}/shops-info`)
      .then(response => {
        response.data.forEach(shop => {
          switch(shop.id) {
            case 0:
              this.beruTime = shop.time;
              break;
            case 1:
              this.wildberriesTime = shop.time;
              break;
            case 2:
              this.tmallTime = shop.time;
              break;
          }
        })
      })
  },
  mounted() {
    this.$refs.sidebar.addEventListener('touchstart', this.touchStartHandler)
    this.$refs.sidebar.addEventListener('touchend', this.touchEndHandler)
  },
  methods: {
    touchStartHandler(event) {
      this.touchStartCoords.x = event.changedTouches[0].clientX
      this.touchStartCoords.y = event.changedTouches[0].clientY
    },
    touchEndHandler(event) {
      this.touchEndCoords.x = event.changedTouches[0].clientX
      this.touchEndCoords.y = event.changedTouches[0].clientY

      const xDiff = this.touchEndCoords.x - this.touchStartCoords.x
      const yDiff = this.touchEndCoords.y - this.touchStartCoords.y

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff < 0 && xDiff < -40) {
          this.emitCloseMenu()
        }
      }
    },
    updateTables() {
      bus.$emit('updateTables')
    },
    emitCloseMenu() {
      this.$emit('closeMenu')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/shop-colors.scss';

.shops {
  &-nav {
    background-color: #f7f7f7;
    margin: 10px;
    width: 250px;
    position: fixed;
    box-shadow: 2px 2px 2px -1px #aba9a9;
    h2 {
      font-size: 18px;
      font-weight: 500;
      margin: 0 20px;
      padding: 15px 0 13px;
      border-bottom: 1px solid #333333;
    }
  }
  &-list {
    padding: 10px 20px 20px 20px;
    list-style: none;
  }
}

@media screen and (max-width: 892px) {
  .shops-nav {
    height: 100vh;
    top: 0;
    left: -254px;
    margin: 0;
    z-index: 10;
    box-shadow: 2px 0 2px -1px #aba9a9;
    transition: left 0.3s ease-in-out;
  }
  .open {
    left: 0;
  }
}

.shop {
  &-item {
    position: relative;
    border-bottom: 1px solid #9c9c9c;
    padding: 9px 0 4px;
    div {
      display: flex;
      margin-bottom: 5px;
    }
  }
  &-link {
    text-decoration: none;
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    padding: 5px 10px;
  }
  &-info {
    font-size: 13px;
  }
}

.update-button {
  background: transparent;
  border: none;
  font-size: inherit;
  padding: 0 4px;
  margin-left: 4px;
  cursor: pointer;
  outline: none;
}
</style>
