import type { Testimonial } from '../types'

/**
 * Subtitle under a reviewer's name:
 * "Master’s Student • India → Germany" or "IELTS Preparation • Band 8".
 */
export function testimonialSubtitle(
  t: Pick<Testimonial, 'program' | 'origin' | 'destination' | 'achievement'>,
) {
  const journey =
    t.origin && t.destination ? `${t.origin} → ${t.destination}` : (t.destination ?? t.achievement)

  return journey ? `${t.program} • ${journey}` : t.program
}
