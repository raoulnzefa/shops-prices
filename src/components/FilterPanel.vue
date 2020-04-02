<template>
  <div class="filter-block">
    <div class="filter-block__header">
      <h3 class="filter-block__header-title">Фильтр по производителям</h3>
    </div>
    <div class="filter-input">
      <input
        type="text"
        class="filter-placeholder"
        ref="search"
        :placeholder="placeholder"
        v-model="filterInputChange"
      >
      <div class="filter-input__buttons-block">
        <button
          class="filter-input__reset-button"
          v-on:click="resetInput"
          v-if="filterInputChange.length"
        >
          <i class="fa fa-times-circle" aria-hidden="true"></i>
        </button>
        <button
          class="filter-input__downshift-button"
          v-on:click="dropdownIsShown = !dropdownIsShown"
        >
          <i
            :class="[ dropdownIsShown ? 'fa fa-chevron-circle-down' : 'fa fa-chevron-circle-up' ]"
            aria-hidden="true"
          >
          </i>
        </button>
      </div>
      <ul v-if="dropdownIsShown" class="filter-list">
        <li v-for="item in filterSearchItems" :key="item">
          <label class="checkbox">
              <input type="checkbox" :value="item" v-model="filterSelectedItems"> <span class="checkbox__text">{{ item }}</span>
          </label>
        </li>
      </ul>
    </div>
    <button class="filter-item" v-on:click="resetFilter">Сбросить</button> 
    <div class="filter-info" :class="{ 'filter-active': filterSelectedItems.length }">
      <span>
        {{ filterSelectedItems.length ? 'Фильтр включен' : 'Фильтр выключен' }}
        <i :class="[ filterSelectedItems.length ? 'fa fa-check' : 'fa fa-exclamation-circle' ]"></i>
      </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FilterPanel',
  props: {
    goodsFiltering: Function,
    discountGoods: Array,
    newGoods: Array
  },
  data() {
    return {
      placeholder: "",
      filterInputChange: "",
      dropdownIsShown: false,
      filterData: [],
      filterSearchItems: [],
      filterSelectedItems: [],
    }
  },
  created() {
    axios
      .get('http://localhost:3000/filter-items')
      .then(response => {
        const { data } = response;
        this.filterData = this.filterSearchItems = data;
      })
  },
  watch: {
    filterInputChange(input) {
      this.dropdownIsShown = true;
      this.filterSearchItems = this.filterData.filter(item => {
        if (item.toLowerCase().includes(input.toLowerCase())) {
          return item;
        }
      })
    },
    filterSelectedItems() {
      this.goodsFiltering(this.discountGoods, 'filteredDiscountGoods', this.filterSelectedItems)
      this.goodsFiltering(this.newGoods, 'filteredNewGoods', this.filterSelectedItems)
      if (!this.filterSelectedItems.length) {
        this.placeholder = ""
        return null
      }
      this.placeholder = `${this.filterSelectedItems.length} из ${this.filterData.length} выбрано`
    }
  },
  methods: {
    resetInput() {
      this.filterInputChange = ""
      this.$refs.search.focus()
    },
    resetFilter() {
      this.dropdownIsShown = false
      this.filterSelectedItems = []
    },
  }
}
</script>

<style scoped>
.filter-block {
  width: 100%;
  background-color: bisque;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0px;
  box-shadow: 0 2px 2px -1px #aba9a9;
}
.filter-block__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;
  height: 50px;
}
.filter-block__header-title {
  font-weight: 500;
  font-family: 'Fira Sans',sans-serif;
  font-size: 18px;
  border-right: 1px solid #333333;
  padding-right: 16px;
}
.filter-item {
  -webkit-appearance: none;
  padding: 1px 6px;
  margin-right: 10px;
  height: 30px;
  outline: none;
  border: 1px solid grey;
}
button.filter-item {
  background-image: linear-gradient(180deg, #ececec, #f0f0f0);
  color: #3b3b3b;
  font-family: sans-serif;
  cursor: pointer;
  font-size: inherit;
}
button.filter-item:active {
  box-shadow: inset 0px 0px 2px 1px rgba(181, 181, 181, 0.74);
}
.filter-info {
  border: 1px solid red;
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 7px;
  box-sizing: border-box;
}
.filter-info span {
  font-family: sans-serif;
  color: #f21a1a;
}
.filter-input {
  position: relative;
  margin-right: 10px;
}
.filter-input__buttons-block {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
}
.filter-input__reset-button,
.filter-input__downshift-button {
  border: none;
  height: 100%;
  background: transparent;
  font-size: inherit;
  cursor: pointer;
  outline: none;
}
.filter-input__reset-button {
  margin-left: 6px;
}
.filter-input__downshift-button {
  margin: 0 6px;
}
.filter-placeholder {
  position: relative;
  font-family: sans-serif;
  width: 200px;
  border: 1px solid grey;
  height: 30px;
  box-sizing: border-box;
  padding: 6px 45px 6px 10px;
  background-color: white;
  outline: none;
  font-size: 16px;
}
.filter-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid grey;
  width: 200px;
  max-height: 300px;
  overflow: auto;
  box-sizing: border-box;
  position: absolute;
  top: 29px;
  background: white;
}
.checkbox input {
  display: none;
}
input:checked + .checkbox__text {
  background: #9FD468;
  color: white;
}
.filter-list li {
  height: 30px;
}
.checkbox__text {
  padding: 6px 10px;
  font-family: sans-serif;
  cursor: pointer;
  display: block;
  margin: 0;
}
.checkbox__text:hover {
  background: grey;
  color: white;
}
.filter-active {
  border-color: #39c522;
}
.filter-active span {
  color: #2faf3e;
}
</style>