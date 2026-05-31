import type { Config } from 'tailwindcss'

// Colors are driven by CSS variables (see app/globals.css) so dark mode and
// theming never require hardcoded hex values in components.
const config: Config = {
  darkMode: 'media',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        border: 'var(--border)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        'accent-fg': 'var(--accent-fg)',
        'accent-soft': 'var(--accent-soft)',
        // Evidence badge palette
        'ev-anecdotal': 'var(--ev-anecdotal)',
        'ev-clinical': 'var(--ev-clinical)',
        'ev-peer': 'var(--ev-peer)',
        'ev-meta': 'var(--ev-meta)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
}

export default config
