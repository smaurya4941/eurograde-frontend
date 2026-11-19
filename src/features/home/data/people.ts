import profile1 from '@/assets/images/avatars/profile-img1.png'
import profile2 from '@/assets/images/avatars/profile-img2.png'
import profile4 from '@/assets/images/avatars/profile-img4.png'
import profile5 from '@/assets/images/avatars/profile-img5.png'
import advisor from '@/assets/images/avatars/profile1-1.png'
import profile3 from '@/assets/images/avatars/profile3.png'
import type { Testimonial } from '../types'

/** Small avatars reused in "happy students" social-proof clusters. */
export const studentAvatars = {
  three: [profile5, profile4, profile2],
  four: [profile5, profile4, profile2, profile3],
  faq: [advisor, profile5, profile4, profile2],
}

/** Advisor photos used next to the inline "Ready to…?" call-to-action lines. */
export const ctaAvatars = { advisor, student: profile4 }

/** Student reviews from eurogrades.com. */
export const testimonials: Testimonial[] = [
  {
    name: 'Neha Sharma',
    avatar: profile1,
    country: 'Germany',
    university: 'Master’s Student',
    rating: 5,
    quote:
      'I was overwhelmed with the process of studying abroad, but EuroGrades made everything easy. They helped me apply to a top public university in Germany, and I even secured a tuition-free spot! Their support didn’t end after admission, they guided me through the visa process and settling in too.',
    caseOverview: [
      'University Admission',
      'Tuition-Free Program',
      'Student Visa',
      'Settling-In Support',
    ],
  },
  {
    name: 'Naveen Bhatt',
    avatar: profile5,
    country: 'Italy',
    university: 'Business Student',
    rating: 5,
    quote:
      'I always wanted to study in Italy but wasn’t sure how to afford it. EuroGrades helped me find an affordable public university and walked me through every step, from applications to housing. Now I’m living my dream in Italy, studying what I love without financial stress!',
    caseOverview: [
      'University Selection',
      'Application Support',
      'Housing Assistance',
      'Affordable Study Plan',
    ],
  },
  {
    name: 'Shivani Mittal',
    avatar: profile4,
    country: 'Germany',
    university: 'LMU Munich',
    rating: 5,
    quote:
      'I never thought studying in Germany could be this easy. From applying to getting accepted at LMU Munich, everything just fell into place with the guidance and support of EuroGrades. Best decision I ever made!',
    caseOverview: [
      'University Admission',
      'Application Support',
      'Student Visa',
      'Pre-Departure Support',
    ],
  },
  {
    name: 'Vasu Das',
    avatar: profile2,
    country: 'Italy',
    university: 'University of Bologna',
    rating: 5,
    quote:
      'I always thought studying abroad was out of reach, but EuroGrades made it so simple and affordable. They helped me get into the University of Bologna, and now I’m living my dream of studying in Italy. It’s been an amazing journey!',
    caseOverview: [
      'University Admission',
      'Affordable Pathway',
      'Student Visa',
      'Application Support',
    ],
  },
]
