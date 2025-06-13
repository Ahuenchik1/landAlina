<template>
  <div></div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {

  const organizationScript = document.createElement('script')
  organizationScript.type = 'application/ld+json'
  organizationScript.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Land-Alina",
    "url": "https://land-alina.ru",
    "logo": "https://land-alina.ru/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+7-996-744-32-18",
      "contactType": "customer service",
      "availableLanguage": ["Russian"]
    },
    "sameAs": [
      "https://t.me/malivadimovna",
      "https://wa.me/79967443218"
    ]
  })
  document.head.appendChild(organizationScript)

 
  const serviceScript = document.createElement('script')
  serviceScript.type = 'application/ld+json'
  serviceScript.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Создание лендингов",
    "provider": {
      "@type": "Organization",
      "name": "Land-Alina"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Услуги по созданию лендингов",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Создание лендинга под ключ",
            "description": "Полный цикл разработки лендинга: дизайн, верстка, SEO-оптимизация"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Дизайн лендинга",
            "description": "Создание современного и привлекательного дизайна для вашего лендинга"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Верстка лендинга",
            "description": "Адаптивная верстка с использованием современных технологий"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO-оптимизация",
            "description": "Оптимизация лендинга для поисковых систем"
          }
        }
      ]
    }
  })
  document.head.appendChild(serviceScript)
})
</script> 