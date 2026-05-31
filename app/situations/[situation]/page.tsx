import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getSituationBySlug,
  getSituationSlugs,
} from '@/lib/situations'
import { resolveTools } from '@/lib/tools'
import { ToolCard } from '@/components/ToolCard'

type Params = { situation: string }

export function generateStaticParams(): Params[] {
  return getSituationSlugs().map((situation) => ({ situation }))
}

export function generateMetadata({
  params,
}: {
  params: Params
}): Metadata {
  const s = getSituationBySlug(params.situation)
  if (!s) return { title: 'Not found' }
  return {
    title: s.title,
    description: s.intro,
  }
}

export default function SituationPage({ params }: { params: Params }) {
  const situation = getSituationBySlug(params.situation)
  if (!situation) notFound()

  const tools = resolveTools(situation.tools)

  return (
    <div>
      <Link href="/situations/" className="text-sm font-medium text-accent hover:opacity-80">
        ← All situations
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-text sm:text-4xl">
        {situation.title}
      </h1>
      <p className="mt-3 max-w-prose prose-body text-muted">{situation.intro}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  )
}
