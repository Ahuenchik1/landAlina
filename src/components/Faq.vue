<template>
  <section class="faq" ref="faqSection" id="faq">
    <div class="container faq__container">
      <h2 class="faq__title">Часто задаваемые вопросы</h2>
      
      <div class="faq__content">
        <div 
          v-for="(item, index) in faqItems" 
          :key="index"
          class="faq__item"
          :class="{ 'faq__item--active': activeIndex === index }"
        >
          <div class="faq__question-wrapper">
            <button 
              class="faq__question"
              @click="toggleAnswer(index)"
            >
              {{ item.question }}
              <span class="faq__icon" :class="{ 'faq__icon--active': activeIndex === index }">+</span>
            </button>
            <div 
              class="faq__answer"
              :class="{ 'faq__answer--active': activeIndex === index }"
            >
              <p v-html="item.answer"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const faqSection = ref(null)
const activeIndex = ref(null)

// Данные FAQ
const faqItems = [
  {
    question: '🔥 1. Что такое лендинг и для чего он нужен?',
    answer: 'Лендинг — это одностраничный сайт, созданный для одной цели: продать продукт, собрать заявки или привлечь аудиторию на мероприятие. В отличие от обычного сайта, лендинг фокусируется на конверсии и побуждает посетителя к действию — оставить контакты, зарегистрироваться или купить.'
  },
  {
    question: '💡 2. Чем лендинг отличается от многостраничного сайта?',
    answer: 'Главное отличие лендинга от сайта — это структура и цель. Лендинг — это одна страница с конкретным предложением и четким призывом к действию, а многостраничный сайт подходит для крупных компаний, которые рассказывают о своих услугах и бренде в деталях. Если ваша цель — быстрые продажи или сбор лидов, лендинг — лучший выбор.'
  },
  {
    question: '🚀 3. Сколько стоит создание лендинга под ключ?',
    answer: 'Стоимость лендинга зависит от сложности дизайна, количества блоков и интеграций (формы заявок, платежные системы и т.д.). В среднем, цена разработки лендинга под ключ начинается от 35 000₽. Обсудим все детали и предложу оптимальное решение для вашего бизнеса.'
  },
  {
    question: '📈 4. Как долго создается лендинг?',
    answer: 'Разработка лендинга обычно занимает от 5 до 45 дней. Сроки зависят от сложности дизайна, объемов контента и ваших пожеланий. Если вам нужен срочный лендинг, сообщите — я предложу ускоренный вариант.'
  },
  {
    question: '🎯 5. Какие виды лендингов вы создаете?',
    answer: 'Для бизнеса — чтобы продавать услуги или товары<br>Для мероприятий — вебинары, мастер-классы, конференции<br>Для онлайн-школ и курсов — привлечение учеников и запись на обучение<br>Для акций и спецпредложений — краткосрочные распродажи и анонсы<br>Каждый лендинг адаптирован под вашу цель и аудиторию'
  },
  {
    question: '📲 6. Настраиваете ли вы рекламу на лендинг?',
    answer: 'Да! Помимо создания лендинга, я могу настроить для вас контекстную рекламу (Google Ads, Яндекс.Директ) или таргетированную рекламу в соцсетях. Это поможет вам получить первые заявки уже в день запуска.'
  },
]

// Функция для переключения ответа
const toggleAnswer = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

// Обработчик скролла для анимации исчезновения
const handleScroll = () => {
  if (!faqSection.value) return

  const rect = faqSection.value.getBoundingClientRect()
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

  faqSection.value.style.transform = `scale(${scale}) translateY(${translateY}px)`
  faqSection.value.style.opacity = opacity
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

  if (faqSection.value) {
    observer.observe(faqSection.value)
  }

  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.faq {
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

.faq__container {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.faq__title {
  font-size: 10rem;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1.1;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.faq__content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.faq__item {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.faq__question-wrapper {
  background-color: var(--secondary-color);
  border-radius: 35px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq__item--active .faq__question-wrapper {
  background-color: var(--accent-color);
}

.faq__question {
  width: 100%;
  padding: 3rem;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 5rem;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.faq__item--active .faq__question {
  color: var(--background-color);
}

.faq__icon {
  font-size: 4rem;
  transition: transform 0.3s ease;
}

.faq__icon--active {
  transform: rotate(45deg);
}

.faq__answer {
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s ease-out;
  color: var(--text-color);
  font-size: 2.4rem;
  line-height: 1.5;
  padding: 0 3rem;
  opacity: 0;
}

.faq__answer--active {
  max-height: 500px;
  padding: 0 3rem 3rem;
  opacity: 1;
  color: var(--background-color);
  font-size: 4rem;
}

/* Анимация появления */
.faq.animate {
  opacity: 1;
  transform: translateY(0);
}

.faq.animate .faq__title {
  opacity: 1;
  transform: translateY(0);
}

.faq.animate .faq__item {
  opacity: 1;
  transform: translateY(0);
}

.faq.animate .faq__item:nth-child(1) { transition-delay: 0.2s; }
.faq.animate .faq__item:nth-child(2) { transition-delay: 0.4s; }
.faq.animate .faq__item:nth-child(3) { transition-delay: 0.6s; }
.faq.animate .faq__item:nth-child(4) { transition-delay: 0.8s; }
.faq.animate .faq__item:nth-child(5) { transition-delay: 1s; }
.faq.animate .faq__item:nth-child(6) { transition-delay: 1.2s; }

@media (max-width: 768px) {
  .faq {
    padding: 4rem 0;
    margin: 0;
    width: 100%;
    transform-origin: top center;
  }

  .faq__container {
    width: 100%;
  }

  .faq__title {
    font-size: 6rem;
  }

  .faq__question {
    font-size: 4rem;
    padding: 2rem;
  }

  .faq__answer {
    font-size: 3.5rem;
    padding: 0 2rem;
  }
  
  .faq__question-wrapper{
    padding: 1rem 0;
  }

  .faq__answer--active {
    padding: 0 2rem 2rem;
  }

  .faq__icon {
    font-size: 3.2rem;
  }
}
</style> 