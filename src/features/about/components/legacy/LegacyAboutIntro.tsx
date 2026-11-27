import aboutImg from '@/assets/images/legacy/about.webp'
import { Reveal } from '@/components/marketing'

/** Photo beside the "Quality, and Affordable Education Abroad" intro copy. */
export function LegacyAboutIntro() {
  return (
    <section aria-label="About EuroRank" className="py-12 md:py-20">
      <div className="legacy-container">
        <div className="grid items-center gap-10 lg:grid-cols-[5fr_6fr] lg:gap-16">
          <Reveal>
            <img
              src={aboutImg}
              alt="Students planning their studies abroad with a EuroRank counselor"
              loading="lazy"
              className="h-auto w-full"
            />
          </Reveal>
          <Reveal delay={100}>
            <h2 className="py-4 legacy-h2 lg:pr-12">
              Quality, and Affordable Education Abroad Made Simple with EuroRank
            </h2>
            <p className="text-[15px] leading-relaxed text-legacy-text">
              We believe studying abroad shouldn’t be a luxury. Therefore, we’re helping students
              access top-notch education in countries like Italy and Germany through affordable
              pathways. By connecting you with reputable public universities and colleges, we turn
              your dreams of international education into a reality—without the hefty price tag.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
