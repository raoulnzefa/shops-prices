import Vue from 'vue'
import Router from 'vue-router'
import GoodsTable from '../components/GoodsTable'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/shop/beru'
    },
    {
      path: '/shop/:name',
      component: GoodsTable
    },
  ]
})