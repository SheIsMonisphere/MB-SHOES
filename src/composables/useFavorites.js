// src/composables/useFavorites.js
import { computed } from 'vue'
import { useStore } from 'vuex'

export function useFavorites() {
  const store = useStore()

  const favorites = computed(() => store.state.favorites)

  const isFavorite = (productId) => store.getters.isFavorite(productId)

  const toggleFavorite = (productId) => {
    store.dispatch('toggleFavorite', productId)
  }

  return {
    favorites,
    isFavorite,
    toggleFavorite,
  }
}
