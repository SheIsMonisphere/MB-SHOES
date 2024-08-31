// src/composables/useProducts.js
import { computed } from 'vue'
import { useStore } from 'vuex'

export function useProducts() {
  const store = useStore()
  const products = computed(() => store.state.products)

  const fetchProducts = async () => {
    if (products.value.length === 0) {
      await store.dispatch('fetchProducts')
    }
    console.log('Fetched products:', products.value)
  }

  return {
    products,
    fetchProducts,
  }
}
