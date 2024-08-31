<template>
  <div id="app">
    <TheNavbar @open-cart="openCart" />
    <router-view></router-view>
    <TheFooter />
    <ShoppingCart :is-open="isCartOpen" @close="closeCart" />
  </div>
</template>

<script>
import { ref } from 'vue'
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'
import ShoppingCart from '@/components/ShoppingCart.vue'

export default {
  name: 'App',
  components: {
    TheNavbar,
    TheFooter,
    ShoppingCart,
  },

  setup() {
    const isCartOpen = ref(false)

    const openCart = () => {
      isCartOpen.value = true
    }

    const closeCart = () => {
      isCartOpen.value = false
    }

    return {
      isCartOpen,
      openCart,
      closeCart,
    }
  },
}
</script>

<style>
#app {
  max-width: 1200px;
  margin: 0 auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.container {
  padding: 0 20px;
}
</style>
