import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    // Указываем, что эта конфигурация применяется к файлам с расширениями .ts и .tsx
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      // Указываем парсер для TypeScript
      parser: typescriptEslintParser,
      // Указываем версию ECMAScript
      ecmaVersion: 2018,
      // Указываем тип исходного кода как модуль
      sourceType: 'module'
    },
    plugins: {
      // Плагин для TypeScript
      '@typescript-eslint': typescriptEslintPlugin,
      // Плагин для React
      react: reactPlugin,
      // Плагин для React Hooks
      'react-hooks': reactHooksPlugin,
      // Плагин для Prettier
      prettier: eslintPluginPrettier,
      // Плагин для сортировки импортов
      import: importPlugin,
    },
    rules: {
      // Правило для Prettier, чтобы ESLint использовал Prettier для форматирования
      ...eslintConfigPrettier.rules,
      'prettier/prettier': 'error',
      // Правило для React, чтобы разрешать JSX только в файлах с расширением .tsx
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
      // Правило для сортировки импортов
      'import/order': [
        'error',
        {
          // Группы импортов для сортировки
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          // Группировка импортов React в начале
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],
          // Исключаем React из сортировки по типам
          pathGroupsExcludedImportTypes: ['react'],
          // Добавляем пустую строку между группами импортов
          'newlines-between': 'always',
          // Сортировка импортов внутри групп по алфавиту без учета регистра
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
    settings: {
      // Указываем React версию для автоматического определения
      react: {
        version: 'detect',
      },
      // Настройка резолвера для импортов, чтобы ESLint понимал расширения .ts и .tsx
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
];