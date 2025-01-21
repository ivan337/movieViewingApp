module.exports = {
  // Указываем парсер для TypeScript
  parser: '@typescript-eslint/parser',
  // Настройки парсера
  parserOptions: {
    // Указываем версию ECMAScript
    ecmaVersion: 2021,
    // Указываем тип исходного кода как модуль
    sourceType: 'module',
  },
  // Настройки для плагинов
  settings: {
    // Настройка резолвера для импортов
    'import/resolver': {
      node: {
        // Указываем расширения файлов, которые будут использоваться при импортах
        extensions: ['.ts'],
      },
    },
  },
  // Базовые конфигурации ESLint и плагинов
  extends: [
    'eslint:recommended', // Базовые рекомендуемые правила ESLint
    'plugin:@typescript-eslint/recommended', // Рекомендуемые правила для TypeScript
    'plugin:prettier/recommended', // Интеграция Prettier с ESLint
    'prettier', // Отключение правил ESLint, конфликтующих с Prettier
  ],
  // Плагины, которые будут использоваться
  plugins: [
    '@typescript-eslint', // Плагин для TypeScript
    'prettier', // Плагин для Prettier
    'import', // Плагин для сортировки импортов
  ],
  // Правила ESLint
  rules: {
    'prettier/prettier': 'error', // Включаем Prettier как ESLint правило
    'import/order': [
      'error',
      {
        // Группы импортов для сортировки
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  // Среда выполнения
  env: {
    node: true, // Включаем поддержку Node.js
  },
};
