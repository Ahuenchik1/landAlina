<template>
  <span class="typewriter">
    {{ currentText }}<span class="cursor" :class="{ 'cursor--blink': isTyping }">|</span>
  </span>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  texts: {
    type: Array,
    required: true
  },
  typingSpeed: {
    type: Number,
    default: 100
  },
  deletingSpeed: {
    type: Number,
    default: 50
  },
  pauseDuration: {
    type: Number,
    default: 2000
  }
})

const currentText = ref('')
const currentIndex = ref(0)
const isTyping = ref(true)
let typingInterval = null
let deletingInterval = null
let pauseTimeout = null

const typeText = () => {
  if (currentText.value.length < props.texts[currentIndex.value].length) {
    currentText.value += props.texts[currentIndex.value][currentText.value.length]
    typingInterval = setTimeout(typeText, props.typingSpeed)
  } else {
    isTyping.value = false
    pauseTimeout = setTimeout(startDeleting, props.pauseDuration)
  }
}

const startDeleting = () => {
  isTyping.value = true
  deletingInterval = setInterval(() => {
    if (currentText.value.length > 0) {
      currentText.value = currentText.value.slice(0, -1)
    } else {
      clearInterval(deletingInterval)
      currentIndex.value = (currentIndex.value + 1) % props.texts.length
      typeText()
    }
  }, props.deletingSpeed)
}

onMounted(() => {
  typeText()
})

onUnmounted(() => {
  clearTimeout(typingInterval)
  clearTimeout(deletingInterval)
  clearTimeout(pauseTimeout)
})
</script>

<style scoped>
.typewriter {
  display: inline-block;
}

.cursor {
  display: inline-block;
  width: 2px;
  margin-left: 2px;
  background-color: var(--accent-color);
  animation: blink 0.7s infinite;
}

.cursor--blink {
  animation: none;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style> 