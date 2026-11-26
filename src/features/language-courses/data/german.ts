import flag from '@/assets/images/legacy/ger_icons/flag.webp'
import bannerImage from '@/assets/images/legacy/ger_icons/lang-bg.webp'
import type { LanguageCourseContent } from '../types'
import { commonFeatures, prosImage, testIcon } from './shared'

export const germanCourse: LanguageCourseContent = {
  name: 'German',
  pageTitle: 'German Language Course',
  bannerTitle: 'Get Fluent in German, And Not Broke in the Process!',
  bannerImage,
  crumbs: [{ label: 'Language School' }, { label: 'German Language' }],
  intro: {
    heading: 'German Language Course in India',
    image: flag,
    paragraphs: [
      'Proficiency in German language can open doors to world-class education, better job prospects, and seamless integration into German-speaking countries. This is why our affordable and structured German language courses in India are designed for students looking to learn efficiently.',
      'We offer A1 to B2 level training with expert guidance. Our courses focus on practical learning, helping you develop real-life communication skills while also meeting university and visa requirements. With certified trainers, interactive lessons, and budget-friendly fees, you can learn German without financial stress. Our curriculum covers grammar, vocabulary, pronunciation, and cultural insights, ensuring a well-rounded learning experience.',
      "By the end of the course, you'll be confident in speaking, reading, and writing German, making your transition to studying in Germany smooth and hassle-free.",
    ],
  },
  why: {
    subtitle: 'EuroGrades offers affordable German learning for a brighter future!',
    features: [...commonFeatures, { icon: testIcon, label: 'TestDaF and DSH Preparation' }],
  },
  levels: {
    heading: 'German Language Learning Levels',
    subtitle:
      'Eurogrades offers structured courses to guide you through every step of the journey.',
    items: [
      {
        code: 'A1',
        title: 'A1 Level',
        tone: 'pink',
        summary:
          'German A1 level is the first CEFR level and is often described as the absolute beginner level or breakthrough level.',
        points: [
          'Basic vocabulary and grammar',
          'Speaking and listening',
          'Reading and writing',
          'Pronunciation and phonetics',
          'Cultural insights',
        ],
      },
      {
        code: 'A2',
        title: 'A2 Level',
        tone: 'pink',
        summary:
          'German A2 level means you can understand frequently used expressions, especially when focused on areas of immediate relevance.',
        points: [
          'Expanded vocabulary and grammar',
          'Conversational skills',
          'Reading and writing',
          'Listening comprehension',
          'Practical usage',
        ],
      },
      {
        code: 'B1',
        title: 'B1 Level',
        tone: 'navy',
        summary:
          'Achieving B1 level means you are able to deal with the main situations and topics that come up when traveling to a German-speaking country.',
        points: [
          'Advanced grammar and vocabulary',
          'Fluent conversations',
          'Reading and writing skills',
          'Listening comprehension',
          'Real-life scenarios',
        ],
      },
      {
        code: 'B2',
        title: 'B2 Level',
        tone: 'navy',
        summary:
          'If you reach this level, you’ll be able to have conversations with native speakers and be easily understood.',
        points: [
          'Advanced grammar and sentence structures',
          'Fluent and spontaneous conversations',
          'Reading and writing skills',
          'Listening comprehensions',
          'Professional and academic readiness',
        ],
      },
    ],
  },
  pros: {
    heading: 'Pros of Learning German Language',
    image: prosImage,
    points: [
      'Germany is home to top multinational companies, and knowing German can boost job prospects.',
      'Many public universities in Germany offer tuition-free programs, and German proficiency increases admission chances.',
      'Knowing German helps you navigate not only Germany but also Austria, Switzerland, and other German-speaking regions.',
      'Gain deeper insights into German literature, films, and traditions by learning the language.',
      'Learning German enhances memory, problem-solving, and multitasking abilities.',
    ],
  },
  reviewsSubtitle:
    'See what some of our students have to say about their German language learning experience with EuroGrades!',
  reviewsCategory: 'german',
  faqCategory: 'german-language',
  faqSubtitle:
    'From course details and eligibility to exams and career opportunities. Get clear, concise answers to help you make informed decisions about your language learning journey with Eurogrades!',
}
