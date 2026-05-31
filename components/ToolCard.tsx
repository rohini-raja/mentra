import Link from 'next/link'
import type { Tool } from '@/lib/types'

// Tool summary card used in every grid: name, psychologist, category badge,
// tagline, duration. The whole card is a single link.
export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}/`}
      className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-text group-hover:text-accent">
          {tool.name}
        </h3>
        <span className="flex-none rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">
          {tool.category}
        </span>
      </div>
      <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">
        {tool.tagline}
      </p>
      <div className="mt-4 flex items-center justify-between text-sm text-muted">
        <span>{tool.origin.psychologist}</span>
        <span>{tool.duration}</span>
      </div>
    </Link>
  )
}
