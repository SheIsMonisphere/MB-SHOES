<template>
  <div class="favorites-page">
    <div class="search-bar">
      <input type="text" placeholder="Rechercher" v-model="searchQuery" />
      <button class="search-button">
        <img src="@/assets/icons/search.svg" alt="Search" />
      </button>
    </div>
    <h1>Favoris</h1>
    <div v-if="filteredFavoriteProducts.length" class="products-grid">
      <div
        v-for="product in filteredFavoriteProducts"
        :key="product.id"
        class="product-card"
      >
        <div class="favorite-icon" @click="toggleFavorite(product.id)">
          <img
            :src="
              isFavorite(product.id)
                ? require('@/assets/icons/like-2.svg')
                : require('@/assets/icons/like-1.svg')
            "
            alt="Favorite"
          />
        </div>
        <img :src="product.img" :alt="product.title" class="product-image" />
        <h3>{{ product.title }}</h3>
        <p class="price">{{ product.price }} €</p>
        <button class="choose-size" @click="openSizeSelector(product)">
          Choisir la taille
        </button>
        <button class="view-product" @click="viewProduct(product.id)">
          Voir le produit
        </button>
      </div>
    </div>
    <p v-else class="no-favorites">Vous n'avez pas encore de favoris...</p>

    <SizeSelector
      v-if="showSizeSelector"
      :sizes="availableSizes"
      @select-size="selectSize"
      @close="closeSizeSelector"
    />

    <transition name="fade">
      <div v-if="showNotification" class="notification">
        {{ notificationMessage }}
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useFavorites } from '@/composables/useFavorites'
import { useCart } from '@/composables/useCart'
import SizeSelector from '@/components/SizeSelector.vue'

export default {
  name: 'FavoritePage',
  components: {
    SizeSelector,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const { addToCart } = useCart()
    const searchQuery = ref('')
    const { favorites, toggleFavorite, isFavorite } = useFavorites()
    const showSizeSelector = ref(false)
    const selectedProduct = ref(null)
    const availableSizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
    const showNotification = ref(false)
    const notificationMessage = ref('')

    onMounted(() => {
      store.dispatch('loadFavorites')
    })

    const favoriteProducts = computed(() => {
      return store.state.products.filter((product) =>
        favorites.value.includes(product.id)
      )
    })

    const filteredFavoriteProducts = computed(() => {
      return favoriteProducts.value.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    })

    const openSizeSelector = (product) => {
      selectedProduct.value = product
      showSizeSelector.value = true
    }

    const closeSizeSelector = () => {
      showSizeSelector.value = false
    }

    const selectSize = (size) => {
      if (selectedProduct.value) {
        addToCart({
          ...selectedProduct.value,
          size: size,
          quantity: 1,
        })
        notificationMessage.value = `${selectedProduct.value.title} (Taille ${size}) ajouté au panier`
        showNotification.value = true
        setTimeout(() => {
          showNotification.value = false
        }, 3000)
      }
      closeSizeSelector()
    }

    const viewProduct = (productId) => {
      router.push({ name: 'Product', params: { id: productId } })
    }

    return {
      searchQuery,
      filteredFavoriteProducts,
      toggleFavorite,
      isFavorite,
      openSizeSelector,
      viewProduct,
      showSizeSelector,
      availableSizes,
      selectSize,
      closeSizeSelector,
      showNotification,
      notificationMessage,
    }
  },
}
</script>

<style scoped>
.favorites-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.search-bar {
  display: flex;
  margin-bottom: 20px;
}

.search-bar input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

.search-button {
  background-color: #4caf50;
  border: none;
  padding: 10px 20px;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button img {
  width: 20px;
  height: 20px;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
  text-align: left;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}

.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.favorite-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 1;
}

.favorite-icon img {
  width: 24px;
  height: 24px;
  transition: transform 0.3s;
}

.favorite-icon:hover img {
  transform: scale(1.2);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}

.product-card h3 {
  font-size: 18px;
  margin: 10px 0;
}

.price {
  font-weight: bold;
  color: #4caf50;
  margin-bottom: 10px;
}

.choose-size,
.view-product {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.choose-size {
  background-color: #4caf50;
  color: white;
}

.choose-size:hover {
  background-color: #45a049;
}

.view-product {
  background-color: #f1f1f1;
  color: #333;
}

.view-product:hover {
  background-color: #e0e0e0;
}

.no-favorites {
  text-align: center;
  font-size: 18px;
  color: #666;
  margin-top: 50px;
}

.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #4caf50;
  color: white;
  padding: 15px 20px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .products-grid {
    grid-template-columns: 1fr;
  }

  .search-bar {
    flex-direction: column;
  }

  .search-bar input {
    border-radius: 4px;
    margin-bottom: 10px;
  }

  .search-button {
    border-radius: 4px;
  }
}
</style>
