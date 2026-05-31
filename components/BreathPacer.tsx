'use client'

import { useEffect, useRef, useState } from 'react'
import type { BreathPattern } from '@/lib/types'

// Animated breathing pacer: a circle that grows on the inhale, holds, and
// shrinks on the exhale, driven by the tool's BreathPattern. Pure client-side,
// uses requestAnimationFrame, respects prefers-reduced-motion.
export function BreathPacer({ pattern }: { pattern: BreathPattern }) {
  const phases = pattern.phases
  const [running, setRunning] = useState(false)
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [progress, setProgress] = useState(0) // 0..1 within current phase
  const [cycles, setCycles] = useState(0)

  const rafRef = useRef<number | null>(null)
  const phaseStartRef = useRef<number>(0)
  const phaseIdxRef = useRef(0)

  useEffect(() => {
    if (!running) return

    let mounted = true
    phaseStartRef.current = performance.now()

    const tick = (now: number) => {
      if (!mounted) return
      const phase = phases[phaseIdxRef.current]
      const elapsed = (now - phaseStartRef.current) / 1000
      const p = Math.min(elapsed / phase.seconds, 1)
      setProgress(p)

      if (p >= 1) {
        const nextIdx = (phaseIdxRef.current + 1) % phases.length
        phaseIdxRef.current = nextIdx
        phaseStartRef.current = now
        setPhaseIdx(nextIdx)
        if (nextIdx === 0) setCycles((c) => c + 1)
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      mounted = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [running, phases])

  const phase = phases[phaseIdx]

  // Map phase + progress to a scale 0.45..1 for the circle.
  let scale = 0.7
  if (phase.type === 'in') scale = 0.45 + 0.55 * progress
  else if (phase.type === 'out') scale = 1 - 0.55 * progress
  else if (phase.type === 'hold-full') scale = 1
  else if (phase.type === 'hold-empty') scale = 0.45

  const secondsLeft = Math.ceil(phase.seconds * (1 - progress))

  function toggle() {
    if (running) {
      setRunning(false)
    } else {
      phaseIdxRef.current = 0
      setPhaseIdx(0)
      setProgress(0)
      setCycles(0)
      setRunning(true)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex items-center justify-center"
        style={{ width: 240, height: 240 }}
        aria-hidden="true"
      >
        <div
          className="rounded-full bg-accent-soft"
          style={{
            width: 200,
            height: 200,
            transform: `scale(${scale})`,
            // No CSS transition: the rAF loop sets scale every frame, which is
            // smooth and stays in sync. Reduced-motion users still see counts.
            transition: 'none',
          }}
        />
        <div className="absolute flex flex-col items-center">
          <span className="text-xl font-semibold text-accent">
            {running ? phase.label : 'Ready'}
          </span>
          {running && (
            <span className="mt-1 text-4xl font-bold tabular-nums text-text">
              {secondsLeft}
            </span>
          )}
        </div>
      </div>

      <p className="mt-4 h-5 text-sm text-muted" aria-live="polite">
        {running
          ? `Cycle ${cycles + 1}${pattern.cycles ? ` of ${pattern.cycles}` : ''}`
          : 'Follow the circle: in as it grows, out as it shrinks.'}
      </p>

      <button
        type="button"
        onClick={toggle}
        className="mt-4 rounded-xl bg-accent px-6 py-3 font-semibold text-accent-fg hover:opacity-90"
      >
        {running ? 'Stop' : 'Start breathing'}
      </button>
    </div>
  )
}
