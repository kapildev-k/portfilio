import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#080D18',
        surface: '#101827',
        card: '#111C2D',
        border: '#243247',
        primary: '#38BDF8',
        text: '#F8FAFC',
        muted: '#94A3B8',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(56, 189, 248, 0.2), 0 20px 60px rgba(15, 23, 42, 0.45)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};

export default config;
