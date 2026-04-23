/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0B0B0B',
        surface: '#111111',
        panel: '#161616',
        line: 'rgba(255,255,255,0.08)',
        accent: '#D4AF37',
        electric: '#3D8BFF',
        soft: '#D8D8D8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 0 1px rgba(212,175,55,0.18), 0 12px 40px rgba(212,175,55,0.16)',
        panel: '0 20px 60px rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
