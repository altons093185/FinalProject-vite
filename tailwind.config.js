export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#7C9B75',
        'main-hover': '#6C8864',
        primary: '#3E3A39',
        sub: '#6D6763',
        old: '#A6A3A0',
        accent: '#B8574B',
        rate: '#D4AF37',
        bg: '#F6F5F3'
      },
      fontFamily: {
        sans: ['Noto Sans TC', 'sans-serif']
      }
    },
  },
  plugins: [],
}