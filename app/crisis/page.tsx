import type { Metadata } from 'next'
import Link from 'next/link'
import type { HelplineData } from '@/lib/types'
import { CrisisResources } from '@/components/CrisisResources'
import helplines from '@/data/helplines.json'

export const metadata: Metadata = {
  title: 'Crisis support',
  description:
    'Free, confidential crisis and suicide helplines by country, plus directories covering 130+ countries.',
}

export default function CrisisPage() {
  const data = helplines as unknown as HelplineData

  return (
    <div className="mx-auto max-w-prose">
      <h1 className="text-3xl font-bold text-text sm:text-4xl">
        Crisis support
      </h1>
      <p className="mt-3 prose-body text-muted">
        If you&rsquo;re in crisis or thinking about suicide, you deserve to talk
        to someone now. These lines are free, confidential, and staffed by
        people trained to help. Reaching out is a sign of strength, not
        weakness.
      </p>

      <div className="mt-8">
        <CrisisResources data={data} />
      </div>

      <p className="mt-10">
        <Link href="/tools/" className="text-accent hover:opacity-80">
          ← Back to the tools
        </Link>
      </p>
    </div>
  )
}
