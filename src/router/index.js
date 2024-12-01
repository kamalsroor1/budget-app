import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddTransaction from '../views/AddTransaction.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add',
    name: 'AddTransaction',
    component: AddTransaction
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
