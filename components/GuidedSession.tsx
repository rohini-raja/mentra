'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Tool } from '@/lib/types'
import { BreathPacer } from './BreathPacer'

// Full-screen "do it now" walkthrough: one step at a time, large text, optional
// read-aloud, and a breathing pacer for breath-based tools. All client-side.
export function GuidedSession({ tool }: { tool: Tool }) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [speak, setSpeak] = useState(false)

  const total = tool.steps.length
  const current = tool.steps[step]
  const isLast = step === total - 1

  const close = useCallback(() => {
    setOpen(false)
    setStep(0)
    if (typeof window !== 'undefined') window.speechSynthesis?.cancel()
  }, [])

  // Read the current step aloud when speak is on (free browser Speech API).
  useEffect(() => {
    if (!open || !speak || typeof window === 'undefined') return
    const synth = window.speechSynthesis
    if (!synth) return
    synth.cancel()
    const parts = [current.instruction]
    if (current.mantra) parts.push(current.mantra)
    const u = new SpeechSynthesisUtterance(parts.join('. '))
    u.rate = 0.95
    synth.speak(u)
    return () => synth.cancel()
  }, [open, speak, step, current])

  // Keyboard: Esc to close, arrows to navigate.
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') setStep((s) => Math.min(s + 1, total - 1))
      else if (e.key === 'ArrowLeft') setStep((s) => Math.max(s - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, total, close])

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-xl bg-accent px-6 py-4 text-lg font-semibold text-accent-fg hover:opacity-90 sm:w-auto"
      >
        ▶ Do it now — guided
      </button>
    )
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Guided session: ${tool.name}`}
      className="fixed inset-0 z-50 flex flex-col bg-bg"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
        <span className="text-sm font-medium text-muted">
          {tool.name} · Step {step + 1} of {total}
        </span>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setSpeak((s) => !s)}
            aria-pressed={speak}
            className={`rounded-full px-3 py-1.5 text-sm font-medium ${
              speak ? 'bg-accent-soft text-accent' : 'bg-surface-2 text-muted'
            }`}
          >
            {speak ? '🔊 Read-aloud on' : '🔈 Read aloud'}
          </button>
          <button
            type="button"
            onClick={close}
            className="rounded-full bg-surface-2 px-3 py-1.5 text-sm font-medium text-muted hover:text-accent"
          >
            Close ✕
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full bg-surface-2">
        <div
          className="h-full bg-accent transition-all"
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>

      {/* Step content */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-8 text-center">
        {/* Breathing pacer on the first step of breath-based tools */}
        {tool.breathPattern && step === 0 && (
          <div className="mb-10">
            <BreathPacer pattern={tool.breathPattern} />
          </div>
        )}

        <p className="max-w-2xl text-2xl font-medium leading-relaxed text-text sm:text-3xl">
          {current.instruction}
        </p>

        {current.mantra && (
          <p className="mt-6 text-xl italic text-accent sm:text-2xl">
            “{current.mantra}”
          </p>
        )}

        {current.note && (
          <p className="mt-6 max-w-xl text-base text-muted">{current.note}</p>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4 border-t border-border px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(s - 1, 0))}
          disabled={step === 0}
          className="rounded-xl border border-border px-5 py-3 font-medium text-text disabled:opacity-40"
        >
          ← Back
        </button>

        {isLast ? (
          <button
            type="button"
            onClick={close}
            className="rounded-xl bg-accent px-6 py-3 font-semibold text-accent-fg hover:opacity-90"
          >
            Done
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(s + 1, total - 1))}
            className="rounded-xl bg-accent px-6 py-3 font-semibold text-accent-fg hover:opacity-90"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  )
}
