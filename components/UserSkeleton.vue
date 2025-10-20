<!--
  Компонент скелетона для загрузки пользователей
  CRM система "Добрый кофе"
  Разработчик: Alexey Savich
-->
<template>
  <div class="skeleton-container">
    <div 
      v-for="n in count" 
      :key="n" 
      class="skeleton-item"
    >
      <div class="skeleton-header">
        <div class="skeleton-avatar"></div>
        <div class="skeleton-text-group">
          <div class="skeleton-line skeleton-line--title"></div>
          <div class="skeleton-line skeleton-line--subtitle"></div>
        </div>
      </div>
      
      <div class="skeleton-content">
        <div class="skeleton-line skeleton-line--medium"></div>
        <div class="skeleton-line skeleton-line--short"></div>
        <div class="skeleton-line skeleton-line--medium"></div>
      </div>
      
      <div class="skeleton-footer">
        <div class="skeleton-button"></div>
        <div class="skeleton-button"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserSkeleton',
  props: {
    count: {
      type: Number,
      default: 3
    }
  }
}
</script>

<style scoped>
.skeleton-container {
  padding: 0;
}

.skeleton-item {
  background-color: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  animation: pulse 1.5s ease-in-out infinite;
}

.theme--dark .skeleton-item {
  background-color: #1e1e1e;
  border-color: #424242;
}

.skeleton-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.skeleton-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  margin-right: 12px;
}

.theme--dark .skeleton-avatar {
  background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
  background-size: 200% 100%;
}

.skeleton-text-group {
  flex: 1;
}

.skeleton-line {
  height: 12px;
  border-radius: 6px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  margin-bottom: 8px;
}

.theme--dark .skeleton-line {
  background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
  background-size: 200% 100%;
}

.skeleton-line--title {
  width: 60%;
  height: 16px;
}

.skeleton-line--subtitle {
  width: 40%;
  height: 12px;
}

.skeleton-line--medium {
  width: 70%;
}

.skeleton-line--short {
  width: 50%;
}

.skeleton-content {
  margin-bottom: 16px;
}

.skeleton-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.skeleton-button {
  width: 80px;
  height: 32px;
  border-radius: 4px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

.theme--dark .skeleton-button {
  background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
  background-size: 200% 100%;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

@media (max-width: 768px) {
  .skeleton-item {
    padding: 12px;
  }
  
  .skeleton-header {
    margin-bottom: 12px;
  }
  
  .skeleton-avatar {
    width: 40px;
    height: 40px;
    margin-right: 8px;
  }
  
  .skeleton-line--title {
    height: 14px;
  }
  
  .skeleton-line--subtitle {
    height: 10px;
  }
  
  .skeleton-footer {
    flex-direction: column;
    align-items: stretch;
  }
  
  .skeleton-button {
    width: 100%;
    height: 36px;
  }
}
</style>

