// The single source of truth for a tool's shape. Every file in /data/tools/
// must conform to this interface.

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export type EvidenceLevel =
  | 'anecdotal'
  | 'clinical'
  | 'peer-reviewed'
  | 'meta-analysis'

export type Category =
  | 'Motivational'
  | 'Emotional Regulation'
  | 'Cognitive'
  | 'Somatic'
  | 'Relational'
  | 'Existential'
  | 'Mindfulness'

export interface ToolStep {
  instruction: string
  mantra?: string
  note?: string
}

// Optional breathing pacer for breath-based tools. Each phase drives the
// animated circle in guided mode (inhale grows, exhale shrinks, holds pause).
export interface BreathPhase {
  label: string
  seconds: number
  type: 'in' | 'hold-full' | 'out' | 'hold-empty'
}

export interface BreathPattern {
  phases: BreathPhase[]
  /** Suggested number of cycles; the user can keep going regardless. */
  cycles?: number
}

export interface ToolOrigin {
  psychologist: string
  tradition: string
  year: number
  source: string
  sourceUrl?: string
}

export interface ToolEvidence {
  level: EvidenceLevel
  summary: string
  citations?: string[]
}

export interface Tool {
  // Identity
  slug: string
  name: string
  tagline: string

  // Attribution
  origin: ToolOrigin

  // Discovery
  emotions: string[]
  situations: string[]
  category: Category
  duration: string
  difficulty: Difficulty

  // Content
  summary: string
  howItWorks: string
  steps: ToolStep[]
  breathPattern?: BreathPattern
  whenToUse: string[]
  whenNotToUse: string[]
  tips: string[]

  // Evidence
  evidence: ToolEvidence

  // Related
  relatedTools: string[]
  pairsWith?: string[]
}

export interface Emotion {
  id: string
  label: string
  description: string
  tools: string[]
}

export interface CategoryInfo {
  id: Category
  label: string
  description: string
  tradition: string
}

export interface Helpline {
  country: string
  code: string | null // ISO 3166-1 alpha-2, when known
  lines: string[] // each entry is a crisis line / emergency number for that country
}

export interface HelplineData {
  source: string
  sourceUrl: string
  retrieved: string
  countries: Helpline[]
}
