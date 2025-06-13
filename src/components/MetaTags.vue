<template>
  <div></div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentUrl = computed(() => {
  return `https://land-alina.ru${route.path}`
})

onMounted(() => {
  const metaTags = [
    { name: 'title', content: 'Land-Alina - Создание лендингов под ключ' },
    { name: 'description', content: 'Профессиональное создание лендингов под ключ. Современный дизайн, адаптивная верстка, SEO-оптимизация. Быстро, качественно, с гарантией результата.' },
    { name: 'keywords', content: 'лендинг, создание лендингов, веб-дизайн, адаптивный дизайн, SEO-оптимизация, продающие страницы, лендинги для бизнеса, сайт под ключ, лендинг под ключ, лендинг для магазина, купить лендинг, заказать лендинг, как сделать лендинг' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: currentUrl.value },
    { property: 'og:title', content: 'Land-Alina - Создание лендингов под ключ' },
    { property: 'og:description', content: 'Профессиональное создание лендингов под ключ. Современный дизайн, адаптивная верстка, SEO-оптимизация.' },
    { property: 'og:image', content: '/og-image.jpg' },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:url', content: currentUrl.value },
    { property: 'twitter:title', content: 'Land-Alina - Создание лендингов под ключ' },
    { property: 'twitter:description', content: 'Профессиональное создание лендингов под ключ. Современный дизайн, адаптивная верстка, SEO-оптимизация.' },
    { property: 'twitter:image', content: '/og-image.jpg' }
  ]

  metaTags.forEach(tag => {
    const meta = document.createElement('meta')
    Object.entries(tag).forEach(([key, value]) => {
      meta.setAttribute(key, value)
    })
    document.head.appendChild(meta)
  })
})
</script> 