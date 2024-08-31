<template>
  <div class="size-selector-overlay">
    <div class="size-selector">
      <h3>Choisir une nouvelle taille</h3>
      <div class="size-grid">
        <button
          v-for="size in sizes"
          :key="size"
          @click="selectSize(size)"
          :class="{ active: selectedSize === size }"
        >
          {{ size }}
        </button>
      </div>
      <p>Taille sélectionnée : {{ selectedSize || 'Aucune' }}</p>
      <div class="action-buttons">
        <button @click="confirm" class="confirm">Ajouter</button>
        <button @click="$emit('close')" class="cancel">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'SizeSelector',
  props: ['sizes'],
  emits: ['select-size', 'close'],
  setup(props, { emit }) {
    const selectedSize = ref(null)

    const selectSize = (size) => {
      selectedSize.value = size
    }

    const confirm = () => {
      if (selectedSize.value) {
        emit('select-size', selectedSize.value)
      }
    }

    return { selectedSize, selectSize, confirm }
  },
}
</script>

<style scoped>
.size-selector-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.size-selector {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

h3 {
  margin-top: 0;
  margin-bottom: 15px;
}

.size-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-bottom: 15px;
}

.size-grid button {
  padding: 10px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
}

.size-grid button.active {
  background-color: #4caf50;
  color: white;
  border-color: #4caf50;
}

p {
  margin-bottom: 15px;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
}

.action-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.confirm {
  background-color: #4caf50;
  color: white;
}

.cancel {
  background-color: #f1f1f1;
  color: #333;
}
</style>
