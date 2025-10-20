<!--
  Компонент карточки пользователя
  CRM система "Добрый кофе"
  Разработчик: Alexey Savich
-->
<template>
  <div class="user-item" :class="{ blocked: user.isBlocked }">
    <div class="user-header">
      <div class="user-avatar">
        <v-avatar size="48" :color="user.isBlocked ? 'error' : 'primary'">
          <span class="avatar-text">{{ userInitial }}</span>
        </v-avatar>
        <div v-if="user.isBlocked" class="blocked-badge">
          <v-icon size="16" color="white">mdi-block-helper</v-icon>
        </div>
      </div>
      
      <div class="user-info">
        <h3 class="user-name">{{ user.name }}</h3>
        <p class="user-phone">{{ user.phone }}</p>
        <div class="user-city" @click="goToCity(user.city)">
          <v-icon size="16">mdi-map-marker</v-icon>
          <span>{{ user.city.title }}</span>
        </div>
      </div>
      
      <div class="user-actions">
        <v-btn
          color="primary"
          small
          outlined
          @click="viewDetails"
        >
          <v-icon left size="16">mdi-eye</v-icon>
          Подробнее
        </v-btn>
      </div>
    </div>
    
    <div class="user-stats">
      <div class="stat-item">
        <div class="stat-label">Баланс</div>
        <div class="stat-value balance">{{ formatCurrency(user.balance) }}</div>
      </div>
      
      <div class="stat-item">
        <div class="stat-label">Накоплено</div>
        <div class="stat-value saved">{{ formatCurrency(user.saveTotal) }}</div>
      </div>
      
      <div class="stat-item">
        <div class="stat-label">Потрачено</div>
        <div class="stat-value spent">{{ formatCurrency(user.spendTotal) }}</div>
      </div>
      
      <div class="stat-item">
        <div class="stat-label">Последний визит</div>
        <div class="stat-value date">{{ formatDate(user.lastVisit) }}</div>
      </div>
    </div>
    
    <div class="user-additional">
      <div class="additional-item">
        <span class="additional-label">Кэшбэк:</span>
        <span class="additional-value">{{ user.cashbackPercent }}%</span>
      </div>
      <div class="additional-item">
        <span class="additional-label">Накоплений:</span>
        <span class="additional-value">{{ user.saveCount }}</span>
      </div>
      <div class="additional-item">
        <span class="additional-label">Покупок:</span>
        <span class="additional-value">{{ user.spendCount }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserItem',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    userInitial() {
      return this.user.name ? this.user.name.charAt(0).toUpperCase() : '?'
    }
  },
  methods: {
    formatCurrency(amount) {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
      }).format(amount)
    },
    formatDate(timestamp) {
      const date = new Date(timestamp)
      const now = new Date()
      const diffTime = Math.abs(now - date)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays === 1) {
        return 'Вчера'
      } else if (diffDays < 7) {
        return `${diffDays} дн. назад`
      } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7)
        return `${weeks} нед. назад`
      } else {
        return date.toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        })
      }
    },
    goToCity(city) {
      // Переход к фильтрации по городу
      this.$emit('filter-by-city', city)
    },
    viewDetails() {
      // Переход к детальной информации о пользователе
      this.$router.push(`/users/${this.user.id}`)
    }
  }
}
</script>

<style scoped>
.user-item {
  background-color: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  position: relative;
}

.user-item:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.user-item.blocked {
  opacity: 0.7;
  border-color: #f44336;
}

.theme--dark .user-item {
  background-color: #1e1e1e;
  border-color: #424242;
}

.theme--dark .user-item:hover {
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
}

.user-header {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
}

.user-avatar {
  position: relative;
  margin-right: 16px;
}

.avatar-text {
  font-weight: 700;
  font-size: 18px;
  color: white;
}

.blocked-badge {
  position: absolute;
  bottom: -2px;
  right: -2px;
  background-color: #f44336;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
}

.theme--dark .blocked-badge {
  border-color: #1e1e1e;
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 18px;
  font-weight: 700;
  color: #000000;
  margin: 0 0 4px 0;
  line-height: 1.2;
}

.theme--dark .user-name {
  color: #ffffff;
}

.user-phone {
  font-size: 14px;
  color: #666666;
  margin: 0 0 8px 0;
  font-family: 'Courier New', monospace;
}

.theme--dark .user-phone {
  color: #cccccc;
}

.user-city {
  display: flex;
  align-items: center;
  color: #ffd166;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;
}

.user-city:hover {
  color: #ffb300;
}

.user-city span {
  margin-left: 4px;
}

.theme--dark .user-city {
  color: #ffffff;
}

.theme--dark .user-city:hover {
  color: #ffd166;
}

.theme--dark .user-city .v-icon {
  color: #ffffff;
}

.user-actions {
  margin-left: 16px;
}

.user-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
}

.stat-item {
  text-align: center;
}

.stat-label {
  font-size: 12px;
  color: #787878;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 16px;
  font-weight: 700;
}

.stat-value.balance {
  color: #4caf50;
}

.stat-value.saved {
  color: #2196f3;
}

.stat-value.spent {
  color: #ff9800;
}

.stat-value.date {
  color: #666666;
  font-size: 14px;
  font-weight: 500;
}

.theme--dark .stat-value.date {
  color: #cccccc;
}

.user-additional {
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid #eeeeee;
}

.theme--dark .user-additional {
  border-top-color: #424242;
}

.additional-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.additional-label {
  font-size: 12px;
  color: #787878;
  margin-bottom: 2px;
}

.additional-value {
  font-size: 14px;
  font-weight: 600;
  color: #000000;
}

.theme--dark .additional-value {
  color: #ffffff;
}

.additional-label {
  font-size: 12px;
  color: #787878;
  margin-bottom: 2px;
}

.theme--dark .additional-label {
  color: #cccccc;
}

@media (max-width: 768px) {
  .user-item {
    padding: 16px;
  }
  
  .user-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .user-avatar {
    margin-right: 0;
    margin-bottom: 12px;
  }
  
  .user-info {
    margin-bottom: 12px;
  }
  
  .user-actions {
    margin-left: 0;
    width: 100%;
  }
  
  .user-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .user-additional {
    flex-direction: column;
    gap: 8px;
  }
  
  .additional-item {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .user-stats {
    grid-template-columns: 1fr;
  }
  
  .stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .stat-label {
    margin-bottom: 0;
  }
}
</style>

