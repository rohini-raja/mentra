'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import type { Tool, Emotion } from '@/lib/types'
import { ToolCard } from './ToolCard'

// Homepage emotion picker. Clicking a tag filters the grid below and smooth-
// scrolls to it. Tags are real <button>s so they're keyboard-operable.
export function EmotionFilter({
  emotions,
  tools,
}: {
  emotions: Emotion[]
  tools: Tool[]
}) {
  const [selected, setSelected] = useState<string | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const bySlug = useMemo(
    () => new Map(tools.map((t) => [t.slug, t])),
    [tools]
  )

  const visible = useMemo(() => {
    if (!selected) return tools
    const emotion = emotions.find((e) => e.id === selected)
    if (!emotion) return tools
    return emotion.tools
      .map((slug) => bySlug.get(slug))
      .filter((t): t is Tool => Boolean(t))
  }, [selected, emotions, tools, bySlug])

  function pick(id: string) {
    setSelected((cur) => (cur === id ? null : id))
    // Scroll to results after the state-driven re-render.
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const activeEmotion = emotions.find((e) => e.id === selected)

  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {emotions.map((emotion) => {
          const isActive = selected === emotion.id
          return (
            <li key={emotion.id}>
              <button
                type="button"
                onClick={() => pick(emotion.id)}
                aria-pressed={isActive}
                className={`h-full w-full rounded-xl border p-4 text-left transition-colors ${
                  isActive
                    ? 'border-accent bg-accent-soft'
                    : 'border-border bg-surface hover:border-accent'
                }`}
              >
                <span
                  className={`block font-semibold ${
                    isActive ? 'text-accent' : 'text-text'
                  }`}
                >
                  {emotion.label}
                </span>
                <span className="mt-1 block text-sm text-muted">
                  {emotion.description}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <div ref={resultsRef} className="mt-12 scroll-mt-8">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-2xl font-bold text-text">
            {activeEmotion ? activeEmotion.label : 'All tools'}
          </h2>
          <div className="flex items-center gap-4 text-sm">
            {selected && (
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="font-medium text-accent hover:opacity-80"
              >
                Clear filter
              </button>
            )}
            <Link
              href="/tools/"
              className="font-medium text-accent hover:opacity-80"
            >
              Browse all tools →
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  )
}
