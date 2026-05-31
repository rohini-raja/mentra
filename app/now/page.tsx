import type { Metadata } from 'next'
import Link from 'next/link'
import { resolveTools } from '@/lib/tools'
import { ToolCard } from '@/components/ToolCard'

export const metadata: Metadata = {
  title: 'I need help now',
  description:
    'The fastest-acting tools for an acute moment — calm your body in the next few minutes.',
}

// The fastest-acting, body-first tools for an acute moment. Hand-picked order.
const FAST_TOOLS = [
  'physiological-sigh',
  '5-4-3-2-1-grounding',
  'box-breathing',
  'cold-water-face-immersion',
  'tipp',
  'stop-skill',
]

export default function NowPage() {
  const tools = resolveTools(FAST_TOOLS)

  return (
    <div>
      <h1 className="text-3xl font-bold text-text sm:text-4xl">
        Let&rsquo;s bring it down a notch
      </h1>
      <p className="mt-3 max-w-prose prose-body text-muted">
        These are the fastest-acting tools here. They work on your body
        directly, so they help even when thinking feels impossible. Open any one
        and tap <strong className="text-text">&ldquo;Do it now&rdquo;</strong> to
        be guided through it.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      <div className="mt-10 rounded-xl border-2 border-accent bg-accent-soft p-5">
        <p className="prose-body text-text">
          If you&rsquo;re thinking about harming yourself or in immediate danger,
          please reach out now.{' '}
          <Link
            href="/crisis/"
            className="font-semibold text-accent underline underline-offset-2 hover:opacity-80"
          >
            Find a crisis line in your country &rarr;
          </Link>
        </p>
      </div>
    </div>
  )
}
