// Функция для скрытия адресной строки и нижней панели навигации
let isProcessingScroll = false;

export const hideMobileUI = () => {
  if (!isMobileDevice()) return;

  // Устанавливаем высоту для мобильных устройств
  const setMobileHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  // Обработчик скролла с debounce
  let scrollTimeout;
  const handleScroll = () => {
    if (isProcessingScroll) return;
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (window.scrollY > 0 && window.scrollY < 100) {
        isProcessingScroll = true;
        window.scrollTo({
          top: 0,
          behavior: 'instant'
        });
        setTimeout(() => {
          isProcessingScroll = false;
        }, 300);
      }
    }, 150);
  };

  // Инициализация при загрузке
  const init = () => {
    setMobileHeight();
    
    // Принудительно скрываем адресную строку при загрузке
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 100);

    // Обработчики событий
    window.addEventListener('resize', setMobileHeight);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Обработка ориентации
    window.addEventListener('orientationchange', () => {
      setTimeout(setMobileHeight, 100);
    });
  };

  // Запускаем инициализацию после полной загрузки страницы
  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init);
  }
};

// Функция для определения высоты видимой области с учетом мобильного UI
export const getVisibleHeight = () => {
  return window.innerHeight;
};

// Функция для определения, является ли устройство мобильным
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}; 