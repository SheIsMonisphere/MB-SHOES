<template>
  <div class="similar-products">
    <h2>Produits Similaires</h2>
    <div class="products-grid">
      <div
        v-for="product in similarProducts"
        :key="product.id"
        class="product-card"
      >
        <img :src="product.img" :alt="product.title" />
        <h3>{{ product.title }}</h3>
        <p class="price">{{ product.price }} €</p>
        <div class="color-dots">
          <span
            v-for="color in product.colors"
            :key="color"
            class="color-dot"
            :style="{ backgroundColor: color }"
          ></span>
        </div>
        <div class="buttons">
          <button class="btn choose-size" @click="openSizeSelector(product)">
            Choisir la taille
          </button>
          <button class="btn view-product" @click="viewProduct(product.id)">
            Voir le produit
          </button>
        </div>
      </div>
    </div>
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '@/composables/useCart'
import SizeSelector from '@/components/SizeSelector.vue'

export default {
  name: 'SimilarProducts',
  components: {
    SizeSelector,
  },
  props: {
    currentProductId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()
    const { addToCart } = useCart()
    const showSizeSelector = ref(false)
    const selectedProduct = ref(null)
    const showNotification = ref(false)
    const notificationMessage = ref('')
    const availableSizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]

    const allProducts = [
      // Replace this with your actual products data
      {
        id: 1,
        title: 'Jimmy Basket',
        price: 760,
        img: '/images/sneakers-1.jpg',
        colors: ['green', 'white'],
      },
      {
        id: 2,
        title: 'Nike Air Max',
        price: 850,
        img: '/images/sneakers-2.jpg',
        colors: ['white', 'black', 'orange'],
      },
      {
        id: 3,
        title: 'Adidas Ultraboost',
        price: 900,
        img: '/images/sneakers-3.jpg',
        colors: ['white', 'beige'],
      },
      {
        id: 4,
        title: 'Puma RS-X',
        price: 700,
        img: '/images/sneakers-4.jpg',
        colors: ['blue', 'pink', 'yellow', 'black'],
      },
      {
        id: 5,
        title: 'New Balance 574',
        price: 650,
        img: '/images/sneakers-5.jpg',
        colors: ['yellow', 'white'],
      },
      {
        id: 6,
        title: 'Converse Chuck Taylor',
        price: 550,
        img: '/images/sneakers-6.jpg',
        colors: ['black', 'white'],
      },
      {
        id: 7,
        title: 'Vans Old Skool',
        price: 600,
        img: '/images/sneakers-7.jpg',
        colors: ['black', 'red', 'white'],
      },
      {
        id: 8,
        title: 'Reebok Classic',
        price: 620,
        img: '/images/sneakers-8.jpg',
        colors: ['black', 'blue', 'yellow'],
      },
      {
        id: 9,
        title: 'Asics Gel-Kayano',
        price: 800,
        img: '/images/sneakers-9.jpg',
        colors: ['teal', 'yellow', 'white'],
      },
      {
        id: 10,
        title: 'Saucony Jazz',
        price: 680,
        img: '/images/sneakers-10.jpg',
        colors: ['neon green', 'white'],
      },
      {
        id: 11,
        title: 'On Cloudstratus',
        price: 950,
        img: '/images/sneakers-11.jpg',
        colors: ['gray', 'black'],
      },
      {
        id: 12,
        title: 'Hoka Bondi',
        price: 890,
        img: '/images/sneakers-12.jpg',
        colors: ['red', 'white'],
      },
    ]

    const currentProduct = computed(() =>
      allProducts.find((product) => product.id === props.currentProductId)
    )

    const similarProducts = computed(() => {
      if (!currentProduct.value) return []

      return allProducts
        .filter(
          (product) =>
            product.id !== props.currentProductId &&
            product.colors.some((color) =>
              currentProduct.value.colors.includes(color)
            )
        )
        .slice(0, 4)
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
        notificationMessage.value = `Produit ${selectedProduct.value.title} ajouté au panier avec la taille ${size}`
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
      similarProducts,
      showSizeSelector,
      availableSizes,
      openSizeSelector,
      closeSizeSelector,
      selectSize,
      viewProduct,
      showNotification,
      notificationMessage,
    }
  },
}
</script>

<style scoped>
.similar-products {
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.product-card {
  border: 1px solid #eee;
  padding: 1rem;
  text-align: center;
  border-radius: 8px;
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.product-card h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.price {
  font-weight: bold;
  color: #4caf50;
  margin-bottom: 0.5rem;
}

.color-dots {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.color-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 0 4px;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.choose-size {
  background-color: #4caf50;
  color: white;
}

.view-product {
  background-color: #f1f1f1;
  color: #333;
}

.btn:hover {
  opacity: 0.9;
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

@media (max-width: 1023px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
