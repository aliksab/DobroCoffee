<template>
  <div class="user-detail-page">
    <!-- Боковой сайдбар -->
    <Sidebar />
    
    <!-- Переключатель темы -->
    <ThemeToggle />
    
    <!-- Основной контент -->
    <div class="main-content">
      <!-- Заголовок страницы -->
      <div class="page-header">
        <div class="header-left">
          <v-btn
            icon
            @click="$router.go(-1)"
            class="back-button"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <h1>Детали пользователя</h1>
        </div>
      </div>
      
      <!-- Загрузка -->
      <div v-if="loading" class="loading-container">
        <UserSkeleton :count="1" />
      </div>
      
      <!-- Ошибка -->
      <div v-else-if="error" class="error-state">
        <v-icon size="64" color="error">mdi-alert-circle</v-icon>
        <h3>Ошибка загрузки</h3>
        <p>{{ error }}</p>
        <v-btn color="primary" @click="loadUser">Попробовать снова</v-btn>
      </div>
      
      <!-- Информация о пользователе -->
      <div v-else-if="user" class="user-detail">
        <!-- Основная информация -->
        <v-card class="user-card">
          <v-card-title class="user-title">
            <div class="user-avatar-section">
              <v-avatar size="80" :color="user.isBlocked ? 'error' : 'primary'">
                <span class="avatar-text">{{ userInitial }}</span>
              </v-avatar>
              <div v-if="user.isBlocked" class="blocked-badge">
                <v-icon size="20" color="white">mdi-block-helper</v-icon>
              </div>
            </div>
            <div class="user-info-section">
              <h2 class="user-name">{{ user.name }}</h2>
              <p class="user-phone">{{ user.phone }}</p>
              <div class="user-city">
                <v-icon size="18">mdi-map-marker</v-icon>
                <span>{{ user.city.title }}</span>
              </div>
              <div class="user-role">
                <v-chip small :color="user.role === 'customer' ? 'primary' : 'secondary'">
                  {{ user.role === 'customer' ? 'Клиент' : user.role }}
                </v-chip>
              </div>
            </div>
          </v-card-title>
        </v-card>
        
        <!-- Статистика -->
        <v-row class="stats-row">
          <v-col cols="12" md="3">
            <v-card class="stat-card">
              <v-card-text class="text-center">
                <div class="stat-icon">
                  <v-icon size="32" color="success">mdi-wallet</v-icon>
                </div>
                <div class="stat-value success">{{ formatCurrency(user.balance) }}</div>
                <div class="stat-label">Баланс</div>
              </v-card-text>
            </v-card>
          </v-col>
          
          <v-col cols="12" md="3">
            <v-card class="stat-card">
              <v-card-text class="text-center">
                <div class="stat-icon">
                  <v-icon size="32" color="info">mdi-trending-up</v-icon>
                </div>
                <div class="stat-value info">{{ formatCurrency(user.saveTotal) }}</div>
                <div class="stat-label">Накоплено</div>
                <div class="stat-sublabel">{{ user.saveCount }} операций</div>
              </v-card-text>
            </v-card>
          </v-col>
          
          <v-col cols="12" md="3">
            <v-card class="stat-card">
              <v-card-text class="text-center">
                <div class="stat-icon">
                  <v-icon size="32" color="warning">mdi-trending-down</v-icon>
                </div>
                <div class="stat-value warning">{{ formatCurrency(user.spendTotal) }}</div>
                <div class="stat-label">Потрачено</div>
                <div class="stat-sublabel">{{ user.spendCount }} операций</div>
              </v-card-text>
            </v-card>
          </v-col>
          
          <v-col cols="12" md="3">
            <v-card class="stat-card">
              <v-card-text class="text-center">
                <div class="stat-icon">
                  <v-icon size="32" color="primary">mdi-percent</v-icon>
                </div>
                <div class="stat-value primary">{{ user.cashbackPercent }}%</div>
                <div class="stat-label">Кэшбэк</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        
        <!-- Дополнительная информация -->
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="info-card">
              <v-card-title>
                <v-icon left>mdi-calendar-clock</v-icon>
                Даты активности
              </v-card-title>
              <v-card-text>
                <div class="info-item">
                  <span class="info-label">Последний визит:</span>
                  <span class="info-value">{{ formatDate(user.lastVisit) }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Последнее накопление:</span>
                  <span class="info-value">{{ formatDate(user.lastSave) }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Последняя трата:</span>
                  <span class="info-value">{{ formatDate(user.lastSpend) }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Дата регистрации:</span>
                  <span class="info-value">{{ formatDate(user.createdAt) }}</span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          
          <v-col cols="12" md="6">
            <v-card class="info-card">
              <v-card-title>
                <v-icon left>mdi-cog</v-icon>
                Настройки
              </v-card-title>
              <v-card-text>
                <div class="info-item">
                  <span class="info-label">Статус:</span>
                  <v-chip 
                    small 
                    :color="user.isBlocked ? 'error' : 'success'"
                  >
                    {{ user.isBlocked ? 'Заблокирован' : 'Активен' }}
                  </v-chip>
                </div>
                <div class="info-item">
                  <span class="info-label">ID пользователя:</span>
                  <span class="info-value">{{ user.id }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Последнее обновление:</span>
                  <span class="info-value">{{ formatDate(user.updatedAt) }}</span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue'
import ThemeToggle from '~/components/ThemeToggle.vue'
import UserSkeleton from '~/components/UserSkeleton.vue'

export default {
  name: 'UserDetailPage',
  components: {
    Sidebar,
    ThemeToggle,
    UserSkeleton
  },
  data() {
    return {
      user: null,
      loading: true,
      error: null
    }
  },
  computed: {
    userInitial() {
      return this.user ? this.user.name.charAt(0).toUpperCase() : '?'
    }
  },
  async fetch() {
    await this.loadUser()
  },
  methods: {
    async loadUser() {
      this.loading = true
      this.error = null
      
      try {
        const userId = this.$route.params.id
        this.user = await this.$api.users.getById(userId)
      } catch (error) {
        this.error = 'Не удалось загрузить информацию о пользователе'
        console.error('Ошибка загрузки пользователя:', error)
      } finally {
        this.loading = false
      }
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
      }).format(amount)
    },
    formatDate(timestamp) {
      const date = new Date(timestamp)
      return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  },
  head() {
    return {
      title: this.user ? `${this.user.name} - Детали пользователя` : 'Детали пользователя'
    }
  }
}
</script>

<style scoped>
.user-detail-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.theme--dark .user-detail-page {
  background-color: #121212;
}

.main-content {
  margin-left: 60px;
  padding: 20px;
  min-height: 100vh;
  transition: margin-left 0.3s ease;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 10px;
  }
}

.page-header {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eeeeee;
}

.theme--dark .page-header {
  border-bottom-color: #424242;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-button {
  background-color: #f5f5f5;
}

.theme--dark .back-button {
  background-color: #2a2a2a;
}

.theme--dark .back-button .v-icon {
  color: #ffffff;
}

.page-header h1 {
  margin: 0;
  color: #000000;
}

.theme--dark .page-header h1 {
  color: #ffffff;
}

.loading-container {
  padding: 0;
}

.error-state {
  text-align: center;
  padding: 60px 20px;
  background-color: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 12px;
}

.theme--dark .error-state {
  background-color: #1e1e1e;
  border-color: #424242;
}

.error-state h3 {
  margin: 16px 0 8px 0;
  color: #666666;
}

.theme--dark .error-state h3 {
  color: #cccccc;
}

.error-state p {
  color: #787878;
  margin: 0 0 20px 0;
}

.user-detail {
  max-width: 1200px;
}

.user-card {
  margin-bottom: 24px;
}

.user-title {
  display: flex;
  align-items: center;
  gap: 24px;
}

.user-avatar-section {
  position: relative;
}

.avatar-text {
  font-weight: 700;
  font-size: 32px;
  color: white;
}

.blocked-badge {
  position: absolute;
  bottom: -5px;
  right: -5px;
  background-color: #f44336;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
}

.theme--dark .blocked-badge {
  border-color: #1e1e1e;
}

.user-info-section {
  flex: 1;
}

.user-name {
  font-size: 28px;
  font-weight: 700;
  color: #000000;
  margin: 0 0 8px 0;
}

.theme--dark .user-name {
  color: #ffffff;
}

.user-phone {
  font-size: 16px;
  color: #666666;
  margin: 0 0 12px 0;
  font-family: 'Courier New', monospace;
}

.theme--dark .user-phone {
  color: #cccccc;
}

.user-city {
  display: flex;
  align-items: center;
  color: #ffd166;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
}

.user-city span {
  margin-left: 6px;
}

.user-role {
  margin-top: 8px;
}

.stats-row {
  margin-bottom: 24px;
}

.stat-card {
  height: 100%;
}

.stat-icon {
  margin-bottom: 12px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
}

.stat-value.success {
  color: #4caf50;
}

.stat-value.info {
  color: #2196f3;
}

.stat-value.warning {
  color: #ff9800;
}

.stat-value.primary {
  color: #ffd166;
}

.stat-label {
  font-size: 14px;
  color: #666666;
  font-weight: 500;
}

.theme--dark .stat-label {
  color: #cccccc;
}

.stat-sublabel {
  font-size: 12px;
  color: #787878;
  margin-top: 2px;
}

.info-card {
  height: 100%;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.theme--dark .info-item {
  border-bottom-color: #2a2a2a;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 14px;
  color: #666666;
  font-weight: 500;
}

.theme--dark .info-label {
  color: #cccccc;
}

.info-value {
  font-size: 14px;
  color: #000000;
  font-weight: 500;
}

.theme--dark .info-value {
  color: #ffffff;
}

@media (max-width: 768px) {
  .user-title {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .user-name {
    font-size: 24px;
  }
  
  .stats-row {
    margin-bottom: 16px;
  }
  
  .stat-value {
    font-size: 20px;
  }
  
  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 8px;
  }
  
  .user-name {
    font-size: 20px;
  }
  
  .stat-value {
    font-size: 18px;
  }
}
</style>

