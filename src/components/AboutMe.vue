<template>
  <section class="about-me" id="about" ref="aboutMeSection">
    <div class="container about-me__container">
      <div class="about-me__content">
        <div class="about-me__left" ref="leftContent">
          <h2 class="about-me__title">С 2022 года помогаю бизнесу расти</h2>
          <p class="about-me__text">
            Разрабатываю с нуля эффективные лендинги с легким визуалом. Упор на логику и маркетинг.</p>
          <p class="about-me__subtext">У меня прозрачный процесс разработки, предлагаю решения в рамках вашего бюджета, закрываю дедлайны.</p>  
          <div class="about-me__advantages" ref="advantages">
            <div class="about-me__advantage">
              <div class="about-me__advantage-content">
                <h3 class="about-me__advantage-title">3</h3>
                <p class="about-me__advantage-text">года коммерческой деятельности</p>
              </div>
            </div>
            <div class="about-me__advantage">
              <div class="about-me__advantage-content">
                <h3 class="about-me__advantage-title">40+</h3>
                <p class="about-me__advantage-text">выполненных проектов</p>
              </div>
            </div>
          </div>
        </div>
        <div class="about-me__right" ref="rightContent">
          <div class="about-me__work">
            <div class="about-me__work-header">
              <span class="about-me__work-title">В работу входит</span>
            </div>
            <div class="about-me__work-steps">
              <div class="about-me__work-step" v-for="(step, index) in workSteps" :key="index">
                <div class="about-me__work-step-content" :ref="el => { if (el) workStepRefs[index] = el }">
                  <h3 class="about-me__work-step-title">{{ step.title }}</h3>
                  <p class="about-me__work-step-text">{{ step.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const aboutMeSection = ref(null)
const leftContent = ref(null)
const advantages = ref(null)
const rightContent = ref(null)
const workStepRefs = ref([])

const workSteps = [
  {
    title: 'Оформление',
    text: 'Индивидуальная структура и дизайн,разработка логотипа и наполнение текстами'
  },
  {
    title: 'Создание',
    text: 'Каталог, блог, эквайринг, галереи, мобильная версия, удобная админка и личный кабинетми'
  },
  {
    title: 'Интеграции',
    text: 'CRM системы, аналитика, домен и хостинг, настройка СЕО'
  },
  {
    title: 'Другое',
    text: 'Тех. поддержка, индивидуальные консультации, резервное копирование, многостраничность'
  }
]

const handleScroll = () => {
  if (!aboutMeSection.value) return

  const activeElement = document.activeElement
  if (activeElement && (
    activeElement.tagName === 'INPUT' ||
    activeElement.tagName === 'TEXTAREA' ||
    activeElement.tagName === 'SELECT'
  )) {
    return
  }

  const rect = aboutMeSection.value.getBoundingClientRect()
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

  aboutMeSection.value.style.transform = `scale(${scale}) translateY(${translateY}px)`
  aboutMeSection.value.style.opacity = opacity
}

const resetAnimation = () => {
  if (!aboutMeSection.value) return
  
  aboutMeSection.value.style.transform = 'scale(1) translateY(0)'
  aboutMeSection.value.style.opacity = '1'
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate')
        if (entry.target === aboutMeSection.value) {
          resetAnimation()
        }
      }
    })
  }, {
    threshold: 0.2
  })

  // Наблюдаем за всеми элементами, которые должны анимироваться
  if (leftContent.value) observer.observe(leftContent.value)
  if (advantages.value) observer.observe(advantages.value)
  if (rightContent.value) observer.observe(rightContent.value)
  if (aboutMeSection.value) observer.observe(aboutMeSection.value)

  // Наблюдаем за шагами работы на мобильных устройствах
  if (window.innerWidth <= 768) {
    workStepRefs.value.forEach(ref => {
      if (ref) observer.observe(ref)
    })
  }

  window.addEventListener('scroll', handleScroll)
  
  // Сбрасываем анимацию при загрузке страницы, если секция в поле зрения
  if (aboutMeSection.value) {
    const rect = aboutMeSection.value.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.8) {
      resetAnimation()
      // Добавляем классы анимации для всех элементов
      if (leftContent.value) leftContent.value.classList.add('animate')
      if (advantages.value) advantages.value.classList.add('animate')
      if (rightContent.value) rightContent.value.classList.add('animate')
      if (window.innerWidth <= 768) {
        workStepRefs.value.forEach(ref => {
          if (ref) ref.classList.add('animate')
        })
      }
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

</script>

<style scoped>
:root {
  font-size: 62.5%; 
}

@media (max-width: 1920px) {
  :root {
    font-size: 52.5%;
  }
}

@media (max-width: 1440px) {
  :root {
    font-size: 42.5%;
  }
}

@media (max-width: 768px) {
  :root {
    font-size: 32.5%;
  }
}

p .about-me__text {
  margin-bottom: 10rem;

}
.about-me {
  padding: 8rem 0 4rem;
  background-color: var(--background-color);
  margin: 0 10rem 10rem 10rem;
  position: relative;
  will-change: transform, opacity;
  transition: transform 0.1s ease-out, opacity 0.1s ease-out;
}

.about-me__container {
  max-width: 90%;
  
  padding: 0 2rem;
}

.about-me__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: stretch;
  min-height: 100%;
}

.about-me__left {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  min-height: 100%;
  opacity: 0;
  transform: translateX(-50px);
  transition: all 0.8s ease;
}

.about-me__left.animate {
  opacity: 1;
  transform: translateX(0);
}

.about-me__title {
  font-size: 10rem;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1.2;
  margin-bottom: 5rem;
}

.about-me__text {
  font-size: 5rem;
  line-height: 1;
  color: var(--secondary-color);
}

.about-me__subtext {
  margin-top: 2rem;
  font-size: 5rem;
  line-height: 1;
  color: var(--secondary-color);
}

.about-me__advantages {
  display: flex;
  gap: 2rem;
  margin-top: auto;
  padding-top: 4rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
  transition-delay: 0.3s;
}

.about-me__advantages.animate {
  opacity: 1;
  transform: translateY(0);
}

.about-me__advantage {
  display: flex;
  align-items: justify-content;
  gap: 2rem;
}


.about-me__advantage-content {
  flex: 1;
}

.about-me__advantage-title {
  font-size: 7rem;
  font-weight: 600;
  color: var(--accent-color);
  margin-bottom: 0.5rem;
}

.about-me__advantage-text {
  font-size: 5rem;
  color: var(--secondary-color);
  font-weight: 100;
  line-height: 0.8;
}

.about-me__right {
  position: relative;
  opacity: 0;
  transform: translateX(50px);
  transition: all 0.8s ease;
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  height: 100%;
 
}

.about-me__right.animate {
  opacity: 1;
  transform: translateX(0);
}

.about-me__work {
  background-color: var(--secondary-color);
  border-radius: 35px;
  padding: 4rem 2rem;
  box-shadow: 0 4px 25px rgb(255, 255, 255, 10);
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.about-me__work-header {
 margin-bottom: 3rem;
}

.about-me__work-title {
  
  background-color: var(--accent-color);
  color: var(--background-color);
  padding: 1rem 2rem;
  border-radius: 3rem;
  font-size:3rem;
  font-weight: 500;
}

.about-me__work-steps {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  flex: 1;
}

.about-me__work-step-content {
  flex: 1;
  background-color: #000000;
  border-radius: 35px;
  padding: 1.5rem 2.5rem;
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.5s ease;
}

.about-me__work-step-title {
  font-size: 5rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.about-me__work-step-text {
  font-size: 3rem;
  color: var(--secondary-color);
  line-height: 1.5;
}


@media (min-width: 769px) {
  .about-me__right.animate .about-me__work-step-content {
    opacity: 1;
    transform: translateX(0);
  }

  .about-me__right.animate .about-me__work-step:nth-child(1) .about-me__work-step-content {
    transition-delay: 0.2s;
  }

  .about-me__right.animate .about-me__work-step:nth-child(2) .about-me__work-step-content {
    transition-delay: 0.4s;
  }

  .about-me__right.animate .about-me__work-step:nth-child(3) .about-me__work-step-content {
    transition-delay: 0.6s;
  }

  .about-me__right.animate .about-me__work-step:nth-child(4) .about-me__work-step-content {
    transition-delay: 0.8s;
  }
}


@media (max-width: 768px) {
  .about-me {
    padding: 4rem 0rem;
    margin: 0;
  }

  .about-me__container {
    max-width: 100%;
    padding: 0;
  }

  .about-me__content {
    display: flex;
    flex-direction: column;
    gap: 4rem;
  }

  .about-me__left {
    gap: 2rem;
  }

  .about-me__right {
    padding-bottom: 2rem;
    width: 100%;
  }

  .about-me__work {
    width: 100%;
    padding: 2rem;
    margin-top: 0;
  }

  .about-me__work-title {
    font-size: 3rem;
    padding: 1rem 1rem;
    margin: 0 0 3rem 0;
  }

  .about-me__left {
    gap: 2rem;
  }

  .about-me__title {
    font-10ize: 6rem;
    line-height: 1;
  }

  .about-me__text {
    font-5e: 4.5rem;
    line-height: 1;
    margin-bottom: 3rem;
  }

  .about-me__subtext {
    foe: 5rem;
    line-height: 1;
    margin-top: 0;
  }

  .about-me__advantages {
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;
    padding-top: 3rem;
  }

  .about-me__advantage {
    flex: 1;
    justify-content: center;
    text-align: left;
  }

  .about-me__advantage-content {
    display: flex;
    flex-direction: column;
    align-items: left;
  }

  .about-me__advantage-title {
    font-size: 10rem;
    margin-bottom: 0.8rem;
  }

  .about-me__advantage-text {
    font-size: 3rem;
    line-height: 1;
  }

  .about-me__work-step-content {
    flex: 1;
    background-color: #000000;
    border-radius: 35px;
    padding: 3.5rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.5s ease;
  }
  
  .about-me__work-step-content.animate {
    opacity: 1;
    transform: translateY(0);
  }
  
  .about-me__work-step:nth-child(1) .about-me__work-step-content {
    transition-delay: 0.2s;
  }

  .about-me__work-step:nth-child(2) .about-me__work-step-content {
    transition-delay: 0.4s;
  }

  .about-me__work-step:nth-child(3) .about-me__work-step-content {
    transition-delay: 0.6s;
  }

  .about-me__work-step:nth-child(4) .about-me__work-step-content {
    transition-delay: 0.8s;
  }

  .about-me__work-step-title {
    font-size: 5rem;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 0.5rem;
  }

  .about-me__work-step-text {
    font-size: 3rem;
    color: var(--secondary-color);
    line-height: 1.5;
  }
}
</style> 