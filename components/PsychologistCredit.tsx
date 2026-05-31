import type { ToolOrigin } from '@/lib/types'

// Attribution block — every tool credits the psychologist who created it.
export function PsychologistCredit({
  origin,
  className = '',
}: {
  origin: ToolOrigin
  className?: string
}) {
  return (
    <div className={`text-muted ${className}`}>
      <p className="text-base">
        By{' '}
        <span className="font-semibold text-text">{origin.psychologist}</span>
        {' · '}
        {origin.year}
      </p>
      <p className="mt-0.5 text-sm">
        {origin.sourceUrl ? (
          <a
            href={origin.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-2 hover:opacity-80"
          >
            {origin.source}
          </a>
        ) : (
          <span>From: {origin.source}</span>
        )}
      </p>
      <p className="mt-0.5 text-sm">{origin.tradition}</p>
    </div>
  )
}
