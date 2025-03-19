<template>
  <div class="app">
    <CustomCursor />
    <Header />
    <Hero />
    <AboutMe />
    <Stages />
    <Services />
    <Trust />
    <Reviews />
    <Quiz />
    <Faq />
    <ContactForm />
    <Footer />
  </div>
</template>

<script setup>
import CustomCursor from './components/CustomCursor.vue'
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import AboutMe from './components/AboutMe.vue'
import Stages from './components/Stages.vue'
import Services from './components/Services.vue'
import Trust from './components/Trust.vue'
import Reviews from './components/Reviews.vue'
import Quiz from './components/Quiz.vue'
import Faq from './components/Faq.vue'
import ContactForm from './components/ContactForm.vue'
import Footer from './components/Footer.vue'
</script>

<style>
@import './styles/reset.css';
@import './styles/main.css';

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

/* Скрываем скролл-бар для Firefox */
* {
  scrollbar-width: none;
}

/* Скрываем скролл-бар для Chrome, Safari и Edge */
::-webkit-scrollbar {
  display: none;
}

/* Обеспечиваем прокрутку для IE и Edge */
body {
  -ms-overflow-style: none;
}

/* Предотвращаем горизонтальный скролл */
html, body {
  max-width: 100%;
}

/* Скрываем стандартный курсор на десктопе */
@media (min-width: 769px) {
  * {
    cursor: none !important;
  }
}
</style> 