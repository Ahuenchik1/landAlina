<template>
  <button 
    class="base-button" 
    :class="[variant, { 'base-button--full': fullWidth }]"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline'].includes(value)
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

const handleClick = () => {
  const contactsSection = document.getElementById('contacts')
  if (contactsSection) {
    contactsSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.base-button {
  padding: 2rem 4rem;
  border-radius: 35px;
  font-size: 2.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  width: auto;
}

.base-button--full {
  width: 100%;
}

.base-button.primary {
  background-color: var(--accent-color);
  color: var(--background-color);
}

.base-button.primary:hover {
  background-color: var(--accent-color-hover);
}

.base-button.secondary {
  background-color: var(--secondary-color);
  color: var(--text-color);
}

.base-button.secondary:hover {
  background-color: var(--secondary-color-hover);
}

.base-button.outline {
  background-color: transparent;
  border: 2px solid var(--accent-color);
  color: var(--accent-color);
}

.base-button.outline:hover {
  background-color: var(--accent-color);
  color: var(--background-color);
}

@media (max-width: 768px) {
  .base-button {
    padding: 1.5rem 3rem;
    font-size: 2.4rem;
  }
}
</style> 