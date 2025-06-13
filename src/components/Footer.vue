<template>
  <footer class="footer">
    <div class="container footer__container">
      <div class="footer__content">
        <div class="footer__left">
          <div class="footer__logo">
            <img src="../assets/logo.png" alt="LandAlina Logo">
          </div>
          <p class="footer__description">
            Профессиональные услуги по созданию лендингов для бизнеса
          </p>
        </div>
        <div class="footer__nav">
          <h3 class="footer__nav-title">Навигация</h3>
          <ul class="footer__nav-list">
            <li class="footer__nav-item">
              <a href="#main" class="footer__nav-link" @click.prevent="scrollToSection('main')">Главная</a>
            </li>
            <li class="footer__nav-item">
              <a href="#services" class="footer__nav-link" @click.prevent="scrollToSection('services')">Услуги</a>
            </li>
            <li class="footer__nav-item">
              <a href="#about" class="footer__nav-link" @click.prevent="scrollToSection('about')">Обо мне</a>
            </li>
            <li class="footer__nav-item">
              <a href="#contacts" class="footer__nav-link" @click.prevent="scrollToSection('contacts')">Контакты</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <div class="footer__copyright">
          © 2023 Land-Alina. Все права защищены
        </div>
        <div class="footer__links">
          <router-link to="/privacy-policy" class="footer__link">Политика конфиденциальности</router-link>
          <router-link to="/terms-of-use" class="footer__link">Условия использования</router-link>
        </div>
        <div class="footer__social">
          <a 
            href="https://t.me/malivadimovna" 
            class="footer__social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="../assets/telegram.svg" alt="Telegram">
          </a>
          <a 
            href="https://wa.me/79967443218?text=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82!%20%F0%9F%91%8B%20%D0%9C%D0%BD%D0%B5%20%D0%BD%D1%83%D0%B6%D0%B5%D0%BD%20%D0%BB%D0%B5%D0%BD%D0%B4%D0%B8%D0%BD%D0%B3!" 
            class="footer__social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="../assets/whatsapp.svg" alt="WhatsApp">
          </a>
          <a 
            href="https://vk.com/malivadimovna" 
            class="footer__social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="../assets/Vk.svg" alt="VK">
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const footerSection = ref(null)

const scrollToSection = (sectionId) => {
  if (sectionId === 'main') {
    const hero = document.querySelector('.hero')
    if (hero) {
      hero.style.transform = 'none'
      hero.style.opacity = '1'
    }
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    return
  }

  const section = document.getElementById(sectionId)
  if (section) {
    const headerOffset = 100
    const elementPosition = section.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}
</script>

<style scoped>
.footer {
  background-color: var(--secondary-color);
  color: var(--background-color);
  padding: 8rem 0 3rem;
}

.footer__container {
  display: flex;
  flex-direction: column;
  gap: 6rem;
}

.footer__content {
  display: flex;
  gap: 6rem;
  justify-content: space-between;
  align-items: center;
}

.footer__left {
  flex: 1;
  max-width: 500px;
}

.footer__logo {
  margin-bottom: 3rem;
}

.footer__logo img {
  width: 300px;
  height: auto;
}

.footer__description {
  font-size: 3.2rem;
  line-height: 1.4;
  opacity: 0.8;
}

.footer__nav {
  flex: 1;
  max-width: 800px;
  overflow-x: auto;
  padding-bottom: 1rem;
  scrollbar-width: none; 
  -ms-overflow-style: none;
  text-align: right; 
}

.footer__nav::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.footer__nav-title {
  font-size: 3.6rem;
  font-weight: 600;
  margin-bottom: 3rem;
  color: var(--accent-color);
  text-align: right;
}

.footer__nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 4rem;
  flex-wrap: nowrap;
  min-width: min-content;
  justify-content: flex-end;
}

.footer__nav-item {
  margin-bottom: 0;
  flex-shrink: 0;
}

.footer__nav-link {
  font-size: 3.2rem;
  color: var(--background-color);
  text-decoration: none;
  transition: color 0.3s ease;
  opacity: 0.8;
  white-space: nowrap;
  text-align: right;
}

.footer__nav-link:hover {
  color: var(--accent-color);
  opacity: 1;
}

.footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer__copyright {
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.7);
}

.footer__links {
  display: flex;
  gap: 4rem;
  margin: 3rem 0;
}

.footer__link {
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer__link:hover {
  color: var(--accent-color);
}

.footer__social {
  display: flex;
  gap: 3rem;
}

.footer__social-link {
  width: 7rem;
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.footer__social-link:hover {
  background-color: var(--accent-color);
  transform: translateY(-2px);
}

.footer__social-link img {
  width: 3.5rem;
  height: 3.5rem;
}

@media (max-width: 768px) {
  .footer {
    padding: 3rem 0 2rem;
  }

  .footer__content {
    flex-direction: column;
    gap: 2rem;
  }

  .footer__left,
  .footer__nav,
  .footer__contacts {
    max-width: 100%;
    text-align: center;
  }

  .footer__logo {
    display: flex;
    justify-content: center;
  }

  .footer__logo img {
    width: 170px;
  }

  .footer__description {
    font-size: 3.5rem;
  }

  .footer__bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .footer__social {
    justify-content: center;
  }

  .footer__social-link {
    width: 40px;
    height: 40px;
  }

  .footer__social-link img {
    width: 10rem;
    height: 10rem;
  }

  .footer__nav {
    overflow-x: visible;
    padding-bottom: 0;
    text-align: center;
  }

  .footer__nav-title {
    text-align: center;
  }

  .footer__nav-list {
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
  }

  .footer__links {
    flex-direction: column;
    gap: 1rem;
  }
}
</style> 