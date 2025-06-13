// Функция для управления масштабированием на мобильных устройствах
export function setupMobileZoomControl() {
  // Проверяем, что мы на мобильном устройстве
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    const viewport = document.querySelector('meta[name=viewport]')
    const originalContent = viewport.getAttribute('content')

    // Функция для отключения масштабирования
    const disableZoom = () => {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    }

    // Функция для включения масштабирования
    const enableZoom = () => {
      viewport.setAttribute('content', originalContent)
    }

    // Находим все поля ввода
    const inputs = document.querySelectorAll('input, textarea, select')
    
    // Добавляем обработчики для каждого поля
    inputs.forEach(input => {
      input.addEventListener('focus', disableZoom)
      input.addEventListener('blur', enableZoom)
    })

    // Очистка обработчиков при размонтировании компонента
    return () => {
      inputs.forEach(input => {
        input.removeEventListener('focus', disableZoom)
        input.removeEventListener('blur', enableZoom)
      })
    }
  }
} 