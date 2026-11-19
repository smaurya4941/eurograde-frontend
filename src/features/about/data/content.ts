import de from '@/assets/images/flags/de-ico.svg'
import it from '@/assets/images/flags/it-ico.svg'

/**
 * Static marketing copy for the About page (adapted from eurogrades.com).
 * Collections that change (team, FAQs, posts) are loaded from the API instead.
 */

/** YouTube video shown in the "Watch Video" lightbox. */
export const ABOUT_VIDEO = { youtubeId: '9jo51nJrO0k', title: 'How EuroGrades works' } as const

export const approachCards = [
  {
    key: 'mission',
    title: 'Our Mission',
    body: 'We make global education financially accessible through affordable pathways like public universities, because studying abroad shouldn’t be a luxury.',
  },
  {
    key: 'vision',
    title: 'Our Vision',
    body: 'Every student deserves the best education. We connect ambitious students with top-ranked institutions known for academic excellence, without the hefty price tag.',
  },
] as const

/** EuroGrades’ mission and values. */
export const reasons = [
  {
    title: 'Quality Education',
    body: 'We connect students with top-ranked institutions in countries like Germany and Italy, known for their academic excellence.',
  },
  {
    title: 'Affordability',
    body: 'Education abroad shouldn’t be a luxury. We make it financially accessible through affordable pathways like public universities.',
  },
  {
    title: 'Easy Access',
    body: 'We handle the admission do’s and don’ts and simplify the entire process, from guidance to admission, for a hassle-free experience.',
  },
  {
    title: 'Student-Centric Guidance',
    body: 'Your dreams are our priority. Have a doubt or a question? We resolve it, so you always know what you’re getting into.',
  },
]

export const stats = [
  { value: 80, suffix: '+', label: 'Expert Counselors' },
  { value: 300, suffix: '+', label: 'Students Studying Abroad' },
  { value: 50, suffix: '+', label: 'Global Partner Universities' },
]

/** Our two study countries and their top student cities, laid out in three rows. */
export const ctaCountries = [
  [
    { name: 'Munich', flag: de },
    { name: 'Berlin', flag: de },
    { name: 'Frankfurt', flag: de },
  ],
  [
    { name: 'Germany', flag: de },
    { name: 'Italy', flag: it },
  ],
  [
    { name: 'Rome', flag: it },
    { name: 'Milan', flag: it },
    { name: 'Bologna', flag: it },
  ],
]
