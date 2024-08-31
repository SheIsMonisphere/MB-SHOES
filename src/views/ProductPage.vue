<template>
  <div class="product-page">
    <div v-if="product" class="product-container">
      <div class="product-image">
        <img :src="product.img" :alt="product.title" />
      </div>
      <div class="product-details">
        <h1>{{ product.title }}</h1>
        <p class="description">Chaussure de sport</p>
        <p class="price">{{ product.price }} €</p>

        <div class="color-selection">
          <h3>Couleurs principales</h3>
          <div class="color-options">
            <div
              v-for="color in product.colors"
              :key="color"
              class="color-option"
              :style="{ backgroundColor: color }"
            ></div>
          </div>
        </div>

        <div class="size-selection">
          <h3>Selectionnez votre pointure :</h3>
          <div class="size-options">
            <button
              v-for="size in sizes"
              :key="size"
              :class="{ active: selectedSize === size }"
              @click="selectSize(size)"
            >
              {{ size }}
            </button>
          </div>
          <!-- Message d'erreur -->
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>

        <button class="add-to-cart" @click="addToCart">
          Ajouter au panier
        </button>
      </div>
    </div>
    <SimilarProducts :currentProductId="productId" />

    <div v-if="showNotification" class="notification">
      Produit ajouté au panier !
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SimilarProducts from '@/components/SimilarProducts.vue'
import { useCart } from '@/composables/useCart'
import { useProducts } from '@/composables/useProducts'

export default {
  name: 'ProductPage',
  components: {
    SimilarProducts,
  },
  setup() {
    const route = useRoute()
    const { addToCart: addProductToCart } = useCart()
    const { products, fetchProducts } = useProducts()
    const selectedSize = ref(null)
    const sizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
    const showNotification = ref(false)
    const errorMessage = ref('')

    const productId = computed(() => parseInt(route.params.id))
    const product = computed(() =>
      products.value.find((p) => p.id === productId.value)
    )

    onMounted(async () => {
      if (products.value.length === 0) {
        await fetchProducts()
      }
    })

    const selectSize = (size) => {
      selectedSize.value = size
      errorMessage.value = '' // Réinitialiser le message d'erreur lors de la sélection de la pointure
    }

    const addToCart = () => {
      if (selectedSize.value) {
        addProductToCart({
          ...product.value,
          size: selectedSize.value,
          quantity: 1,
        })
        showNotification.value = true
        setTimeout(() => {
          showNotification.value = false
        }, 3000)

        // Réinitialiser la sélection de taille après ajout au panier
        selectedSize.value = null
      } else {
        errorMessage.value =
          "Veuillez sélectionner une taille avant d'ajouter au panier."
      }
    }

    return {
      product,
      sizes,
      selectedSize,
      selectSize,
      addToCart,
      productId,
      showNotification,
      errorMessage,
    }
  },
}
</script>

<style scoped>
.product-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.product-container {
  display: flex;
  gap: 40px;
}
.product-image {
  flex: 1;
}
.product-image img {
  width: 100%;
  height: auto;
}
.product-details {
  flex: 1;
}
h1 {
  font-size: 24px;
  margin-bottom: 10px;
}
.description {
  margin-bottom: 20px;
}
.color-selection,
.size-selection {
  margin-bottom: 20px;
}
h3 {
  margin-bottom: 10px;
}
.color-options {
  display: flex;
  gap: 10px;
}
.color-option {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ccc;
}
.size-options {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}
.size-options button {
  padding: 10px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}
.size-options button.active {
  background-color: #8bc34a;
  color: white;
}
.size-options button:hover {
  background-color: #f0f0f0;
}
.add-to-cart {
  background-color: #8bc34a;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}
.add-to-cart:hover {
  background-color: #7cb342;
}
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4caf50;
  color: white;
  padding: 15px;
  border-radius: 4px;
  z-index: 1000;
  transition: opacity 0.3s;
}
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
</style>
