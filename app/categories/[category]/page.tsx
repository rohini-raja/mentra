import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getAllTools,
  getCategoryInfo,
  getUsedCategories,
} from '@/lib/tools'
import { ToolCard } from '@/components/ToolCard'

type Params = { category: string }

export function generateStaticParams(): Params[] {
  return getUsedCategories().map((category) => ({
    category: encodeURIComponent(category),
  }))
}

export function generateMetadata({
  params,
}: {
  params: Params
}): Metadata {
  const id = decodeURIComponent(params.category)
  const info = getCategoryInfo(id)
  if (!info) return { title: 'Category not found' }
  return {
    title: `${info.label} tools`,
    description: info.description,
  }
}

export default function CategoryPage({ params }: { params: Params }) {
  const id = decodeURIComponent(params.category)
  const info = getCategoryInfo(id)
  if (!info) notFound()

  const tools = getAllTools().filter((t) => t.category === id)

  return (
    <div>
      <Link
        href="/tools/"
        className="text-sm font-medium text-accent hover:opacity-80"
      >
        ← All tools
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-text sm:text-4xl">
        {info.label}
      </h1>
      <p className="mt-1 text-muted">{info.tradition}</p>
      <p className="mt-3 max-w-prose prose-body text-muted">
        {info.description}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  )
}
