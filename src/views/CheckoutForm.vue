<template>
  <div class="checkout-container">
    <h1 class="checkout-title">PAIEMENT</h1>

    <div class="order-summary">
      <h2>{{ cart.length }} ARTICLE{{ cart.length > 1 ? 'S' : '' }}</h2>
      <div
        v-for="item in cart"
        :key="`${item.id}-${item.size}`"
        class="order-item"
      >
        <img :src="item.img" :alt="item.title" class="product-image" />
        <div class="item-details">
          <p class="item-price">{{ formatPrice(item.price) }} €</p>
          <h3 class="item-name">{{ item.title }}</h3>
          <p class="item-size">Taille : {{ item.size }}</p>
          <p class="item-qty">Qté : {{ item.quantity }}</p>
        </div>
      </div>
      <div class="order-total">
        <p>Sous-total : {{ formatPrice(cartTotal) }} €</p>
        <p class="delivery-info">Livraison : Gratuite</p>
        <h3>TOTAL À PAYER : {{ formatPrice(cartTotal) }} €</h3>
      </div>
    </div>

    <div class="customer-info">
      <h2>Informations Client</h2>
      <form @submit.prevent="finalizeOrder">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>

        <h3>Adresse de Livraison</h3>
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">Prénom</label>
            <input type="text" id="firstName" v-model="firstName" required />
          </div>
          <div class="form-group">
            <label for="lastName">Nom</label>
            <input type="text" id="lastName" v-model="lastName" required />
          </div>
        </div>
        <div class="form-group">
          <label for="address">Adresse</label>
          <input type="text" id="address" v-model="address" required />
        </div>
        <div class="form-group">
          <label for="city">Ville</label>
          <input type="text" id="city" v-model="city" required />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="country">Pays</label>
            <input type="text" id="country" v-model="country" required />
          </div>
          <div class="form-group">
            <label for="state">État/Province</label>
            <input type="text" id="state" v-model="state" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="zip">Code Postal</label>
            <input type="text" id="zip" v-model="zip" required />
          </div>
          <div class="form-group">
            <label for="phone">Téléphone</label>
            <input type="tel" id="phone" v-model="phone" required />
          </div>
        </div>

        <div class="payment-method">
          <h2>Choisissez votre mode de paiement</h2>
          <div class="payment-options">
            <label class="payment-option">
              <input type="radio" v-model="paymentMethod" value="paypal" />
              <span class="payment-logo paypal">PayPal</span>
              <span class="payment-description">
                Paiement sécurisé en ligne. Carte de crédit nécessaire. Compte
                PayPal non requis.
              </span>
            </label>
            <label class="payment-option">
              <input type="radio" v-model="paymentMethod" value="credit-card" />
              <span class="payment-logo credit-card">
                <img
                  src="@/assets/icons/carte.png"
                  alt="Cartes de Crédit"
                  class="credit-card-image"
                />
              </span>
              <span class="payment-description">
                Transfert d'argent sécurisé avec votre compte bancaire. Carte de
                crédit nécessaire. Visa, Maestro, Discover, American Express.
              </span>
            </label>
          </div>

          <div v-if="paymentMethod === 'credit-card'" class="credit-card-form">
            <div class="form-group">
              <label for="cardNumber">Numéro de Carte de Crédit</label>
              <input
                type="text"
                id="cardNumber"
                v-model="cardNumber"
                required
              />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="expiryMonth">Date d'expiration</label>
                <div class="expiry-inputs">
                  <select id="expiryMonth" v-model="expiryMonth" required>
                    <option value="">Mois</option>
                    <option
                      v-for="month in 12"
                      :key="month"
                      :value="String(month).padStart(2, '0')"
                    >
                      {{ String(month).padStart(2, '0') }}
                    </option>
                  </select>
                  <select id="expiryYear" v-model="expiryYear" required>
                    <option value="">Année</option>
                    <option
                      v-for="year in 10"
                      :key="year"
                      :value="currentYear + year"
                    >
                      {{ currentYear + year }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="cvv">Code CVV</label>
                <input type="text" id="cvv" v-model="cvv" required />
              </div>
            </div>
            <div class="form-group">
              <label for="nameOnCard">Nom sur la Carte</label>
              <input
                type="text"
                id="nameOnCard"
                v-model="nameOnCard"
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" class="submit-button">Finaliser l'Achat</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'CheckoutForm',
  setup() {
    const store = useStore()
    const router = useRouter()

    const cart = computed(() => store.state.cart)
    const cartTotal = computed(() => store.getters.cartTotal)

    const email = ref('')
    const firstName = ref('')
    const lastName = ref('')
    const address = ref('')
    const city = ref('')
    const country = ref('')
    const state = ref('')
    const zip = ref('')
    const phone = ref('')
    const paymentMethod = ref('paypal')
    const cardNumber = ref('')
    const expiryMonth = ref('')
    const expiryYear = ref('')
    const cvv = ref('')
    const nameOnCard = ref('')

    const currentYear = new Date().getFullYear()

    const formatPrice = (price) => price.toFixed(2)

    const finalizeOrder = () => {
      // Store the order details in the Vuex store
      store.commit('setOrderDetails', {
        orderNumber: `ORD-${Math.random()
          .toString(36)
          .substr(2, 9)
          .toUpperCase()}`,
        orderItems: cart.value,
        orderTotal: cartTotal.value,
      })

      // Clear the cart
      store.commit('clearCart')

      // Redirect to the order confirmation page
      router.push('/order-confirmation')
    }

    return {
      cart,
      cartTotal,
      email,
      firstName,
      lastName,
      address,
      city,
      country,
      state,
      zip,
      phone,
      paymentMethod,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
      nameOnCard,
      currentYear,
      formatPrice,
      finalizeOrder,
    }
  },
}
</script>

<style scoped>
.checkout-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.checkout-title {
  font-size: 24px;
  color: #2d2d2d;
  margin-bottom: 20px;
}

.order-summary {
  background-color: #f8f8f8;
  padding: 20px;
  margin-bottom: 30px;
}

.order-item {
  display: flex;
  margin-bottom: 20px;
}

.product-image {
  width: 100px;
  height: 120px;
  object-fit: cover;
  margin-right: 20px;
}

.product-details {
  flex: 1;
}

.product-price {
  font-weight: bold;
  margin: 0 0 5px 0;
}

.product-name {
  font-size: 16px;
  margin: 0 0 5px 0;
}

.product-size,
.product-quantity {
  font-size: 14px;
  color: #666;
  margin: 0 0 5px 0;
}

.order-total {
  border-top: 1px solid #ddd;
  padding-top: 20px;
}

.subtotal,
.shipping {
  margin-bottom: 10px;
}

.total {
  font-weight: bold;
  font-size: 18px;
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type='text'],
input[type='email'],
input[type='tel'],
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.payment-option {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.payment-logo {
  margin-right: 15px;
  width: 60px;
}

.credit-card-image {
  width: 100%;
  height: auto;
}

.payment-description {
  font-size: 14px;
  color: #666;
}

.credit-card-form {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.submit-button {
  margin-top: 20px;
  padding: 12px 24px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>
