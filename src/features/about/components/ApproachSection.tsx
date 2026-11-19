import { Focus, Rocket, type LucideIcon } from 'lucide-react'
import { paths } from '@/app/router/paths'
import cardGlobe from '@/assets/images/about/top-right-globe2.png'
import worldMap from '@/assets/images/backgrounds/footer-bg.webp'
import advisor from '@/assets/images/avatars/profile1-1.png'
import { InlineCta, PillLink, Reveal, SectionHeading } from '@/components/marketing'
import { approachCards } from '../data/content'

const icons: Record<(typeof approachCards)[number]['key'], LucideIcon> = {
  mission: Focus,
  vision: Rocket,
}

export function ApproachSection() {
  return (
    <section aria-label="Our approach" className="relative overflow-hidden bg-ink section-y">
      <img
        src={worldMap}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute top-1/2 left-0 w-[1400px] max-w-none -translate-y-1/2 opacity-70"
      />

      <div className="relative container-site">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-[50px]">
          <div>
            <SectionHeading
              tone="dark"
              badge="Our Approach"
              title={[
                { text: 'Turning Your ' },
                { text: 'Global Dreams', highlight: true },
                { text: ' Into Reality' },
              ]}
              titleClassName="max-w-[620px]"
              description="We connect students with top-ranked institutions in Germany and Italy and simplify the entire process, from guidance to admission, so every step of your study abroad journey is smooth and hassle-free."
            />
            <Reveal delay={200} className="mt-8">
              <PillLink to={paths.contact}>Start Your Study Abroad Journey</PillLink>
            </Reveal>
          </div>

          <div className="space-y-10">
            {approachCards.map((card, i) => {
              const Icon = icons[card.key]
              return (
                <Reveal key={card.key} variant="fade-left" delay={i * 150}>
                  <article
                    className="group rounded-xl bg-brand-600/20 bg-no-repeat p-8 transition-colors duration-500 hover:bg-brand-600/30 xl:p-10"
                    style={{
                      backgroundImage: `url(${cardGlobe})`,
                      backgroundPosition: 'top right',
                    }}
                  >
                    <span className="flex size-20 items-center justify-center rounded-full bg-white text-brand-600 transition-transform duration-500 group-hover:scale-110">
                      <Icon aria-hidden="true" className="size-9" strokeWidth={2.2} />
                    </span>
                    <h3 className="mt-8 border-b border-line-light pb-4 text-title text-white">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-white">{card.body}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>

        <InlineCta
          tone="dark"
          avatars={[advisor]}
          text="Expert study abroad guidance for students heading to Germany and Italy."
          linkLabel="Start Your Study Abroad Journey"
          to={paths.contact}
          className="mt-10"
        />
      </div>
    </section>
  )
}
