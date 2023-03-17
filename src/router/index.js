import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/repositories',
    name: 'repositories',
    component: () => import('../views/GithubRepositories.vue')
  },
  {
    path: '/repository/:name',
    name: 'repository',
    component: () => import('../views/RepoDetails.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('../views/ErrorPage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
