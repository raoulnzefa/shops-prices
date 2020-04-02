import Vue from 'vue'
import Router from 'vue-router'
import GoodsTable from '../components/GoodsTable'
import FilterPanel from '../components/FilterPanel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/shop/beru'
    },
    {
      path: '/shop/:name',
      components: { default: GoodsTable, filter: FilterPanel },
    },
  ]
})