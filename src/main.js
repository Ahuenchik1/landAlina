import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/main.css'
import { hideMobileUI, isMobileDevice } from './utils/mobileUI'

const app = createApp(App)
app.use(router)
app.mount('#app')

// Инициализируем скрытие мобильного UI только на мобильных устройствах
if (isMobileDevice()) {
  hideMobileUI()
}