/**
 * API плагин для генерации данных пользователей
 * CRM система "Добрый кофе"
 * Разработчик: Alexey Savich
 */

// Генератор случайных данных для пользователей
const generateRandomId = () => {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < 24; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

const generateRandomPhone = () => {
  const prefixes = ['+79', '+78', '+77'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const number = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  return `${prefix}*****${number.slice(-4)}`;
};

const generateRandomName = () => {
  const names = [
    'Александр', 'Анна', 'Владимир', 'Елена', 'Дмитрий', 'Ольга', 'Сергей', 'Татьяна',
    'Андрей', 'Наталья', 'Михаил', 'Ирина', 'Николай', 'Светлана', 'Иван', 'Мария',
    'Алексей', 'Екатерина', 'Максим', 'Юлия', 'Артем', 'Анастасия', 'Роман', 'Дарья',
    'Павел', 'Кристина', 'Игорь', 'Анжела', 'Олег', 'Виктория', 'Галина', 'Людмила'
  ];
  return names[Math.floor(Math.random() * names.length)];
};

const cities = [
  { id: '60f197849998570020506123', title: 'Оренбург' },
  { id: '60f197849998570020506124', title: 'Тольятти' },
  { id: '60f197849998570020506125', title: 'Самара' },
  { id: '60f197849998570020506126', title: 'Нижний Новгород' },
  { id: '60f197849998570020506127', title: 'Москва' },
  { id: '60f197849998570020506128', title: 'Смоленск' }
];

const generateRandomCity = () => {
  return cities[Math.floor(Math.random() * cities.length)];
};

const generateRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).getTime();
};

// Генератор пользователя
const generateUser = (id) => {
  const now = new Date();
  const createdAt = new Date(now.getTime() - Math.random() * 365 * 24 * 60 * 60 * 1000); // Последний год
  const lastVisit = generateRandomDate(createdAt, now);
  const lastSave = generateRandomDate(createdAt, now);
  const lastSpend = generateRandomDate(createdAt, now);
  
  const balance = Math.floor(Math.random() * 1000);
  const cashbackPercent = Math.floor(Math.random() * 20) + 5; // 5-25%
  const saveCount = Math.floor(Math.random() * 200);
  const saveTotal = Math.floor(Math.random() * 5000);
  const spendCount = Math.floor(Math.random() * 50);
  const spendTotal = Math.floor(Math.random() * 3000);
  
  return {
    id: id || generateRandomId(),
    balance,
    cashbackPercent,
    city: generateRandomCity(),
    isBlocked: false, // Все пользователи активны
    lastSave: lastSave,
    lastSpend: lastSpend,
    lastVisit: lastVisit,
    name: generateRandomName(),
    phone: generateRandomPhone(),
    role: 'customer',
    saveCount,
    saveTotal,
    spendCount,
    spendTotal,
    updatedAt: lastVisit,
    createdAt: createdAt.getTime()
  };
};

// Имитация задержки сети
const delay = (ms) => {
  // На сервере не делаем задержку, чтобы не блокировать SSR
  if (process.server) {
    return Promise.resolve();
  }
  return new Promise(resolve => setTimeout(resolve, ms));
};

// API методы
const api = {
  users: {
    async list({ offset = 0, limit = 100 } = {}) {
      const users = [];
      const totalUsers = 8000;
      const actualLimit = Math.min(limit, totalUsers - offset);
      
      for (let i = 0; i < actualLimit; i++) {
        users.push(generateUser());
      }
      
      return {
        data: users,
        total: totalUsers,
        offset,
        limit: actualLimit,
        hasMore: offset + actualLimit < totalUsers
      };
    },
    
    async getById(id) {
      await delay(300);
      return generateUser(id);
    }
  },
  
  cities: {
    async list() {
      // Имитация задержки
      await delay(100);
      
      return cities;
    }
  }
};

export default ({ app }, inject) => {
  // Проверяем, что мы на сервере или клиенте
  if (process.server || process.client) {
    inject('api', api);
  }
};

