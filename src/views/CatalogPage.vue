<template>
  <div class="catalog-page">
    <div class="search-bar">
      <input
        type="text"
        placeholder="Rechercher"
        v-model="searchQuery"
        @input="applyFilters"
      />
      <button class="search-button">
        <img src="@/assets/icons/search.svg" alt="Search" />
      </button>
    </div>

    <h1 class="page-title">Nos chaussures</h1>

    <div class="filter-button">
      <button @click="toggleFilter">
        {{ showFilter ? 'Masquer les filtres' : 'Afficher les filtres' }}
      </button>
    </div>

    <transition name="fade">
      <div v-if="showFilter" class="filter-form">
        <div class="filter-group">
          <label for="sort-price">Trier par prix :</label>
          <select id="sort-price" v-model="sortOrder" @change="applyFilters">
            <option value="asc">Prix croissant</option>
            <option value="desc">Prix décroissant</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="filter-color">Filtrer par couleur :</label>
          <select
            id="filter-color"
            v-model="selectedColor"
            @change="applyFilters"
          >
            <option value="">Toutes les couleurs</option>
            <option
              v-for="color in availableColors"
              :key="color"
              :value="color"
            >
              {{ color }}
            </option>
          </select>
        </div>
      </div>
    </transition>

    <transition-group name="fade" tag="div" class="products-grid">
      <div
        v-for="product in filteredProducts"
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
        <div class="color-options">
          <div
            v-for="color in product.colors"
            :key="color"
            class="color-option"
            :style="{ backgroundColor: color }"
          ></div>
        </div>
        <button
          class="choose-size"
          @click="openSizeSelector(product)"
          title="Retrouve ta taille pour l'acheter !"
        >
          Choisir la taille
        </button>
        <button class="view-product" @click="viewProduct(product.id)">
          Voir le produit
        </button>
      </div>
    </transition-group>

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
import { useRouter } from 'vue-router'
import SizeSelector from '@/components/SizeSelector.vue'
import { useProducts } from '@/composables/useProducts'
import { useFavorites } from '@/composables/useFavorites'
import { useCart } from '@/composables/useCart'

export default {
  name: 'CatalogPage',
  components: {
    SizeSelector,
  },
  setup() {
    const router = useRouter()
    const { products, fetchProducts } = useProducts()
    const { isFavorite, toggleFavorite } = useFavorites()
    const { addToCart } = useCart()

    const searchQuery = ref('')
    const showSizeSelector = ref(false)
    const selectedProduct = ref(null)
    const availableSizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
    const showFilter = ref(false)
    const sortOrder = ref('asc')
    const selectedColor = ref('')

    const showNotification = ref(false)
    const notificationMessage = ref('')

    const filteredProducts = ref([])

    onMounted(async () => {
      await fetchProducts()
      applyFilters()
    })

    const availableColors = computed(() => {
      const colors = new Set()
      products.value.forEach((product) => {
        product.colors.forEach((color) => colors.add(color))
      })
      return Array.from(colors)
    })

    const applyFilters = () => {
      let result = products.value

      if (searchQuery.value) {
        result = result.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      }

      if (selectedColor.value) {
        result = result.filter((product) =>
          product.colors.includes(selectedColor.value)
        )
      }

      result.sort((a, b) => {
        return sortOrder.value === 'asc' ? a.price - b.price : b.price - a.price
      })

      filteredProducts.value = result
    }

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

    const toggleFilter = () => {
      showFilter.value = !showFilter.value
    }

    return {
      searchQuery,
      filteredProducts,
      showSizeSelector,
      selectedProduct,
      availableSizes,
      availableColors,
      openSizeSelector,
      closeSizeSelector,
      selectSize,
      toggleFavorite,
      isFavorite,
      viewProduct,
      showFilter,
      sortOrder,
      selectedColor,
      toggleFilter,
      applyFilters,
      showNotification,
      notificationMessage,
    }
  },
}
</script>

<style scoped>
.catalog-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.search-bar {
  display: flex;
  margin-bottom: 20px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
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
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #45a049;
}

.search-button img {
  width: 20px;
  height: 20px;
}

.page-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 36px;
  color: #333;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
}

.page-title::after {
  content: '';
  display: block;
  width: 0;
  height: 3px;
  background: #4caf50;
  transition: width 0.3s;
}

.page-title:hover::after {
  width: 100%;
}

.filter-button {
  text-align: right;
  margin-bottom: 20px;
}

.filter-button button {
  background-color: #f1f1f1;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
}

.filter-button button:hover {
  background-color: #e0e0e0;
  transform: translateY(-2px);
}

.filter-form {
  background-color: #f9f9f9;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.filter-group {
  margin-bottom: 15px;
}

.filter-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

.filter-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  transition: border-color 0.3s;
}

.filter-group select:focus {
  border-color: #4caf50;
  outline: none;
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
  background-color: white;
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
  top: 15px;
  right: 15px;
  cursor: pointer;
}

.favorite-icon img {
  width: 32px;
  height: 32px;
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
  margin-bottom: 15px;
}

h3 {
  font-size: 18px;
  margin: 10px 0;
  text-align: center;
  color: #333;
}

.price {
  font-weight: bold;
  color: #4caf50;
  margin-bottom: 15px;
  font-size: 22px;
}

.color-options {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.color-option {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 5px;
  border: 1px solid #ddd;
}

.choose-size,
.view-product {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.2s;
}

.choose-size {
  background-color: #4caf50;
  color: white;
}

.choose-size:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}

.view-product {
  background-color: #f1f1f1;
  color: #333;
}

.view-product:hover {
  background-color: #e0e0e0;
  transform: translateY(-2px);
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

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
