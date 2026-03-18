/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app-bg': '#0f1117',
        'card-bg': '#1a1d27',
        'accent-blue': '#4f8ef7',
        'category-ai': '#4f8ef7',
        'category-general': '#6b7280',
        'category-japan': '#10b981',
      },
      fontFamily: {
        'serif': ['"Noto Serif JP"', 'serif'],
        'sans': ['"Noto Sans JP"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
