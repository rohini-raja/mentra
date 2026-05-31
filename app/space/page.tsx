import type { Metadata } from 'next'
import { VentSpace } from '@/components/VentSpace'

export const metadata: Metadata = {
  title: 'Space — a quiet place to get it out',
  description:
    'A private, on-device space to put what you’re feeling into words. No AI, no account, nothing sent anywhere.',
}

export default function SpacePage() {
  return (
    <div className="mx-auto max-w-prose">
      <h1 className="text-3xl font-bold text-text sm:text-4xl">Space</h1>
      <p className="mt-3 prose-body text-muted">
        A quiet place to put what you&rsquo;re carrying into words &mdash; and
        find a tool that might meet it.
      </p>

      <div className="mt-8">
        <VentSpace />
      </div>
    </div>
  )
}
