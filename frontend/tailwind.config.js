/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#FFFFFF',
          'bg-secondary': '#F8F9FA',
        },
        text: {
          main: '#212529',
          secondary: '#6C757D',
        },
        accent: {
          DEFAULT: '#0D6EFD',
          hover: '#0B5ED7',
          light: '#0D6EFD10',
        },
        border: {
          DEFAULT: '#DEE2E6',
        },
        code: {
          bg: '#F1F3F5',
        },
        highlight: {
          DEFAULT: '#FFF3CD',
        },
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro', 'Microsoft YaHei', 'Source Han Sans', 'sans-serif'],
        mono: ['Consolas', 'Monaco', 'Source Han Mono', 'monospace'],
      },
      fontSize: {
        'h1': ['24-28px', { lineHeight: '1.3', fontWeight: '600-700' }],
        'h2': ['18-20px', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      maxWidth: {
        'content': '1200px',
      },
      spacing: {
        'module': '24px',
        'module-x': '16px',
      },
    },
  },
  plugins: [],
}
