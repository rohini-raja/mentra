# Contributing a tool

Mentra grows through community contributions. Every tool is a single JSON
file in `data/tools/<slug>.json`. Adding or improving a tool is just a pull
request.

## Standards

Hold every contribution to these:

1. **Credit accurately.** Name the psychologist/researcher, the tradition, the
   year, and a real source. Don't guess attributions.
2. **Be honest about evidence.** Set the evidence `level` to what the research
   actually supports — don't overclaim or underclaim. Stutz's tools are
   `clinical`; established DBT/CBT skills are typically `meta-analysis`.
3. **Always fill `whenNotToUse`.** This is non-negotiable. Mental-health
   techniques have contraindications, and leaving them out is unsafe.
4. **Write for a person in distress.** Calm, direct, respectful. Not clinical,
   not self-help-y.
5. **Keep the schema exact.** Match field names and types precisely (see below).

## Adding a tool

1. Copy an existing file in `data/tools/` (e.g. `box-breathing.json`).
2. Rename it to `<your-slug>.json`. The filename **must** equal the `slug`
   field, lowercase and hyphenated.
3. Fill in every required field.
4. If relevant, add the slug to the appropriate emotion(s) in
   `data/emotions.json`. Each emotion should map to 3–5 tools.
5. Reference related tools by slug in `relatedTools` (and optionally
   `pairsWith`). Links to tools that don't exist yet are safely ignored.
6. Run `npm run build` to confirm the site still builds, then open a PR.

## Schema

```typescript
interface Tool {
  // Identity
  slug: string          // must match the filename, e.g. "box-breathing"
  name: string
  tagline: string       // one sentence

  // Attribution
  origin: {
    psychologist: string
    tradition: string
    year: number
    source: string
    sourceUrl?: string  // optional
  }

  // Discovery
  emotions: string[]
  situations: string[]
  category:                // one of:
    | 'Motivational' | 'Emotional Regulation' | 'Cognitive'
    | 'Somatic' | 'Relational' | 'Existential' | 'Mindfulness'
  duration: string         // e.g. "2–5 minutes"
  difficulty: 'beginner' | 'intermediate' | 'advanced'

  // Content
  summary: string          // 2–3 sentences
  howItWorks: string       // 1 paragraph: the mechanism
  steps: { instruction: string; mantra?: string; note?: string }[]
  whenToUse: string[]
  whenNotToUse: string[]   // REQUIRED — never empty
  tips: string[]

  // Evidence
  evidence: {
    level: 'anecdotal' | 'clinical' | 'peer-reviewed' | 'meta-analysis'
    summary: string
    citations?: string[]   // optional
  }

  // Related
  relatedTools: string[]   // slugs
  pairsWith?: string[]     // optional slugs
}
```

## Suggesting a tool without writing JSON

Open an issue with the tool name, who developed it, and a source. Someone can
help turn it into an entry.

Thank you for helping make this genuinely useful.
