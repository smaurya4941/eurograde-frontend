import icon1 from '@/assets/images/icons/service-icon1.svg'
import icon10 from '@/assets/images/icons/service-icon10.svg'
import icon2 from '@/assets/images/icons/service-icon2.svg'
import icon3 from '@/assets/images/icons/service-icon3.svg'
import icon4 from '@/assets/images/icons/service-icon4.svg'
import icon5 from '@/assets/images/icons/service-icon5.svg'
import germanCourse from '@/assets/images/services/german-course.webp'
import ielts from '@/assets/images/services/ielts.webp'
import attestationImg from '@/assets/images/services/service-image-9.webp'
import italianCourse from '@/assets/images/services/service-image-6.webp'
import studyGermany from '@/assets/images/services/study-germany.webp'
import studyItaly from '@/assets/images/services/study-italy.webp'
import type { Service } from '../types'

/** What EuroGrades offers (copy adapted from eurogrades.com). */
export const services: Service[] = [
  {
    slug: 'study-in-germany',
    title: 'Study in Germany',
    excerpt:
      'World-class education with little to no tuition fees at Germany’s public universities, plus strong career prospects…',
    icon: icon2,
    image: studyGermany,
  },
  {
    slug: 'study-in-italy',
    title: 'Study in Italy',
    excerpt:
      'High-quality, affordable degrees in business, fashion, design, architecture and engineering at Italy’s top universities…',
    icon: icon3,
    image: studyItaly,
  },
  {
    slug: 'ielts-preparation',
    title: 'IELTS Preparation',
    excerpt:
      'Achieve your target band score with structured, result-driven coaching across Listening, Reading, Writing and Speaking…',
    icon: icon1,
    image: ielts,
  },
  {
    slug: 'german-language-course',
    title: 'German Language Course',
    excerpt:
      'Affordable A1 to B2 German training with certified trainers, live classes and TestDaF and DSH preparation…',
    icon: icon4,
    image: germanCourse,
  },
  {
    slug: 'italian-language-course',
    title: 'Italian Language Course',
    excerpt:
      'Structured A1 to C1 Italian training for students and professionals, including CILS and CELI exam preparation…',
    icon: icon5,
    image: italianCourse,
  },
  {
    slug: 'attestation-services',
    title: 'Attestation Services',
    excerpt:
      'MEA apostille and attestation, State HRD authentication, embassy legalisation and document translation…',
    icon: icon10,
    image: attestationImg,
  },
]
