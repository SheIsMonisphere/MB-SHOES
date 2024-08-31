// src/composables/useCart.js
import { computed } from 'vue'
import { useStore } from 'vuex'

export function useCart() {
  const store = useStore()

  const cart = computed(() => store.state.cart)
  const cartTotal = computed(() => store.getters.cartTotal)

  const addToCart = (product) => {
    store.commit('addToCart', product)
  }

  const removeFromCart = (productId, size) => {
    store.commit('removeFromCart', { id: productId, size })
  }

  const updateCartItemQuantity = (item) => {
    store.commit('updateCartItemQuantity', {
      id: item.id,
      size: item.size,
      quantity: item.quantity,
    })
  }

  return {
    cart,
    cartTotal,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
  }
}
