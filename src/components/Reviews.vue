<template>
  <section class="reviews" id="reviews" ref="reviewsSection">
    <div class="container reviews__container">
      <h2 class="reviews__title">Благодаря мне уже <span class="reviews__title hightlighter__text">более 40</span> компаний многократно выросли</h2>
      <div class="reviews__cards-wrapper">
        <div class="reviews__cards" ref="cardsContainer">
          <!-- Первый набор карточек -->
          <div class="reviews__card" v-for="(review, index) in reviews" :key="'first-' + index">
            <h3 class="reviews__card-title">{{ review.company }}</h3>
            <p class="reviews__card-text">{{ review.text }}</p>
          </div>
          <!-- Второй и третий набор карточек только для десктопа -->
          <template v-if="!isMobile">
            <div class="reviews__card" v-for="(review, index) in reviews" :key="'second-' + index">
              <h3 class="reviews__card-title">{{ review.company }}</h3>
              <p class="reviews__card-text">{{ review.text }}</p>
            </div>
            <div class="reviews__card" v-for="(review, index) in reviews" :key="'third-' + index">
              <h3 class="reviews__card-title">{{ review.company }}</h3>
              <p class="reviews__card-text">{{ review.text }}</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const reviewsSection = ref(null)
const cardsContainer = ref(null)
let scrollInterval = null
const currentIndex = ref(0)
const isMobile = ref(window.innerWidth <= 768)

// Данные отзывов
const reviews = [
  {
    company: 'ФитЛайн Студио',
    text: 'Наш новый лендинг — это не просто сайт, а удобный инструмент для записи клиентов. Все стильно, чётко и без лишнего. Спасибо команде за оперативность и внимание к деталям!'
  },
  {
    company: 'Сладкий Двор',
    text: 'Сайт получился тёплым и аппетитным — именно таким, как наши десерты. Уже в первую неделю мы получили заказы через лендинг. Спасибо за душевную работу и креатив!'
  },
  {
    company: 'Адвокат Плюс',
    text: 'Мы ценим точность и сдержанность — и это видно в каждой детали лендинга. Приятно работать с людьми, которые сразу поняли нашу аудиторию. Благодарим за профессионализм!'
  },
  {
    company: 'ЭкоГрин',
    text: 'Лендинг буквально оживил наш онлайн-бизнес! Удобная структура, экологичный дизайн и понятные кнопки — всё, что нужно клиентам. Спасибо за понимание наших ценностей.'
  },
  {
    company: 'ЛайкТур',
    text: 'Яркий, цепляющий сайт — как и наши путешествия! За первый месяц получили вдвое больше заявок. Очень благодарны студии за свежие идеи и поддержку на каждом этапе.'
  },
  {
    company: 'КрафтДекор',
    text: 'Получили не просто лендинг, а цифровую витрину, отражающую наш стиль. Всё выверено до пикселя. Спасибо за такой внимательный и эстетичный подход!'
  },
  {
    company: 'Детский клуб "Умка"',
    text: 'Теперь родители записывают детей на занятия в два клика — это огромная экономия времени! Сайт яркий, добрый и очень понятный. Благодарим команду за заботу и терпение к нашим правкам.'
  }
]

// Вычисляемое свойство для отображения карточек
const displayedReviews = computed(() => {
  const cards = []
  // Добавляем текущие карточки
  for (let i = 0; i < 8; i++) {
    const index = (currentIndex.value + i) % reviews.length
    cards.push(reviews[index])
  }
  return cards
})

onMounted(() => {
  // Observer для анимации появления
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate')
      }
    })
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px'
  })

  if (reviewsSection.value) {
    observer.observe(reviewsSection.value)
  }

  // Обработчик скролла для анимации исчезновения
  const handleScroll = () => {
    if (!reviewsSection.value) return

    const rect = reviewsSection.value.getBoundingClientRect()
    const windowHeight = window.innerHeight

    // Начало анимации исчезновения (когда нижняя граница секции достигает середины экрана)
    const fadeStart = windowHeight * 0.5
    const fadeEnd = -windowHeight * 0.2

    // Вычисляем прогресс анимации на основе нижней границы
    let progress = 0
    if (rect.bottom < fadeStart) {
      progress = Math.min(1, (fadeStart - rect.bottom) / (fadeStart - fadeEnd))
    }

    // Применяем трансформации
    const scale = 1 - (progress * 0.6)
    const translateY = progress * 50
    const opacity = 1 - progress

    reviewsSection.value.style.transform = `scale(${scale}) translateY(${translateY}px)`
    reviewsSection.value.style.opacity = opacity
  }

  // Обновляем функцию автоматической прокрутки
  const startAutoScroll = () => {
    if (!cardsContainer.value) return

    // Проверяем ширину экрана
    if (window.innerWidth <= 768) return

    let currentPosition = 0
    const cardWidth = cardsContainer.value.querySelector('.reviews__card').offsetWidth + 30 // 30px = 2rem gap

    scrollInterval = setInterval(() => {
      currentPosition += cardWidth
      
      // Если достигли конца второй копии карточек, плавно возвращаемся к началу первой
      if (currentPosition >= (cardWidth * reviews.length * 2)) {
        currentPosition = 0
      }

      cardsContainer.value.style.transform = `translateX(-${currentPosition}px)`
    }, 3500)
  }

  // Обработчик изменения размера окна
  const handleResize = () => {
    isMobile.value = window.innerWidth <= 768
    if (scrollInterval) {
      clearInterval(scrollInterval)
    }
    if (window.innerWidth > 768) {
      startAutoScroll()
    }
  }

  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll)
  startAutoScroll()

  onUnmounted(() => {
    observer.disconnect()
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
    if (scrollInterval) {
      clearInterval(scrollInterval)
    }
  })
})
</script>

<style scoped>
.reviews {
  padding: 8rem 0;
  background-color: var(--background-color);
  transform-origin: center center;
  will-change: transform, opacity;
  transition: transform 0.1s ease-out, opacity 0.1s ease-out;
}

.reviews__container {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.reviews__title {
  font-size: 10rem;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1.1;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.hightlighter__text {
  color: var(--accent-color);
}

.reviews__cards-wrapper {
  overflow: hidden;
  position: relative;

}

.reviews__cards {
  display: flex;
  gap: 3rem;
  transition: transform 0.5s ease;
  padding: 1rem 0;
 
}

.reviews__card {
  flex: 0 0 calc(25% - 2.25rem);
  background-color: var(--secondary-color);
  padding: 4rem;
  border-radius: 35px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  min-width: 500px;
}

.reviews__card-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 3rem;
}

.reviews__card-text {
  font-size: 2.8rem;
  color: var(--background-color);
  line-height: 1.4;
}

/* Анимация появления при добавлении класса animate */
.reviews.animate .reviews__title {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0s;
}

.reviews.animate .reviews__card {
  opacity: 1;
  transform: translateY(0);
}

/* Обновляем задержки для появления карточек */
.reviews.animate .reviews__card:nth-child(1) { transition-delay: 0.1s; }
.reviews.animate .reviews__card:nth-child(2) { transition-delay: 0.2s; }
.reviews.animate .reviews__card:nth-child(3) { transition-delay: 0.3s; }
.reviews.animate .reviews__card:nth-child(4) { transition-delay: 0.4s; }
.reviews.animate .reviews__card:nth-child(5) { transition-delay: 0.5s; }
.reviews.animate .reviews__card:nth-child(6) { transition-delay: 0.6s; }
.reviews.animate .reviews__card:nth-child(7) { transition-delay: 0.7s; }
.reviews.animate .reviews__card:nth-child(8) { transition-delay: 0.8s; }
.reviews.animate .reviews__card:nth-child(9) { transition-delay: 0.9s; }
.reviews.animate .reviews__card:nth-child(10) { transition-delay: 1s; }
.reviews.animate .reviews__card:nth-child(11) { transition-delay: 1.1s; }
.reviews.animate .reviews__card:nth-child(12) { transition-delay: 1.2s; }
.reviews.animate .reviews__card:nth-child(13) { transition-delay: 1.3s; }
.reviews.animate .reviews__card:nth-child(14) { transition-delay: 1.4s; }
.reviews.animate .reviews__card:nth-child(15) { transition-delay: 1.5s; }
.reviews.animate .reviews__card:nth-child(16) { transition-delay: 1.6s; }
.reviews.animate .reviews__card:nth-child(17) { transition-delay: 1.7s; }
.reviews.animate .reviews__card:nth-child(18) { transition-delay: 1.8s; }
.reviews.animate .reviews__card:nth-child(19) { transition-delay: 1.9s; }
.reviews.animate .reviews__card:nth-child(20) { transition-delay: 2s; }
.reviews.animate .reviews__card:nth-child(21) { transition-delay: 2.1s; }

@media (max-width: 768px) {
  .reviews {
    padding: 4rem 0;
    margin: 0;
  }
  
  .reviews__container {
    margin: 0;
    width: 100%;
  }

  .reviews__title {
    font-size: 6rem;
  }

  .hightlighter__text{
    font-size: 7rem;
  }

  .reviews__cards {
    flex-direction: column;
    gap: 2rem;
    transform: none !important; /* Отключаем трансформацию на мобильных */
  }

  .reviews__card {
    flex: 0 0 auto;
    width: 100%;
    min-width: unset;
    padding: 4rem 4rem;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.4s ease, transform 0.4s ease;
  }

  .reviews__card-title {
    font-size: 5rem;
  }

  .reviews__card-text {
    font-size: 3.5rem;
  }

  /* Обновляем анимацию появления для мобильной версии */
  .reviews.animate .reviews__card {
    opacity: 1;
    transform: translateY(0);
  }

  /* Устанавливаем меньшие задержки для мобильной версии */
  .reviews.animate .reviews__card:nth-child(1) { transition-delay: 0.1s; }
  .reviews.animate .reviews__card:nth-child(2) { transition-delay: 0.2s; }
  .reviews.animate .reviews__card:nth-child(3) { transition-delay: 0.3s; }
  .reviews.animate .reviews__card:nth-child(4) { transition-delay: 0.4s; }
  .reviews.animate .reviews__card:nth-child(5) { transition-delay: 0.5s; }
  .reviews.animate .reviews__card:nth-child(6) { transition-delay: 0.6s; }
  .reviews.animate .reviews__card:nth-child(7) { transition-delay: 0.7s; }
}
</style> 