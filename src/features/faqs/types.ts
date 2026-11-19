/** Mirrors App\Enums\FaqCategory. */
export type FaqCategory = 'students' | 'immigration'

/** Mirrors App\Http\Resources\V1\FaqResource. */
export interface Faq {
  id: number
  category: FaqCategory
  question: string
  answer: string
  tags: string[]
}
