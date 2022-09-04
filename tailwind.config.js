/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
     keyframes: {
        'shadow-effect': {
          '0%': {
            'box-shadow': 'rgba(46, 229, 240, 0.4) 0px 0px 12px 1px',
            'animation-timing-function': 'cubic-bezier(0.65, 0.05, 0.36, 1)',
          },
          '20%': {
            'box-shadow': 'rgba(59, 130, 246, 0.4) 0px 2px 10px 2px',
          },
          '40%': {
            'box-shadow': 'rgba(59, 130, 246, 0.4) 0px -2px 10px 2px',
          },
          '100%': {
            'box-shadow': 'rgba(46, 229, 240, 0.4) 0px 0px 12px 1px',
          },
        }
      },
      animation: {
        'shadow-effect': 'shadow-effect 3s infinite'
      },
    },
  },
  plugins: [],
}
