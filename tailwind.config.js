/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",     // Calm Blue (Blue-500)
        secondary: "#8b5cf6",   // Calm Purple (Violet-500)
        tertiary: "#14b8a6",    // Calm Teal (Teal-500)
        bg: {
          900: "#0f172a",       // Slate-900
          800: "#1e293b",       // Slate-800
          700: "#334155",       // Slate-700
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        sora: ['Inter', 'sans-serif'],     // Re-mapped to Inter
        grotesk: ['Inter', 'sans-serif'],  // Re-mapped to Inter
        outfit: ['Inter', 'sans-serif'],   // Re-mapped to Inter
      },
      boxShadow: {
        'glass': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }
    },
  },
  plugins: [],
}
