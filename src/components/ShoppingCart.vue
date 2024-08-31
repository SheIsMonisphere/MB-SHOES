<template>
  <div
    :class="['shopping-cart-container', { open: isOpen }]"
    @click="handleOutsideClick"
  >
    <div class="shopping-cart" @click.stop>
      <div class="cart-header">
        <h2>Panier</h2>
        <button @click="closeCart" class="close-cart-button">&times;</button>
      </div>

      <div v-if="!cart.length" class="empty-cart">Votre panier est vide.</div>

      <div v-else>
        <div
          v-for="item in cart"
          :key="`${item.id}-${item.size}`"
          class="cart-item"
        >
          <div class="item-content">
            <img :src="item.img" :alt="item.title" class="product-image" />
            <div class="item-details">
              <h3>{{ item.title }}</h3>
              <p class="price">{{ item.price }} €</p>
              <p class="item-size">
                Taille : {{ item.size }}
                <span class="modify-size" @click="openSizeSelector(item)">
                  Modifier la taille
                </span>
              </p>
              <div class="item-quantity">
                <button @click="changeQuantity(item, -1)">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="changeQuantity(item, 1)">+</button>
              </div>
            </div>
            <button
              @click="removeFromCart(item.id, item.size)"
              class="remove-item"
            >
              <span class="trash-icon">🗑️</span>
            </button>
          </div>
        </div>

        <div class="cart-footer">
          <div class="cart-total">
            <span>Total :</span>
            <span>{{ cartTotal }} €</span>
          </div>
          <button @click="proceedToCheckout" class="checkout-button">
            Passer commande
          </button>
          <button @click="closeCart" class="continue-shopping">
            Continuer mes achats
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal pour la sélection de taille -->
  <SizeSelector
    v-if="showSizeSelector"
    :sizes="availableSizes"
    @select-size="selectSize"
    @close="closeSizeSelector"
  />
</template>

<script>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import SizeSelector from '@/components/SizeSelector.vue'

export default {
  name: 'ShoppingCart',
  props: {
    isOpen: Boolean,
  },
  emits: ['close'],
  components: {
    SizeSelector,
  },
  setup(props, { emit }) {
    const store = useStore()
    const router = useRouter()
    const cart = computed(() => store.state.cart)
    const cartTotal = computed(() => store.getters.cartTotal)
    const showSizeSelector = ref(false)
    const selectedItem = ref(null)
    const availableSizes = [
      '36',
      '37',
      '38',
      '39',
      '40',
      '41',
      '42',
      '43',
      '44',
      '45',
    ]

    const closeCart = () => emit('close')

    const changeQuantity = (item, delta) => {
      const newQuantity = item.quantity + delta
      if (newQuantity > 0) {
        store.dispatch('updateCartItemQuantity', {
          id: item.id,
          size: item.size,
          quantity: newQuantity,
        })
      }
    }

    const proceedToCheckout = () => {
      router.push('/checkout')
      emit('close')
    }

    const openSizeSelector = (item) => {
      selectedItem.value = item
      showSizeSelector.value = true
    }

    const selectSize = (size) => {
      if (selectedItem.value) {
        store.dispatch('updateCartItemSize', {
          id: selectedItem.value.id,
          oldSize: selectedItem.value.size,
          newSize: size,
        })
        selectedItem.value.size = size
        showSizeSelector.value = false
      }
    }

    const closeSizeSelector = () => {
      showSizeSelector.value = false
    }

    const handleOutsideClick = (event) => {
      if (event.target.classList.contains('shopping-cart-container')) {
        closeCart()
      }
    }

    return {
      cart,
      cartTotal,
      closeCart,
      removeFromCart: (id, size) =>
        store.dispatch('removeFromCart', { id, size }),
      changeQuantity,
      proceedToCheckout,
      openSizeSelector,
      selectSize,
      closeSizeSelector,
      showSizeSelector,
      selectedItem,
      availableSizes,
      handleOutsideClick,
    }
  },
}
</script>

<style scoped>
.shopping-cart-container {
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: right 0.3s ease-out;
  z-index: 1000;
}

.shopping-cart-container.open {
  right: 0;
}

.shopping-cart {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;
  height: 100%;
  background-color: white;
  padding: 20px;
  overflow: auto;
  transform: translateX(100%);
  transition: transform 0.3s ease-out;
}

.shopping-cart-container.open .shopping-cart {
  transform: translateX(0);
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.close-cart-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.empty-cart {
  text-align: center;
  padding: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.item-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 20px;
}

.item-details {
  flex-grow: 1;
}

.item-size {
  margin: 5px 0;
}

.modify-size {
  color: #4caf50;
  cursor: pointer;
  margin-left: 10px;
}

.item-quantity {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.item-quantity button {
  background-color: #f1f1f1;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.item-quantity span {
  margin: 0 10px;
}

.remove-item {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 20px;
}

.trash-icon {
  font-size: 20px;
}

.cart-footer {
  margin-top: 20px;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 20px;
}

.checkout-button,
.continue-shopping {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.checkout-button {
  background-color: #4caf50;
  color: white;
}

.continue-shopping {
  background-color: #f1f1f1;
  color: #333;
}

@media (max-width: 768px) {
  .shopping-cart {
    width: 100%;
    max-width: none;
  }
}
</style>
