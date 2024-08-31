<template>
  <div class="contact-page">
    <div class="contact-content">
      <div class="contact-form">
        <h1>CONTACTEZ-NOUS</h1>
        <p>
          Nous sommes toujours là pour vous aider à trouver la chaussure
          parfaite :)
        </p>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <input
              type="text"
              id="name"
              v-model="name"
              placeholder="Nom"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Email"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="tel"
              id="phone"
              v-model="phone"
              placeholder="Téléphone"
              required
            />
          </div>
          <div class="form-group">
            <textarea
              id="message"
              v-model="message"
              placeholder="Votre message..."
              required
            ></textarea>
          </div>
          <button type="submit">Envoyer</button>
        </form>
        <div class="contact-info">
          <button @click="callUs" class="support-button">
            <i class="fas fa-phone"></i>
            <span class="button-text">Appelez-nous</span>
          </button>
        </div>
        <div class="logo-container">
          <img
            src="@/assets/Logo.2.png"
            alt="Logo"
            class="rotating-logo"
            @click="throwConfetti"
          />
        </div>
        <div v-if="showSuccessMessage" class="message success-message">
          Votre message a été envoyé. Nous vous répondrons dans les plus brefs
          délais.
        </div>
        <div v-if="showErrorMessage" class="message error-message">
          {{ errorMessage }}
        </div>
      </div>
      <div class="map-container">
        <div class="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.3414926156740714!3d48.86069007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2s15%20Rue%20des%20Souliers%2C%2075001%20Paris%2C%20France!5e0!3m2!1sen!2s!4v1629902721782!5m2!1sen!2s"
            width="100%"
            height="100%"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div class="opening-hours">
          <h3>Horaires d'ouverture</h3>
          <div class="hours-grid">
            <div
              class="hour-box"
              @mouseover="showRemainingTime('weekday')"
              @mouseleave="hideRemainingTime"
            >
              <div>Lundi - Vendredi</div>
              <div>9h00 - 18h00</div>
              <div v-if="showWeekdayRemaining" class="remaining-time">
                {{ weekdayRemaining }}
              </div>
            </div>
            <div
              class="hour-box"
              @mouseover="showRemainingTime('saturday')"
              @mouseleave="hideRemainingTime"
            >
              <div>Samedi</div>
              <div>10h00 - 16h00</div>
              <div v-if="showSaturdayRemaining" class="remaining-time">
                {{ saturdayRemaining }}
              </div>
            </div>
            <div
              class="hour-box"
              @mouseover="showRemainingTime('sunday')"
              @mouseleave="hideRemainingTime"
            >
              <div>Dimanche</div>
              <div>Fermé</div>
              <div v-if="showSundayRemaining" class="remaining-time">
                {{ sundayRemaining }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import confetti from 'canvas-confetti'

export default {
  name: 'ContactPage',
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      message: '',
      showWeekdayRemaining: false,
      showSaturdayRemaining: false,
      showSundayRemaining: false,
      weekdayRemaining: '',
      saturdayRemaining: '',
      sundayRemaining: '',
      showSuccessMessage: false,
      showErrorMessage: false,
      errorMessage: '',
    }
  },
  methods: {
    submitForm() {
      if (this.validateForm()) {
        this.showSuccessMessage = true
        this.resetForm()
        setTimeout(() => {
          this.showSuccessMessage = false
        }, 5000)
      }
    },
    validateForm() {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      const phoneRegex = /^[0-9]{10}$/

      if (!emailRegex.test(this.email)) {
        this.showError('Veuillez entrer une adresse email valide.')
        return false
      }
      if (!phoneRegex.test(this.phone)) {
        this.showError(
          'Veuillez entrer un numéro de téléphone valide (10 chiffres).'
        )
        return false
      }
      return true
    },
    showError(message) {
      this.errorMessage = message
      this.showErrorMessage = true
      setTimeout(() => {
        this.showErrorMessage = false
      }, 5000)
    },
    resetForm() {
      this.name = ''
      this.email = ''
      this.phone = ''
      this.message = ''
    },
    callUs() {
      window.location.href = 'tel:0489709483'
    },
    showRemainingTime(day) {
      const now = new Date()
      const currentDay = now.getDay()
      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()

      if (day === 'weekday') {
        if (currentDay >= 1 && currentDay <= 5) {
          if (currentHour < 9) {
            this.weekdayRemaining =
              'Le magasin ouvre dans ' +
              this.formatTime(9 - currentHour, 60 - currentMinute)
          } else if (currentHour < 18) {
            this.weekdayRemaining =
              'Il reste ' +
              this.formatTime(17 - currentHour, 60 - currentMinute) +
              ' avant la fermeture'
          } else {
            this.weekdayRemaining =
              'Le magasin est fermé. Ouverture demain à 9h00'
          }
        } else {
          const daysUntilMonday = (8 - currentDay) % 7
          this.weekdayRemaining = `Ouverture dans ${daysUntilMonday} jour${
            daysUntilMonday > 1 ? 's' : ''
          }, le lundi à 9h00`
        }
        this.showWeekdayRemaining = true
      } else if (day === 'saturday') {
        if (currentDay === 6) {
          if (currentHour < 10) {
            this.saturdayRemaining =
              'Le magasin ouvre dans ' +
              this.formatTime(10 - currentHour, 60 - currentMinute)
          } else if (currentHour < 16) {
            this.saturdayRemaining =
              'Il reste ' +
              this.formatTime(15 - currentHour, 60 - currentMinute) +
              ' avant la fermeture'
          } else {
            this.saturdayRemaining =
              'Le magasin est fermé. Ouverture lundi à 9h00'
          }
        } else {
          const daysUntilSaturday = (6 - currentDay + 7) % 7
          this.saturdayRemaining = `Ouverture dans ${daysUntilSaturday} jour${
            daysUntilSaturday > 1 ? 's' : ''
          }`
        }
        this.showSaturdayRemaining = true
      } else if (day === 'sunday') {
        if (currentDay === 0) {
          this.sundayRemaining = 'Le magasin est fermé. Ouverture demain à 9h00'
        } else {
          const daysUntilMonday = (8 - currentDay) % 7
          this.sundayRemaining = `Fermé. Ouverture dans ${daysUntilMonday} jour${
            daysUntilMonday > 1 ? 's' : ''
          }, le lundi à 9h00`
        }
        this.showSundayRemaining = true
      }
    },
    hideRemainingTime() {
      this.showWeekdayRemaining = false
      this.showSaturdayRemaining = false
      this.showSundayRemaining = false
    },
    formatTime(hours, minutes) {
      return `${hours}h${minutes.toString().padStart(2, '0')}`
    },
    throwConfetti() {
      const shoeEmojis = ['👟', '👞', '👠', '👡', '🥾', '🥿']
      const end = Date.now() + 3 * 1000 // durée de 3 secondes

      const confettiInterval = setInterval(() => {
        if (Date.now() > end) {
          clearInterval(confettiInterval)
          return
        }

        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          shapes: ['circle'],
          scalar: 2,
          emojis: shoeEmojis,
        })
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          shapes: ['circle'],
          scalar: 2,
          emojis: shoeEmojis,
        })
      }, 50)
    },
  },
}
</script>

<style scoped>
.contact-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  font-family: Arial, sans-serif;
  min-height: calc(100vh - 60px); /* Ajustez également ici */
}

.contact-content {
  display: flex;
  width: 100%;
  height: 100vh;
  max-width: 1200px;
  background-color: #ffffff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.contact-form {
  flex: 1;
  padding: 2rem;
  background-color: #333333;
  color: #ffffff;
  text-align: center;
  overflow-y: auto;
}

.contact-form h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  transition: color 0.3s;
}

.contact-form h1:hover {
  color: #4caf50;
}

.contact-form p {
  margin-bottom: 1.5rem;
  color: #cccccc;
}

.form-group {
  margin-bottom: 1rem;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem;
  background-color: #444444;
  border: none;
  border-radius: 4px;
  color: #ffffff;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

.contact-info {
  margin-top: 1.5rem;
}

.support-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #050101;
  color: #45a049;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.support-button:hover {
  background-color: #45a049;
  color: #3333339f;
  transform: scale(1.05);
}

.support-button i {
  margin-right: 10px;
}

.logo-container {
  margin-top: 2rem;
}

.rotating-logo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  animation: rotate 10s linear infinite;
  object-fit: cover;
  transition: transform 0.3s;
}

.rotating-logo:hover {
  transform: scale(1.2);
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.message {
  margin-top: 1rem;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
}

.success-message {
  background-color: #4caf50;
  color: white;
}

.error-message {
  background-color: #f44336;
  color: white;
}

.map-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

.map {
  flex: 1;
  min-height: 300px;
}

.opening-hours {
  padding: 2rem;
  background-color: #4caf50;
  text-align: center;
}

.opening-hours h3 {
  margin-bottom: 1rem;
  color: #ffffff;
}

.hours-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hour-box {
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: all 0.3s ease;
}

.hour-box:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.remaining-time {
  position: absolute;
  top: 0;
  right: -200px;
  background-color: #444444;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  white-space: nowrap;
  transition: opacity 0.3s ease;
}

@media (max-width: 768px) {
  .contact-content {
    flex-direction: column;
    height: auto;
  }

  .map-container {
    min-height: 50vh;
  }
}
</style>
