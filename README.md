# Mentra

A curated reference of psychological tools — searchable by what you're feeling.

Live, static, free to run. No account, no database, no tracking, no AI.

## Why this exists

Most people arrive at a moment of difficulty knowing what they're _feeling_ —
not which therapy modality they need. Mentra starts from the feeling and
surfaces techniques that fit, explains each one clearly, and credits the
psychologist or researcher who developed it.

Every tool carries an honest evidence level, and every tool lists when **not**
to use it — because mental-health techniques have contraindications.

## How to use it

1. Open the homepage and pick what you're feeling.
2. Browse the 3–6 tools that fit.
3. Open a tool to read what it is, who made it, how to do it, and what the
   research says.
4. Or go to **All tools** to search and filter by feeling, category,
   difficulty, or duration. Filters live in the URL, so any view is shareable
   (e.g. `/tools?emotion=anxious&category=Somatic`).

## Tool sources and credits

Tools are drawn from established traditions — Stutz's _The Tools_, ACT, CBT,
DBT, behavioral economics, mindfulness and self-compassion, grief studies, and
logotherapy — and credited to their originators. See the **About** page for the
full credits list and the safety disclaimer.

## Tech

- **Next.js 14** (App Router, `output: 'export'` — pure static)
- **TypeScript** (strict)
- **Tailwind CSS** (all color via CSS variables; light/dark via
  `prefers-color-scheme`)
- **Fuse.js** for in-browser fuzzy search (zero server)
- Content is **JSON files** in `data/tools/`, one per tool

## How to run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Build the static site:

```bash
npm run build    # outputs to ./out
```

Deploy the `out/` directory to any static host. On **Vercel**, just import the
repo — no configuration and no environment variables required.

## How to contribute a tool

Each tool is a single JSON file in `data/tools/<slug>.json`. See
[CONTRIBUTING.md](./CONTRIBUTING.md) for the schema and standards, then open a
pull request.

## Disclaimer

These tools are for educational purposes and everyday emotional challenges. They
are not a substitute for professional mental health care. If you are in crisis,
call or text **988** (Suicide & Crisis Lifeline, US), or find a local helpline
at [findahelpline.com](https://findahelpline.com).

## License

MIT — see the repository for details. Content credits remain with the original
authors cited in each tool.
