import Link from 'next/link'
import type { Tool } from '@/lib/types'
import { resolveTools } from '@/lib/tools'
import { StepList } from './StepList'
import { ResearchBadge } from './ResearchBadge'
import { PsychologistCredit } from './PsychologistCredit'
import { ToolCard } from './ToolCard'

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t border-border py-7">
      <h2 className="mb-3 text-xl font-bold text-text">{title}</h2>
      {children}
    </section>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 prose-body">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
          <span className="text-text">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function ToolDetail({ tool }: { tool: Tool }) {
  const related = resolveTools(tool.relatedTools)
  const pairs = resolveTools(tool.pairsWith ?? [])

  return (
    <article className="mx-auto max-w-prose">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/tools/"
          className="text-sm font-medium text-accent hover:opacity-80"
        >
          ← Back to all tools
        </Link>
        <Link
          href={`/categories/${encodeURIComponent(tool.category)}/`}
          className="rounded-full bg-surface-2 px-3 py-1 text-xs font-medium text-muted hover:text-accent"
        >
          {tool.category}
        </Link>
      </div>

      <h1 className="mt-6 text-3xl font-bold leading-tight text-text sm:text-4xl">
        {tool.name}
      </h1>
      <p className="mt-3 text-xl text-muted">{tool.tagline}</p>

      <PsychologistCredit origin={tool.origin} className="mt-5" />

      <div className="mt-5 flex flex-wrap gap-2 text-sm">
        <span className="rounded-full bg-surface-2 px-3 py-1 text-muted">
          {tool.duration}
        </span>
        <span className="rounded-full bg-surface-2 px-3 py-1 capitalize text-muted">
          {tool.difficulty}
        </span>
        <ResearchBadge level={tool.evidence.level} />
      </div>

      {/* Summary */}
      <Section title="Summary">
        <p className="prose-body text-text">{tool.summary}</p>
      </Section>

      {/* When to use */}
      <Section title="When to use it">
        <BulletList items={tool.whenToUse} />
      </Section>

      {/* How to do it */}
      <Section title="How to do it">
        <StepList steps={tool.steps} />
      </Section>

      {/* How it works */}
      <Section title="How it works">
        <p className="prose-body text-text">{tool.howItWorks}</p>
      </Section>

      {/* Tips */}
      {tool.tips.length > 0 && (
        <Section title="Tips">
          <BulletList items={tool.tips} />
        </Section>
      )}

      {/* When NOT to use — non-negotiable safety section */}
      <Section title="When not to use it">
        <BulletList items={tool.whenNotToUse} />
      </Section>

      {/* Evidence */}
      <Section title="Evidence">
        <div className="mb-3">
          <ResearchBadge level={tool.evidence.level} />
        </div>
        <p className="prose-body text-text">{tool.evidence.summary}</p>
        {tool.evidence.citations && tool.evidence.citations.length > 0 && (
          <ul className="mt-4 space-y-1.5 text-sm text-muted">
            {tool.evidence.citations.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        )}
      </Section>

      {/* Pairs with */}
      {pairs.length > 0 && (
        <Section title="Pairs well with">
          <div className="grid gap-4 sm:grid-cols-2">
            {pairs.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </Section>
      )}

      {/* Related tools */}
      {related.length > 0 && (
        <Section title="Related tools">
          <div className="grid gap-4 sm:grid-cols-2">
            {related.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </Section>
      )}

      {/* Safety disclaimer — present on every tool detail page */}
      <aside className="mt-8 rounded-xl border border-border bg-surface-2 p-5 text-sm leading-relaxed text-muted">
        These tools are for educational purposes and everyday emotional
        challenges. They are not a substitute for professional mental health
        care. If you are in crisis, please contact a mental health professional,
        call or text <strong className="text-text">988</strong> (US), or{' '}
        <Link
          href="/crisis/"
          className="text-accent underline underline-offset-2 hover:opacity-80"
        >
          find a crisis line in your country
        </Link>
        .
      </aside>
    </article>
  )
}
