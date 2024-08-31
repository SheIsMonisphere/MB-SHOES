<template>
  <nav class="navbar">
    <div class="navbar-content">
      <div class="logo-container">
        <router-link to="/" class="logo">
          <img src="@/assets/Logo.1.png" alt="MB'SHOES Sportswear" />
        </router-link>
        <router-link to="/" class="logo-text"
          >Votre Boutique en ligne !</router-link
        >
      </div>
      <ul class="nav-links">
        <li><router-link to="/">Accueil</router-link></li>
        <!-- Nouveau lien Contact -->
        <li><router-link to="/contact">Contact</router-link></li>
        <li><router-link to="/catalog">Produits</router-link></li>
        <li>
          <router-link to="/favorites" class="favorites-link">
            <i
              class="far fa-heart"
              :class="{
                fas: favoritesCount > 0,
                'favorite-active': favoritesCount > 0,
              }"
            ></i>
            Favoris
            <span v-if="favoritesCount > 0" class="favorites-count">{{
              favoritesCount
            }}</span>
          </router-link>
        </li>
        <li>
          <a href="#" @click.prevent="openCart" class="cart-link">
            <i class="fas fa-shopping-cart"></i>
            Panier
            <span v-if="cartItemsCount > 0" class="cart-count">{{
              cartItemsCount
            }}</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useFavorites } from '@/composables/useFavorites'
import { useCart } from '@/composables/useCart'

export default {
  name: 'TheNavbar',
  emits: ['open-cart'],
  setup(props, { emit }) {
    const { favorites } = useFavorites()
    const { cart } = useCart()

    const openCart = () => {
      emit('open-cart')
    }

    const favoritesCount = computed(() => favorites.value.length)
    const cartItemsCount = computed(() => {
      return cart.value.reduce((total, item) => total + item.quantity, 0)
    })

    return {
      openCart,
      favoritesCount,
      cartItemsCount,
    }
  },
}
</script>

<style scoped>
.navbar {
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.5rem 1rem;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo img {
  height: 60px;
  margin-right: 15px;
}

.logo-text {
  color: #4caf50;
  font-weight: bold;
  font-size: 1.2rem;
  text-decoration: none;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-links li {
  margin-left: 25px;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
}

.fas,
.far {
  font-size: 1.5rem;
  margin-right: 8px;
}

.fa-heart {
  color: #333;
}

.favorite-active {
  color: rgb(226, 63, 63);
}

.favorites-link,
.cart-link {
  position: relative;
}

.favorites-count,
.cart-count {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: rgb(226, 63, 63);
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
}

@media (max-width: 1024px) {
  .navbar-content {
    flex-wrap: wrap;
  }

  .logo-container {
    width: 100%;
    justify-content: center;
    margin-bottom: 0.5rem;
  }

  .nav-links {
    width: 100%;
    justify-content: center;
  }

  .nav-links li {
    margin: 0 15px;
  }
}

@media (max-width: 768px) {
  .logo img {
    height: 50px;
  }

  .logo-text {
    font-size: 1rem;
  }

  .nav-links {
    flex-wrap: wrap;
  }

  .nav-links li {
    margin: 5px 10px;
  }
}
</style>
