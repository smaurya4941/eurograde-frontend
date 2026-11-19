import berlin from '@/assets/images/destinations/berlin.webp'
import bologna from '@/assets/images/destinations/bologna.webp'
import frankfurt from '@/assets/images/destinations/frankfurt.webp'
import germany from '@/assets/images/destinations/germany.webp'
import italy from '@/assets/images/destinations/italy.webp'
import milan from '@/assets/images/destinations/milan.webp'
import munich from '@/assets/images/destinations/munich.webp'
import pisa from '@/assets/images/destinations/pisa.webp'
import rome from '@/assets/images/destinations/rome.webp'
import au from '@/assets/images/flags/au-ico.svg'
import ca from '@/assets/images/flags/ca-ico.svg'
import de from '@/assets/images/flags/de-ico.svg'
import eu from '@/assets/images/flags/eu-ico.svg'
import ie from '@/assets/images/flags/ie-ico.svg'
import it from '@/assets/images/flags/it-ico.svg'
import nz from '@/assets/images/flags/nz-ico.svg'
import uk from '@/assets/images/flags/uk-ico.svg'
import usa from '@/assets/images/flags/usa-ico.svg'
import bolognaUni from '@/assets/images/universities/bologna.webp'
import cologne from '@/assets/images/universities/cologne.webp'
import freiburg from '@/assets/images/universities/freiburg.webp'
import hamburg from '@/assets/images/universities/hamburg.webp'
import polimi from '@/assets/images/universities/polimi.webp'
import sapienza from '@/assets/images/universities/sapienza.webp'
import stuttgart from '@/assets/images/universities/stuttgart.webp'
import unimi from '@/assets/images/universities/unimi.webp'
import type { Destination, StudyDestination, University } from '../types'

export const flags = { au, ca, de, eu, ie, it, nz, uk, usa }

/** Study destinations carousel: our two countries, then their most popular student cities. */
export const destinations: StudyDestination[] = [
  { name: 'Germany', image: germany },
  { name: 'Italy', image: italy },
  { name: 'Munich', image: munich },
  { name: 'Berlin', image: berlin },
  { name: 'Frankfurt', image: frankfurt },
  { name: 'Rome', image: rome },
  { name: 'Milan', image: milan },
  { name: 'Pisa', image: pisa },
  { name: 'Bologna', image: bologna },
]

/** City chips (with their country's flag) overlaid on the "Why choose us" image. */
export const featuredCountries: Destination[] = [
  { name: 'Munich', flag: de },
  { name: 'Rome', flag: it },
  { name: 'Berlin', flag: de },
  { name: 'Milan', flag: it },
  { name: 'Frankfurt', flag: de },
  { name: 'Bologna', flag: it },
]

/** Partner public universities (logos from eurogrades.com). */
export const universities: University[] = [
  { name: 'University of Cologne', country: 'Germany', logo: cologne },
  { name: 'Universität Hamburg', country: 'Germany', logo: hamburg },
  { name: 'University of Stuttgart', country: 'Germany', logo: stuttgart },
  { name: 'University of Freiburg', country: 'Germany', logo: freiburg },
  { name: 'University of Bologna', country: 'Italy', logo: bolognaUni },
  { name: 'Sapienza University of Rome', country: 'Italy', logo: sapienza },
  { name: 'Politecnico di Milano', country: 'Italy', logo: polimi },
  { name: 'University of Milan', country: 'Italy', logo: unimi },
]
