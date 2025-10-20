<template>
  <div class="redirect-page">
    <div class="loading-spinner">
      <v-progress-circular
        indeterminate
        color="primary"
        size="64"
      ></v-progress-circular>
      <p>Перенаправление на страницу пользователей...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  mounted() {
    // Перенаправляем на страницу пользователей
    this.$router.push('/users')
  },
  head() {
    return {
      title: 'Добрый кофе - CRM система'
    }
  }
}
</script>

<style scoped>
.redirect-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.theme--dark .redirect-page {
  background-color: #121212;
}

.loading-spinner {
  text-align: center;
}

.loading-spinner p {
  margin-top: 20px;
  color: #666666;
  font-size: 16px;
}

.theme--dark .loading-spinner p {
  color: #cccccc;
}
</style>

