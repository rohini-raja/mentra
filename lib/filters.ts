import type { Tool, Emotion } from './types'

export interface ToolFilters {
  emotion?: string
  category?: string
  difficulty?: string
  duration?: string
}

// Pure, client-safe filtering used by the /tools page. Each predicate is
// skipped when its filter is empty, so filters compose freely.
export function filterTools(
  tools: Tool[],
  filters: ToolFilters,
  emotions: Emotion[]
): Tool[] {
  let result = tools

  if (filters.emotion) {
    const emotion = emotions.find((e) => e.id === filters.emotion)
    const slugs = new Set(emotion?.tools ?? [])
    result = result.filter((t) => slugs.has(t.slug))
  }

  if (filters.category) {
    result = result.filter((t) => t.category === filters.category)
  }

  if (filters.difficulty) {
    result = result.filter((t) => t.difficulty === filters.difficulty)
  }

  if (filters.duration) {
    result = result.filter((t) => durationBucket(t.duration) === filters.duration)
  }

  return result
}

// Group free-text durations like "2–5 minutes" into coarse, filterable buckets.
export function durationBucket(duration: string): 'short' | 'medium' | 'long' {
  const max = maxMinutes(duration)
  if (max <= 5) return 'short'
  if (max <= 15) return 'medium'
  return 'long'
}

export const DURATION_BUCKETS: { id: string; label: string }[] = [
  { id: 'short', label: 'Under 5 min' },
  { id: 'medium', label: '5–15 min' },
  { id: 'long', label: '15+ min' },
]

function maxMinutes(duration: string): number {
  // Pull the largest number out of strings like "2–5 minutes" or "10+ minutes".
  const numbers = duration.match(/\d+/g)
  if (!numbers) return 5
  return Math.max(...numbers.map(Number))
}
