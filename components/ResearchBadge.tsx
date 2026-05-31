import type { EvidenceLevel } from '@/lib/types'

// Evidence level shown with both color and text — color is never the sole
// indicator (accessibility requirement).
const LEVELS: Record<
  EvidenceLevel,
  { label: string; fg: string; bg: string }
> = {
  anecdotal: {
    label: 'Anecdotal',
    fg: 'var(--ev-anecdotal)',
    bg: 'var(--ev-anecdotal-soft)',
  },
  clinical: {
    label: 'Clinical',
    fg: 'var(--ev-clinical)',
    bg: 'var(--ev-clinical-soft)',
  },
  'peer-reviewed': {
    label: 'Peer-reviewed',
    fg: 'var(--ev-peer)',
    bg: 'var(--ev-peer-soft)',
  },
  'meta-analysis': {
    label: 'Meta-analysis',
    fg: 'var(--ev-meta)',
    bg: 'var(--ev-meta-soft)',
  },
}

export function ResearchBadge({
  level,
  className = '',
}: {
  level: EvidenceLevel
  className?: string
}) {
  const l = LEVELS[level]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}
      style={{ color: l.fg, backgroundColor: l.bg }}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: l.fg }}
      />
      {l.label}
    </span>
  )
}
