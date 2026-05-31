import type { Metadata } from 'next'
import Link from 'next/link'
import { getSituations } from '@/lib/situations'

export const metadata: Metadata = {
  title: 'Browse by situation',
  description:
    'Find the right tools for a specific moment — can’t sleep, a panic attack, before a hard conversation, and more.',
}

export default function SituationsPage() {
  const situations = getSituations()

  return (
    <div>
      <h1 className="text-3xl font-bold text-text sm:text-4xl">
        Browse by situation
      </h1>
      <p className="mt-3 max-w-prose prose-body text-muted">
        Sometimes you know the moment you&rsquo;re in better than the feeling.
        Pick the situation that fits.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {situations.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/situations/${s.slug}/`}
              className="group block h-full rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent"
            >
              <h2 className="text-lg font-semibold text-text group-hover:text-accent">
                {s.title}
              </h2>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                {s.intro}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
