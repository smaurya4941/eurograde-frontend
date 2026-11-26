import gerBanner from '@/assets/images/legacy/germany-bg.webp'
import itBanner from '@/assets/images/legacy/italy-flag.webp'
import gerStrip from '@/assets/images/legacy/ger_icons/ger-bg.webp'
import gerCostBg from '@/assets/images/legacy/ger_icons/ger-flag.webp'
import itCostBg from '@/assets/images/legacy/italyy.webp'
import berlin from '@/assets/images/legacy/ger_icons/berlin.webp'
import frankfurt from '@/assets/images/legacy/ger_icons/frankfurt.webp'
import munich from '@/assets/images/legacy/ger_icons/munich.webp'
import bologna from '@/assets/images/legacy/bolognia.webp'
import milan from '@/assets/images/legacy/milan.webp'
import pisa from '@/assets/images/legacy/pisa.webp'
import rome from '@/assets/images/legacy/rome.webp'
import capitalIcon from '@/assets/images/legacy/ger_icons/earth.webp'
import populationIcon from '@/assets/images/legacy/ger_icons/population.webp'
import languageIcon from '@/assets/images/legacy/ger_icons/lang.webp'
import internationalIcon from '@/assets/images/legacy/ger_icons/international.webp'
import gdpIcon from '@/assets/images/legacy/ger_icons/gdp.webp'
import indiaIcon from '@/assets/images/legacy/ger_icons/india.webp'
import salaryIcon from '@/assets/images/legacy/ger_icons/salary.webp'
import livingIcon from '@/assets/images/legacy/ger_icons/living.webp'
import feeIcon from '@/assets/images/legacy/ger_icons/fee.webp'
import universityIcon from '@/assets/images/legacy/ger_icons/university.webp'
import rentIcon from '@/assets/images/legacy/ger_icons/rent.webp'
import foodIcon from '@/assets/images/legacy/ger_icons/food.webp'
import transportIcon from '@/assets/images/legacy/ger_icons/transport.webp'
import walletIcon from '@/assets/images/legacy/ger_icons/wallet.webp'

export type LegacyCountrySlug = 'germany' | 'italy'

interface Fact {
  icon: string
  label: string
  value: string
  /** `CountryDetail.stats` label whose API value replaces `value` when present. */
  statLabel?: string
}

export interface LegacyCountryConfig {
  name: string
  banner: string
  strip: string
  costBg: string
  whyParagraphs: string[]
  facts: Fact[]
  citiesSubtitle: string
  universitiesSubtitle: string
  visaSubtitle: string
  faqSubtitle: string
  /** QS "best student city" ranks (only Germany's page shows the badge). */
  cityRanks: Record<string, number>
  cityFallbackImages: Record<string, string>
  showVisaType: boolean
}

/** Icons for the cost-of-living tiles, keyed by the API label. */
export const costIcons: Record<string, string> = {
  Rent: rentIcon,
  Food: foodIcon,
  Transport: transportIcon,
  Miscellaneous: walletIcon,
}

/** Static copy of germany.php / italy.php for the pieces the API does not carry. */
export const legacyCountryConfig: Record<LegacyCountrySlug, LegacyCountryConfig> = {
  germany: {
    name: 'Germany',
    banner: gerBanner,
    strip: gerStrip,
    costBg: gerCostBg,
    whyParagraphs: [
      'Germany is one of the best destinations for studying abroad, offering world-class education, affordable tuition, and excellent career opportunities. Public universities in Germany provide high-quality education at little to no tuition fees, making it a cost-effective choice for international students. Whether you want to study engineering, business, or medicine, Germany has top-ranked universities that offer globally recognized degrees.',
      'One of the biggest advantages of choosing to study in Germany is the strong focus on research and practical learning. Many universities collaborate with industries, giving students hands-on experience and better job prospects. Additionally, Germany has a thriving job market, with numerous opportunities for international graduates.',
      'While many programs are offered in English, learning German can be a huge advantage, helping you integrate better and expand your career opportunities. If you’re looking for an affordable, high-quality education with strong career prospects, studying in Germany is a smart choice!',
    ],
    facts: [
      { icon: capitalIcon, label: 'Capital', value: 'Berlin' },
      { icon: populationIcon, label: 'Population', value: '83 M' },
      { icon: languageIcon, label: 'Language', value: 'German' },
      { icon: internationalIcon, label: 'International Students', value: '469,485 (2023/24)' },
      { icon: gdpIcon, label: 'GDP', value: '$4.5 Trillion' },
      {
        icon: indiaIcon,
        label: 'Indian Students in Germany',
        value: '49,483 (2023/24)',
        statLabel: 'Indian Students',
      },
      { icon: salaryIcon, label: 'Avg Salary', value: '$54,000', statLabel: 'Average Salary' },
      {
        icon: livingIcon,
        label: 'Approx. Living Cost (Monthly)',
        value: '$1,000 to $1,085',
        statLabel: 'Living Cost (Monthly)',
      },
      {
        icon: feeIcon,
        label: 'Approx Tuition Fee',
        value: '$1,500 (Public), $31,600 (Private)',
      },
      { icon: universityIcon, label: 'Universities', value: '400+', statLabel: 'Universities' },
    ],
    citiesSubtitle:
      'Explore, learn, and thrive in Germany’s top student cities, where education meets opportunity!',
    universitiesSubtitle:
      'Explore top universities in Germany, which are known for their excellence in various fields and take the first step toward a world-class education.',
    visaSubtitle:
      'Secure your student visa and unlock endless opportunities to study, work, and thrive in Germany!',
    faqSubtitle:
      'Our FAQ section answers the most common queries asked to navigate your journey, of studying abroad in Germany, with ease.',
    cityRanks: { Munich: 5, Berlin: 8, Frankfurt: 12 },
    cityFallbackImages: { Munich: munich, Berlin: berlin, Frankfurt: frankfurt },
    showVisaType: true,
  },
  italy: {
    name: 'Italy',
    banner: itBanner,
    strip: gerStrip,
    costBg: itCostBg,
    whyParagraphs: [
      'Italy has fast become one of the top choices for international students. Italy offers high-quality education at a relatively low cost. Public universities in Italy charge significantly lower tuition fees compared to institutions in the US, UK, or Australia, making it a smart option for students seeking top-notch education on a budget.',
      'Many universities in Italy offer programs in English, especially in fields like business, fashion, design, architecture, and engineering. What’s more, Italy is home to global giants like Ferrari, Fiat, Prada, Luxottica, and Barilla, giving students direct access to internships and job opportunities with multinational brands across industries.',
      'Located in the heart of Europe, studying in Italy also opens doors to travel, networking, and career options across the EU. Whether you’re aiming for a global career or simply want to study in a culturally rich, affordable country, Italy checks all the right boxes. With world-renowned universities and a growing international student community, Italy offers the perfect mix of education, culture, and opportunity.',
    ],
    facts: [
      { icon: capitalIcon, label: 'Capital', value: 'Rome' },
      { icon: populationIcon, label: 'Population', value: '59 M' },
      { icon: languageIcon, label: 'Language', value: 'Italian' },
      { icon: internationalIcon, label: 'International Students', value: '96,000 (2023/24)' },
      { icon: gdpIcon, label: 'GDP', value: '$2.30 Trillion' },
      {
        icon: indiaIcon,
        label: 'Indian Students in Italy',
        value: '10,000+ (2023/24)',
        statLabel: 'Indian Students',
      },
      {
        icon: salaryIcon,
        label: 'Avg Salary',
        value: '€32,450 ($33,825 USD)',
        statLabel: 'Average Salary',
      },
      {
        icon: livingIcon,
        label: 'Approx. Living Cost (Monthly)',
        value: '$750 to $1075',
        statLabel: 'Living Cost (Monthly)',
      },
      {
        icon: feeIcon,
        label: 'Approx Tuition Fee',
        value: '$1,000 to $4,800 (Public), $7,200 to $24,100 (Private)',
      },
      { icon: universityIcon, label: 'Universities', value: '100+', statLabel: 'Universities' },
    ],
    citiesSubtitle:
      'Explore, learn, and thrive in Italy’s top student cities, where education meets opportunity!',
    universitiesSubtitle:
      'Explore top universities in Italy, which are known for their excellence in various fields and take the first step toward a world-class education.',
    visaSubtitle:
      'Secure your student visa and unlock endless opportunities to study, work, and thrive in Italy!',
    faqSubtitle:
      'Our FAQ section answers the most common questions about studying in Italy, from tuition fees and scholarships to language requirements, part-time work and life after graduation.',
    cityRanks: {},
    cityFallbackImages: { Rome: rome, Milan: milan, Pisa: pisa, Bologna: bologna },
    showVisaType: false,
  },
}

export const legacyTabs = [
  { id: 'fast-facts', label: 'Fast Facts' },
  { id: 'universities', label: 'Top Universities' },
  { id: 'visa', label: 'Visa' },
  { id: 'cost-of-living', label: 'Cost of Living' },
  { id: 'work', label: 'Work Opportunities' },
  { id: 'faqs', label: 'FAQ’s' },
] as const
