import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../Repo/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/repositories',
    name: 'repositories',
    component: () => import('../Repo/GithubRepositories.vue')
  },
  {
    path: '/repository/:name',
    name: 'repository',
    component: () => import('../Repo/RepoDetails.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('../Repo/ErrorPage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
