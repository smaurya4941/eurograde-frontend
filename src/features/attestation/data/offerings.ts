import apostille from '@/assets/images/legacy/popular/mea-attestion-apostille.webp'
import general from '@/assets/images/legacy/popular/mea-attestion-general.webp'
import hrd from '@/assets/images/legacy/popular/state-hrd-authentication-educational.webp'
import hd from '@/assets/images/legacy/popular/state-hrd-authentication-personal.webp'
import embassy from '@/assets/images/legacy/popular/embassy-legalisation.webp'
import translation from '@/assets/images/legacy/popular/language-translation.webp'

export interface AttestationOffering {
  title: string
  description: string
  icon: string
}

export const offeringsIntro =
  'From state authentication to MEA apostille and embassy legalisation, we handle every step of getting your Indian documents accepted abroad, so you can focus on your admission and visa.'

/** "What we offer" cards (titles/copy from the old attestation_services.php). */
export const attestationOfferings: readonly AttestationOffering[] = [
  {
    title: 'MEA Attestation - Apostille',
    description:
      'Apostille is done for personal documents like birth/marriage certificates, affidavits and educational certificates, and is accepted in all Hague Convention member countries.',
    icon: apostille,
  },
  {
    title: 'MEA Attestation - General',
    description:
      'This is done for all the countries which are not a member of the Hague Convention and where Apostille is not accepted.',
    icon: general,
  },
  {
    title: 'State HRD Authentication (Educational documents)',
    description:
      'State HRD Authentication: each state authentication has different requirements and different government bodies that can authenticate your documents.',
    icon: hrd,
  },
  {
    title: 'State HD Authentication (Personal Documents)',
    description:
      'State HD Authentication: each state authentication has different requirements and different government bodies that can authenticate your documents.',
    icon: hd,
  },
  {
    title: 'Embassy Legalisation',
    description:
      'Legalising Indian documents for use in foreign countries is often a time-consuming task. We work with the embassies and consulates for you.',
    icon: embassy,
  },
  {
    title: 'Language Translation',
    description:
      'We also provide certified translation services. Some attestation and legalisation work requires translation of documents into the language of the destination country.',
    icon: translation,
  },
]
