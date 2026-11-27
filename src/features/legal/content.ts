export interface LegalSection {
  heading: string
  paragraphs: string[]
}

export interface LegalDocument {
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}

const UPDATED = '27 November 2026'

/** Starter policy copy. Have it reviewed by a lawyer before launch. */
export const PRIVACY: LegalDocument = {
  title: 'Privacy Policy',
  updated: UPDATED,
  intro:
    'EuroRank respects your privacy. This policy explains what personal data we collect through this website, why we collect it and the choices you have.',
  sections: [
    {
      heading: 'Information we collect',
      paragraphs: [
        'When you fill in our contact form, request a call, or subscribe to our newsletter, we collect the details you provide, such as your name, email address, phone number, study interests and message.',
        'We may also collect basic technical data such as your browser type and pages visited, to keep the website secure and working well.',
      ],
    },
    {
      heading: 'How we use your information',
      paragraphs: [
        'We use your details to reply to your enquiry, provide admissions, IELTS, language-course and attestation guidance, and send updates you have asked for. We do not sell your personal data.',
      ],
    },
    {
      heading: 'Sharing',
      paragraphs: [
        'We share information only with universities, partners and service providers when it is needed to deliver a service you requested, or when the law requires it.',
      ],
    },
    {
      heading: 'Retention and your rights',
      paragraphs: [
        'We keep your data only as long as needed for the purposes above. You may ask us to access, correct or delete your data, or to stop sending you emails, by contacting us.',
      ],
    },
  ],
}

export const TERMS: LegalDocument = {
  title: 'Terms & Conditions',
  updated: UPDATED,
  intro: 'By using this website you agree to the following terms. Please read them carefully.',
  sections: [
    {
      heading: 'Use of the website',
      paragraphs: [
        'The content on this website is for general information about studying abroad. You agree to use it lawfully and not to misuse, copy or disrupt it.',
      ],
    },
    {
      heading: 'No guarantee of outcomes',
      paragraphs: [
        'Admissions, scholarships, visas and exam scores are decided by universities, embassies and testing bodies. EuroRank provides guidance but cannot guarantee any specific result.',
      ],
    },
    {
      heading: 'Accuracy of information',
      paragraphs: [
        'We work to keep fees, deadlines and requirements up to date, but they change often. Always confirm details with the official source.',
      ],
    },
    {
      heading: 'Changes',
      paragraphs: [
        'We may update these terms from time to time. Continued use means you accept the updated terms.',
      ],
    },
  ],
}

export const COOKIES: LegalDocument = {
  title: 'Cookie Policy',
  updated: UPDATED,
  intro: 'This page explains how this website uses cookies and similar technologies.',
  sections: [
    {
      heading: 'What are cookies?',
      paragraphs: [
        'Cookies are small text files stored on your device that help a website work and remember your preferences.',
      ],
    },
    {
      heading: 'How we use them',
      paragraphs: [
        'We use only essential cookies and local storage, for example to keep you signed in to the admin area and to remember the name you used on a blog comment.',
      ],
    },
    {
      heading: 'Managing cookies',
      paragraphs: [
        'You can block or delete cookies in your browser settings. Some features may not work without them.',
      ],
    },
  ],
}
