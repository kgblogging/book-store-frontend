/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'smoothRipple': 'smoothRipple 6s infinite ease-in-out',
      },
      keyframes: {
        smoothRipple: {
          '0%': {
            transform: 'scale(1)',
            opacity: '0.3',
          },
          '50%': {
            transform: 'scale(1.2)',
            opacity: '0.5',
          },
          '100%': {
            transform: 'scale(1.5)',
            opacity: '0',
          },
        },
      },
      colors: {
        'light-blue': 'rgba(0, 0, 255, 0.1)',
        'light-cyan': 'rgba(0, 255, 255, 0.2)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

