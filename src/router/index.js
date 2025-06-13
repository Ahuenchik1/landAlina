import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PrivacyPolicy from '../components/PrivacyPolicy.vue'
import TermsOfUse from '../components/TermsOfUse.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  },
  {
    path: '/terms-of-use',
    name: 'TermsOfUse',
    component: TermsOfUse
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 