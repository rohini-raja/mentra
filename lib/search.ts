import Fuse, { type IFuseOptions } from 'fuse.js'
import type { Tool } from './types'

// Fuzzy search weighted toward the fields a struggling user is most likely to
// type: the tool's name, what it's for, and the feeling that brought them here.
const options: IFuseOptions<Tool> = {
  keys: [
    { name: 'name', weight: 0.4 },
    { name: 'tagline', weight: 0.2 },
    { name: 'emotions', weight: 0.2 },
    { name: 'situations', weight: 0.1 },
    { name: 'origin.psychologist', weight: 0.1 },
  ],
  threshold: 0.35, // Fuzzy — "breathin" matches "breathing"
  ignoreLocation: true,
  includeScore: true,
}

export function createSearchIndex(tools: Tool[]): Fuse<Tool> {
  return new Fuse(tools, options)
}

export function searchTools(fuse: Fuse<Tool>, query: string): Tool[] {
  if (!query.trim()) return []
  return fuse.search(query).map((r) => r.item)
}
