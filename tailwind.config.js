/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-picture': 'url(\'/src/images/logo-star-wars.jpg\')',
      },
    },
  },
  plugins: [],
};
