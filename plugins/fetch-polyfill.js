/**
 * Полифилл для fetch в SSR режиме на Vercel
 * CRM система "Добрый кофе"
 * Разработчик: Alexey Savich
 */

export default ({ app }) => {
  // Полифилл для fetch только на сервере
  if (process.server && !global.fetch) {
    const fetch = require('node-fetch-native')
    global.fetch = fetch
    global.Headers = fetch.Headers
    global.Request = fetch.Request
    global.Response = fetch.Response
  }
}
