<template>
  <section class="stages" id="stages" ref="stagesSection">
    <div class="container stages__container">

      <h2 class="stages__title stages__title--mobile">С первых минут с головой погружаюсь в проект</h2>
      <div class="stages__content">
        <div class="stages__left">
          <div class="stages__items">
            <div 
              class="stages__item" 
              v-for="(stage, index) in stages" 
              :key="index"
              :ref="el => { if (el) stageRefs[index] = el }"
              :class="{ 'stages__item--visible': visibleItems[index] }"
            >
              <div class="stages__item-header">
                <div class="stages__item-number">{{ String(index + 1).padStart(2, '0') }}.</div>
                <h3 class="stages__item-title">{{ stage.title }}</h3>
              </div>
              <p class="stages__item-text">{{ stage.text }}</p>
            </div>
          </div>
        </div>
        <div class="stages__right" ref="rightContent">
          <h2 class="stages__title stages__title--desktop">С первых минут с головой погружаюсь в проект</h2>
          <button class="button stages__button stages__button--desktop" @click="scrollToSection('contacts')">
            <span class="stages__button-circle">
              <svg class="stages__button-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="var(--accent-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span class="stages__button-text">Оставить заявку</span>
          </button>
        </div>
      </div>

      <button class="button stages__button stages__button--mobile" @click="scrollToSection('contacts')">
        <span class="stages__button-circle">
          <svg class="stages__button-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="var(--accent-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span class="stages__button-text">Оставить заявку</span>
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const stagesSection = ref(null)
const rightContent = ref(null)
const stageRefs = ref([])
const visibleItems = ref([])

const stages = [
  
  { title: 'Консультация', text: 'Узнаю, с какими проблемами и задачами пришел клиент. Какой лендинг он хочет получить в итоге' },
  { title: 'Изучение ниши', text: 'Провожу глубокий анализ ниши проекта/продукта, подбираю маркетинговую стратегию' },
  { title: 'Разработка макета', text: 'На основе анализа и выроботанной маркетинговой стратегии разрабатывается дизайн и контент лендинга' },
  { title: 'Согласование', text: 'Утвержается макет сайта с заказчиком, вносятся необходимые правки' },
  { title: 'Верстка лендинга', text: 'По согласованному макету производится верстка проекта' },
  { title: 'Контрольные правки', text: 'После того, как лендинг сверстан, заказчик оценивает его, вносит свои предложения и корректировки' },
  { title: 'Размещение на хостинге', text: 'Лендинг полностью готов к размещению на хостинге. Устанавливается доменное имя' }
]

const handleScroll = () => {
  const stages = stagesSection.value
  if (!stages) return

  const rect = stages.getBoundingClientRect()
  const scrollPosition = window.scrollY
  const isMobile = window.innerWidth <= 768

  const startFadePosition = isMobile ? 3100 : 3800
  const fadeOutDistance = isMobile ? 800 : 1000

  if (scrollPosition > startFadePosition) {
    const progress = Math.min(1, (scrollPosition - startFadePosition) / fadeOutDistance)
    const opacity = 1 - progress
    const scale = 1 - (progress * 0.2)
    const translateY = progress * 50

    stages.style.opacity = opacity
    stages.style.transform = `scale(${scale}) translateY(${translateY}px)`
  } else {
    stages.style.opacity = 1
    stages.style.transform = 'none'
  }

  if (rightContent.value && !isMobile) {
    const rightTranslateY = Math.min(scrollPosition * 0.1, 100)
    rightContent.value.style.transform = `translateY(${rightTranslateY}px)`
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  

  visibleItems.value = new Array(stages.length).fill(false)
  
 
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const index = stageRefs.value.findIndex(ref => ref === entry.target)
      if (index !== -1) {
        if (entry.isIntersecting) {
          setTimeout(() => {
            visibleItems.value[index] = true
          }, index * 100)
        }
      }
    })
  }, {
    threshold: 0.2, 
    rootMargin: '0px 0px -10% 0px' 
  })


  stageRefs.value.forEach(ref => {
    if (ref) observer.observe(ref)
  })


  onUnmounted(() => {
    observer.disconnect()
    window.removeEventListener('scroll', handleScroll)
  })
})

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId)
  if (section) {
    const headerHeight = document.querySelector('.header').offsetHeight
    const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset - headerHeight

    window.scrollTo({
      top: sectionPosition,
      behavior: 'smooth'
    })
  }
}
</script>

<style scoped>
.stages {
  padding: 8rem 0;
  background-color: var(--background-color);
  margin: 0 10rem;
  position: relative;
  min-height: 100vh;
  transition: opacity 0.3s ease, transform 0.3s ease;
  will-change: transform, opacity;
  transform-origin: center center;
}

.stages__container {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
}

.stages__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  margin: 0;
  position: relative;
}

.stages__left {
  margin: 0;
  padding: 0;
}

.stages__items {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.stages__item {
  background-color: var(--secondary-color);
  border-radius: 35px;
  padding: 3rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.stages__item--visible {
  opacity: 1;
  transform: translateY(0);
}

.stages__item-header {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.stages__item-number {
  font-size: 5rem;
  font-weight: 700;
  color: #000000;
  line-height: 1;
}

.stages__item-title {
  font-size: 5rem;
  font-weight: 600;
  color: #000000;
  line-height: 1;
}

.stages__item-text {
  font-size: 3rem;
  color: #000000;
  line-height: 1;
  margin-top: 1rem;
}

.stages__right {
  position: sticky;
  top: 10rem;
  margin: -10rem 0 10rem 0;
  padding: 0;
  height: fit-content;
  display: flex;
  flex-direction: column;
  transform-origin: center center;
  will-change: transform;
  transition: transform 0.3s ease;
}

.stages__title {
  margin: 0;
  padding: 0;
  font-size: 9rem;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1.1;
  margin-bottom: 4rem;
}

.stages__button {
  max-width: 100%;
  min-width: 10px;
  display: flex;
  align-items: center;
  text-align: right;
  padding: 1rem 3rem;
  height: 70px;
  border-radius: 35px;
  font-size: 3rem;
  font-weight: 500;
  background-color: var(--accent-color);
  color: var(--background-color);
}

.stages__button-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: var(--background-color);
  border-radius: 50%;
  margin-right: 1.5rem;
}

.stages__button-arrow {
  transform: rotate(40deg);
  transition: transform 0.3s ease;
  width: 30px;
  height: 30px;
}

.stages__button:hover .stages__button-arrow {
  transform: rotate(40deg) translateX(2px);
}

.stages__button-text {
  flex-grow: 1;
  font-size: 4rem;
}

.stages__button--mobile {
  display: none;
}

.stages__title--mobile {
  display: none;
}

@media (max-width: 768px) {
  .stages {
    margin: 0;
    padding: 3rem;
    position: relative;
  }

  .stages__container {
    min-width: 100%;
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    padding: 0;
  }

  .stages__content {
    display: flex;
    flex-direction: column;
    gap: 4rem;
  }

  .stages__right {
    display: none;
  }

  .stages__title--mobile {
    display: block;
    font-size: 6rem;
    margin-bottom: 3rem;
    text-align: left;
    color: var(--text-color);
    line-height: 1;
  }
  .stages__item-title{
    font-size: 5rem;
  }

  .stages__button--mobile {
    display: flex;
    width: 100%;
    height: 60px;

    margin-top: 4rem;
    align-items: center;
  }

  .stages__button-text{
    font-size: 3.5rem;
  }

  .stages__left {
    order: 0;
  }
}
</style> 