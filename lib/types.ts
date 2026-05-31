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
