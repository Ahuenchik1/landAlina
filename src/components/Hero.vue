<template>
  <section class="hero" id="main" ref="mainSection">
    <div class="hero__video">
      <video 
        autoplay 
        muted 
        playsinline
        @ended="onVideoEnd"
      >
        <source src="../assets/hero-video.mp4" type="video/mp4">
      </video>
    </div>
    <div class="container hero__container">
      <div class="hero__content">
        <h1 class="hero__title">
          <span class="hero__title--accent">Я ЗНАЮ,</span>
          <span class="hero__title--regular">КАК СДЕЛАТЬ ЛЕНДИНГ ДЛЯ</span>
          <TypewriterText :texts="typingTexts" />
        </h1>
        <button class="button hero__button" @click="scrollToSection('contacts')">
          <span class="hero__button-circle">
            <svg class="hero__button-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="var(--accent-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="hero__button-text">Хочу лендинг</span>
        </button>
      </div>
      <div class="hero__features">
        
        <div class="hero__features-list">
          <div class="hero__feature left">
            
            <div class="hero__feature-content">
              <h3 class="hero__feature-title">Современный дизайн</h3>
              <p class="hero__feature-text">Создаю сайты с актуальным дизайном, который привлекает клиентов</p>
            </div>
          </div>
          <div class="hero__feature center">
            
            <div class="hero__feature-content">
              <h3 class="hero__feature-title">Адаптивность</h3>
              <p class="hero__feature-text">Сайт будет отлично выглядеть на всех устройствах</p>
            </div>
          </div>
          <div class="hero__feature right">
            
            <div class="hero__feature-content">
              <h3 class="hero__feature-title">Быстрая работа</h3>
              <p class="hero__feature-text">Оптимизированная скорость загрузки и работы сайта</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import TypewriterText from './TypewriterText.vue'

const typingTexts = [
  'ВАШЕГО БИЗНЕСА',
  'ВАШЕГО МАГАЗИНА',
  'ВАШЕЙ КОМПАНИИ',
  'ВАШИХ УСЛУГ',
  'ВАШЕГО БРЕНДА',
  'ВАШИХ КУРСОВ',
  'ВАШЕГО СТАРТАПА',
  'ВАШЕГО МЕРОПРИЯТИЯ'
]

const onVideoEnd = (event) => {
  event.target.currentTime = event.target.duration - 0.05
}

const handleScroll = () => {
  const hero = document.querySelector('.hero')
  if (!hero) return

  const scrollPosition = window.scrollY
  
  // Сбрасываем трансформацию при скролле вверх
  if (scrollPosition <= 0) {
    hero.style.transform = 'none'
    hero.style.opacity = '1'
    return
  }

  const scale = Math.max(0.8, 1 - scrollPosition / 1000)
  const translateY = scrollPosition * 0.5

  hero.style.transform = `scale(${scale}) translateY(${translateY}px)`
  hero.style.opacity = Math.max(0, 1 - scrollPosition / 800)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.hero {
  min-height: 100vh;
  padding: 10rem 0 0rem 0rem;
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  transform-origin: top center;
  will-change: transform, opacity;
  transition: transform 0.1s ease-out, opacity 0.1s ease-out;
}

.hero__video {
  position: absolute;
  top: 0;
  right: 0;
  width: 65%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.hero__video::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    var(--background-color) 0%,
    rgba(var(--background-color-rgb), 0.8) 10%,
    transparent 100%
  );
}

.hero__video video {
  width: 150%;
  height: 100%;
  object-fit: cover;
  object-position: left center;
  transform: translateX(-10%);
}

.hero__container {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 35rem);
  width: 100%;
  margin: 7rem 12rem 0rem 12rem;
}

.hero__content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 75%;
  z-index: 1;
  margin-top: 0rem;
  margin-bottom: 4rem;
}

.hero__title {
  font-size: 15rem;
  line-height: 1.1;
  font-weight: 700;
}

.hero__title--accent {
  color: var(--accent-color);
}

.hero__title--regular {
  color: var(--secondary-color);
  display: block;
}

:deep(.typewriter) {
  color: var(--accent-color);
  display: block;
}

.hero__button {
  max-width: 70rem;
  min-width: 10px;
  display: flex;
  align-items: center;
  text-align: right;
  padding: 1rem 3rem;
  margin: 5rem 0 0 0;
  height: 70px;
  border-radius: 35px;
  font-size: 3.5rem;
  font-weight: 500;
  background-color: var(--accent-color);
  color: var(--background-color);
}

.hero__button-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: var(--background-color);
  border-radius: 50%;
}

.hero__button-arrow {
  transform: rotate(40deg);
  transition: transform 0.3s ease;
  width: 30px;
  height: 30px;
}

.hero__button:hover .hero__button-arrow {
  transform: rotate(40deg) translateX(2px);
}

.hero__button-text {
  flex-grow: 1;
}

.hero__features {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background-color: transparent;
  border-radius: 35px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin: 0 10rem;
  
}

.hero__features-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: var(--secondary-color);
  border-radius: 50%;
  cursor: pointer;
}

.hero__features-list {
  display: flex;
  gap: 4rem;
  flex-grow: 1;
}

.hero__feature {
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.hero__feature-content {
  flex: 1;
}

.hero__feature.left {
  text-align: left;
}

.hero__feature.center {
  text-align: center;
}

.hero__feature.right {
  text-align: right;
}


.hero__feature.center .hero__feature-arrow {
  transform: rotate(-90deg);
}

.hero__feature.right .hero__feature-arrow {
  transform: rotate(-45deg);
}

.hero__feature-title {
  font-size: 3rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.hero__feature-text {
  font-size: 2.7rem;
  color: var(--secondary-color);
  
}

@media (max-width: 768px) {
  .hero {
    padding: 2rem;
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .hero__container {
    min-height: auto;
    padding: 0;
    display: flex;
    flex-direction: column;
    flex: 1;
    max-width: 100%;
  }

  .hero__content {
    max-width: 100%;
    margin-top: 7rem;
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .hero__title {
    font-size: 10rem;
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-bottom: auto;
  }

  .hero__title--regular {
    font-size: 5rem;
  }

  :deep(.typewriter) {
    font-size: 9rem;
    line-height: 1.5;
  }

  .hero__button {
    max-width: 100%;
    height: 60px;
    font-size: 1.6rem;
    padding: 0.8rem 1.5rem;
    margin: 0 auto;
    width: 100%;
    margin-top: auto;
  }
  .hero__button-text{
    font-size: 4rem;
  }

  .hero__button-circle {
    width: 40px;
    height: 40px;
    margin-right: 1rem;
  }

  .hero__button-arrow {
    width: 24px;
    height: 24px;
  }

  .hero__video {
    width: 100%;
    height: 100%;
    opacity: 0.2;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .hero__video::after {
    background: linear-gradient(
      to bottom,
      var(--background-color) 0%,
      rgba(var(--background-color-rgb), 0.6) 50%,
      var(--background-color) 100%
    );
  }

  .hero__video video {
    width: 150%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transform: none;
  }

  .hero__features {
    display: none;
  }

  .hero__features-list {
    flex-direction: column;
    gap: 2rem;
  }

  .hero__feature {
    width: 100%;
    gap: 1.5rem;
  }

  .hero__feature-circle {
    width: 35px;
    height: 35px;
  }

  .hero__feature-arrow {
    width: 20px;
    height: 20px;
  }

  .hero__feature-title {
    font-size: 2rem;
    margin-bottom: 0.8rem;
  }

  .hero__feature-text {
    font-size: 1.4rem;
  }
}
</style> 