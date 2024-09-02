/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        moseo: ['"Moseo"', 'sans-serif'],
        moseoSans: ['"Moseo Sans"', 'sans-serif'],
      },
    },

    animation: {
      tadaLoop: 'tadaWithDelay 4s infinite',
      bounce: 'bounce 2s infinite',
    },
    keyframes: {
      tadaWithDelay: {
        '0%': { transform: 'scale(1)' },
        '10%, 20%': { transform: 'scale(0.9) rotate(-6deg)' },
        '30%, 50%, 70%, 90%': { transform: 'scale(1.1) rotate(6deg)' },
        '40%, 60%, 80%': { transform: 'scale(1.1) rotate(-6deg)' },
        '100%': { transform: 'scale(1)' },

        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'none',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      
    },
  },
  variants: {},
  plugins: [],
}