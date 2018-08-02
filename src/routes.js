import Start from './components/primary/Start.vue'
import Portfolio from './components/primary/Portfolio.vue'
import Stocks from './components/primary/Stocks.vue'
export const routes = [
  {
    path: '',
    name: 'Start',
    component: Start
  }, {
    path: '/portfolio',
    name: 'Portfolio',
    component: Portfolio
  }, {
    path: '/stocks',
    name: 'Stocks',
    component: Stocks
  }, {
    path: '*',
    redirect: '/'
  }
]