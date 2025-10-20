<!--
  Компонент переключения темы
  CRM система "Добрый кофе"
  Разработчик: Alexey Savich
-->
<template>
  <div class="theme-toggle">
    <v-btn
      :color="isDark ? 'primary' : 'secondary'"
      icon
      @click="toggleTheme"
      class="theme-toggle-btn"
    >
      <v-icon v-if="isDark" color="white">mdi-weather-sunny</v-icon>
      <v-icon v-else color="white">mdi-weather-night</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'ThemeToggle',
  data() {
    return {
      isDark: false
    }
  },
  mounted() {
    // Проверяем, что мы на клиенте
    if (process.client) {
      // Получаем сохраненную тему из localStorage
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        this.isDark = savedTheme === 'dark'
        if (this.$vuetify && this.$vuetify.theme) {
          this.$vuetify.theme.dark = this.isDark
        }
      }
    }
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark
      if (this.$vuetify && this.$vuetify.theme) {
        this.$vuetify.theme.dark = this.isDark
      }
      
      // Проверяем, что мы на клиенте
      if (process.client) {
        // Сохраняем тему в localStorage
        localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
        
        // Обновляем класс на body для дополнительных стилей
        if (this.isDark) {
          document.body.classList.add('theme--dark')
        } else {
          document.body.classList.remove('theme--dark')
        }
      }
    }
  }
}
</script>

<style scoped>
.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1001;
}

.theme-toggle-btn {
  width: 36px !important;
  height: 36px !important;
  border-radius: 50% !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
  transition: all 0.3s ease !important;
}

.theme-toggle-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2) !important;
}

@media (max-width: 768px) {
  .theme-toggle {
    top: 10px;
    right: 10px;
  }
  
  .theme-toggle-btn {
    width: 32px !important;
    height: 32px !important;
  }
}
</style>
