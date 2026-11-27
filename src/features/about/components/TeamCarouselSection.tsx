import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { A11y, Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { paths } from '@/app/router/paths'
import profile1 from '@/assets/images/avatars/profile1-1.png'
import profile2 from '@/assets/images/avatars/profile-img2.png'
import profile4 from '@/assets/images/avatars/profile-img4.png'
import profile5 from '@/assets/images/avatars/profile-img5.png'
import worldMap from '@/assets/images/backgrounds/footer-bg.webp'
import {
  ContentError,
  InlineCta,
  PillLink,
  Reveal,
  SectionHeading,
  Skeleton,
} from '@/components/marketing'
import { useTeamMembers, type TeamMember } from '@/features/team'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

function ProfessionalCard({ member }: { member: TeamMember }) {
  const href = paths.team

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-ink-soft">
      <img
        src={member.photo_url ?? undefined}
        alt={`${member.name}, ${member.role}`}
        width={410}
        height={500}
        loading="lazy"
        className="aspect-[410/500] w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-x-2.5 bottom-2.5 flex items-center justify-between gap-3 rounded-xl bg-white p-5 transition-transform duration-500 group-hover:-translate-y-1.5 xl:px-6">
        <div>
          <h3 className="text-lg font-semibold xl:text-[21px]">{member.name}</h3>
          <p className="mt-1 text-[15px] text-ink">{member.role}</p>
        </div>
        <Link
          to={href}
          aria-label={`View details for ${member.name}`}
          className="flex size-[50px] shrink-0 items-center justify-center rounded-full bg-ink text-white transition-colors duration-300 group-hover:bg-brand-600"
        >
          <ArrowRight
            aria-hidden="true"
            className="size-5 -rotate-45 transition-transform duration-400 group-hover:rotate-0"
          />
        </Link>
      </div>
    </article>
  )
}

function TeamCarousel() {
  const { data: team, isPending, isError, refetch } = useTeamMembers()
  const reducedMotion = usePrefersReducedMotion()

  if (isPending) {
    return (
      <div
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        aria-busy="true"
        aria-label="Loading team"
      >
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="aspect-[410/500] bg-white/10" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <ContentError
        what="team members"
        tone="dark"
        className="mt-12"
        onRetry={() => void refetch()}
      />
    )
  }

  return (
    <Reveal className="mt-12">
      <Swiper
        modules={[A11y, Autoplay, Pagination]}
        className="team-swiper"
        loop={team.length > 3}
        speed={800}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        autoplay={
          reducedMotion
            ? false
            : { delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }
        }
        pagination={{ clickable: true }}
      >
        {team.map((member) => (
          <SwiperSlide key={member.id}>
            <ProfessionalCard member={member} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Reveal>
  )
}

export function TeamCarouselSection() {
  return (
    <section
      aria-label="Our study abroad experts"
      className="relative overflow-hidden bg-ink section-y"
    >
      <img
        src={worldMap}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute right-0 bottom-0 w-[1400px] max-w-none opacity-70"
      />

      <div className="relative container-site">
        <div className="grid items-end gap-6 lg:grid-cols-2 lg:gap-[50px]">
          <SectionHeading
            tone="dark"
            badge="Our Study Abroad Experts"
            title={[
              { text: 'Meet The Professionals', highlight: true },
              { text: ' Guiding Your Journey' },
            ]}
            titleClassName="max-w-[520px]"
          />
          <Reveal delay={150} className="lg:self-start lg:pt-2">
            <p className="max-w-[640px] text-slate-400">
              From choosing a university and course to IELTS and language preparation, scholarships
              and student visas, our counselors work closely with every student to deliver tailored
              guidance with confidence and transparency.
            </p>
            <PillLink to={paths.contact} className="mt-6">
              Start Your Study Abroad Journey
            </PillLink>
          </Reveal>
        </div>

        <TeamCarousel />

        <InlineCta
          tone="dark"
          avatars={[profile1, profile5, profile4, profile2]}
          text="Need Expert Study Abroad Advice?"
          linkLabel="Book Free Consultation"
          to={paths.contact}
          className="mt-10"
        />
      </div>
    </section>
  )
}
