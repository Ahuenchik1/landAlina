<template>
  <section class="contact-form" id="contacts" ref="contactSection">
    <div class="container contact-form__container">
      <h2 class="contact-form__title"><span class="hightlighter">Еще вопросы?</span> Оставьте заявку и я проконсультирую вас</h2>
      
      <div class="contact-form__content">
        <!-- Левая колонка с формой -->
        <div class="contact-form__form-wrapper">
          <form class="contact-form__form" @submit.prevent="submitForm">
            <div class="contact-form__form-group">
              <label for="name" class="contact-form__label">Ваше имя *</label>
              <input 
                type="text" 
                id="name" 
                v-model="formData.name" 
                class="contact-form__input"
                :class="{ 'contact-form__input--error': errors.name }"
                required
              >
              <span v-if="errors.name" class="contact-form__error">{{ errors.name }}</span>
            </div>

            <div class="contact-form__form-group">
              <label for="phone" class="contact-form__label">Ваш телефон *</label>
              <div class="contact-form__phone-input">
                <select 
                  v-model="formData.countryCode" 
                  class="contact-form__country-code"
                >
                  <option value="+7">+7</option>
                  <option value="+375">+375</option>
                  <option value="+380">+380</option>
                  <option value="+48">+48</option>
                  <option value="+49">+49</option>
                  <option value="+44">+44</option>
                  <option value="+33">+33</option>
                  <option value="+39">+39</option>
                  <option value="+34">+34</option>
                  <option value="+31">+31</option>
                  <option value="+46">+46</option>
                  <option value="+47">+47</option>
                  <option value="+45">+45</option>
                  <option value="+358">+358</option>
                  <option value="+372">+372</option>
                  <option value="+371">+371</option>
                  <option value="+370">+370</option>
                  <option value="+371">+371</option>
                  <option value="+372">+372</option>
                  <option value="+90">+90</option>
                  <option value="+86">+86</option>
                  <option value="+81">+81</option>
                  <option value="+82">+82</option>
                  <option value="+65">+65</option>
                  <option value="+60">+60</option>
                  <option value="+66">+66</option>
                  <option value="+84">+84</option>
                  <option value="+62">+62</option>
                  <option value="+63">+63</option>
                  <option value="+64">+64</option>
                  <option value="+61">+61</option>
                  <option value="+1">+1</option>
                </select>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="formData.phone" 
                  class="contact-form__input contact-form__input--phone"
                  :class="{ 'contact-form__input--error': errors.phone }"
                  required
                  placeholder="(999) 999-99-99"
                >
              </div>
              <span v-if="errors.phone" class="contact-form__error">{{ errors.phone }}</span>
            </div>

            <div class="contact-form__form-group">
              <label for="email" class="contact-form__label">Ваш email {{ formData.contactMethod === 'email' ? '*' : '(необязательно)' }}</label>
              <input 
                type="email" 
                id="email" 
                v-model="formData.email" 
                class="contact-form__input"
                :class="{ 'contact-form__input--error': errors.email }"
                :required="formData.contactMethod === 'email'"
              >
              <span v-if="errors.email" class="contact-form__error">{{ errors.email }}</span>
            </div>

            <div class="contact-form__form-group">
              <label for="message" class="contact-form__label">Ваше сообщение (необязательно)</label>
              <textarea 
                id="message" 
                v-model="formData.message" 
                class="contact-form__textarea"
                :class="{ 'contact-form__textarea--error': errors.message }"
              ></textarea>
              <span v-if="errors.message" class="contact-form__error">{{ errors.message }}</span>
            </div>

            <div class="contact-form__contact-methods">
              <h3 class="contact-form__contact-title">Способ связи</h3>
              <div class="contact-form__contact-buttons">
                <button 
                  type="button"
                  class="contact-form__contact-btn"
                  :class="{ 'contact-form__contact-btn--active': formData.contactMethod === 'telegram' }"
                  @click="formData.contactMethod = 'telegram'"
                >
                  <img src="../assets/telegram.svg" alt="Telegram">
                  Telegram
                </button>
                <button 
                  type="button"
                  class="contact-form__contact-btn"
                  :class="{ 'contact-form__contact-btn--active': formData.contactMethod === 'whatsapp' }"
                  @click="formData.contactMethod = 'whatsapp'"
                >
                  <img src="../assets/whatsapp.svg" alt="WhatsApp">
                  WhatsApp
                </button>
                <button 
                  type="button"
                  class="contact-form__contact-btn"
                  :class="{ 'contact-form__contact-btn--active': formData.contactMethod === 'email' }"
                  @click="formData.contactMethod = 'email'"
                >
                  <img src="../assets/email.svg" alt="Email">
                  Email
                </button>
              </div>
            </div>

            <button type="submit" class="contact-form__submit">Отправить</button>
          </form>
        </div>

        <!-- Правая колонка с контактами -->
        <div class="contact-form__info">
          <div class="contact-form__info-item">
            <h3 class="contact-form__info-title">Email</h3>
            <a href="mailto:arhipovandq@yandex.ru" class="contact-form__info-link">arhipovandq@yandex.ru</a>
          </div>

          <div class="contact-form__info-item">
            <h3 class="contact-form__info-title">Адрес</h3>
            <p class="contact-form__info-text">г. Москва, ул. Примерная, д. 123</p>
          </div>

          <div class="contact-form__info-item">
            <h3 class="contact-form__info-title">ИНН</h3>
            <p class="contact-form__info-text">123456789012</p>
          </div>

          <div class="contact-form__info-item">
            <h3 class="contact-form__info-title">ИКН</h3>
            <p class="contact-form__info-text">987654321098</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const contactSection = ref(null)
const formData = ref({
  name: '',
  phone: '',
  email: '',
  message: '',
  countryCode: '+7',
  contactMethod: 'telegram'
})
const errors = ref({
  name: '',
  phone: '',
  email: '',
  message: ''
})

// Валидация формы
const validateForm = () => {
  errors.value = {
    name: '',
    phone: '',
    email: '',
    message: ''
  }

  let isValid = true

  if (!formData.value.name.trim()) {
    errors.value.name = 'Введите ваше имя'
    isValid = false
  }

  const phoneRegex = /^\+?[7-8]?[0-9]{10}$/
  const fullPhone = formData.value.countryCode + formData.value.phone.replace(/\D/g, '')
  if (!phoneRegex.test(fullPhone)) {
    errors.value.phone = 'Введите корректный номер телефона'
    isValid = false
  }

  if (formData.value.contactMethod === 'email' && !formData.value.email) {
    errors.value.email = 'Введите email для связи'
    isValid = false
  } else if (formData.value.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.value.email = 'Введите корректный email'
    isValid = false
  }

  return isValid
}

// Отправка формы
const submitForm = async () => {
  if (!validateForm()) return

  try {
    const submitButton = document.querySelector('.contact-form__submit')
    const originalText = submitButton.textContent
    submitButton.textContent = 'Отправка...'
    submitButton.disabled = true

    const formSubmitData = new FormData()
    formSubmitData.append('email', 'arhipovandq@yandex.ru')
    formSubmitData.append('subject', 'Новая заявка с формы обратной связи')
    
    let message = '🔥 Новая заявка с формы обратной связи!\n\n'
    message += '👤 Контактные данные:\n'
    message += `Имя: ${formData.value.name}\n`
    message += `Телефон: ${formData.value.countryCode}${formData.value.phone}\n`
    if (formData.value.email) {
      message += `Email: ${formData.value.email}\n`
    }
    message += `Способ связи: ${formData.value.contactMethod}\n`
    message += `\n💬 Сообщение:\n${formData.value.message}`
    
    formSubmitData.append('message', message)

    const response = await fetch('https://formsubmit.co/ajax/arhipovandq@yandex.ru', {
      method: 'POST',
      body: formSubmitData
    })

    if (!response.ok) {
      throw new Error('Ошибка отправки формы')
    }

    alert('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.')
    formData.value = {
      name: '',
      phone: '',
      email: '',
      message: '',
      countryCode: '+7',
      contactMethod: 'telegram'
    }

    submitButton.textContent = originalText
    submitButton.disabled = false
  } catch (error) {
    console.error('Ошибка при отправке:', error)
    alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами другим способом.')
    
    const submitButton = document.querySelector('.contact-form__submit')
    submitButton.textContent = 'Отправить'
    submitButton.disabled = false
  }
}

// Обработчик скролла для анимации исчезновения
const handleScroll = () => {
  if (!contactSection.value) return

  const rect = contactSection.value.getBoundingClientRect()
  const windowHeight = window.innerHeight

  const fadeStart = windowHeight * 0.5
  const fadeEnd = -windowHeight * 0.2

  let progress = 0
  if (rect.bottom < fadeStart) {
    progress = Math.min(1, (fadeStart - rect.bottom) / (fadeStart - fadeEnd))
  }

  const scale = 1 - (progress * 0.6)
  const translateY = progress * 50
  const opacity = 1 - progress

  contactSection.value.style.transform = `scale(${scale}) translateY(${translateY}px)`
  contactSection.value.style.opacity = opacity
}

// Анимация появления
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate')
      }
    })
  }, {
    threshold: 0.2
  })

  if (contactSection.value) {
    observer.observe(contactSection.value)
  }

  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.contact-form {
  padding: 8rem 0;
  background-color: var(--background-color);
  transform-origin: center center;
  will-change: transform, opacity;
  transition: transform 0.6s ease-out, opacity 0.6s ease-out;
  opacity: 0;
  transform: translateY(50px);
  position: relative;
  z-index: 1;
}

.contact-form__container {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.contact-form__title {
  font-size: 10rem;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1.1;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.hightlighter{
  color: var(--accent-color);
  font-size: 11rem;
}

.contact-form__content {
  display: flex;
  gap: 4rem;
}

.contact-form__form-wrapper,
.contact-form__info {
  flex: 1;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.contact-form__form-wrapper {
  transition-delay: 0.2s;
}

.contact-form__info {
  flex: 1;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition-delay: 0.4s;
}

.contact-form__form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-form__form-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-form__label {
  font-size: 2.4rem;
  color: var(--text-color);
}

.contact-form__input,
.contact-form__textarea {
  padding: 2rem;
  background-color: var(--secondary-color);
  border: none;
  border-radius: 35px;
  color: var(--text-color);
  font-size: 2.8rem;
  transition: all 0.3s ease;
}

.contact-form__textarea {
  min-height: 200px;
  resize: vertical;
}

.contact-form__input--error,
.contact-form__textarea--error {
  border: 2px solid #ff4444;
}

.contact-form__error {
  font-size: 2rem;
  color: #ff4444;
}

.contact-form__submit {
  padding: 2rem 4rem;
  background-color: var(--accent-color);
  border: none;
  border-radius: 35px;
  color: var(--background-color);
  font-size: 2.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;
  width: 100%;
}

.contact-form__submit:hover {
  transform: translateY(-2px);
}

.contact-form__submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.contact-form__info-item {
  margin-bottom: 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact-form__info-title {
  font-size: 4rem;
  color: var(--accent-color);
  margin-bottom: 1rem;
  text-align: center;
}

.contact-form__info-link,
.contact-form__info-text {
  font-size: 3rem;
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.3s ease;
  text-align: center;
}

.contact-form__info-link:hover {
  color: var(--accent-color);
}



/* Анимация появления */
.contact-form.animate {
  opacity: 1;
  transform: translateY(0);
}

.contact-form.animate .contact-form__title,
.contact-form.animate .contact-form__form-wrapper,
.contact-form.animate .contact-form__info {
  opacity: 1;
  transform: translateY(0);
}

.contact-form__phone-input {
  display: flex;
  gap: 1rem;
}

.contact-form__country-code {
  width: 120px;
  padding: 2rem;
  background-color: var(--secondary-color);
  border: none;
  border-radius: 35px;
  color: var(--text-color);
  font-size: 2.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.contact-form__input--phone {
  flex: 1;
}

.contact-form__contact-methods {
  margin-top: 2rem;
}

.contact-form__contact-title {
  font-size: 2.4rem;
  color: var(--text-color);
  margin-bottom: 2rem;
}

.contact-form__contact-buttons {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.contact-form__contact-btn {
  flex: 1;
  min-width: 200px;
  padding: 2rem;
  background-color: var(--secondary-color);
  border: none;
  border-radius: 35px;
  color: var(--text-color);
  font-size: 2.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.contact-form__contact-btn img {
  width: 3rem;
  height: 3rem;
}

.contact-form__contact-btn--active {
  background-color: var(--accent-color);
  color: var(--background-color);
}

@media (max-width: 768px) {
  .contact-form {
    padding: 4rem 0;
    margin: 0;
    width: 100%;
    transform-origin: top center;
  }

  .contact-form__container {
    width: 100%;
  }

  .contact-form__title {
    font-size: 6rem;
  }

  .hightlighter{
    font-size: 7rem;
  }

  .contact-form__content {
    flex-direction: column;
  }

  .contact-form__form-wrapper,
  .contact-form__info {
    width: 100%;
  }

  .contact-form__input,
  .contact-form__textarea,
  .contact-form__submit {
    font-size: 3.5rem;
    padding: 1.5rem;
  }

  .contact-form__label {
    font-size: 3rem;
  }

  .contact-form__info-title {
    font-size: 4rem;
  }

  .contact-form__info-link,
  .contact-form__info-text {
    font-size: 3rem;
  }


  .contact-form__country-code {
    width: 80px;
    padding: 1.5rem;
    font-size: 2.4rem;
  }

  .contact-form__contact-btn {
    min-width: 150px;
    padding: 1.5rem;
    font-size: 2.4rem;
  }

  .contact-form__contact-btn img {
    width: 2.5rem;
    height: 2.5rem;
  }
}
</style> 