<template>
  <div class="about-us">
    <div class="about-content">
      <h2 class="title">À PROPOS DE MB'SHOES</h2>
      <h3>Votre Destination Ultime pour des Chaussures Stylées</h3>
      <p>
        Chez MB'shoes, nous sommes passionnés par les chaussures et nous nous
        efforçons de vous offrir les meilleures marques et styles. Notre mission
        est de fournir des chaussures de qualité à des prix abordables, tout en
        offrant un service client exceptionnel.
      </p>
      <p>
        Depuis notre création, nous avons aidé des milliers de clients à trouver
        la paire parfaite qui non seulement complète leur style, mais améliore
        aussi leur confort au quotidien.
      </p>
      <div class="sales-counter-container">
        <div class="sales-counter">
          <div class="counter-display">
            <div class="counter-section">
              <div
                class="flip-card"
                v-for="digit in formattedSalesCount"
                :key="digit"
              >
                <div class="flip-card-inner">
                  <div class="flip-card-front">{{ digit }}</div>
                </div>
              </div>
            </div>
            <div class="counter-label">CHAUSSURES VENDUES</div>
          </div>
        </div>
        <router-link to="/catalog" class="catalogue-button"
          >Voir nos chaussures</router-link
        >
      </div>
    </div>
    <div class="illustration"></div>
    <div class="contact-button-container">
      <router-link to="/contact" class="contact-button"
        >Contactez-nous</router-link
      >
    </div>
    <div class="brand-carousel">
      <div class="carousel-track">
        <div v-for="brand in loopedBrands" :key="brand.id" class="brand-item">
          {{ brand.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',
  data() {
    return {
      brands: ['Puma', 'Nike', 'Adidas', 'New Balance', 'Vans', 'Asics'],
      salesCount: 15017,
      currentMonth: '',
      currentDay: '',
    }
  },
  computed: {
    loopedBrands() {
      return [...this.brands, ...this.brands, ...this.brands].map(
        (name, index) => ({
          id: `${name}-${index}`,
          name,
        })
      )
    },
    formattedSalesCount() {
      return this.salesCount.toString().padStart(6, '0').split('')
    },
  },
  mounted() {
    this.updateDate()
    setInterval(this.updateDate, 1000)
    setInterval(this.incrementSales, 5000)
  },
  methods: {
    updateDate() {
      const now = new Date()
      this.currentMonth = now.toLocaleString('default', { month: 'long' })
      this.currentDay = now.getDate()
    },
    incrementSales() {
      this.salesCount += Math.floor(Math.random() * 5) + 1
    },
  },
}
</script>

<style scoped>
.about-us {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 5px;
  text-align: center;
}

.about-content {
  max-width: 800px;
  margin-bottom: 2rem;
}

.title {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: #333;
  transition: color 0.3s ease;
}

.title:hover {
  color: #4caf50;
}

h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #4caf50;
}

p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.sales-counter-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 2rem 0;
}

.sales-counter {
  display: flex;
  justify-content: center;
}

.counter-display {
  background-color: #333;
  padding: 1rem;
  border-radius: 8px;
}

.counter-section {
  display: flex;
}

.flip-card {
  background-color: #000;
  color: #fff;
  font-size: 2.5rem;
  font-weight: bold;
  width: 40px;
  height: 60px;
  margin: 0 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.flip-card::before,
.flip-card::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
}

.flip-card::before {
  top: 50%;
}

.flip-card::after {
  bottom: 0;
}

.counter-label {
  text-align: center;
  color: #fff;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}

.catalogue-button,
.contact-button {
  display: inline-block;
  padding: 12px 24px;
  background-color: #1b1b1b;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  transition: all 0.3s ease;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.catalogue-button:hover,
.contact-button:hover {
  background-color: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.illustration {
  background-image: url('@/assets/icons/hero-banner.1.jpg');
  width: 100%;
  height: 350px;
  background-color: #e0e0e0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;
  margin: 2rem 0;
}

.contact-button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.brand-carousel {
  width: 100%;
  overflow: hidden;
  margin-top: 2rem;
}

.carousel-track {
  display: flex;
  animation: scroll 30s linear infinite;
}

.brand-item {
  flex: 0 0 auto;
  padding: 0 20px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% / 3));
  }
}
</style>
