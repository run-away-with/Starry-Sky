import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';
// 新增 Prettier 相关导入
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  // 1. 先禁用 ESLint 与 Prettier 冲突的规则
  prettierConfig,

  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'public/**',
      '.config.js',
      'vite.config.js',
      '.vscode/**',
      '*.mjs'
    ]
  },
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    plugins: { js, prettier: prettierPlugin },
    extends: [js.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.browser,
        // 新增：Vue3 <script setup> 特有全局 API
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly'
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      'no-var': 'error',
      'no-unused-vars': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }], // 禁止空代码块（允许空catch）
      'no-debugger': 'error', // 禁止debugger
      'no-console': ['warn', { allow: ['warn', 'error'] }], // 禁止console.log，允许console.warn和console.error
      camelcase: ['error', { properties: 'always' }], // 强制驼峰命名（对象属性也需遵守）

      // 2. 开启 Prettier 规则（将 Prettier 格式问题作为 ESLint 错误提示）
      'prettier/prettier': ['error']
    }
  },
  pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    rules: {
      'vue/max-attributes-per-line': 'off', // 允许单行多属性
      'vue/singleline-html-element-content-newline': 'off', // 允许单行元素内容不换行
      'vue/multi-word-component-names': 'off', // 允许单词组件名（如Header.vue）
      'vue/no-unused-vars': 'error', // 检测 script-setup 未使用变量
      'vue/require-default-prop': 'warn', // props未设默认值时警告（非强制）
      'vue/require-prop-types': 'error', // 强制props声明类型
      'vue/no-duplicate-attributes': [
        'error',
        { allowCoexistClass: true, allowCoexistStyle: true }
      ], // 禁止重复属性（允许class/style重复）
      'vue/order-in-components': [
        'error',
        {
          // 强制组件选项顺序（规范结构）
          order: [
            'name',
            'props',
            'emits',
            'setup',
            'data',
            'computed',
            'methods',
            'watch',
            'template',
            'render'
          ]
        }
      ],
      'vue/no-lone-template': 'error', // 禁止无意义的空<template>标签
      'vue/no-reserved-props': 'error', // 禁止props使用保留字

      'vue/html-indent': 'off', // 交给 Prettier 处理缩进
      'vue/html-quotes': 'off', // 交给 Prettier 处理引号
      'vue/attribute-hyphenation': 'off', // 交给 Prettier 处理连字符
      'vue/html-self-closing': 'off', // 交给 Prettier 处理自闭合标签
      'vue/prop-name-casing': 'off' // 交给 Prettier 处理prop命名风格
    }
  }
]);
