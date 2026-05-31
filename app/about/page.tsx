import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllTools, getCategories } from '@/lib/tools'

export const metadata: Metadata = {
  title: 'About',
  description:
    'What Mentra is, how tools were selected, credits, and the safety disclaimer.',
}

// Update this if you fork the project.
const REPO_URL = 'https://github.com/your-username/mentra'

export default function AboutPage() {
  const tools = getAllTools()
  const categories = getCategories()

  // Build the credits list from the data itself, so it stays accurate.
  const credits = Array.from(
    new Map(
      tools.map((t) => [t.origin.psychologist, t.origin.tradition])
    ).entries()
  ).sort(([a], [b]) => a.localeCompare(b))

  return (
    <div className="mx-auto max-w-prose">
      <h1 className="text-3xl font-bold text-text sm:text-4xl">About</h1>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-text">What this is</h2>
        <p className="mt-3 prose-body text-muted">
          Mentra is a free, open reference of psychological techniques
          developed by psychologists and researchers. Most people arrive knowing
          what they&rsquo;re feeling, not which therapy modality they need. This
          site starts from the feeling and points you to tools that fit, then
          explains each one clearly and credits the person who created it.
        </p>
        <p className="mt-3 prose-body text-muted">
          There is no account, no database, no tracking, and no AI. It&rsquo;s a
          static site, so there&rsquo;s nothing to log in to and nothing
          collected about you.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-text">How tools were selected</h2>
        <p className="mt-3 prose-body text-muted">
          Tools are drawn from established traditions &mdash;{' '}
          {categories.map((c) => c.tradition).join(', ')} &mdash; and credited to
          their originators wherever possible. Each tool carries an honest
          evidence level: from <em>anecdotal</em> (developed in practice, limited
          formal study) through <em>clinical</em> and <em>peer-reviewed</em> to{' '}
          <em>meta-analysis</em> (supported across many studies). Nothing is
          presented as more validated than it is.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-border bg-surface-2 p-5">
        <h2 className="text-xl font-bold text-text">A note on safety</h2>
        <p className="mt-3 prose-body text-muted">
          These tools are for educational purposes and everyday emotional
          challenges. They are not therapy and not a substitute for professional
          mental health care. If something here resonates, that&rsquo;s a good
          reason to consider talking to a professional &mdash; not a replacement
          for it.
        </p>
        <p className="mt-3 prose-body text-muted">If you are in crisis:</p>
        <ul className="mt-2 space-y-1 prose-body text-muted">
          <li>
            <strong className="text-text">US:</strong> Call or text{' '}
            <strong className="text-text">988</strong> (Suicide &amp; Crisis
            Lifeline) &mdash; available 24/7.
          </li>
          <li>
            <strong className="text-text">US:</strong> Text{' '}
            <strong className="text-text">HOME</strong> to{' '}
            <strong className="text-text">741741</strong> (Crisis Text Line).
          </li>
          <li>
            <strong className="text-text">UK &amp; ROI:</strong> Call{' '}
            <strong className="text-text">116 123</strong> (Samaritans).
          </li>
          <li>
            Elsewhere: find a local helpline at{' '}
            <a
              href="https://findahelpline.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2 hover:opacity-80"
            >
              findahelpline.com
            </a>
            .
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-text">Credits</h2>
        <p className="mt-3 prose-body text-muted">
          With gratitude to the psychologists, researchers, and clinicians whose
          work these tools are drawn from:
        </p>
        <ul className="mt-3 space-y-1.5">
          {credits.map(([name, tradition]) => (
            <li key={name} className="prose-body">
              <span className="font-semibold text-text">{name}</span>
              <span className="text-muted"> &mdash; {tradition}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-text">Open source</h2>
        <p className="mt-3 prose-body text-muted">
          Every tool is a JSON file, so anyone can suggest improvements or add
          new tools.
        </p>
        <ul className="mt-3 space-y-1.5 prose-body">
          <li>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2 hover:opacity-80"
            >
              View the project on GitHub
            </a>
          </li>
          <li>
            <a
              href={`${REPO_URL}/issues/new`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2 hover:opacity-80"
            >
              Found an error? Open an issue
            </a>
          </li>
        </ul>
      </section>

      <p className="mt-10">
        <Link href="/tools/" className="text-accent hover:opacity-80">
          ← Browse the tools
        </Link>
      </p>
    </div>
  )
}
