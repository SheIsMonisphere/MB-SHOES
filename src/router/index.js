import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ContactPage from '@/views/ContactPage.vue'
import ProductPage from '@/views/ProductPage.vue'
import FavoritePage from '@/views/FavoritePage.vue'
import CatalogPage from '@/views/CatalogPage.vue'
import CheckoutForm from '@/views/CheckoutForm.vue'
import OrderConfirmation from '@/views/OrderConfirmation.vue'

// Définition des routes
const routes = [
  { path: '/', component: HomePage },
  { path: '/produits', component: ProductPage }, // Chemin vers ProductPage.vue
  {
    path: '/product/:id',
    name: 'Product',
    component: ProductPage,
    props: true,
  },
  { path: '/contact', name: 'Contact', component: ContactPage },
  { path: '/favorites', name: 'Favorites', component: FavoritePage },
  { path: '/catalog', name: 'Catalog', component: CatalogPage },
  { path: '/checkout', name: 'Checkout', component: CheckoutForm },
  {
    path: '/order-confirmation',
    name: 'OrderConfirmation',
    component: OrderConfirmation,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // Toujours faire défiler vers le haut de la page
    return { top: 0 }
  },
})

export default router
