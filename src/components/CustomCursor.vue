<template>
  <div class="cursor-wrapper" v-show="!isMobile">
    <div class="cursor" ref="cursor"></div>
    <div class="cursor-trail" ref="cursorTrail"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursor = ref(null)
const cursorTrail = ref(null)
const isMobile = ref(false)

let mouseX = 0
let mouseY = 0
let cursorX = 0
let cursorY = 0
let trailX = 0
let trailY = 0

const updateCursor = () => {
  const dx = mouseX - cursorX
  const dy = mouseY - cursorY
  cursorX += dx * 0.25
  cursorY += dy * 0.25
  
  const trailDx = mouseX - trailX
  const trailDy = mouseY - trailY
  trailX += trailDx * 0.1
  trailY += trailDy * 0.1

  if (cursor.value && cursorTrail.value) {
    cursor.value.style.transform = `translate(${cursorX}px, ${cursorY}px)`
    cursorTrail.value.style.transform = `translate(${trailX}px, ${trailY}px)`
  }
  requestAnimationFrame(updateCursor)
}

const handleMouseMove = (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
}

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  
  if (!isMobile.value) {
    document.addEventListener('mousemove', handleMouseMove)
    mouseX = window.innerWidth / 2
    mouseY = window.innerHeight / 2
    cursorX = mouseX
    cursorY = mouseY
    trailX = mouseX
    trailY = mouseY
    updateCursor()
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  document.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
.cursor-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}

.cursor {
  position: fixed;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 50%;
  pointer-events: none;
  mix-blend-mode: difference;
  transition: background-color 0.3s ease;
  box-shadow: 0 0 20px rgb(255, 255, 255);
}

.cursor-trail {
  position: fixed;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0.3;
  filter: blur(10px);
  mix-blend-mode: difference;
  transition: background-color 0.3s ease;
}

@media (max-width: 768px) {
  .cursor-wrapper {
    display: none;
  }
}
</style> 