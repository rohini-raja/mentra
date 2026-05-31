import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getAllTools, getEmotions, getCategories } from '@/lib/tools'
import { ToolsExplorer } from '@/components/ToolsExplorer'

export const metadata: Metadata = {
  title: 'All tools',
  description:
    'Search and filter every tool by feeling, category, difficulty, or duration.',
}

export default function ToolsPage() {
  const tools = getAllTools()
  const emotions = getEmotions()
  const categories = getCategories()

  return (
    <div>
      <h1 className="text-3xl font-bold text-text sm:text-4xl">All tools</h1>
      <p className="mt-3 prose-body text-muted">
        Search by name or feeling, or filter the {tools.length} tools below.
      </p>

      <div className="mt-8">
        {/* Suspense is required for useSearchParams in a static export. */}
        <Suspense fallback={<p className="text-muted">Loading tools…</p>}>
          <ToolsExplorer
            tools={tools}
            emotions={emotions}
            categories={categories}
          />
        </Suspense>
      </div>
    </div>
  )
}
