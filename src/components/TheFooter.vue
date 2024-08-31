<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>SUIVEZ-NOUS</h3>
        <div class="social-icons">
          <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
      <div class="footer-section">
        <h3>NOUS CONTACTER</h3>
        <p>contact@mbshoes.com</p>
        <p class="address" @click="showMap">15 Rue des Souliers, 75001 Paris</p>
        <p>MB'Shoes</p>
        <p>+33 1 23 45 67 89</p>
      </div>
      <div class="footer-section">
        <h3>NEWSLETTER</h3>
        <p>
          Restez à la pointe de la mode ! Inscrivez-vous pour des offres
          exclusives.
        </p>
        <div class="email-input">
          <input type="email" placeholder="Votre email" v-model="email" />
          <button @click="subscribe">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
        <p v-if="showMessage" :class="['message', messageType]">
          {{ message }}
        </p>
      </div>
      <div class="footer-section logo-section">
        <div class="rotating-logo-container" @click="scrollToTop">
          <img
            src="@/assets/Logo.2.png"
            alt="MB's Shoes"
            class="footer-logo rotating-logo"
          />
        </div>
      </div>
    </div>
    <div class="copyright">© 2023 MB's Shoes. Tous droits réservés</div>

    <!-- Modal pour la carte -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <h2>Notre boutique MB'Shoes</h2>
        <p>15 Rue des Souliers, 75001 Paris</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.3414926156740714!3d48.86069007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sRue%20de%20Rivoli%2C%2075001%20Paris%2C%20France!5e0!3m2!1sen!2s!4v1629902721782!5m2!1sen!2s"
          width="100%"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
        >
        </iframe>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  data() {
    return {
      email: '',
      showModal: false,
      showMessage: false,
      message: '',
      messageType: '',
    }
  },
  methods: {
    subscribe() {
      if (this.validateEmail(this.email)) {
        this.message = 'Merci pour votre inscription !'
        this.messageType = 'success'
        this.email = ''
      } else {
        this.message = 'Veuillez entrer une adresse email valide.'
        this.messageType = 'error'
      }
      this.showMessage = true
      setTimeout(() => {
        this.showMessage = false
      }, 5000)
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
    showMap() {
      this.showModal = true
    },
    validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
  },
}
</script>

<style scoped>
.footer {
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  font-size: 14px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-section {
  flex: 1;
  margin-right: 20px;
}

.footer-section:last-child {
  margin-right: 0;
}

h3 {
  color: #4caf50;
  margin-bottom: 10px;
  font-size: 16px;
  transition: color 0.3s ease;
}

h3:hover {
  color: #fff;
}

p {
  transition: color 0.3s ease;
}

p:hover {
  color: #4caf50;
}

.address {
  cursor: pointer;
  text-decoration: underline;
}

.social-icons {
  display: flex;
  gap: 10px;
}

.social-icon {
  color: #fff;
  font-size: 18px;
  transition: color 0.3s ease, transform 0.3s ease;
}

.social-icon:hover {
  color: #4caf50;
  transform: translateY(-3px);
}

.email-input {
  display: flex;
  margin-top: 10px;
}

.email-input input {
  flex-grow: 1;
  padding: 5px;
  border: none;
  transition: background-color 0.3s ease;
}

.email-input input:hover,
.email-input input:focus {
  background-color: #f0f0f0;
}

.email-input button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.email-input button:hover {
  background-color: #45a049;
}

.message {
  margin-top: 10px;
  padding: 5px;
  border-radius: 4px;
  font-size: 12px;
}

.success {
  background-color: #d4edda;
  color: #155724;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
}

.logo-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.rotating-logo-container {
  width: 120px;
  height: 120px;
  overflow: hidden;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.rotating-logo-container:hover {
  transform: scale(1.1);
}

.footer-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes rotate360 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.rotating-logo {
  animation: rotate360 10s linear infinite;
}

.copyright {
  text-align: center;
  margin-top: 20px;
  font-size: 12px;
  color: #888;
  transition: color 0.3s ease;
}

.copyright:hover {
  color: #fff;
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
  color: #333;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
