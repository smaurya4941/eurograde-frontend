import { paths } from '@/app/router/paths'
import globeImg from '@/assets/images/home/globle-img.webp'
import passports from '@/assets/images/home/two-passports-img.webp'
import { ImageReveal, PillLink, Reveal, SectionHeading } from '@/components/marketing'

/** White promo card that overlaps the end of the dark "Why choose us" section. */
export function CtaBannerSection() {
  return (
    <section
      aria-label="Get started"
      className="bg-[linear-gradient(to_bottom,var(--color-ink)_0,var(--color-ink)_120px,var(--color-white)_120px)] xl:bg-[linear-gradient(to_bottom,var(--color-ink)_0,var(--color-ink)_177px,var(--color-white)_177px)]"
    >
      <div className="container-site">
        <Reveal>
          <div className="relative grid overflow-hidden rounded-2xl bg-white shadow-card lg:grid-cols-[597px_1fr]">
            <ImageReveal
              src={globeImg}
              alt="Student with books in front of a university with international flags"
              width={577}
              height={444}
              wrapperClassName="h-full"
              className="h-full min-h-[300px] w-full object-cover lg:rounded-l-2xl"
            />
            <div className="relative p-6 pb-40 sm:p-10 sm:pb-40 lg:pb-12 xl:px-[50px] xl:py-[52px]">
              <SectionHeading
                badge="Your Global Journey Starts Here"
                title={[
                  { text: 'Your Dreams Deserve ' },
                  { text: 'The Right Guidance', highlight: true },
                ]}
                description="EuroGrades is your first step towards an international degree without breaking the bank. Talk to an expert for free about admissions, scholarships, student visas and pre-departure preparation."
              />
              <Reveal delay={200} className="mt-8">
                <PillLink to={paths.contact}>Start Your Journey</PillLink>
              </Reveal>
              <img
                src={passports}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="pointer-events-none absolute right-4 bottom-0 w-[200px] xl:w-[250px]"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
