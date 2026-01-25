/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors for the dashboard
        'cos-bg': '#0f0f0f',
        'cos-surface': '#1a1a1a',
        'cos-border': '#2a2a2a',
        'cos-text': '#e5e5e5',
        'cos-muted': '#888888',
        'cos-accent': '#3b82f6',
        'cos-success': '#22c55e',
        'cos-warning': '#eab308',
        'cos-danger': '#ef4444',
      }
    },
  },
  plugins: [],
}
