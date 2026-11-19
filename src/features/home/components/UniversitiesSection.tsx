import serviceBg from '@/assets/images/backgrounds/service-bg.webp'
import { ContentError, Reveal, SectionHeading, Skeleton } from '@/components/marketing'
import { useUniversities } from '@/features/universities'

const gridClass =
  'grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-slate-200 min-[480px]:grid-cols-2 lg:grid-cols-4'

function UniversityGrid() {
  const { data, isPending, isError, refetch } = useUniversities({ partners: true, limit: 8 })

  if (isPending) {
    return (
      <div aria-busy="true" aria-label="Loading universities" className={`mt-12 ${gridClass}`}>
        {Array.from({ length: 8 }, (_, i) => (
          <Skeleton key={i} className="h-[180px] rounded-none bg-white" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <ContentError
        what="universities"
        tone="dark"
        className="mt-12"
        onRetry={() => void refetch()}
      />
    )
  }

  return (
    <Reveal className="mt-12">
      <ul className={gridClass}>
        {data.map((u) => (
          <li
            key={u.id}
            className="group flex flex-col items-center justify-center bg-white px-4 py-10 text-center"
          >
            <img
              src={u.logo_url ?? undefined}
              alt={`${u.name} logo`}
              loading="lazy"
              className="h-11 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
            />
            <h3 className="mt-5 text-lg font-semibold xl:text-[21px]">{u.name}</h3>
            <p className="mt-1 text-[15px]">{u.country.name}</p>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

export function UniversitiesSection() {
  return (
    <section
      aria-label="Partner universities"
      className="relative overflow-hidden bg-ink bg-center bg-no-repeat section-y"
      style={{ backgroundImage: `url(${serviceBg})` }}
    >
      <div className="container-site">
        <SectionHeading
          align="center"
          tone="dark"
          badge="Popular Universities"
          title={[
            { text: 'Top Public Universities In ' },
            { text: 'Germany & Italy', highlight: true },
          ]}
          titleClassName="max-w-[880px]"
          description="Explore top universities known for their excellence in various fields and take the first step toward a world-class education."
        />
        <UniversityGrid />
      </div>
    </section>
  )
}
