module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Inter', 'Open Sans'],
    },
    extend: {}
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
