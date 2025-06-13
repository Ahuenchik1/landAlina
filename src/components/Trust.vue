<template>
  <section class="trust" ref="trustSection">
    <div class="container trust__container">
      <div class="trust__content">
        <h2 class="trust__title">Как происходит оплата?</h2>
        <div class="trust__image-wrapper mobile-only">
          <img src="../assets/trust.jpg" alt="Профессиональная разработка" class="trust__image">
        </div>
        <div class="trust__text-wrapper">
          <p class="trust__text">
            Я понимаю, что в связи с участившимися случаями мошеничества, порой бывает сложно доверить свой капитал.
          </p>
          <p class="trust__subtext">
            Выход из положения есть. Я не получу оплату пока проект не будет завершен, так как заказ региструируется на фриланс платформе Kwork, после обсуждения проекта.
          </p>
        </div>
        <button class="trust__button button" @click="scrollToSection('contacts')">
          <span class="trust__button-circle">
            <svg class="trust__button-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="var(--accent-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="trust__button-text">Оставить заявку</span>
        </button>
      </div>
      <div class="trust__image-wrapper desktop-only">
        <img src="../assets/trust.jpg" alt="Профессиональная разработка" class="trust__image">
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const trustSection = ref(null)

onMounted(() => {

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

  if (trustSection.value) {
    observer.observe(trustSection.value)
  }


  const handleScroll = () => {
    if (!trustSection.value) return

    const rect = trustSection.value.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const fadeStart = windowHeight * 0.7 
    const fadeEnd = -windowHeight * 0.5 
    let progress = 0
    if (rect.bottom < fadeStart) {
      progress = Math.min(1, (fadeStart - rect.bottom) / (fadeStart - fadeEnd))
    }

  
    const scale = 1 - (progress * 0.6) // Уменьшаем до 80%
    const translateY = progress * 50 // Сдвигаем вверх на 100px
    const opacity = 1 - progress

    trustSection.value.style.transform = `scale(${scale}) translateY(${translateY}px)`
    trustSection.value.style.opacity = opacity
  }

  window.addEventListener('scroll', handleScroll)

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
.trust {
  padding: 8rem 0;
  background-color: var(--background-color);
  transform-origin: center center;
  will-change: transform, opacity;
  transition: transform 0.1s ease-out, opacity 0.1s ease-out;
}

.trust__container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  min-height: 80vh;
}

.trust__content {
  display: flex;
  flex-direction: column;
  height: 80%;
  max-height: 90vh;
  justify-content: space-between;
  padding: 2rem 0;
}


.trust__title,
.trust__image-wrapper.mobile-only,
.trust__text,
.trust__subtext,
.trust__button {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}



.trust.animate{
  margin: 2 rem 0;
  padding: 0;
}

.trust.animate .trust__title {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0s;
}

.trust.animate .trust__image-wrapper.mobile-only {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.5s;
}

.trust.animate .trust__text {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.7s;
}

.trust.animate .trust__subtext {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.8s;
}

.trust.animate .trust__button {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 1s;
}

.trust__title {
  font-size: 10rem;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1.1;
}

.trust__text-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
  justify-content: center;
  padding: 4rem 0;
}

.trust__text {
  font-size: 5rem;
  color: var(--secondary-color);
  line-height: 1.2;
  margin-bottom: 10rem;
}

.trust__subtext {
  font-size: 5rem;
  color: var(--secondary-color);
  line-height: 1.2;
}

.trust__button {
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

.trust__button-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: var(--background-color);
  border-radius: 50%;
  margin-right: 1.5rem;
}

.trust__button-arrow {
  transform: rotate(40deg);
  transition: transform 0.3s ease;
  width: 30px;
  height: 30px;
}

.trust__button:hover .trust__button-arrow {
  transform: rotate(40deg) translateX(2px);
}

.trust__button-text {
  flex-grow: 1;
  font-size: 4rem;
}

.trust__image-wrapper {
  width: 100%;
  height: 100%;
  border-radius: 35px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.trust__image {
  width: 90%;
  height: 90%;
  object-fit: cover;
  border-radius: 35px;
  max-height: 90vh;
}

.mobile-only {
  display: none;
}

@media (max-width: 768px) {
  .trust {
    margin: 2rem 0;
    padding: 4rem 2rem;
  }

  .mobile-only {
    display: flex;
    margin: 3rem 0;
    width: 100%;
    height: auto;
    aspect-ratio: 9/16;
  }

  .desktop-only {
    display: none;
  }

  .trust__container {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 0;
  }

  .trust__content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    max-height: none;
    padding: 0;
  }

  .trust__title {
    font-size: 6rem;
  }

  .trust__image-wrapper {
    padding: 0;
    width: 100%;
    height: 85%;
  }

  .trust__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .trust__text-wrapper {
    gap: 2rem;
    padding: 3rem 0;
  }

  .trust__text {
    font-size: 4.5rem;
    margin-bottom: 1rem;
  }

  .trust__subtext {
    font-size: 4.5rem;
    margin-bottom: 2rem;
  }

  .trust__button {
    height: 50px;
  }

  .trust__button-circle {
    width: 40px;
    height: 40px;
  }

  .trust__button-arrow {
    width: 24px;
    height: 24px;
  }

  .trust__button-text {
    font-size: 3rem;
  }
}
</style> 