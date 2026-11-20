/** Mirrors App\Enums\FaqCategory. */
export type FaqCategory =
  | 'students'
  | 'immigration'
  | 'germany'
  | 'italy'
  | 'ielts'
  | 'german-language'
  | 'italian-language'
  | 'attestation'

/** Mirrors App\Http\Resources\V1\FaqResource. */
export interface Faq {
  id: number
  category: FaqCategory
  question: string
  answer: string
  tags: string[]
}
