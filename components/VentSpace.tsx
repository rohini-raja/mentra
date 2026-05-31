'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'

// A private, on-device "vent space". NOT an AI and not a chatbot — it offers
// gentle reflective prompts, warm scripted reflections, and points to relevant
// tools based on simple keyword matching. Nothing is sent anywhere; the draft
// lives only in this browser (sessionStorage, cleared when you choose).

interface Reflection {
  message: string
  toolSlug?: string
  toolLabel?: string
}

// Keyword → reflection. First match wins; order matters (most acute first).
const RULES: { test: RegExp; reflection: Reflection }[] = [
  {
    test: /suicid|kill myself|end it|don'?t want to (be here|live)|hurt myself|self.?harm/i,
    reflection: {
      message:
        'It sounds like you may be in a lot of pain right now. You deserve real support from a person — please reach out to a crisis line. You matter.',
      toolSlug: '/crisis',
      toolLabel: 'Find a crisis line in your country',
    },
  },
  {
    test: /panic|can'?t breathe|heart racing|hyperventilat/i,
    reflection: {
      message:
        'That sounds frightening. Panic peaks and then passes — your body can be guided back down. A slow, long exhale is often the fastest way in.',
      toolSlug: '/tools/physiological-sigh',
      toolLabel: 'Try the Physiological Sigh',
    },
  },
  {
    test: /anx|worri|nervous|dread|overthink|what if/i,
    reflection: {
      message:
        'Anxiety has a way of filling the whole room. It can help to give the worry a contained place rather than letting it run all day.',
      toolSlug: '/tools/worry-time',
      toolLabel: 'Try Worry Time',
    },
  },
  {
    test: /angry|anger|furious|resent|hate|pissed|rage/i,
    reflection: {
      message:
        'Anger usually points at something that matters to you. Holding onto it tends to cost you more than the other person — there are ways to set it down.',
      toolSlug: '/tools/active-love',
      toolLabel: 'Try Active Love',
    },
  },
  {
    test: /sad|depress|empty|numb|hopeless|worthless|tired of/i,
    reflection: {
      message:
        'That heaviness is real, and you don’t have to talk yourself out of it. Sometimes one very small action can shift things more than waiting to feel better.',
      toolSlug: '/tools/behavioral-activation',
      toolLabel: 'Try Behavioral Activation',
    },
  },
  {
    test: /overwhelm|too much|can'?t cope|drowning|so much/i,
    reflection: {
      message:
        'When everything is too much at once, the kindest first step is to lower the volume in your body before trying to sort anything out.',
      toolSlug: '/tools/5-4-3-2-1-grounding',
      toolLabel: 'Try 5-4-3-2-1 Grounding',
    },
  },
  {
    test: /lonely|alone|no one|isolat|disconnect/i,
    reflection: {
      message:
        'Feeling alone is painful, and naming it like this is already a brave thing. Being gentle with yourself in this moment is not a small thing.',
      toolSlug: '/tools/self-compassion-break',
      toolLabel: 'Try a Self-Compassion Break',
    },
  },
  {
    test: /grief|grieving|loss|died|death|miss (him|her|them|you)/i,
    reflection: {
      message:
        'Grief isn’t a problem to be solved — it’s love with nowhere to go. There are gentle ways to keep carrying that bond.',
      toolSlug: '/tools/continuing-bonds',
      toolLabel: 'Explore Continuing Bonds',
    },
  },
  {
    test: /guilt|ashamed|shame|my fault|stupid|failure/i,
    reflection: {
      message:
        'You’re speaking to yourself harshly right now. Notice that. You’d likely never say it to a friend in your position.',
      toolSlug: '/tools/self-compassion-break',
      toolLabel: 'Try a Self-Compassion Break',
    },
  },
]

const PROMPTS = [
  'What’s weighing on you right now?',
  'If a friend felt exactly this, what would you want them to hear?',
  'Where do you feel this in your body?',
  'What’s one thing, however small, that’s still okay?',
  'What do you need right now that you’re not getting?',
]

const DEFAULT_REFLECTION: Reflection = {
  message:
    'Thank you for putting that into words — that takes something. Naming what’s here is often the first step toward it feeling more manageable.',
}

const STORAGE_KEY = 'mentra:space-draft'

export function VentSpace() {
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [promptIdx, setPromptIdx] = useState(0)
  const taRef = useRef<HTMLTextAreaElement>(null)

  // Restore any in-progress draft for this session only.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (saved) setText(saved)
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, text)
    } catch {
      // ignore
    }
  }, [text])

  const reflection = useMemo<Reflection>(() => {
    const found = RULES.find((r) => r.test.test(text))
    return found ? found.reflection : DEFAULT_REFLECTION
  }, [text])

  function clearAll() {
    setText('')
    setSubmitted(false)
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
    taRef.current?.focus()
  }

  return (
    <div>
      <div className="rounded-xl border border-border bg-surface-2 p-4 text-sm text-muted">
        This is private. What you write stays in your browser and is{' '}
        <strong className="text-text">never sent anywhere</strong> — there&rsquo;s
        no AI and no server here. It&rsquo;s a quiet place to get things out of
        your head and find a tool that might help.
      </div>

      <label htmlFor="vent" className="mt-6 block text-lg font-semibold text-text">
        {PROMPTS[promptIdx]}
      </label>
      <button
        type="button"
        onClick={() => setPromptIdx((i) => (i + 1) % PROMPTS.length)}
        className="mt-1 text-sm text-accent hover:opacity-80"
      >
        Try a different prompt
      </button>

      <textarea
        id="vent"
        ref={taRef}
        value={text}
        onChange={(e) => {
          setText(e.target.value)
          if (submitted) setSubmitted(false)
        }}
        rows={8}
        placeholder="Write as much or as little as you like…"
        className="mt-3 w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-base leading-relaxed text-text placeholder:text-muted focus:border-accent focus:outline-none"
      />

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          disabled={!text.trim()}
          className="rounded-xl bg-accent px-6 py-3 font-semibold text-accent-fg hover:opacity-90 disabled:opacity-40"
        >
          Reflect this back
        </button>
        {text && (
          <button
            type="button"
            onClick={clearAll}
            className="rounded-xl border border-border px-6 py-3 font-medium text-text hover:border-accent"
          >
            Clear
          </button>
        )}
      </div>

      {submitted && (
        <div
          className="mt-6 rounded-xl border border-accent bg-accent-soft p-5"
          aria-live="polite"
        >
          <p className="prose-body text-text">{reflection.message}</p>
          {reflection.toolSlug && (
            <Link
              href={`${reflection.toolSlug}/`}
              className="mt-4 inline-block font-semibold text-accent underline underline-offset-2 hover:opacity-80"
            >
              {reflection.toolLabel} &rarr;
            </Link>
          )}
        </div>
      )}

      <p className="mt-8 text-sm text-muted">
        This is a self-reflection aid, not therapy or a person. If you&rsquo;re
        struggling, talking to someone helps &mdash;{' '}
        <Link
          href="/crisis/"
          className="text-accent underline underline-offset-2 hover:opacity-80"
        >
          see crisis support
        </Link>
        .
      </p>
    </div>
  )
}
