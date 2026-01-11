/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',    // Very light blue
          100: '#e0f2fe',   // Light blue
          200: '#bae6fd',
          300: '#7dd3fc',   // Lighter shade
          400: '#38bdf8',
          500: '#0ea5e9',   // Medium light blue ⭐
          600: '#0284c7',   // Lighter than before
          700: '#0369a1',   // Medium blue
          800: '#075985',   // Dark blue
          900: '#0c2d48',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 30px rgba(2, 132, 199, 0.5), 0 0 60px rgba(2, 132, 199, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 50px rgba(2, 132, 199, 0.8), 0 0 100px rgba(2, 132, 199, 0.5)',
          },
        },
      },
    },
  },
  plugins: [],
}