'use client'

import { useEffect, useState } from 'react'
import { useFavorites, recordRecent } from '@/lib/favorites'

// Heart toggle on a tool detail page. Also records the tool as recently viewed.
export function FavoriteButton({ slug }: { slug: string }) {
  const { isFavorite, toggle } = useFavorites()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    recordRecent(slug)
  }, [slug])

  const active = mounted && isFavorite(slug)

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={active}
      aria-label={active ? 'Remove from saved' : 'Save this tool'}
      className={`flex flex-none items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
        active
          ? 'border-accent bg-accent-soft text-accent'
          : 'border-border bg-surface text-muted hover:border-accent'
      }`}
    >
      <span aria-hidden="true">{active ? '♥' : '♡'}</span>
      <span>{active ? 'Saved' : 'Save'}</span>
    </button>
  )
}
