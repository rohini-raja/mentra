import { getAllTools, getEmotions } from '@/lib/tools'
import { EmotionFilter } from '@/components/EmotionFilter'

export default function HomePage() {
  const tools = getAllTools()
  const emotions = getEmotions()

  return (
    <div>
      <section className="mx-auto max-w-prose">
        <h1 className="text-3xl font-bold leading-tight text-text sm:text-4xl">
          Psychological tools for what you&rsquo;re feeling
        </h1>
        <p className="mt-4 prose-body text-muted">
          A curated reference of techniques developed by psychologists and
          researchers. No account, no tracking, no AI &mdash; just clear,
          credited tools you can use right now.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-text">
          What are you feeling right now?
        </h2>
        <p className="mt-2 text-muted">
          Pick what fits. We&rsquo;ll show the tools that help.
        </p>
        <div className="mt-6">
          <EmotionFilter emotions={emotions} tools={tools} />
        </div>
      </section>
    </div>
  )
}
