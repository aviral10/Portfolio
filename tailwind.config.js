/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    fontFamily: {
      'barry': ['"Trebuchet MS Regular"', 'sans-serif'],
      'larry': ['"Nunito Sans"', 'sans-serif'],
      
    },
    extend: {
      colors: {
        textColor: "#ebedef",
        gray: {
          900: '#202225',
          800: '#2f3136',
          700: '#36393f',
          650: '#404249',
          600: '#4f545c',
          500: '#767b82',
          400: '#d4d7dc',
          300: '#e3e5e8',
          200: '#ebedef',
          100: '#f2f3f5',
        },
        starblue: {100: '#6A5ACD'}
      },
      
    },
  },
  plugins: [],
}