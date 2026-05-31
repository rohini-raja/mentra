'use client'

import { useMemo } from 'react'
import type { Tool } from '@/lib/types'
import { useFavorites, useRecent } from '@/lib/favorites'
import { ToolCard } from './ToolCard'

// Shows the user's saved + recently-viewed tools on the homepage. Renders
// nothing until there's something to show (and only after mount, client-side).
export function SavedTools({ tools }: { tools: Tool[] }) {
  const { favorites } = useFavorites()
  const recent = useRecent()

  const bySlug = useMemo(() => new Map(tools.map((t) => [t.slug, t])), [tools])

  const favTools = favorites
    .map((s) => bySlug.get(s))
    .filter((t): t is Tool => Boolean(t))
  const recentTools = recent
    .filter((s) => !favorites.includes(s))
    .map((s) => bySlug.get(s))
    .filter((t): t is Tool => Boolean(t))

  if (favTools.length === 0 && recentTools.length === 0) return null

  return (
    <section className="mt-14">
      {favTools.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-text">Your saved tools</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favTools.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </>
      )}

      {recentTools.length > 0 && (
        <>
          <h2 className="mt-10 text-2xl font-bold text-text">
            Recently viewed
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentTools.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
