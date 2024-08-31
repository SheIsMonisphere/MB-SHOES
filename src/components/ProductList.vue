<!-- components/ProductList.vue -->
<template>
  <div class="product-list">
    <h2>Produits Populaires</h2>
    <div class="products">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
  name: 'ProductList',
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [
        {
          id: 1,
          name: 'Sneakers 1',
          price: 250,
          image: '/images/sneakers-1.jpg',
        },
        {
          id: 2,
          name: 'Sneakers 2',
          price: 150,
          image: '/images/sneakers-2.jpg',
        },
        {
          id: 3,
          name: 'Sneakers 3',
          price: 400,
          image: '/images/sneakers-3.jpg',
        },
        {
          id: 4,
          name: 'Sneakers 4',
          price: 157,
          image: '/images/sneakers-4.jpg',
        },
        {
          id: 5,
          name: 'Sneakers 5',
          price: 210,
          image: '/images/sneakers-5.jpg',
        },
        {
          id: 6,
          name: 'Sneakers 6',
          price: 145,
          image: '/images/sneakers-6.jpg',
        },
        {
          id: 7,
          name: 'Sneakers 7',
          price: 372,
          image: '/images/sneakers-7.jpg',
        },
        {
          id: 8,
          name: 'Sneakers 8',
          price: 180,
          image: '/images/sneakers-8.jpg',
        },
        {
          id: 9,
          name: 'Sneakers 9',
          price: 130,
          image: '/images/sneakers-9.jpg',
        },
        {
          id: 10,
          name: 'Sneakers 10',
          price: 170,
          image: '/images/sneakers-10.jpg',
        },
        {
          id: 11,
          name: 'Sneakers 11',
          price: 820,
          image: '/images/sneakers-11.jpg',
        },
        {
          id: 12,
          name: 'Sneakers 12',
          price: 19,
          image: '/images/sneakers-12.jpg',
        },
      ],
    }
  },
}
</script>

<style scoped>
.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 1rem;
  text-align: center;
}

.product-card img {
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.price {
  font-weight: bold;
  margin-bottom: 1rem;
}

.buttons {
  display: flex;
  flex-direction: column;
}

.btn {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.add-to-cart {
  background-color: #4caf50;
  color: white;
}

.view-product {
  background-color: #f1f1f1;
  color: #333;
}
.product-list {
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.products {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
/* Mobile */
@media (max-width: 767px) {
  .products {
    grid-template-columns: repeat(1, 1fr);
  }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  .products {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .products {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
