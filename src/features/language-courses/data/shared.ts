import classIcon from '@/assets/images/legacy/ger_icons/class.webp'
import curiIcon from '@/assets/images/legacy/ger_icons/curi.webp'
import flexibleIcon from '@/assets/images/legacy/ger_icons/flexible.webp'
import friendlyIcon from '@/assets/images/legacy/ger_icons/friendly.webp'
import pricingIcon from '@/assets/images/legacy/ger_icons/pricing.webp'
import prosImage from '@/assets/images/legacy/ger_icons/pros.webp'
import sizeIcon from '@/assets/images/legacy/ger_icons/size.webp'
import testIcon from '@/assets/images/legacy/ger_icons/test.webp'
import trainerIcon from '@/assets/images/legacy/ger_icons/trainer.webp'
import type { LanguageFeature } from '../types'

export { prosImage, testIcon }

/** The first seven "Why EuroRank?" cards are identical on both language pages. */
export const commonFeatures: LanguageFeature[] = [
  { icon: pricingIcon, label: 'Affordable Pricing' },
  { icon: friendlyIcon, label: 'Beginner Friendly' },
  { icon: sizeIcon, label: 'Small Batch Sizes' },
  { icon: trainerIcon, label: 'Certified Trainers' },
  { icon: curiIcon, label: 'Structured Curriculum' },
  { icon: flexibleIcon, label: 'Flexible Learning Modes' },
  { icon: classIcon, label: 'Live Interactive Classes' },
]
