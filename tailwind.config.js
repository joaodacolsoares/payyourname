const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/pages/**/*', './src/components/**/*'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Poppins', 'Open Sans'],
    },
    colors: {
      main: '#ED0C5A',
      'secondary-black': '#242424',
      background: '#030303',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
    },
    extend: {},
  },
  plugins: [],
};
