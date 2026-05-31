import type { ToolStep } from '@/lib/types'

// Numbered steps with optional spoken mantras and clarifying notes.
// Rendered as a proper <ol> for accessibility.
export function StepList({ steps }: { steps: ToolStep[] }) {
  return (
    <ol className="space-y-5">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-accent"
          >
            {i + 1}
          </span>
          <div className="min-w-0 pt-0.5">
            <p className="prose-body text-text">{step.instruction}</p>
            {step.mantra && (
              <p className="mt-2 border-l-2 border-accent pl-3 text-lg font-medium italic text-accent">
                “{step.mantra}”
              </p>
            )}
            {step.note && (
              <p className="mt-2 text-sm text-muted">{step.note}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
