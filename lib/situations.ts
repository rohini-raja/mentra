import fs from 'node:fs'
import path from 'node:path'
import { getAllSlugs } from './tools'

export interface Situation {
  slug: string
  title: string
  intro: string
  tools: string[]
}

export function getSituations(): Situation[] {
  const raw = fs.readFileSync(
    path.join(process.cwd(), 'data', 'situations.json'),
    'utf-8'
  )
  const situations = JSON.parse(raw) as Situation[]
  const existing = new Set(getAllSlugs())
  // Only reference tools that actually exist.
  return situations.map((s) => ({
    ...s,
    tools: s.tools.filter((slug) => existing.has(slug)),
  }))
}

export function getSituationBySlug(slug: string): Situation | undefined {
  return getSituations().find((s) => s.slug === slug)
}

export function getSituationSlugs(): string[] {
  return getSituations().map((s) => s.slug)
}
