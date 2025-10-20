/**
 * Плагин для toast уведомлений
 * CRM система "Добрый кофе"
 * Разработчик: Alexey Savich
 */

export default function ({ app }, inject) {
  // Создаем toast объект
  const toast = {
    success(message) {
      this.show(message, 'success')
    },
    error(message) {
      this.show(message, 'error')
    },
    info(message) {
      this.show(message, 'info')
    },
    warning(message) {
      this.show(message, 'warning')
    },
    show(message, type = 'info') {
      // Проверяем, что мы на клиенте
      if (process.client) {
        // Создаем элемент toast
        const toastElement = document.createElement('div')
        toastElement.className = `toast toast--${type}`
        toastElement.textContent = message
        
        // Добавляем стили
        toastElement.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: ${this.getBackgroundColor(type)};
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 10000;
          font-family: 'Nunito', sans-serif;
          font-size: 14px;
          font-weight: 500;
          max-width: 300px;
          word-wrap: break-word;
          opacity: 0;
          transform: translateX(100%);
          transition: all 0.3s ease;
        `
        
        // Добавляем в DOM
        document.body.appendChild(toastElement)
        
        // Анимация появления
        setTimeout(() => {
          toastElement.style.opacity = '1'
          toastElement.style.transform = 'translateX(0)'
        }, 10)
        
        // Автоматическое удаление
        setTimeout(() => {
          toastElement.style.opacity = '0'
          toastElement.style.transform = 'translateX(100%)'
          setTimeout(() => {
            if (document.body.contains(toastElement)) {
              document.body.removeChild(toastElement)
            }
          }, 300)
        }, 3000)
      } else {
        // На сервере просто выводим в консоль
        console.log(`[Toast ${type.toUpperCase()}]: ${message}`)
      }
    },
    getBackgroundColor(type) {
      const colors = {
        success: '#4caf50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196f3'
      }
      return colors[type] || colors.info
    }
  }
  
  inject('toast', toast)
}