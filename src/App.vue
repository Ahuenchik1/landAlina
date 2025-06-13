<template>
  <div class="app">
    <MetaTags />
    <StructuredData />
    <CustomCursor />
    <Header />
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
    <Footer v-if="!isFooterHidden" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import CustomCursor from './components/CustomCursor.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import MetaTags from './components/MetaTags.vue'
import StructuredData from './components/StructuredData.vue'

const route = useRoute()
const isFooterHidden = computed(() => {
  return route.path === '/privacy-policy' || route.path === '/terms-of-use'
})
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


* {
  scrollbar-width: none;
}


::-webkit-scrollbar {
  display: none;
}


body {
  -ms-overflow-style: none;
}


html, body {
  max-width: 100%;
}


@media (min-width: 769px) {
  * {
    cursor: none !important;
  }
}
</style> 