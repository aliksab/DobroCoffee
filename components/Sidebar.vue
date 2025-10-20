<!--
  Боковой сайдбар для CRM системы "Добрый кофе"
  Разработчик: Alexey Savich
-->
<template>
  <div class="sidebar" :class="{ collapsed: isCollapsed }" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <!-- Заголовок с пользователем -->
    <div class="sidebar-header">
      <div class="user-info">
        <v-avatar size="32" color="primary">
          <v-icon color="white">mdi-account</v-icon>
        </v-avatar>
        <div v-if="!isCollapsed" class="user-details">
          <div class="user-name">Алексей Савич</div>
          <div class="user-role">CRM - Администратор</div>
        </div>
        <v-icon 
          v-if="!isCollapsed" 
          class="collapse-icon" 
          @click="toggleCollapse"
        >
          mdi-chevron-left
        </v-icon>
      </div>
    </div>

    <!-- Навигационное меню -->
    <nav class="sidebar-nav">
      <div 
        v-for="item in menuItems" 
        :key="item.id"
        class="nav-item"
        :class="{ active: item.active }"
        @click="navigateTo(item.route)"
      >
        <v-icon class="nav-icon">{{ item.icon }}</v-icon>
        <span v-if="!isCollapsed" class="nav-text">{{ item.title }}</span>
      </div>
    </nav>

    <!-- Кнопка разворачивания для свернутого состояния -->
    <div v-if="isCollapsed" class="expand-button">
      <v-btn
        icon
        small
        @click="toggleCollapse"
        class="expand-btn"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      isCollapsed: true,
      manuallyExpanded: false,
      menuItems: [
        {
          id: 'stores',
          title: 'Торговые точки',
          icon: 'mdi-storefront',
          route: '/stores',
          active: false
        },
        {
          id: 'machines',
          title: 'Кофемашины',
          icon: 'mdi-coffee-maker',
          route: '/machines',
          active: false
        },
        {
          id: 'partners',
          title: 'Партнеры',
          icon: 'mdi-handshake',
          route: '/partners',
          active: false
        },
        {
          id: 'employees',
          title: 'Сотрудники',
          icon: 'mdi-account-group',
          route: '/employees',
          active: false
        },
        {
          id: 'drinks',
          title: 'Напитки',
          icon: 'mdi-coffee',
          route: '/drinks',
          active: false
        },
        {
          id: 'subscriptions',
          title: 'Абонементы',
          icon: 'mdi-card-account-details',
          route: '/subscriptions',
          active: false
        },
        {
          id: 'active-subscriptions',
          title: 'Активные абонементы',
          icon: 'mdi-card-account-details-star',
          route: '/active-subscriptions',
          active: false
        },
        {
          id: 'users',
          title: 'Пользователи',
          icon: 'mdi-account-group',
          route: '/users',
          active: true
        }
      ]
    }
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed
      this.manuallyExpanded = !this.isCollapsed
      
      if (process.client) {
        if (this.isCollapsed) {
          document.body.classList.remove('sidebar-hovered')
        } else {
          document.body.classList.add('sidebar-hovered')
        }
      }
    },
    navigateTo(route) {
      if (this.$route.path !== route) {
        // Проверяем, реализована ли страница
        const implementedRoutes = ['/users']
        
        if (implementedRoutes.includes(route)) {
          this.$router.push(route)
        } else {
          // Показываем toast для нереализованных страниц
          this.$toast.info('Данная страница не реализована')
        }
      }
    },
    onMouseEnter() {
      if (this.isCollapsed) {
        this.isCollapsed = false
        if (process.client) {
          document.body.classList.add('sidebar-hovered')
        }
      }
    },
    onMouseLeave() {
      // Возвращаем в свернутое состояние только если пользователь не развернул его вручную
      if (!this.manuallyExpanded) {
        this.isCollapsed = true
        if (process.client) {
          document.body.classList.remove('sidebar-hovered')
        }
      }
    }
  }
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 250px;
  background-color: #ffffff;
  border-right: 1px solid #eeeeee;
  z-index: 1000;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar:hover {
  width: 250px;
}

.sidebar.collapsed:hover {
  width: 250px;
}

.theme--dark .sidebar {
  background-color: #1e1e1e;
  border-right-color: #424242;
}

.sidebar-header {
  padding: 20px 16px;
  border-bottom: 1px solid #eeeeee;
}

.theme--dark .sidebar-header {
  border-bottom-color: #424242;
}

.user-info {
  display: flex;
  align-items: center;
  position: relative;
}

.user-details {
  margin-left: 12px;
  flex: 1;
}

.user-name {
  font-weight: 600;
  font-size: 14px;
  color: #000000;
  line-height: 1.2;
}

.theme--dark .user-name {
  color: #ffffff;
}

.user-role {
  font-size: 12px;
  color: #787878;
  line-height: 1.2;
  margin-top: 2px;
}

.collapse-icon {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.collapse-icon:hover {
  transform: scale(1.1);
}

.sidebar-nav {
  flex: 1;
  padding: 16px 0;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.nav-item:hover {
  background-color: #f5f5f5;
}

.theme--dark .nav-item:hover {
  background-color: #2a2a2a;
}

.nav-item.active {
  background-color: #fff3cd;
  border-right: 3px solid #ffd166;
}

.theme--dark .nav-item.active {
  background-color: #3a2a00;
}

.nav-icon {
  font-size: 20px;
  color: #666666;
  min-width: 24px;
}

.theme--dark .nav-icon {
  color: #ffffff;
}

.nav-item.active .nav-icon {
  color: #ffd166;
}

.nav-text {
  margin-left: 12px;
  font-size: 14px;
  color: #000000;
  font-weight: 500;
}

.theme--dark .nav-text {
  color: #ffffff;
}

.expand-button {
  padding: 16px;
  border-top: 1px solid #eeeeee;
}

.theme--dark .expand-button {
  border-top-color: #424242;
}

.expand-btn {
  width: 100%;
  background-color: #f5f5f5;
}

.theme--dark .expand-btn {
  background-color: #2a2a2a;
}

.expand-btn:hover {
  background-color: #e0e0e0;
}

.theme--dark .expand-btn:hover {
  background-color: #3a3a3a;
}

.theme--dark .expand-btn .v-icon {
  color: #ffffff;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .sidebar.mobile-open {
    transform: translateX(0);
  }
  
  .sidebar.collapsed {
    width: 250px;
  }
}
</style>
