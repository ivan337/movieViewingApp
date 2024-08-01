module.exports = {
  // Указываем парсер для TypeScript
  parser: '@typescript-eslint/parser',
  // Настройки парсера
  parserOptions: {
    // Указываем версию ECMAScript
    ecmaVersion: 2021,
    // Указываем тип исходного кода как модуль
    sourceType: 'module',
    // Включаем поддержку JSX
    ecmaFeatures: {
      jsx: true,
    },
  },
  // Настройки для плагинов
  settings: {
    // Автоматическое определение версии React
    react: {
      version: 'detect',
    },
    // Настройка резолвера для импортов
    'import/resolver': {
      node: {
        // Указываем расширения файлов, которые будут использоваться при импортах
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  // Базовые конфигурации ESLint и плагинов
  extends: [
    'eslint:recommended', // Базовые рекомендуемые правила ESLint
    'plugin:@typescript-eslint/recommended', // Рекомендуемые правила для TypeScript
    'plugin:react/recommended', // Рекомендуемые правила для React
    'plugin:react-hooks/recommended', // Рекомендуемые правила для React Hooks
    'plugin:prettier/recommended', // Интеграция Prettier с ESLint
    'prettier', // Отключение правил ESLint, конфликтующих с Prettier
  ],
  // Плагины, которые будут использоваться
  plugins: [
    '@typescript-eslint', // Плагин для TypeScript
    'react', // Плагин для React
    'react-hooks', // Плагин для React Hooks
    'prettier', // Плагин для Prettier
    'import', // Плагин для сортировки импортов
  ],
  // Правила ESLint
  rules: {
    'react/react-in-jsx-scope': 'off', // Отключаем правило, требующее импорта React в файлах с JSX
    'prettier/prettier': 'error', // Включаем Prettier как ESLint правило
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }], // Разрешаем использование JSX только в файлах с расширением .tsx
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
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
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
