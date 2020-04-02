<template>
  <main class="table-block">
    <FilterPanel
      @selectedFilters="goodsFiltering"
    />
    <div v-if="loading" class="spinner-wrapper">
      <Spinner />
    </div>
    <div v-if="!loading">
      <table class="price-change">
        <caption>
          <span :class="[`caption-shop ${$route.params.name}-color`]">{{ shopName }}</span>
          <span class="caption-text">Изменения цен</span>
          <button v-on:click="discountGoodsShown = !discountGoodsShown">
            <i aria-hidden="true" :class="[ discountGoodsShown ? 'fa fa-chevron-down' : 'fa fa-chevron-up' ]"></i>
          </button>
        </caption>
        <tbody v-if="discountGoodsShown">
          <tr v-if="discountGoods.length">
            <th>Товар</th>
            <th>Новая цена</th>
            <th>Старая цена</th>
            <th>Скидка</th>
          </tr>
          <tr v-else class="prod-empty">
             <td>Скидок пока нет, ожидайте обновления базы!</td>
          </tr>
          <tr v-for="product in filteredDiscountGoods" :key="product.id">
            <td>
              <a :href="product.url" target="_blank" rel="noreferrer noopener">{{ product.name }}</a>
            </td>
            <td>{{ product.price }}</td>
            <td>{{ product.old_price }}</td>
            <td>{{ product.discount }}</td>
          </tr>
        </tbody>
      </table>
      <table class="new-goods">
        <caption>
          <span :class="[`caption-shop ${$route.params.name}-color`]">{{ shopName }}</span>
          <span class="caption-text">Новые товары</span>
          <button v-on:click="newGoodsShown = !newGoodsShown">
            <i aria-hidden="true" :class="[ newGoodsShown ? 'fa fa-chevron-down' : 'fa fa-chevron-up' ]"></i>
          </button>
        </caption>
        <tbody v-if="newGoodsShown">
          <tr v-if="newGoods.length">
            <th>Товар</th>
            <th>Цена</th>
          </tr>
          <tr v-else class="prod-empty">
            <td>Новых товаров нет, ожидайте обновления базы!</td>
          </tr>
          <tr v-for="product in filteredNewGoods" :key="product.id">
            <td><a :href="product.url" target="_blank" rel="noreferrer noopener">{{ product.name }}</a></td>
            <td>{{ product.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
import axios from 'axios'

import { bus } from '../main'
import filteringHelper from '../helpers/filteringHelper'
import Spinner from './Spinner'
import FilterPanel from './FilterPanel'

export default {
  name: 'GoodsTable',
  components: {
    Spinner,
    FilterPanel
  },
  data() {
    return {
      loading: false,
      shopName: '...',
      discountGoodsShown: true,
      newGoodsShown: true,
      discountGoods: [],
      filteredDiscountGoods: [],
      newGoods: [],
      filteredNewGoods: [],
    }
  },
  created() {
    this.fetchData();
  },
  mounted() {
    bus.$on('updateTables', () => {
      this.fetchData()
    })
  },
  watch: {
    $route: 'fetchData',
  },
  methods: {
    fetchData() {
      this.loading = true
      axios
        .get(`http://localhost:3000/${this.$route.params.name}-goods`)
        .then(response => {
          this.loading = false
          const { discount_goods, new_goods, name } = response.data;
  
          this.shopName = name;
          this.discountGoods = this.filteredDiscountGoods = discount_goods;
          this.newGoods = this.filteredNewGoods = new_goods;
        })
    },
    goodsFiltering(selectedFilters) {
      this.filteredDiscountGoods = filteringHelper(this.discountGoods, selectedFilters)
      this.filteredNewGoods = filteringHelper(this.newGoods, selectedFilters)
    },
  }
}
</script>

<style scoped>
.spinner-wrapper {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
.table-block {
  margin: 10px 0 10px 270px;
  width: 100%;
  min-height: 297px;
  min-width: 900px;
  padding-right: 10px;
}
table {
  font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
  font-size: 14px;
  border-collapse: collapse;
  text-align: center;
  width: 100%;
  background-color: #f7f7f7;
  margin-top: 10px;
}
table caption {
  height: 50px;
  display: flex;
  align-items: center;
}
table caption .caption-text {
  padding-left: 20px;
  text-align: left;
  font-size: 18px;
  font-weight: 500;
  font-family: 'Fira Sans',sans-serif;
  display: block;
}
table caption button {
  border: none;
  background: transparent;
  font-size: 18px;
  outline: none;
  cursor: pointer;
  margin-left: 6px;
}
table caption .caption-shop {
  color: white;
  padding: 5px 10px;
  margin-left: 20px;
  font-size: 14px;
  font-weight: 600;
  font-family: sans-serif;
}
th:first-child {
  width: 60%;
}
th, td:first-child {
  padding: 10px 20px;
  font-weight: 400;
}
th, td {
  border-style: solid;
  border-width: 0 1px 1px 0;
  border-color: white;
}
th:first-child, td:first-child {
  text-align: left;
}
th:last-child, td:last-child {
  border-right: none;
}
tr:last-child td {
  border-bottom: none;
}
tr.prod-empty td {
  text-align: center;
  background-color: #d20808 !important;
}
/* Price change table colors */
.price-change th, .price-change td:first-child {
  background: #AFCDE7;
  color: white;
}
.price-change td {
  background: #D8E6F3;
}
.price-change td a {
  color: #01597b;
  text-decoration: none;
}
/* New goods table colors */
.new-goods th, .new-goods td:first-child {
  background: #6bc57f;
  color: white;
}
.new-goods td {
  background: #badcc2;
}
.new-goods td a {
  color: #1c5222;
  text-decoration: none;
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
</style>