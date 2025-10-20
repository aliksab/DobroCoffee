/**
 * Nuxt.js конфигурация для CRM системы "Добрый кофе" (SSR версия)
 * Разработчик: Alexey Savich
 */
export default {
  head: {
    title: 'Добрый кофе - CRM',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'CRM система для кофейни Добрый кофе' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap' }
    ]
  },

  css: [
    '~/assets/scss/main.scss'
  ],

  plugins: [
    '~/plugins/api.js',
    '~/plugins/toast.js'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/vuetify'
  ],

  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#FFD166',
          secondary: '#EEEEEE',
          accent: '#FFD166',
          error: '#f44336',
          warning: '#ff9800',
          info: '#2196f3',
          success: '#4caf50',
          background: '#FFFFFF',
          surface: '#FFFFFF'
        },
        dark: {
          primary: '#FFD166',
          secondary: '#424242',
          accent: '#FFD166',
          error: '#f44336',
          warning: '#ff9800',
          info: '#2196f3',
          success: '#4caf50',
          background: '#121212',
          surface: '#1e1e1e'
        }
      }
    },
    icons: {
      iconfont: 'mdi'
    }
  },

  axios: {
    baseURL: process.env.NODE_ENV === 'production' ? 'https://dobro-coffee.vercel.app/api' : 'http://localhost:3000/api'
  },

  build: {
    extractCSS: true
  },

  ssr: true
}
