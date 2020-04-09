import Vue from 'vue'
import Router from 'vue-router'
import ObserverPanel from '../components/ObserverPanel'
import GoodsTable from '../components/GoodsTable'
import NotFound from '../components/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/shop/beru'
    },
    {
      path: '/404',
      component: NotFound
    },
    {
      path: '/shop/:name',
      component: ObserverPanel,
      children: [
        {
          path: '',
          component: GoodsTable
        }
      ]
    },
    {
      path: '*',
      redirect: '/404',
    }
  ]
})