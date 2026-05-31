import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllSlugs, getToolBySlug } from '@/lib/tools'
import { ToolDetail } from '@/components/ToolDetail'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return getAllSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({
  params,
}: {
  params: Params
}): Metadata {
  const tool = getToolBySlug(params.slug)
  if (!tool) return { title: 'Tool not found' }
  return {
    title: tool.name,
    description: tool.tagline,
    openGraph: {
      title: tool.name,
      description: tool.tagline,
    },
  }
}

export default function ToolPage({ params }: { params: Params }) {
  const tool = getToolBySlug(params.slug)
  if (!tool) notFound()
  return <ToolDetail tool={tool} />
}
