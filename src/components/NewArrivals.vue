<template>
  <div class="new-arrivals">
    <div class="new-arrivals-content">
      <h2>Nouveautés</h2>
      <p>
        Découvrez notre dernière collection, où style et confort se rencontrent.
        Nos nouvelles arrivées allient design innovant et technologies de pointe
        pour vous offrir des chaussures qui subliment votre allure tout en
        prenant soin de vos pieds. Que ce soit pour le sport, le quotidien ou
        les occasions spéciales, trouvez la paire parfaite qui vous accompagnera
        à chaque pas.
      </p>
      <router-link to="/catalog" class="view-collection"
        >Voir la collection</router-link
      >
    </div>
    <div class="new-arrivals-slider">
      <button class="slider-button prev" @click="prevSlide">&lt;</button>
      <transition-group name="fade" tag="div" class="slider-container">
        <div
          v-for="(shoe, index) in shoes"
          :key="shoe.id"
          v-show="currentIndex === index"
          class="shoe-slide"
        >
          <img :src="shoe.image" :alt="shoe.name" />
        </div>
      </transition-group>
      <button class="slider-button next" @click="nextSlide">&gt;</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewArrivals',
  data() {
    return {
      currentIndex: 0,
      shoes: [
        {
          id: 1,
          name: 'Nike Air Zoom',
          image: '/images/sneakers-1.jpg',
        },
        {
          id: 2,
          name: 'Adidas Ultraboost',
          image: '/images/sneakers-2.jpg',
        },
        { id: 3, name: 'Puma RS-X', image: '/images/sneakers-3.jpg' },
      ],
    }
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.shoes.length
    },
    prevSlide() {
      this.currentIndex =
        (this.currentIndex - 1 + this.shoes.length) % this.shoes.length
    },
  },
}
</script>

<style scoped>
.new-arrivals {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
}

.new-arrivals-content {
  flex: 1;
  padding-right: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  font-size: 2rem;
  color: #4caf50;
  margin-bottom: 1rem;
  transition: color 0.3s;
}

h2:hover {
  color: #45a049;
}

p {
  color: #333;
  margin-bottom: 1rem;
}

.view-collection {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4caf50;
  color: #333;
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.3s;
}

.view-collection:hover {
  background-color: #333;
  color: #4caf50;
  transform: scale(1.05);
}

.new-arrivals-slider {
  flex: 1;
  position: relative;
}

.slider-container {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.shoe-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.shoe-slide img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s;
}

.shoe-slide:hover img {
  transform: scale(1.1);
}

.slider-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 1.5rem;
  padding: 10px 15px;
  cursor: pointer;
  z-index: 1;
  transition: background-color 0.3s;
}

.slider-button:hover {
  background: #4caf50;
  color: rgba(0, 0, 0, 0.5);
}

.slider-button.prev {
  left: 10px;
}

.slider-button.next {
  right: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
