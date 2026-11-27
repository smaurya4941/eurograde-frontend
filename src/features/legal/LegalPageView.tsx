import bannerImg from '@/assets/images/legacy/about-bg.webp'
import { LegacyBanner } from '@/components/legacy'
import { useContact } from '@/features/site-settings'
import { usePageTitle } from '@/hooks/usePageTitle'
import type { LegalDocument } from './content'

export function LegalPageView({ doc }: { doc: LegalDocument }) {
  usePageTitle(doc.title)
  const contact = useContact()

  return (
    <div className="legacy-page">
      <LegacyBanner title={doc.title} image={bannerImg} />
      <section className="py-12 md:py-20">
        <div className="legacy-container max-w-[900px]">
          <p className="text-sm text-legacy-muted">Last updated: {doc.updated}</p>
          <p className="mt-4 text-base">{doc.intro}</p>
          {doc.sections.map((s) => (
            <div key={s.heading} className="mt-8">
              <h2 className="font-work text-2xl font-semibold text-legacy-navy">{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p} className="mt-3 text-base">
                  {p}
                </p>
              ))}
            </div>
          ))}
          <p className="mt-10 text-base">
            Questions? Email{' '}
            <a className="text-legacy underline" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
