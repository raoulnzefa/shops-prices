<template>
  <div class="container">
    <FilterPanel
      @selectedFilters="goodsFiltering"
    />
    <Spinner v-if="loading" />
    <div v-if="!loading" class="tables-wrapper">
      <table class="price-changes">
        <caption>
          <span :class="[`shop ${$route.params.name}-color`]">{{ shopName }}</span>
          <span class="text">Изменения цен</span>
          <button v-on:click="discountGoodsShown = !discountGoodsShown" class="toggle-button">
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
          <span :class="[`shop ${$route.params.name}-color`]">{{ shopName }}</span>
          <span class="text">Новые товары</span>
          <button v-on:click="newGoodsShown = !newGoodsShown" class="toggle-button">
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
  </div>
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

<style lang="scss" scoped>
@import '../assets/scss/shop-colors.scss';

.container {
  margin: 10px 0 10px 270px;
  width: 100%;
  padding-right: 10px;
}

@media screen and (max-width: 892px) {
  .container {
    margin: 0;
    padding: 0;
  }
}

.tables-wrapper {
  overflow: auto;
}

.price-changes, .new-goods {
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  font-size: 14px;
  border-collapse: collapse;
  text-align: center;
  width: 100%;
  min-width: 600px;
  background-color: #f7f7f7;
  margin-top: 10px;
  caption {
    height: 50px;
    display: flex;
    align-items: center;
    .shop {
      font-family: sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: white;
      padding: 5px 10px;
      margin-left: 20px;
    }
    .text {
      font-family: 'Fira Sans', sans-serif;
      text-align: left;
      font-size: 18px;
      font-weight: 500;
      display: block;
      padding-left: 20px;
    }
  }
}

.toggle-button {
  border: none;
  background: transparent;
  font-size: 18px;
  margin-left: 6px;
  outline: none;
  cursor: pointer;
}

th, td {
  border-style: solid;
  border-width: 0 1px 1px 0;
  border-color: white;
  &:first-child {
    text-align: left;
  }
  &:last-child {
    border-right: none;
  }
}

th {
  padding: 10px 20px;
  font-weight: 400;
  &:first-child {
    width: 60%;
  }
}

td {
  &:first-child {
    padding: 10px 20px;
    font-weight: 400;
  }
}

tr {
  &:last-child td {
    border-bottom: none;
  }
  &.prod-empty td {
    text-align: center;
    background-color: #d20808 !important;
  }
}

/* Price changes table colors */
.price-changes {
  th, td:first-child {
    background: #AFCDE7;
    color: white;
  }
  td {
    background: #D8E6F3;
    a {
      color: #01597b;
      text-decoration: none;
    }
  }
}

/* New goods table colors */
.new-goods {
  th, td:first-child {
    background: #6bc57f;
    color: white;
  }
  td {
    background: #badcc2;
    a {
      color: #1c5222;
      text-decoration: none;
    }
  }
}
</style>