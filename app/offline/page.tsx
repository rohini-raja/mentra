import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Offline',
  description: 'You appear to be offline.',
}

export default function OfflinePage() {
  return (
    <div className="mx-auto max-w-prose text-center">
      <h1 className="text-3xl font-bold text-text sm:text-4xl">
        You&rsquo;re offline
      </h1>
      <p className="mt-4 prose-body text-muted">
        It looks like there&rsquo;s no connection right now. Any tools
        you&rsquo;ve already opened are saved on your device &mdash; try the ones
        below, or reconnect to browse everything.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/now/"
          className="rounded-xl bg-accent px-5 py-3 font-semibold text-accent-fg hover:opacity-90"
        >
          Fast tools
        </Link>
        <Link
          href="/tools/"
          className="rounded-xl border border-border px-5 py-3 font-semibold text-text hover:border-accent"
        >
          All tools
        </Link>
      </div>
    </div>
  )
}
