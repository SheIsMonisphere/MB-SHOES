<template>
  <div class="product-card">
    <div class="favorite-icon">
      <img src="@/assets/icons/heart.svg" alt="Favorite" />
    </div>
    <img :src="product.image" :alt="product.name" class="product-image" />
    <h3>{{ product.name }}</h3>
    <p class="price">{{ product.price }} €</p>
    <div class="buttons">
      <button @click="handleChooseSize" class="choose-size">
        Choisir la taille
      </button>
      <button class="view-product">Voir le produit</button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['choose-size'])

const handleChooseSize = () => {
  emit('choose-size', props.product)
}
</script>

<style scoped>
.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  transition: box-shadow 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.price {
  font-weight: bold;
  color: #4caf50;
  margin-bottom: 1rem;
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

.add-to-cart {
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
</style>
