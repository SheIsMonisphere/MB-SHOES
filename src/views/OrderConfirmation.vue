<template>
  <div class="order-confirmation">
    <div class="confirmation-content">
      <img src="@/assets/Logo.2.png" alt="Logo" class="logo" />
      <div class="check-icon">✓</div>
      <h2>Merci pour votre achat !</h2>
      <p>Votre commande a été effectuée avec succès.</p>
      <p>Numéro de commande : {{ orderNumber }}</p>
      <p>Vous recevrez un email dès que le colis sera envoyé.</p>
      <div class="order-details">
        <h3>Détails de la commande</h3>
        <div v-for="item in orderItems" :key="item.id" class="order-item">
          <span>{{ item.name }}</span>
          <span>{{ formatPrice(item.price) }} €</span>
        </div>
        <div class="order-total">
          <span>Total</span>
          <span>{{ formatPrice(orderTotal) }} €</span>
        </div>
      </div>
      <button @click="goToHome" class="home-button">Retour à l'accueil</button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const orderNumber = ref('')
const orderItems = ref([])
const orderTotal = ref(0)

onMounted(() => {
  // Get the order details from the Vuex store
  const orderDetails = store.state.orderDetails
  orderNumber.value = orderDetails.orderNumber
  orderItems.value = orderDetails.orderItems
  orderTotal.value = orderDetails.orderTotal
})

const goToHome = async () => {
  // Clear the cart before navigating to the home page
  await store.dispatch('clearCart')
  router.push('/').then(() => {
    // Ensure the page is scrolled to the top after navigation
    window.scrollTo(0, 0)
  })
}

const formatPrice = (price) => price.toFixed(2)
</script>

<style scoped>
.order-confirmation {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f4;
  font-family: Arial, sans-serif;
}

.confirmation-content {
  text-align: center;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.logo {
  max-width: 150px;
  margin-bottom: 20px;
}

.check-icon {
  font-size: 48px;
  color: #4caf50;
  margin-bottom: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #333;
}

p {
  font-size: 16px;
  margin-bottom: 10px;
  color: #666;
}

.order-details {
  margin-top: 30px;
  text-align: left;
}

.order-item,
.order-total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.order-total {
  font-weight: bold;
  margin-top: 10px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

.home-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 30px;
  transition: background-color 0.3s;
}

.home-button:hover {
  background-color: #45a049;
}
</style>
