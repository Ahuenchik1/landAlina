<template>
  <section class="services" id="services" ref="servicesSection">
    <div class="container services__container">
      <h2 class="services__title" ref="title">Собрала весь комплекс услуг в одном месте. <span class="hightlighter">Ведь "под ключ" - значит все включено!</span></h2>
      <div class="services__grid-wrapper" ref="servicesGrid">
        <div class="services__grid">
          <div 
            class="services__item" 
            v-for="(service, index) in services" 
            :key="index"
            :style="{ 
              '--delay': `${index * 0.1}s`,
              '--float-delay': `${index * 0.7}s`
            }"
            :ref="(el) => { if (el) itemRefs[index] = el }"
          >
            <div class="services__item-icon-wrapper">
              <img 
                v-if="service.icon"
                :src="service.icon"
                :alt="service.title"
                class="services__item-icon"
              />
            </div>
            <h3 class="services__item-title">{{ service.title }}</h3>
            <p class="services__item-text">{{ service.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Импортируем SVG как URL
const icons = {
  include_icon: new URL('../assets/images/icons/include_icon.svg', import.meta.url).href,
  includes_icon_2: new URL('../assets/images/icons/includes_icon_2.svg', import.meta.url).href,
  includes_icon_3: new URL('../assets/images/icons/includes_icon_3.svg', import.meta.url).href,
  includes_icon_4: new URL('../assets/images/icons/includes_icon_4.svg', import.meta.url).href,
  includes_icon_5: new URL('../assets/images/icons/includes_icon_5.svg', import.meta.url).href,
  includes_icon_6: new URL('../assets/images/icons/includes_icon_6.svg', import.meta.url).href,
  includes_icon_7: new URL('../assets/images/icons/includes_icon_7.svg', import.meta.url).href,
  includes_icon_8: new URL('../assets/images/icons/includes_icon_8.svg', import.meta.url).href,
  includes_icon_9: new URL('../assets/images/icons/includes_icon_9.svg', import.meta.url).href,
  includes_icon_10: new URL('../assets/images/icons/includes_icon_10.svg', import.meta.url).href,
  includes_icon_11: new URL('../assets/images/icons/includes_icon_11.svg', import.meta.url).href,
  includes_icon_12: new URL('../assets/images/icons/includes_icon_12.svg', import.meta.url).href,
  includes_icon_13: new URL('../assets/images/icons/includes_icon_13.svg', import.meta.url).href,
  includes_icon_14: new URL('../assets/images/icons/includes_icon_14.svg', import.meta.url).href,
  includes_icon_15: new URL('../assets/images/icons/includes_icon_15.svg', import.meta.url).href,
  includes_icon_16: new URL('../assets/images/icons/includes_icon_16.svg', import.meta.url).href,
  includes_icon_17: new URL('../assets/images/icons/includes_icon_17.svg', import.meta.url).href,
  includes_icon_18: new URL('../assets/images/icons/includes_icon_18.svg', import.meta.url).href,
}

const title = ref(null)
const itemRefs = ref([])
const servicesSection = ref(null)
const servicesGrid = ref(null)

const services = [
  {
    title: 'Фирменный стиль',
    text: 'Разработаеюили скорректирую стиль',
    icon: icons.include_icon
  },
  {
    title: 'Наполнение сайта',
    text: 'Контент-менеджер наполняет сайт',
    icon: icons.includes_icon_2
  },
  {
    title: 'Разработка логотипа',
    text: 'Оригинальный логотип выделит вас среди конкурентов',
    icon: icons.includes_icon_3
  },
  {
    title: 'Каталог товаров и услуг',
    text: 'Презентация ваших предложений с возможностью заказа',
    icon: icons.includes_icon_4
  },
  {
    title: 'SEO-оптимизация',
    text: 'Быстрый рост в поисковой системе',
    icon: icons.includes_icon_5
  },
  {
    title: 'Адаптивность',
    text: 'Корректное отображение на всех устройствах',
    icon: icons.includes_icon_6
  },
  {
    title: 'Управление',
    text: 'Разработаю панель управления для изменения контента',
    icon: icons.includes_icon_7
  },
  {
    title: 'Домен и хостинг',
    text: 'Красивая ссылка и место размещения сайта',
    icon: icons.includes_icon_8
  },
  {
    title: 'Многостраничность',
    text: 'Неограниченное количество страниц и разделов',
    icon: icons.includes_icon_9
  },
  {
    title: 'Новости/статьи/блог',
    text: 'Покажет, что компания живет',
    icon: icons.includes_icon_10
  },
  {
    title: 'Прием платежей',
    text: 'Принимайте платежи с сайта',
    icon: icons.includes_icon_11
  },
  {
    title: 'Интеграция с CRM',
    text: 'Сохраняйте всю базу заявок и клиентов в единой системе',
    icon: icons.includes_icon_12
  },
  {
    title: 'Статистика посетителей',
    text: 'Полный контроль за статистикой сайта',
    icon: icons.includes_icon_13
  },
  {
    title: 'Фото- видеогалерея',
    text: 'Наглядная демонстрация вашей работы',
    icon: icons.includes_icon_14
  },
  {
    title: 'Форма обратной связи',
    text: 'Возможность посетителей задавать свои вопросы',
    icon: icons.includes_icon_15
  },
  {
    title: 'Резервное копирование',
    text: 'Быстрое восстановление сайта',
    icon: icons.includes_icon_16
  },
  {
    title: 'Личный консультант',
    text: 'Всегда на связи для решения проблем',
    icon: icons.includes_icon_17
  },
  {
    title: 'Техподдержка',
    text: 'Все доработки и исправления в течении месяца',
    icon: icons.includes_icon_18
  }
]

const handleScroll = () => {
  if (!servicesSection.value || !servicesGrid.value) return

  const isMobile = window.innerWidth <= 768
  const section = servicesSection.value
  const rect = section.getBoundingClientRect()
  const scrollPosition = window.scrollY


  const isInView = rect.top < window.innerHeight && rect.bottom > 0
  

  if (isInView && !title.value?.classList.contains('animate')) {
    title.value?.classList.add('animate')
    itemRefs.value.forEach((item, index) => {
      if (item) {

        setTimeout(() => {
          item.classList.add('animate')
        }, index * 100)
      }
    })
  }
  

  const startFadePosition = isMobile ? 4350 : 6500
  const fadeOutDistance = isMobile ? 500 : 800

  const grid = servicesGrid.value
  if (scrollPosition > startFadePosition && title.value?.classList.contains('animate')) {

    const progress = Math.min(1, (scrollPosition - startFadePosition) / fadeOutDistance)
    grid.style.setProperty('--fade-progress', progress.toString())
    if (!grid.classList.contains('fading')) {
      grid.classList.add('fading')
    }
  } else {
    grid.classList.remove('fading')
    grid.style.removeProperty('--fade-progress')
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Проверяем начальное состояние
  setTimeout(() => {
    handleScroll()
  }, 100) 
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.services {
  padding: 8rem 0;
  background-color: var(--background-color);
  margin: 0 10rem;
  perspective: 1000px;
  position: relative;
}

.services__container {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
}

.services__title {
  font-size: 10rem;
  font-weight: 700;
  color: var(--text-color);
  text-align: center;
  margin-bottom: 8rem;
  line-height: 1.1;
  opacity: 0;
  transform: translateY(-50px);
  transition: all 0.8s ease;
}

.hightlighter{
  color: var(--accent-color);
  font-size: 11rem;
}
.services__title.animate {
  opacity: 1;
  transform: translateY(0);
}

.services__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
}

.services__grid-wrapper {
  opacity: 1;
  transform: none;
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.services__grid-wrapper.fading {
  opacity: calc(1 - var(--fade-progress));
  transform: scale(calc(1 - var(--fade-progress) * 0.2)) translateY(calc(var(--fade-progress) * 100px));
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.services__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem;
  margin: 2rem 10rem;
  border-radius: 35px;
  opacity: 0;
  transform: translateY(30px);
  backdrop-filter: blur(10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  transition: opacity 0.8s ease var(--delay), 
              transform 0.8s ease var(--delay),
              background-color 0.3s ease,
              box-shadow 0.3s ease;
}

.services__item.animate {
  opacity: 1;
  transform: translateY(0);
}

.services__item:hover {
  transform: translateY(-10px) scale(1.02);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.services__item-icon-wrapper {
  position: relative;
  width: 8rem;
  height: 8rem;
  margin-bottom: 2rem;
  animation: iconFloat 3s ease-in-out infinite;
  animation-delay: var(--float-delay);
  color: var (--accent-color);
}

.services__item-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  color: var (--accent-color);
}

.services__item:hover .services__item-icon {
  transform: scale(1.1) rotate(5deg);
}

.services__item-title {
  font-size: 4.5rem;
  font-weight: 600;
  color: var(--accent-color);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.services__item:hover .services__item-title {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

.services__item-text {
  font-size: 3rem;
  color: var(--secondary-color);
  line-height: 1.4;
  transition: opacity 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px) rotateX(-10deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotateX(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes iconFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (max-width: 768px) {
  .services {
    margin: 0;
    padding: 4rem 3rem;
  }
  .services__container {
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .services__title {
    font-size: 6rem;
    margin-bottom: 4rem;
  }

  .hightlighter{
    font-size: 7rem;
  }

  .services__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .services__item {
    margin: 0;
    padding: 1rem;
  }

  .services__item-icon-wrapper {
    width: 6rem;
    height: 6rem;
    margin-bottom: 1.5rem;
  }

  .services__item-title {
    font-size: 3.5rem;
    margin-bottom: 1rem;
  }

  .services__item-text {
    font-size: 3rem;
  }

  .services__grid-wrapper.fading {
    opacity: 0;
    transform: scale(0.8) translateY(100px);
    pointer-events: none;
  }
}
</style> 