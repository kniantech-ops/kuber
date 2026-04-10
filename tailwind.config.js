/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#08111f',
        midnight: '#10192b',
        panel: '#152238',
        accent: '#58d6a7',
        gold: '#f4be63',
        warn: '#ff8c69',
        fog: '#d8e4ff',
      },
    },
  },
  plugins: [],
};
