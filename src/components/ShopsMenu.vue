<template>
  <nav class="shop-block">
    <div class="shop-block__header">
      <h3 class="shop-block__header-title">Магазины</h3>
    </div>
    <div class="shop-block__content">
      <ul class="shop-list">
        <li class="shop-list__item">
          <router-link to="/shop/beru" class="shop-info__title beru-color">БЕРУ</router-link>
          <div class="shop-info__meta">
            <span class="shop-info__meta-item">Обновлено: {{ beruTime | with-preposition }}</span>
          </div>
        </li>
        <li class="shop-list__item">
          <router-link to="/shop/wildberries" class="shop-info__title wildberries-color">WILDBERRIES</router-link>
          <div class="shop-info__meta">
            <span class="shop-info__meta-item">Обновлено: {{ wildberriesTime | with-preposition }}</span>
          </div>
        </li>
        <li class="shop-list__item">
          <router-link to="/shop/t-mall" class="shop-info__title t-mall-color">T-MALL</router-link>
          <div class="shop-info__meta">
            <span class="shop-info__meta-item">Обновлено: {{ tmallTime | with-preposition }}</span>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ShopsMenu',
  data() {
    return {
      beruTime: '...',
      wildberriesTime: '...',
      tmallTime: '...'
    }
  },
  filters: {
    withPreposition(value) {
      return value.replace(' ', ' в ')
    }
  },
  created() {
    axios
      .get('http://localhost:3000/shops-info')
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
  }
}
</script>

<style scoped>
.shop-block {
  background-color: #f7f7f7;
  margin: 10px;
  min-width: 250px;
  position: fixed;
  box-shadow: 2px 2px 2px -1px #aba9a9;
}
.shop-block__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;
  padding: 19px 0 4px;
  border-bottom: 1px solid #333333;
}
.shop-block__header-title {
  font-weight: 500;
  font-family: 'Fira Sans',sans-serif;
  font-size: 18px;
}
.shop-block__content {
  padding: 10px 20px 0 20px;
  overflow: hidden;
}
.shop-list {
  margin: 0 0 20px 0;
  padding: 0;
  list-style: none;
}
.shop-list__item {
  position: relative;
  box-sizing: border-box;
  border-bottom: 1px solid #9c9c9c;
  padding: 9px 0 4px;
}
.shop-info__title {
  display: inline-block;
  text-decoration: none;
  color: #fff;
  vertical-align: top;
  white-space: normal;
  font-weight: 700;
  font-size: 14px;
  margin: 0 0 5px 0;
  padding: 5px 10px;
  word-break: break-word;
  font-family: 'Fira Sans',sans-serif;
}
.beru-color {
  background-color: #6F3DF8;
}
.wildberries-color {
  background-color: #EE3384;
}
.t-mall-color {
  background-color: #CE1037;
}
.shop-info__meta-item {
  font-family: 'Fira Sans',sans-serif;
  font-size: 13px;
  color: #1d1d1d;
}
</style>