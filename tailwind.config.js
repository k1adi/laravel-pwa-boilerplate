import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.jsx',
  ],

  theme: {
    screens: {
      '2xs': '375px',
      'xs': '425px',
      '2md': '992px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
        info: '#0ea5e9',
        accent: '#80CBC4',
        stroke: '#E2E8F0',

        // Define your light mode colors
        'light-primary': '#CD5656',
        'light-bg': '#F9FAFB',
        'light-txt': '#111827',

        // Define your dark mode colors - these will be applied with dark: prefix
        'dark-primary': '#AF3E3E',
        'dark-bg': '#1F2937',
        'dark-txt': '#F9FAFB',

        'white-transparent': 'rgba(255, 255, 255, 0.3)',
        ...defaultTheme.colors,
      },
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        'title-3xl': ['44px', '55px'],
        'title-2xl': ['33px', '48px'],
        'title-xl': ['36px', '45px'],
        'title-3lg': ['32px', '42px'],
        'title-2lg': ['30px', '38px'],
        'title-lg': ['28px', '35px'],
        'title-md': ['24px', '32px'],
        'title-2md': ['26px', '28px'],
        'title-sm': ['20px', '26px'],
        'title-xs': ['18px', '24px'],
      },
      zIndex: {
        999999: '999999',
        99999: '99999',
        9999: '9999',
        999: '999',
        99: '99',
        9: '9',
        1: '1',
      },
      boxShadow: {
        default: '0px 8px 13px -3px rgba(0, 0, 0, 0.07)',
        card: '0px 1px 3px rgba(0, 0, 0, 0.12)',
        'card-2': '0px 1px 2px rgba(0, 0, 0, 0.05)',
        switcher:
          '0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 2px 2px #FFFFFF, inset 0px -1px 1px rgba(0, 0, 0, 0.1)',
        'switch-1': '0px 0px 5px rgba(0, 0, 0, 0.15)',
        1: '0px 1px 3px rgba(0, 0, 0, 0.08)',
        2: '0px 1px 4px rgba(0, 0, 0, 0.12)',
        3: '0px 1px 5px rgba(0, 0, 0, 0.14)',
        4: '0px 4px 10px rgba(0, 0, 0, 0.12)',
        5: '0px 1px 1px rgba(0, 0, 0, 0.15)',
        6: '0px 3px 15px rgba(0, 0, 0, 0.1)',
        7: '-5px 0 0 #313D4A, 5px 0 0 #313D4A',
        8: '1px 0 0 #313D4A, -1px 0 0 #313D4A, 0 1px 0 #313D4A, 0 -1px 0 #313D4A, 0 3px 13px rgb(0 0 0 / 8%)',
        ...defaultTheme.boxShadow,
      },
      dropShadow: {
        1: '0px 1px 0px #E2E8F0',
        2: '0px 1px 4px rgba(0, 0, 0, 0.12)',
        ...defaultTheme.dropShadow,
      },
    },
  },

  plugins: [forms],
};
