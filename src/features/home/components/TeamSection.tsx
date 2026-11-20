import { paths } from '@/app/router/paths'
import teamBg from '@/assets/images/backgrounds/team-bg.webp'
import { SocialIcon } from '@/components/icons/SocialIcon'
import { ContentError, PillLink, Reveal, SectionHeading, Skeleton } from '@/components/marketing'
import { socialLabels } from '@/config/site'
import { useTeamMembers, type TeamMember } from '@/features/team'
import { cn } from '@/lib/cn'

function TeamCard({ member }: { member: TeamMember }) {
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
      {/* Accent gradient that deepens on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,var(--color-card-overlay)_100%)] transition-opacity duration-500 group-hover:opacity-100 sm:opacity-90"
      />

      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <ul
          aria-label={`${member.name} on social media`}
          className={cn(
            'mb-4 flex gap-2 transition-all duration-500',
            'sm:translate-y-5 sm:opacity-0 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100 sm:group-hover:translate-y-0 sm:group-hover:opacity-100',
          )}
        >
          {member.socials.map((s) => (
            <li key={s.network}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${member.name} on ${socialLabels[s.network]}`}
                className="flex size-9 items-center justify-center rounded-full bg-white text-brand-600 transition-colors hover:bg-ink hover:text-white"
              >
                <SocialIcon network={s.network} className="size-4" />
              </a>
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-bold text-white xl:text-[22px]">{member.name}</h3>
        <p className="mt-1 text-[15px] text-white">{member.role}</p>
      </div>
    </article>
  )
}

/** Two staggered columns: even-indexed members left, odd-indexed right. */
function TeamGrid() {
  const { data: team, isPending, isError, refetch } = useTeamMembers({ limit: 4 })

  if (isPending) {
    return (
      <div className="grid gap-5 sm:grid-cols-2" aria-busy="true" aria-label="Loading team">
        {[0, 1].map((col) => (
          <div key={col} className={cn('space-y-4', col === 1 && 'sm:pt-10')}>
            <Skeleton className="aspect-[410/500] bg-white/10" />
            <Skeleton className="aspect-[410/500] bg-white/10" />
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return <ContentError what="team members" tone="dark" onRetry={() => void refetch()} />
  }

  const columns = [team.filter((_, i) => i % 2 === 0), team.filter((_, i) => i % 2 === 1)]

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {columns.map((members, col) => (
        <ul key={col} className={cn('space-y-4', col === 1 && 'sm:pt-10')}>
          {members.map((member, i) => (
            <li key={member.id}>
              <Reveal variant="fade-up" delay={(col + i) * 120}>
                <TeamCard member={member} />
              </Reveal>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}

export function TeamSection() {
  return (
    <section aria-label="Our team" className="relative overflow-hidden bg-ink section-y">
      <img
        src={teamBg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute bottom-0 left-0 w-[600px] max-w-none opacity-25 xl:w-[937px]"
      />
      <div className="relative container-site grid gap-12 lg:grid-cols-2 lg:gap-[30px]">
        <div>
          <SectionHeading
            tone="dark"
            badge="Meet Our Experts"
            title={[
              { text: 'Meet The Team Behind ' },
              { text: 'Your Global Education Journey', highlight: true },
            ]}
            description="Our experienced education consultants are dedicated to helping students make confident decisions and achieve their international study goals."
          />
          <Reveal delay={200} className="mt-8">
            <PillLink to={paths.team}>Meet Our Full Team</PillLink>
          </Reveal>
        </div>

        <TeamGrid />
      </div>
    </section>
  )
}
