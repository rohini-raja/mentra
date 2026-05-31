import fs from 'node:fs'
import path from 'node:path'
import type { Tool, Emotion, CategoryInfo } from './types'

// All data is read from disk at build time. There are zero client fetches —
// pages receive fully-resolved data via static generation.

const toolsDir = path.join(process.cwd(), 'data', 'tools')

let cachedTools: Tool[] | null = null

export function getAllTools(): Tool[] {
  if (cachedTools) return cachedTools

  const files = fs.readdirSync(toolsDir).filter((f) => f.endsWith('.json'))
  const tools = files.map((file) => {
    const raw = fs.readFileSync(path.join(toolsDir, file), 'utf-8')
    return JSON.parse(raw) as Tool
  })

  tools.sort((a, b) => a.name.localeCompare(b.name))
  cachedTools = tools
  return tools
}

export function getToolBySlug(slug: string): Tool | undefined {
  return getAllTools().find((t) => t.slug === slug)
}

export function getAllSlugs(): string[] {
  return getAllTools().map((t) => t.slug)
}

/** Resolve a list of slugs to existing tools, preserving order and skipping
 *  any slug that has no matching tool (keeps related/emotion links safe). */
export function resolveTools(slugs: string[]): Tool[] {
  const bySlug = new Map(getAllTools().map((t) => [t.slug, t]))
  return slugs
    .map((s) => bySlug.get(s))
    .filter((t): t is Tool => Boolean(t))
}

export function getEmotions(): Emotion[] {
  const raw = fs.readFileSync(
    path.join(process.cwd(), 'data', 'emotions.json'),
    'utf-8'
  )
  const emotions = JSON.parse(raw) as Emotion[]
  const existing = new Set(getAllSlugs())
  // Only expose mappings to tools that actually exist, so no tag links nowhere.
  return emotions.map((e) => ({
    ...e,
    tools: e.tools.filter((slug) => existing.has(slug)),
  }))
}

export function getEmotionById(id: string): Emotion | undefined {
  return getEmotions().find((e) => e.id === id)
}

export function getCategories(): CategoryInfo[] {
  const raw = fs.readFileSync(
    path.join(process.cwd(), 'data', 'categories.json'),
    'utf-8'
  )
  return JSON.parse(raw) as CategoryInfo[]
}

export function getCategoryInfo(id: string): CategoryInfo | undefined {
  return getCategories().find((c) => c.id === id)
}

/** Distinct category ids that have at least one tool, for static params. */
export function getUsedCategories(): string[] {
  return Array.from(new Set(getAllTools().map((t) => t.category)))
}
