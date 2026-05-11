/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bespoke Enterprise Palette: "Obsidian & Cobalt"
        intel: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a', // Main Background
          950: '#020617', // Sidebar / Dark areas
        },
        action: {
          primary: '#2a9433',   // Professional Green theme color
          secondary: '#6366f1', // Indigo Accent
          success: '#10b981',   // Emerald
          warning: '#f59e0b',   // Amber
          danger: '#ef4444',    // Rose
        }
      },
      fontFamily: {
        // High-end sans-serif stack
        sans: ['Roboto', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'premium': '0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.05), 0 12px 24px rgba(0,0,0,0.05)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255,255,255,0.05)',
      }
    },
  },
  plugins: [],
}
