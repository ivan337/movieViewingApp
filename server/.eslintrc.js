module.exports = {
  // Указываем парсер для TypeScript
  parser: '@typescript-eslint/parser',
  // Настройки парсера
  parserOptions: {
    ecmaVersion: 2021, // Указываем версию ECMAScript
    sourceType: 'module', // Указываем тип исходного кода как модуль
    project: './tsconfig.json', // Указываем путь к tsconfig.json
  },
  // Настройки для плагинов
  settings: {
    // Настройка резолвера для импортов
    'import/resolver': {
      node: {
        // Указываем расширения файлов, которые будут использоваться при импортах
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
  },
  // Базовые конфигурации ESLint и плагинов
  extends: [
    'eslint:recommended', // Базовые рекомендуемые правила ESLint
    'plugin:@typescript-eslint/recommended', // Рекомендуемые правила для TypeScript
    'plugin:prettier/recommended', // Интеграция Prettier с ESLint
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
    '@typescript-eslint/explicit-function-return-type': 'off', // Отключаем обязательное указание типов возвращаемых значений
    '@typescript-eslint/no-unused-vars': 'warn', // Предупреждение для неиспользуемых переменных
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
        'newlines-between': 'always', // Пустые строки между группами
        alphabetize: {
          order: 'asc', // Сортировка по алфавиту
          caseInsensitive: true, // Без учета регистра
        },
      },
    ],
  },
  // Среда выполнения
  env: {
    node: true, // Включаем поддержку Node.js
    es2021: true, // Включаем поддержку ES2021
  },
};
