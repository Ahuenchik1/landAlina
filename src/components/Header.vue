<template>
  <header 
    class="header" 
    ref="header"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="container header__container">
      <a href="/" class="header__logo">
        <img src="../assets/Logo.png"/>
      </a>
      <a href="/" class="header__logo-mobile">
        <img src="../assets/MobileLogo.svg"/>
      </a>
      <nav class="header__nav">
        <ul class="header__menu">
          <li><a href="#about" class="header__link" @click.prevent="scrollToSection('about')">Обо мне</a></li>
          <li><a href="#stages" class="header__link" @click.prevent="scrollToSection('stages')">Этапы</a></li>
          <li><a href="#services" class="header__link" @click.prevent="scrollToSection('services')">Услуги</a></li>
          <li><a href="#reviews" class="header__link" @click.prevent="scrollToSection('reviews')">Отзывы</a></li>
          <li><a href="#faq" class="header__link" @click.prevent="scrollToSection('faq')">FAQ</a></li>
        </ul>
      </nav>
      <button class="button header__button" @click="scrollToSection('contacts')">
        <span class="header__button-circle">
          <svg class="header__button-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="var(--accent-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span class="header__button-text">Заказать</span>
      </button>
      <button 
        class="header__burger" 
        :class="{ 'header__burger--active': isMenuOpen }"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div 
        class="header__mobile-menu"
        :class="{ 'header__mobile-menu--active': isMenuOpen }"
      >
        <nav class="header__nav-mobile">
          <ul class="header__menu">
            <li><a href="#about" class="header__link" @click="closeMenuAndScroll('about')">Обо мне</a></li>
            <li><a href="#stages" class="header__link" @click="closeMenuAndScroll('stages')">Этапы</a></li>
            <li><a href="#services" class="header__link" @click="closeMenuAndScroll('services')">Услуги</a></li>
            <li><a href="#reviews" class="header__link" @click="closeMenuAndScroll('reviews')">Отзывы</a></li>
            <li><a href="#faq" class="header__link" @click="closeMenuAndScroll('faq')">FAQ</a></li>
          </ul>
        </nav>
        <button class="button header__button" @click="closeMenuAndScroll('contacts')">
          <span class="header__button-circle">
            <svg class="header__button-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="var(--accent-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="header__button-text">Заказать</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(false)
const header = ref(null)
const lastScrollTop = ref(0)
const isScrollingDown = ref(false)
const isHovered = ref(false)

watch(isMenuOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

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

const closeMenuAndScroll = (sectionId) => {
  closeMenu()
  scrollToSection(sectionId)
}

const handleScroll = () => {
  if (!header.value) return

  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop
  isScrollingDown.value = currentScrollTop > lastScrollTop.value
  lastScrollTop.value = currentScrollTop

  if (isScrollingDown.value && !isHovered.value) {
    const nav = header.value.querySelector('.header__nav')
    if (nav) {
      nav.style.opacity = '0'
    }
  } else {
    const nav = header.value.querySelector('.header__nav')
    if (nav) {
      nav.style.opacity = '1'
    }
  }
}

const handleMouseEnter = () => {
  isHovered.value = true
  if (header.value) {
    const nav = header.value.querySelector('.header__nav')
    if (nav) {
      nav.style.opacity = '1'
    }
  }
}

const handleMouseLeave = () => {
  isHovered.value = false
  if (header.value && isScrollingDown.value) {
    const nav = header.value.querySelector('.header__nav')
    if (nav) {
      nav.style.opacity = '0'
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 2rem 0;
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
  background-color: transparent;
  backdrop-filter: none;
}

.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 12rem;
  padding: 0 12rem;
}

.header__logo {
  height: 100%;
  display: flex;
  align-items: center;
}

.header__logo img {
  height: 8rem;
  width: auto;
}

.header__logo-mobile {
  display: none;
}

.header__logo-mobile img {
  height: 3rem;
  width: auto;
}

.header__nav {
  display: flex;
  align-items: center;
  transition: opacity 0.3s ease;
}

.header__menu {
  display: flex;
  align-items: center;
  gap: 8rem;
}

.header__link {
  color: var(--text-color);
  transition: color 0.3s ease;
  font-size: 2.7rem;
  font-weight: 500;
}

.header__link:hover {
  color: var(--accent-color);
}

.header__button {
  min-width: 35rem;
  display: flex;
  align-items: center;
  text-align: right;
  padding: 1rem 3rem;
  height: 6rem;
  border-radius: 3rem;
  font-size: 3.5rem;
  font-weight: 500;
}

.header__button-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.2rem;
  height: 4.2rem;
  background-color: var(--background-color);
  border-radius: 50%;
  margin-right: 1.8rem;
}

.header__button-arrow {
  transform: rotate(40deg);
  transition: transform 0.3s ease;
  width: 2.4rem;
  height: 2.4rem;
}

.header__button:hover .header__button-arrow {
  transform: rotate(40deg) translateX(2px);
}

.header__button-text {
  flex-grow: 1;
}

.header__burger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 101;
}

.header__burger span {
  width: 100%;
  height: 2px;
  background-color: var(--text-color);
  transition: all 0.3s ease;
  display: block;
}

.header__burger--active span:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
  padding-right:0.5rem;
}

.header__burger--active span:nth-child(2) {
  opacity: 0;
}

.header__burger--active span:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
  padding-right:0.5rem;
}

.header__mobile-menu {
  display: none;
  position: fixed;
  top: -100vh;
  left: 1rem;
  right: 1rem;
  width: calc(100% - 2rem);
  height: auto;
  max-height: calc(100vh - 6.5rem);
  overflow-y: auto;
  background-color: var(--secondary-color);
  padding: 2rem;
  transition: top 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 35px;
  margin-top: 5rem;
  -webkit-overflow-scrolling: touch;
}

.header__mobile-menu--active {
  top: 0;
}

.header__mobile-menu .header__link {
  color: var(--background-color);
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  width: 50%;
  padding: 0.5rem 0;
}

.header__mobile-menu .header__link:hover {
  color: var(--accent-color);
}

.header__mobile-menu .header__button {
  margin-top: 3rem;
  width: 100%;
  background-color: var(--accent-color);
  color: var(--background-color);
  padding: 0.5rem 0.5rem;
}

@media (max-width: 768px) {
  .header {
    background-color: transparent;
    padding: 1rem 0;
  }

  .header__container {
    width: 100%;
    height: 10rem;
    padding: 0 4rem;
    margin: 0;
  }

  .header__logo {
    display: none;
  }

  .header__nav {
    display: none;
  }

  .header__button {
    display: none;
  }

  .header__logo-mobile {
    display: block;
  }

  .header__logo-mobile img {
    height: 5rem;
    width: auto;
  }

  .header__burger {
    display: flex;
    width: 5rem;
    height: 2.4rem;
  }

  .header__burger span {
    height: 0.2rem;
  }

  .header__mobile-menu {
    display: flex;
    position: fixed;
    top: -100vh;
    left: 1rem;
    right: 1rem;
    width: calc(100% - 2rem);
    background-color: var(--secondary-color);
    padding: 3rem 2rem;
    border-radius: 3.5rem;
    margin-top: 5rem;
  }

  .header__mobile-menu--active {
    top: 6rem;
  }

  .header__mobile-menu .header__menu {
    flex-direction: column;
    gap: 3rem;
    width: 100%;
  }

  .header__mobile-menu .header__link {
    color: var(--background-color);
    font-size: 4rem;
    font-weight: 500;
    text-align: center;
    width: 100%;
    padding: 1rem 0;
  }

  .header__mobile-menu .header__button {
    display: flex;
    min-width: auto;
    width: 100%;
    height: 6rem;
    margin-top: 3rem;
    font-size: 4rem;
    padding: 1rem 2rem;
  }

  .header__mobile-menu .header__button-circle {
    width: 5rem;
    height: 5rem;
  }

  .header__mobile-menu .header__button-arrow {
    width: 3rem;
    height: 3rem;
  }
}
</style> 