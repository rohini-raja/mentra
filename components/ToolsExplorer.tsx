'use client'

import { useCallback, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { Tool, Emotion, CategoryInfo } from '@/lib/types'
import { createSearchIndex, searchTools } from '@/lib/search'
import { filterTools, DURATION_BUCKETS, type ToolFilters } from '@/lib/filters'
import { ToolCard } from './ToolCard'
import { SearchBar } from './SearchBar'

const DIFFICULTIES = ['beginner', 'intermediate', 'advanced']

// The /tools experience: instant fuzzy search plus shareable URL-param filters.
// The Fuse index is built once (useMemo) and reused for every keystroke.
export function ToolsExplorer({
  tools,
  emotions,
  categories,
}: {
  tools: Tool[]
  emotions: Emotion[]
  categories: CategoryInfo[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const [query, setQuery] = useState('')

  const fuse = useMemo(() => createSearchIndex(tools), [tools])

  const filters: ToolFilters = {
    emotion: params.get('emotion') ?? undefined,
    category: params.get('category') ?? undefined,
    difficulty: params.get('difficulty') ?? undefined,
    duration: params.get('duration') ?? undefined,
  }

  // Update one filter in the URL so results stay shareable/bookmarkable.
  const setFilter = useCallback(
    (key: string, value: string | undefined) => {
      const next = new URLSearchParams(params.toString())
      if (!value || next.get(key) === value) {
        next.delete(key)
      } else {
        next.set(key, value)
      }
      const qs = next.toString()
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    },
    [params, pathname, router]
  )

  const clearAll = useCallback(() => {
    setQuery('')
    router.replace(pathname, { scroll: false })
  }, [pathname, router])

  const results = useMemo(() => {
    // Search first (when present), then apply the structured filters.
    const base = query.trim() ? searchTools(fuse, query) : tools
    return filterTools(base, filters, emotions)
  }, [query, fuse, tools, filters, emotions])

  const hasFilters =
    Boolean(query.trim()) ||
    Boolean(filters.emotion || filters.category || filters.difficulty || filters.duration)

  return (
    <div>
      <SearchBar value={query} onChange={setQuery} />

      <div className="mt-6 space-y-4">
        <FilterRow label="Feeling">
          {emotions.map((e) => (
            <Chip
              key={e.id}
              active={filters.emotion === e.id}
              onClick={() => setFilter('emotion', e.id)}
            >
              {e.label}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Category">
          {categories.map((c) => (
            <Chip
              key={c.id}
              active={filters.category === c.id}
              onClick={() => setFilter('category', c.id)}
            >
              {c.label}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Difficulty">
          {DIFFICULTIES.map((d) => (
            <Chip
              key={d}
              active={filters.difficulty === d}
              onClick={() => setFilter('difficulty', d)}
            >
              <span className="capitalize">{d}</span>
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Duration">
          {DURATION_BUCKETS.map((b) => (
            <Chip
              key={b.id}
              active={filters.duration === b.id}
              onClick={() => setFilter('duration', b.id)}
            >
              {b.label}
            </Chip>
          ))}
        </FilterRow>
      </div>

      <div className="mb-5 mt-8 flex items-center justify-between gap-4">
        <p className="text-sm text-muted" aria-live="polite">
          {results.length} {results.length === 1 ? 'tool' : 'tools'}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="text-sm font-medium text-accent hover:opacity-80"
          >
            Clear all
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-border bg-surface p-8 text-center text-muted">
          No tools match. Try clearing a filter or searching for a feeling.
        </p>
      )}
    </div>
  )
}

function FilterRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <span className="w-24 flex-none text-sm font-semibold text-muted">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
        active
          ? 'border-accent bg-accent-soft text-accent'
          : 'border-border bg-surface text-muted hover:border-accent'
      }`}
    >
      {children}
    </button>
  )
}
