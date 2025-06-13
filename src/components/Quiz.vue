<template>
  <section class="quiz" ref="quizSection">
    <div class="container quiz__container">
      <h2 class="quiz__title">Не знаете, с чего начать? Пройдите короткий квиз — получите <span class="title_hightlighter">идеальный лендинг</span> для вашего бизнеса <span class="title_hightlighter">и скидку 15%!</span></h2>
      
      <div class="quiz__content">
        <div class="quiz__content cover">
           <!-- Левая часть с изображением -->
          <div class="quiz__image-wrapper">
            <img :src="currentQuestion.image" :alt="currentQuestion.question" class="quiz__image">
          </div>
   
          <div class="quiz__question-wrapper">
            <div class="quiz__progress">
              <div class="quiz__progress-bar" :style="{ width: `${(currentStep / questions.length) * 100}%` }"></div>
              <span class="quiz__progress-text">{{ currentStep }}/{{ questions.length }}</span>
            </div>
  
            <h3 class="quiz__question">{{ currentQuestion.question }}</h3>
  
            <div v-if="currentStep < 6" class="quiz__answers">
              <button 
                v-for="(answer, index) in currentQuestion.answers" 
                :key="index"
                class="quiz__answer-btn"
                :class="{ 'quiz__answer-btn--active': selectedAnswer === answer }"
                @click="selectAnswer(answer)"
              >
                {{ answer }}
              </button>
            </div>
  
            <form v-else class="quiz__form" @submit.prevent="submitForm">
              <div class="quiz__form-group">
                <label for="name" class="quiz__form-label">Ваше имя *</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="formData.name" 
                  class="quiz__form-input"
                  :class="{ 'quiz__form-input--error': errors.name }"
                  required
                >
                <span v-if="errors.name" class="quiz__form-error">{{ errors.name }}</span>
              </div>
  
              <div class="quiz__form-group">
                <label for="phone" class="quiz__form-label">Ваш телефон *</label>
                <div class="quiz__form-phone">
                  <select 
                    v-model="formData.countryCode" 
                    class="quiz__form-country-code"
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
                    class="quiz__form-input quiz__form-input--phone"
                    :class="{ 'quiz__form-input--error': errors.phone }"
                    required
                    placeholder="(999) 999-99-99"
                  >
                </div>
                <span v-if="errors.phone" class="quiz__form-error">{{ errors.phone }}</span>
              </div>
  
              <div class="quiz__form-group">
                <label for="email" class="quiz__form-label">Ваш email {{ formData.contactMethod === 'email' ? '*' : '(необязательно)' }}</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="formData.email" 
                  class="quiz__form-input"
                  :class="{ 'quiz__form-input--error': errors.email }"
                  :required="formData.contactMethod === 'email'"
                >
                <span v-if="errors.email" class="quiz__form-error">{{ errors.email }}</span>
              </div>
  
              <div class="quiz__form-group">
                <label for="message" class="quiz__form-label">Ваше сообщение (необязательно)</label>
                <textarea 
                  id="message" 
                  v-model="formData.message" 
                  class="quiz__form-textarea"
                  :class="{ 'quiz__form-textarea--error': errors.message }"
                ></textarea>
                <span v-if="errors.message" class="quiz__form-error">{{ errors.message }}</span>
              </div>
  
              <div class="quiz__form-group">
                <label class="quiz__form-label">Способ связи</label>
                <div class="quiz__form-contact-methods">
                  <button 
                    type="button"
                    class="quiz__form-contact-method"
                    :class="{ 'quiz__form-contact-method--active': formData.contactMethod === 'telegram' }"
                    @click="formData.contactMethod = 'telegram'"
                  >
                    <img src="../assets/telegram.svg" alt="Telegram" class="quiz__form-contact-icon">
                    Telegram
                  </button>
                  <button 
                    type="button"
                    class="quiz__form-contact-method"
                    :class="{ 'quiz__form-contact-method--active': formData.contactMethod === 'whatsapp' }"
                    @click="formData.contactMethod = 'whatsapp'"
                  >
                    <img src="../assets/whatsapp.svg" alt="WhatsApp" class="quiz__form-contact-icon">
                    WhatsApp
                  </button>
                  <button 
                    type="button"
                    class="quiz__form-contact-method"
                    :class="{ 'quiz__form-contact-method--active': formData.contactMethod === 'email' }"
                    @click="formData.contactMethod = 'email'"
                  >
                    <img src="../assets/email.svg" alt="Email" class="quiz__form-contact-icon">
                    Email
                  </button>
                </div>
              </div>
            </form>
  
            <div class="quiz__buttons">
              <button 
                v-if="currentStep > 1" 
                class="quiz__btn quiz__btn--back"
                @click="prevStep"
                :disabled="isSubmitting"
              >
                Назад
              </button>
              <button 
                class="quiz__btn quiz__btn--next"
                @click="nextStep"
                :disabled="!canProceed || isSubmitting"
              >
                {{ isSubmitting ? 'Отправка...' : (currentStep === questions.length ? 'Отправить' : 'Далее') }}
              </button>
            </div>

            <div v-if="isSuccess" class="quiz__success">
              Спасибо! Ваши ответы отправлены. Мы свяжемся с вами в ближайшее время.
            </div>

            <div v-if="errorMessage" class="quiz__error-message">
              {{ errorMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { TELEGRAM_CONFIG } from '../config/telegram'
import { sendTelegramMessage } from '../utils/telegram'
import { setupMobileZoomControl } from '../utils/formUtils'

const quizSection = ref(null)
const currentStep = ref(1)
const selectedAnswer = ref('')
const isSubmitting = ref(false)
const errorMessage = ref('')
const isSuccess = ref(false)
let cleanupZoomControl = null

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

const answers = ref({
  question1: '',
  question2: '',
  question3: '',
  question4: '',
  question5: ''
})

const questions = [
  {
    question: 'Какой тип лендинга вам нужен?',
    image: new URL('../assets/business-type.png', import.meta.url).href,
    answers: ['Презентация продукта/услуги', 'Сбор заявок и лидов', 'Мероприятие (веб-бинар, мастер-класс и т.д.)', 'Не знаю, хочу, что бы вы подсказали']
  },
  {
    question: 'У вас уже есть фирменный стиль или нужно его разработать?',
    image: new URL('../assets/style-question.png', import.meta.url).href,
    answers: ['Да, у нас есть логотип, цвета и шрифты', 'Есть идеи, но нужна помощь в оформлении', 'Нет, хочу, чтобы вы создали стиль с нуля']
  },
  {
    question: 'Какие элементы важны для вашего лендинга?',
    image: new URL('../assets/type-land.png', import.meta.url).href,
    answers: ['Форма заявки/обратной связи', 'Галерея работ или портфолио', 'Отзывы клиентов', 'Таймер обратного отсчета для акций']
  },
  {  
    question: 'Какой результат вы хотите получить от лендинга?',
    image: new URL('../assets/result.png', import.meta.url).href,
    answers: ['Больше заявок и клиентов', 'Повышение узнаваемости бренда', 'Продажа конкретного продукта/услуги', 'Просто красивый сайт для имиджа']
  },
  {
    question: 'Насколько срочно вам нужен лендинг?',
    image: new URL('../assets/time.png', import.meta.url).href,
    answers: ['Вчера! Очень срочно', 'В течение 1-2 недель', 'Месяц, я готов подождать ради качества']
  }
]

const currentQuestion = computed(() => {
  if (currentStep.value === 6) {
    return {
      question: 'Как с вами связаться, чтобы обсудить проект?',
      image: new URL('../assets/contacts.png', import.meta.url).href,
      answers: []
    }
  }
  return questions[currentStep.value - 1]
})

const canProceed = computed(() => {
  if (currentStep.value < 6) {
    return selectedAnswer.value !== ''
  }
  return validateForm()
})

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
  if (!phoneRegex.test(formData.value.phone.replace(/\D/g, ''))) {
    errors.value.phone = 'Введите корректный номер телефона'
    isValid = false
  }

  if (formData.value.contactMethod === 'email') {
    if (!formData.value.email.trim()) {
      errors.value.email = 'Введите email для связи'
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
      errors.value.email = 'Введите корректный email'
      isValid = false
    }
  }

  return isValid
}

const selectAnswer = (answer) => {
  selectedAnswer.value = answer
  answers.value[`question${currentStep.value}`] = answer
}

const submitQuiz = async () => {
  isSubmitting.value = true
  errorMessage.value = ''
  isSuccess.value = false

  try {
    const response = await fetch('https://api.land-alina.ru/api/send-form/quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answers: {
          question1: answers.value.question1,
          question2: answers.value.question2,
          question3: answers.value.question3,
          question4: answers.value.question4,
          question5: answers.value.question5
        },
        formData: {
          name: formData.value.name,
          phone: formData.value.phone,
          email: formData.value.email,
          message: formData.value.message,
          countryCode: formData.value.countryCode,
          contactMethod: formData.value.contactMethod
        }
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Ошибка при отправке формы')
    }

    isSuccess.value = true
    // Сбрасываем все данные
    answers.value = {
      question1: '',
      question2: '',
      question3: '',
      question4: '',
      question5: ''
    }
    formData.value = {
      name: '',
      phone: '',
      email: '',
      message: '',
      countryCode: '+7',
      contactMethod: 'telegram'
    }
  } catch (error) {
    errorMessage.value = 'Произошла ошибка при отправке ответов. Пожалуйста, попробуйте позже.'
    console.error('Error sending quiz answers:', error)
  } finally {
    isSubmitting.value = false
  }
}

const nextStep = async () => {
  if (!canProceed.value) return

  if (currentStep.value === 6) {
    if (!validateForm()) return
    await submitQuiz()
  } else {
    currentStep.value++
    selectedAnswer.value = answers.value[`question${currentStep.value}`] || ''
  }
}

const prevStep = () => {
  currentStep.value--
  selectedAnswer.value = answers.value[`question${currentStep.value}`] || ''
}

const handleScroll = () => {
  if (!quizSection.value) return

  
  const activeElement = document.activeElement
  if (activeElement && (
    activeElement.tagName === 'INPUT' ||
    activeElement.tagName === 'TEXTAREA' ||
    activeElement.tagName === 'SELECT'
  )) {
    return
  }

  const rect = quizSection.value.getBoundingClientRect()
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

  quizSection.value.style.transform = `scale(${scale}) translateY(${translateY}px)`
  quizSection.value.style.opacity = opacity
}

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

  if (quizSection.value) {
    observer.observe(quizSection.value)
  }

  window.addEventListener('scroll', handleScroll)

  // Настраиваем управление масштабированием
  cleanupZoomControl = setupMobileZoomControl()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)

  // Очищаем обработчики при размонтировании компонента
  if (cleanupZoomControl) {
    cleanupZoomControl()
  }
})
</script>

<style scoped>
.quiz {
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

.quiz__container {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.quiz__title {
  font-size: 10rem;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1.1;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.title_hightlighter {
  color: var(--accent-color);
  font-size: 11rem;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
}

.quiz__content {
  display: flex;
  gap: 4rem;
  background-color: var(--secondary-color);
  border-radius: 35px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s;
  padding: 4rem;
}

.cover {
  width: 100%;
  padding: 3rem;
  background-color: black;
}

.quiz__image-wrapper {
  flex: 0 0 50%;
  overflow: hidden;
  opacity: 0;
  transform: translateX(-50px);
  transition: opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s;
}

.quiz__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 35px;
}

.quiz__question-wrapper {
  flex: 0 0 50%;
  padding: 0 4rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  justify-content: space-between;
  opacity: 0;
  transform: translateX(50px);
  transition: opacity 0.8s ease 0.8s, transform 0.8s ease 0.8s;
}

.quiz__progress {
  position: relative;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.quiz__progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: var(--accent-color);
  transition: width 0.3s ease;
}

.quiz__progress-text {
  position: absolute;
  right: 0;
  top: -2rem;
  font-size: 2rem;
  color: var(--text-color);
  opacity: 0;
}

.quiz__question {
  font-size: 5rem;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1.2;
  margin-bottom: 2rem;
}

.quiz__answers {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4rem;
  flex: 1;
  margin: auto 0;
}

.quiz__answer-btn {
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 35px;
  color: var(--text-color);
  font-size: 2.8rem;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.quiz__answer-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.quiz__answer-btn--active {
  background-color: var(--accent-color);
  color: var(--background-color);
  transition: none;
}

.quiz__form {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.quiz__form-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.quiz__form-label {
  font-size: 2.4rem;
  color: var(--text-color);
}

.quiz__form-input {
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 35px;
  color: var(--text-color);
  font-size: 2.8rem;
  transition: all 0.3s ease;
}

.quiz__form-input:focus {
  outline: none;
  background-color: rgba(255, 255, 255, 0.2);
}

.quiz__form-input--error {
  border: 2px solid #ff4444;
}

.quiz__form-error {
  font-size: 2rem;
  color: #ff4444;
}

.quiz__form-phone {
  display: flex;
  gap: 1rem;
}

.quiz__form-country-code {
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 35px;
  color: var(--text-color);
  font-size: 2.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quiz__form-country-code:focus {
  outline: none;
  background-color: rgba(255, 255, 255, 0.2);
}

.quiz__form-textarea {
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 35px;
  color: var(--text-color);
  font-size: 2.8rem;
  min-height: 15rem;
  resize: vertical;
  transition: all 0.3s ease;
}

.quiz__form-textarea:focus {
  outline: none;
  background-color: rgba(255, 255, 255, 0.2);
}

.quiz__form-textarea--error {
  border: 2px solid #ff4444;
}

.quiz__form-contact-methods {
  display: flex;
  gap: 1rem;
}

.quiz__form-contact-method {
  flex: 1;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.1);
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

.quiz__form-contact-method:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.quiz__form-contact-method--active {
  background-color: var(--accent-color);
  color: var(--background-color);
}

.quiz__form-contact-icon {
  width: 2.4rem;
  height: 2.4rem;
}

.quiz__buttons {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  justify-content: flex-end;
}

.quiz__btn {
  padding: 2rem 4rem;
  border: none;
  border-radius: 35px;
  font-size: 2.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quiz__btn--back {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--text-color);
  width: 33%;
  
}

.quiz__btn--next {
  background-color: var(--accent-color);
  color: var(--background-color);
  width: 65%;
}

.quiz__btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.quiz.animate {
  opacity: 1;
  transform: translateY(0);
}

.quiz.animate .quiz__title,
.quiz.animate .title_hightlighter,
.quiz.animate .quiz__content,
.quiz.animate .quiz__image-wrapper,
.quiz.animate .quiz__question-wrapper {
  opacity: 1;
  transform: translate(0);
}

.quiz__progress,
.quiz__question,
.quiz__answers,
.quiz__form,
.quiz__buttons {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.quiz.animate .quiz__progress {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 1s;
}

.quiz.animate .quiz__question {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 1.2s;
}

.quiz.animate .quiz__answers,
.quiz.animate .quiz__form {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 1.4s;
}

.quiz.animate .quiz__buttons {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 1.6s;
}

.quiz__answer-btn {
  opacity: 0;
  transform: translateX(-20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.quiz.animate .quiz__answer-btn {
  opacity: 1;
  transform: translateX(0);
}

.quiz.animate .quiz__answer-btn:nth-child(1) { transition-delay: 1.8s; }
.quiz.animate .quiz__answer-btn:nth-child(2) { transition-delay: 2s; }
.quiz.animate .quiz__answer-btn:nth-child(3) { transition-delay: 2.2s; }
.quiz.animate .quiz__answer-btn:nth-child(4) { transition-delay: 2.4s; }


.quiz__form-group {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.quiz.animate .quiz__form-group {
  opacity: 1;
  transform: translateY(0);
}

.quiz.animate .quiz__form-group:nth-child(1) { transition-delay: 1.8s; }
.quiz.animate .quiz__form-group:nth-child(2) { transition-delay: 2s; }
.quiz.animate .quiz__form-group:nth-child(3) { transition-delay: 2.2s; }

.quiz__success {
  margin-top: 2rem;
  padding: 2rem;
  background-color: rgba(217, 255, 2, 0.1);
  border-radius: 35px;
  color: var(--accent-color);
  font-size: 3rem;
  text-align: center;
}

.quiz__error-message {
  margin-top: 2rem;
  padding: 2rem;
  background-color: rgba(255, 0, 0, 0.1);
  border-radius: 35px;
  color: #ff0000;
  font-size: 3rem;
  text-align: center;
}

@media (max-width: 768px) {
  .quiz {
    padding: 4rem 0;
    margin: 0;
    width: 100%;
    transform-origin: top center; 
  }

  .quiz__container{
    width: 100%;

  }

  .quiz__title {
    font-size: 6rem;
  }

  .title_hightlighter{
    font-size: 7rem;
  }

  .quiz__content {
    flex-direction: column;
    margin: 0;
    padding: 2rem;
    width: 100%;
  }

  .quiz__image-wrapper,
  .quiz__question-wrapper {
    flex: 0 0 100%;
  }

  .quiz__image-wrapper {
    height: 30rem;
  }

  .quiz__question-wrapper {
    padding: 3rem 2rem;
  }

  .quiz__question {
    font-size: 4rem;
  }

  .quiz__answer-btn {
    font-size: 3.5rem;
    padding: 1.5rem;
  }
  .quiz__answer-btn--active {
    background-color: var(--accent-color);
    color: var(--background-color);
    transition: none;
  }

  .quiz__form-input,
  .quiz__form-country-code,
  .quiz__form-textarea,
  .quiz__form-contact-method {
    font-size: 2.4rem;
    padding: 1.5rem;
  }

  .quiz__form-label {
    font-size: 2rem;
  }

  .quiz__form-contact-method {
    font-size: 2rem;
  }
}
</style> 