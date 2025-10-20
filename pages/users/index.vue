<!--
  Страница пользователей CRM системы "Добрый кофе"
  Разработчик: Alexey Savich
-->
<template>
  <div class="users-page">
    <!-- Боковой сайдбар -->
    <Sidebar />
    
    <!-- Переключатель темы -->
    <ThemeToggle />
    
    <!-- Основной контент -->
    <div class="main-content">
      <!-- Заголовок страницы -->
      <div class="page-header">
        <h1>Пользователи</h1>
      </div>
      
      <!-- Фильтры и поиск -->
      <div class="filters-section">
        <v-row>
          <v-col cols="12" md="5">
            <v-text-field
              v-model="searchQuery"
              label="Поиск по имени или телефону"
              prepend-inner-icon="mdi-magnify"
              clearable
              outlined
              dense
              @input="onSearch"
            />
          </v-col>
          <v-col cols="12" md="5">
            <v-combobox
              v-model="selectedCitiesObjects"
              :items="cities"
              item-text="title"
              item-value="id"
              label="Фильтр по городам"
              prepend-inner-icon="mdi-map-marker"
              multiple
              outlined
              dense
              clearable
              :style="{ '--v-label-color': '#ffffff' }"
              chips
              deletable-chips
              @change="onCityFilter"
              :search-input.sync="citySearch"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip
                  v-if="index < 2"
                  small
                  color="primary"
                  text-color="white"
                  close
                  @click:close="removeCityFilter(item.id)"
                >
                  {{ item.title }}
                </v-chip>
                <span
                  v-if="index === 2"
                  class="text-truncate"
                >
                  (+{{ selectedCitiesObjects.length - 2 }} еще)
                </span>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="12" md="2">
            <v-btn
              color="secondary"
              outlined
              block
              @click="clearFilters"
              :disabled="!searchQuery && selectedCities.length === 0"
            >
              <v-icon left>mdi-filter-remove</v-icon>
              Очистить
            </v-btn>
          </v-col>
        </v-row>
        
        <!-- Активные фильтры -->
        <div v-if="searchQuery || selectedCities.length > 0" class="active-filters">
          <div class="filter-tags">
            <span v-if="searchQuery" class="filter-tag">
              <v-icon size="16">mdi-magnify</v-icon>
              Поиск: "{{ searchQuery }}"
              <v-icon size="16" @click="searchQuery = ''; onSearch()">mdi-close</v-icon>
            </span>
            <span 
              v-for="cityId in selectedCities" 
              :key="cityId" 
              class="filter-tag"
            >
              <v-icon size="16">mdi-map-marker</v-icon>
              {{ getCityName(cityId) }}
              <v-icon size="16" @click="removeCityFilter(cityId)">mdi-close</v-icon>
            </span>
          </div>
        </div>
      </div>
      
      <!-- Список пользователей -->
      <div class="users-list">
        <div v-if="loading" class="loading-container">
          <div class="loading-progress">
            <v-progress-linear
              :value="loadingProgress"
              color="primary"
              height="8"
              rounded
            ></v-progress-linear>
            <p class="loading-text">Загрузка пользователей... {{ loadingProgress }}%</p>
          </div>
          <UserSkeleton :count="10" />
        </div>
        
        <div v-else-if="filteredUsers.length === 0" class="empty-state">
          <v-icon size="64" color="grey">mdi-account-search</v-icon>
          <h3>Пользователи не найдены</h3>
          <p>Попробуйте изменить параметры поиска или фильтры</p>
        </div>
        
        <div v-else>
          <UserItem
            v-for="user in paginatedUsers"
            :key="user.id"
            :user="user"
            @filter-by-city="filterByCity"
          />
        </div>
      </div>
      
      <!-- Пагинация -->
      <div v-if="!loading && filteredUsers.length > 0" class="pagination-container">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="7"
          color="primary"
          @input="onPageChange"
        />
        
        <div class="pagination-info">
          <span>
            Показано {{ startIndex + 1 }}-{{ endIndex }} из {{ filteredUsers.length }} пользователей
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue'
import ThemeToggle from '~/components/ThemeToggle.vue'
import UserItem from '~/components/UserItem.vue'
import UserSkeleton from '~/components/UserSkeleton.vue'

export default {
  name: 'UsersPage',
  components: {
    Sidebar,
    ThemeToggle,
    UserItem,
    UserSkeleton
  },
  data() {
    return {
      users: [],
      filteredUsers: [],
      loading: true,
      loadingProgress: 0,
      searchQuery: '',
      selectedCities: [],
      citySearch: '',
      selectedCitiesObjects: [],
      currentPage: 1,
      usersPerPage: 50,
      totalUsers: 0,
      cities: [
        { id: '60f197849998570020506123', title: 'Оренбург' },
        { id: '60f197849998570020506124', title: 'Тольятти' },
        { id: '60f197849998570020506125', title: 'Самара' },
        { id: '60f197849998570020506126', title: 'Нижний Новгород' },
        { id: '60f197849998570020506127', title: 'Москва' },
        { id: '60f197849998570020506128', title: 'Смоленск' }
      ]
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.usersPerPage)
    },
    startIndex() {
      return (this.currentPage - 1) * this.usersPerPage
    },
    endIndex() {
      return Math.min(this.startIndex + this.usersPerPage, this.filteredUsers.length)
    },
    paginatedUsers() {
      return this.filteredUsers.slice(this.startIndex, this.endIndex)
    }
  },
  async fetch() {
    // В SSR режиме загружаем только города, пользователей загружаем на клиенте
    if (process.server) {
      await this.loadCities()
    } else {
      await Promise.all([
        this.loadUsers(),
        this.loadCities()
      ])
    }
  },
  mounted() {
    // Загружаем пользователей на клиенте после SSR
    if (process.client && this.users.length === 0) {
      this.loadUsers()
    }
  },
  watch: {
    selectedCities: {
      handler(newVal) {
        this.selectedCitiesObjects = newVal.map(cityId => 
          this.cities.find(city => city.id === cityId)
        ).filter(Boolean)
      },
      immediate: true
    }
  },
  methods: {
    async loadUsers() {
      this.loading = true
      this.loadingProgress = 0
      try {
        // Имитация загрузки пользователей согласно ТЗ
        // Первый запрос - 100 пользователей, лимит запроса 500 пользователей
        let offset = 0
        let limit = 100
        let allUsers = []
        const totalRequests = 1 + Math.ceil((8000 - 100) / 500) // 1 запрос на 100 + остальные по 500
        let currentRequest = 0
        
        while (offset < 8000) {
          const response = await this.$api.users.list({ offset, limit })
          allUsers = allUsers.concat(response.data)
          offset += limit
          currentRequest++
          
          // Обновляем прогресс
          this.loadingProgress = Math.round((currentRequest / totalRequests) * 100)
          
          // После первого запроса (100 пользователей) меняем лимит на 500
          if (offset === 100) {
            limit = 500
          }
          
          // Задержка между запросами - сетевой оверхед 500мс (только на клиенте)
          if (offset < 8000 && process.client) {
            await new Promise(resolve => setTimeout(resolve, 500))
          }
        }
        
        this.users = allUsers
        this.filteredUsers = allUsers
        this.totalUsers = allUsers.length
        this.$toast.success(`Загружено ${allUsers.length} пользователей`)
      } catch (error) {
        console.error('Ошибка загрузки пользователей:', error)
        this.$toast.error('Ошибка загрузки пользователей')
      } finally {
        this.loading = false
        this.loadingProgress = 100
      }
    },
    async loadCities() {
      try {
        const citiesData = await this.$api.cities.list()
        this.cities = citiesData
      } catch (error) {
        console.error('Ошибка загрузки городов:', error)
        this.$toast.error('Ошибка загрузки списка городов')
      }
    },
    onSearch() {
      this.applyFilters()
    },
    onCityFilter(cities) {
      // v-combobox возвращает массив объектов городов
      if (Array.isArray(cities)) {
        this.selectedCitiesObjects = cities
        this.selectedCities = cities.map(city => city.id)
      } else {
        this.selectedCitiesObjects = cities ? [cities] : []
        this.selectedCities = cities ? [cities.id] : []
      }
      this.applyFilters()
    },
    applyFilters() {
      let filtered = [...this.users]
      
      // Поиск по имени и телефону
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(user => 
          user.name.toLowerCase().includes(query) ||
          user.phone.toLowerCase().includes(query)
        )
      }
      
      // Фильтр по городам
      if (this.selectedCities.length > 0) {
        filtered = filtered.filter(user => 
          this.selectedCities.includes(user.city.id)
        )
      }
      
      this.filteredUsers = filtered
      this.currentPage = 1 // Сбрасываем на первую страницу при фильтрации
    },
    filterByCity(city) {
      // Добавляем город к существующим фильтрам
      if (!this.selectedCities.includes(city.id)) {
        this.selectedCities.push(city.id)
        this.applyFilters()
        this.$toast.info(`Фильтр применен: ${city.title}`)
      }
    },
    onPageChange(page) {
      this.currentPage = page
      // Прокручиваем вверх при смене страницы
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    clearFilters() {
      this.searchQuery = ''
      this.selectedCities = []
      this.selectedCitiesObjects = []
      this.applyFilters()
      this.$toast.info('Фильтры очищены')
    },
    getCityName(cityId) {
      const city = this.cities.find(c => c.id === cityId)
      return city ? city.title : 'Неизвестный город'
    },
    removeCityFilter(cityId) {
      this.selectedCities = this.selectedCities.filter(id => id !== cityId)
      this.selectedCitiesObjects = this.selectedCitiesObjects.filter(city => city.id !== cityId)
      this.applyFilters()
    }
  }
}
</script>

<style scoped>
.users-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.theme--dark .users-page {
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

.page-header h1 {
  margin: 0;
  color: #000000;
}

.theme--dark .page-header h1 {
  color: #ffffff;
}

.filters-section {
  background-color: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
}

.theme--dark .filters-section {
  background-color: #1e1e1e;
  border-color: #424242;
}

.users-list {
  margin-bottom: 24px;
}

.loading-container {
  padding: 0;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background-color: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 12px;
}

.theme--dark .empty-state {
  background-color: #1e1e1e;
  border-color: #424242;
}

.empty-state h3 {
  margin: 16px 0 8px 0;
  color: #666666;
}

.theme--dark .empty-state h3 {
  color: #cccccc;
}

.empty-state p {
  color: #787878;
  margin: 0;
}

.pagination-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 12px;
}

.theme--dark .pagination-container {
  background-color: #1e1e1e;
  border-color: #424242;
}

.pagination-info {
  font-size: 14px;
  color: #666666;
}

.theme--dark .pagination-info {
  color: #cccccc;
}

@media (max-width: 768px) {
  
  .filters-section {
    padding: 16px;
  }
  
  .pagination-container {
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 8px;
  }
  
  .page-header {
    margin-bottom: 16px;
  }
  
  .filters-section {
    padding: 12px;
  }
  
  .empty-state {
    padding: 40px 16px;
  }
}

.active-filters {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #eeeeee;
}

.theme--dark .active-filters {
  border-top-color: #424242;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #ffd166;
  color: #000000;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-tag:hover {
  background-color: #ffb300;
}

.filter-tag .v-icon {
  cursor: pointer;
  color: #000000;
}

.filter-tag .v-icon:last-child {
  margin-left: 4px;
}

.theme--dark .filter-tag {
  background-color: #ffd166;
  color: #000000;
}

.theme--dark .filter-tag:hover {
  background-color: #ffb300;
}

.theme--dark .filter-tag .v-icon {
  color: #000000;
}

/* Исправление цвета label для v-combobox в темной теме */
.theme--dark .v-combobox--outlined .v-input__control .v-input__slot .v-combobox__selection--comma {
  color: #ffffff !important;
}

.theme--dark .v-combobox--outlined .v-input__control .v-input__slot label {
  color: #ffffff !important;
}

.theme--dark .v-combobox--outlined .v-input__control .v-input__slot .v-combobox__selection--comma input {
  color: #ffffff !important;
}

/* Специфичные стили для label в v-combobox на странице users */
.theme--dark .v-input--outlined .v-input__control .v-input__slot .v-label {
  color: #ffffff !important;
}

.theme--dark .v-input--outlined .v-input__control .v-input__slot .v-label--active {
  color: #ffffff !important;
}

.theme--dark .v-input--outlined .v-input__control .v-input__slot .v-label--is-floating {
  color: #ffffff !important;
}

/* Дополнительные стили для всех состояний label */
.theme--dark .v-combobox .v-input__control .v-input__slot .v-label {
  color: #ffffff !important;
}

.theme--dark .v-combobox .v-input__control .v-input__slot .v-label--active {
  color: #ffffff !important;
}

.theme--dark .v-combobox .v-input__control .v-input__slot .v-label--is-floating {
  color: #ffffff !important;
}

/* Максимально агрессивные стили для белого цвета label */
.theme--dark .v-combobox label,
.theme--dark .v-combobox .v-label,
.theme--dark .v-combobox .v-label--active,
.theme--dark .v-combobox .v-label--is-floating,
.theme--dark .v-input label,
.theme--dark .v-input .v-label,
.theme--dark .v-input .v-label--active,
.theme--dark .v-input .v-label--is-floating {
  color: #ffffff !important;
}

/* Дополнительные стили для всех возможных селекторов */
.theme--dark .v-input--outlined label,
.theme--dark .v-input--outlined .v-label,
.theme--dark .v-input--outlined .v-label--active,
.theme--dark .v-input--outlined .v-label--is-floating {
  color: #ffffff !important;
}

/* Универсальный селектор для всех label в темной теме */
.theme--dark label {
  color: #ffffff !important;
}

/* Стили для прогресс-бара загрузки */
.loading-progress {
  margin-bottom: 20px;
  padding: 0 20px;
}

.loading-text {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  color: var(--v-text-primary);
}

.theme--dark .loading-text {
  color: #ffffff;
}
</style>
