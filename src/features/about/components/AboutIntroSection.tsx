import { paths } from '@/app/router/paths'
import mainImg from '@/assets/images/about/graduates-campus.webp'
import detailImg from '@/assets/images/about/graduation-caps.webp'
import visaStamp from '@/assets/images/about/visa-temp-img.svg'
import { ImageReveal, PillLink, Reveal, SectionHeading } from '@/components/marketing'

export function AboutIntroSection() {
  return (
    <section
      aria-label="About EuroGrades"
      className="relative overflow-hidden bg-surface section-y"
    >
      <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-[50px]">
        {/* Photo + stat card */}
        <div className="relative pb-20 sm:pb-0">
          <ImageReveal
            src={mainImg}
            alt="Graduates celebrating outside their university"
            width={766}
            height={705}
            wrapperClassName="overflow-hidden rounded-2xl"
            className="aspect-[766/705] w-full object-cover"
          />
          <Reveal
            variant="fade-right"
            delay={200}
            className="absolute bottom-0 -left-4 w-[88%] max-w-[484px] sm:bottom-[38px] sm:-left-[30px]"
          >
            <div className="rounded-xl bg-ink px-6 py-6 text-white shadow-card xl:px-[25px]">
              <p className="text-lg font-bold text-white xl:text-[22px]">
                300+ Students Studying Abroad
              </p>
              <p className="mt-3 text-[15px] text-white">
                Thriving at 50+ global partner universities across Germany and Italy.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Copy */}
        <div className="relative">
          <img
            src={visaStamp}
            alt=""
            aria-hidden="true"
            className="animate-float pointer-events-none absolute -top-2 right-0 hidden w-[100px] sm:block"
          />
          <SectionHeading
            badge="About EuroGrades"
            title={[
              { text: 'Quality & Affordable Education Abroad, ' },
              { text: 'Made Simple', highlight: true },
            ]}
            titleClassName="pr-0 sm:pr-24"
            description="We believe studying abroad shouldn’t be a luxury. That’s why we help students access top-notch education in countries like Germany and Italy through affordable pathways."
          />

          <Reveal className="mt-10 grid gap-6 sm:grid-cols-[1fr_160px] sm:items-start">
            <div>
              <h3 className="text-title">
                <span className="text-brand-600">80+ Expert Counselors</span> for Your Study Abroad
                Journey
              </h3>
              <p className="mt-4">
                By connecting you with reputable public universities and colleges, we turn your
                dreams of international education into a reality, without the hefty price tag.
              </p>
            </div>
            <div className="img-shine max-w-[220px] overflow-hidden rounded-xl sm:max-w-none">
              <img
                src={detailImg}
                alt="Graduation caps thrown in the air"
                width={221}
                height={176}
                loading="lazy"
                className="aspect-[160/180] w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={150} className="mt-10">
            <PillLink to={paths.contact}>Start Your Study Abroad Journey</PillLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
