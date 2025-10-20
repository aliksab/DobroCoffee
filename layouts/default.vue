<!--
  Основной лейаут приложения
  CRM система "Добрый кофе"
  Разработчик: Alexey Savich
-->
<template>
  <div class="app-layout" data-app>
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'AppLayout'
}
</script>

<style>
html {
  font-family: 'Nunito', sans-serif;
}

body {
  margin: 0;
  padding: 0;
  background-color: #ffffff;
  transition: background-color 0.3s ease;
}

.theme--dark body {
  background-color: #121212;
}

* {
  box-sizing: border-box;
}

/* Стили для Vuetify компонентов */
.v-application {
  font-family: 'Nunito', sans-serif !important;
}

.v-application .text-h1 {
  font-family: 'Nunito', sans-serif !important;
  font-weight: 700 !important;
  color: #000000 !important;
}

.theme--dark .v-application .text-h1 {
  color: #ffffff !important;
}

.v-application .text-body-1 {
  font-family: 'Nunito', sans-serif !important;
  font-weight: 400 !important;
  color: #000000 !important;
}

.theme--dark .v-application .text-body-1 {
  color: #ffffff !important;
}

.v-application .text-caption {
  font-family: 'Nunito', sans-serif !important;
  font-weight: 400 !important;
  color: #787878 !important;
}

/* Кастомные стили для компонентов */
.v-text-field--outlined .v-input__control .v-input__slot {
  border-radius: 8px !important;
}

.v-select--outlined .v-input__control .v-input__slot {
  border-radius: 8px !important;
}

.v-btn {
  border-radius: 8px !important;
  text-transform: none !important;
  font-weight: 500 !important;
}

.v-card {
  border-radius: 12px !important;
}

/* Стили для пагинации */
.v-pagination .v-pagination__item {
  border-radius: 6px !important;
}

.v-pagination .v-pagination__item--active {
  background-color: #ffd166 !important;
  color: #000000 !important;
}

/* Стили для темной темы */
.theme--dark .v-pagination .v-pagination__item {
  background-color: #2a2a2a !important;
  color: #ffffff !important;
}

.theme--dark .v-pagination .v-pagination__item--active {
  background-color: #ffd166 !important;
  color: #000000 !important;
}

/* Анимации */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter, .slide-leave-to {
  transform: translateX(-100%);
}

/* Утилиты */
.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cursor-pointer {
  cursor: pointer;
}

.transition-all {
  transition: all 0.3s ease;
}

/* Дополнительные стили для темной темы */
.theme--dark .v-text-field--outlined .v-input__control .v-input__slot fieldset {
  border-color: #424242 !important;
}

.theme--dark .v-text-field--outlined .v-input__control .v-input__slot .v-text-field__slot input {
  color: #ffffff !important;
}

.theme--dark .v-text-field--outlined .v-input__control .v-input__slot .v-text-field__slot label {
  color: #ffffff !important;
}

.theme--dark .v-select--outlined .v-input__control .v-input__slot fieldset {
  border-color: #424242 !important;
}

.theme--dark .v-select--outlined .v-input__control .v-input__slot .v-select__slot .v-select__selections {
  color: #ffffff !important;
}

.theme--dark .v-select--outlined .v-input__control .v-input__slot .v-select__slot label {
  color: #ffffff !important;
}

.theme--dark .v-combobox--outlined .v-input__control .v-input__slot label {
  color: #ffffff !important;
}

.theme--dark .v-combobox--outlined .v-input__control .v-input__slot .v-combobox__selection--comma {
  color: #ffffff !important;
}

.theme--dark .v-combobox--outlined .v-input__control .v-input__slot .v-combobox__selection--comma input {
  color: #ffffff !important;
}

/* Дополнительные стили для label в v-combobox */
.theme--dark .v-input--outlined .v-input__control .v-input__slot fieldset {
  border-color: #424242 !important;
}

.theme--dark .v-input--outlined .v-input__control .v-input__slot .v-label {
  color: #ffffff !important;
}

.theme--dark .v-input--outlined .v-input__control .v-input__slot .v-label--active {
  color: #ffffff !important;
}

.theme--dark .v-input--outlined .v-input__control .v-input__slot .v-label--is-floating {
  color: #ffffff !important;
}

/* Максимально специфичные стили для всех возможных состояний */
.theme--dark .v-application .v-combobox .v-input__control .v-input__slot .v-label {
  color: #ffffff !important;
}

.theme--dark .v-application .v-combobox .v-input__control .v-input__slot .v-label--active {
  color: #ffffff !important;
}

.theme--dark .v-application .v-combobox .v-input__control .v-input__slot .v-label--is-floating {
  color: #ffffff !important;
}

.theme--dark .v-application .v-input--outlined .v-input__control .v-input__slot .v-label {
  color: #ffffff !important;
}

.theme--dark .v-application .v-input--outlined .v-input__control .v-input__slot .v-label--active {
  color: #ffffff !important;
}

.theme--dark .v-application .v-input--outlined .v-input__control .v-input__slot .v-label--is-floating {
  color: #ffffff !important;
}

/* Экстремально специфичные стили для принудительного белого цвета */
.theme--dark .v-application .v-combobox .v-input__control .v-input__slot .v-label,
.theme--dark .v-application .v-combobox .v-input__control .v-input__slot .v-label--active,
.theme--dark .v-application .v-combobox .v-input__control .v-input__slot .v-label--is-floating,
.theme--dark .v-application .v-input--outlined .v-input__control .v-input__slot .v-label,
.theme--dark .v-application .v-input--outlined .v-input__control .v-input__slot .v-label--active,
.theme--dark .v-application .v-input--outlined .v-input__control .v-input__slot .v-label--is-floating {
  color: #ffffff !important;
}

/* Дополнительные селекторы с максимальной специфичностью */
.v-application.theme--dark .v-combobox .v-input__control .v-input__slot .v-label,
.v-application.theme--dark .v-combobox .v-input__control .v-input__slot .v-label--active,
.v-application.theme--dark .v-combobox .v-input__control .v-input__slot .v-label--is-floating {
  color: #ffffff !important;
}

/* Еще более специфичные селекторы */
.theme--dark .v-input .v-input__control .v-input__slot .v-label {
  color: #ffffff !important;
}

.theme--dark .v-input .v-input__control .v-input__slot .v-label--active {
  color: #ffffff !important;
}

.theme--dark .v-input .v-input__control .v-input__slot .v-label--is-floating {
  color: #ffffff !important;
}

/* CSS переменные для принудительного белого цвета */
.theme--dark .v-combobox {
  --v-label-color: #ffffff !important;
  --v-label-active-color: #ffffff !important;
}

.theme--dark .v-input--outlined {
  --v-label-color: #ffffff !important;
  --v-label-active-color: #ffffff !important;
}

/* Абсолютно все возможные селекторы */
.theme--dark * .v-label,
.theme--dark * .v-label--active,
.theme--dark * .v-label--is-floating,
.theme--dark * label {
  color: #ffffff !important;
}

/* Финальная попытка - универсальный селектор */
.theme--dark [class*="v-label"],
.theme--dark [class*="label"] {
  color: #ffffff !important;
}

.theme--dark .v-btn--outlined {
  border-color: #424242 !important;
  color: #ffffff !important;
}

.theme--dark .v-btn--outlined .v-icon {
  color: #ffffff !important;
}

.theme--dark .v-card {
  background-color: #1e1e1e !important;
}

.theme--dark .v-card__title {
  color: #ffffff !important;
}

.theme--dark .v-card__text {
  color: #ffffff !important;
}

.theme--dark .v-input__prepend-inner .v-icon {
  color: #ffffff !important;
}

.theme--dark .v-input__append-inner .v-icon {
  color: #ffffff !important;
}

.theme--dark .v-chip {
  color: #000000 !important;
}

.theme--dark .v-icon {
  color: #ffffff !important;
}

.theme--dark .v-btn .v-icon {
  color: #ffffff !important;
}

/* Стили для сайдбара при наведении */
.sidebar-hovered .main-content {
  margin-left: 250px !important;
}

@media (max-width: 768px) {
  .sidebar-hovered .main-content {
    margin-left: 0 !important;
  }
}
</style>

