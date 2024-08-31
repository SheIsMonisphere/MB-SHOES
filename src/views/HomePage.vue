<template>
  <div class="home">
    <!-- Bannière de héros -->
    <div class="hero-banner">
      <div class="hero-content">
        <h1>Bienvenue sur notre boutique en ligne</h1>
        <p>Découvrez notre collection de chaussures tendance</p>
        <router-link to="/catalog" class="cta-button">Produits</router-link>
      </div>
    </div>

    <!-- New Arrivals -->
    <NewArrivals />

    <!-- À propos de nous -->
    <AboutUs />
  </div>
</template>

<script>
import NewArrivals from '@/components/NewArrivals.vue'
import AboutUs from '@/components/AboutUs.vue'

export default {
  name: 'HomePage',
  components: {
    NewArrivals,
    AboutUs,
  },
}
</script>

<style scoped>
.hero-banner {
  background-image: url('@/assets/icons/hero-banner.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 0;
  padding-top: 56.25%; /* Pour un ratio 16:9. Utilisez 75% pour un ratio 4:3 */
  position: relative;
  margin-bottom: 2rem;
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  padding: 2rem;
  border-radius: 5px;
  text-align: center;
  color: white;
  width: 80%;
  max-width: 600px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cta-button {
  display: inline-block;
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
  border-radius: 5px;
}

.cta-button:hover {
  background-color: #45a049;
}

.about-us {
  margin-top: 2rem;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.about-us h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .hero-content {
    padding: 1.5rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  p {
    font-size: 0.875rem;
  }
}
</style>
