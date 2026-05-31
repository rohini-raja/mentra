'use client'

import { useCallback, useEffect, useState } from 'react'

// Favorites + recently-viewed, stored entirely in localStorage. Nothing leaves
// the device — preserves the zero-backend / zero-privacy-risk promise.

const FAV_KEY = 'mentra:favorites'
const RECENT_KEY = 'mentra:recent'
const RECENT_MAX = 8

function read(key: string): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

function write(key: string, value: string[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    // Notify other hook instances in the same tab.
    window.dispatchEvent(new CustomEvent('mentra:storage', { detail: key }))
  } catch {
    // ignore (private mode, quota)
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    setFavorites(read(FAV_KEY))
    const sync = () => setFavorites(read(FAV_KEY))
    window.addEventListener('mentra:storage', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('mentra:storage', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const toggle = useCallback((slug: string) => {
    const cur = read(FAV_KEY)
    const next = cur.includes(slug)
      ? cur.filter((s) => s !== slug)
      : [...cur, slug]
    write(FAV_KEY, next)
    setFavorites(next)
  }, [])

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites]
  )

  return { favorites, toggle, isFavorite }
}

/** Call on a tool detail page to record it as recently viewed. */
export function recordRecent(slug: string) {
  if (typeof window === 'undefined') return
  const cur = read(RECENT_KEY).filter((s) => s !== slug)
  write(RECENT_KEY, [slug, ...cur].slice(0, RECENT_MAX))
}

export function useRecent() {
  const [recent, setRecent] = useState<string[]>([])
  useEffect(() => {
    setRecent(read(RECENT_KEY))
    const sync = () => setRecent(read(RECENT_KEY))
    window.addEventListener('mentra:storage', sync)
    return () => window.removeEventListener('mentra:storage', sync)
  }, [])
  return recent
}
