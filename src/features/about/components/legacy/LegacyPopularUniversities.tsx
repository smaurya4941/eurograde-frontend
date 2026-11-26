import { LegacySectionTitle } from '@/components/legacy'
import { ContentError } from '@/components/marketing'
import { useUniversities } from '@/features/universities'

/** "Popular Universities" logo wall between two rules; partner universities come from the API. */
export function LegacyPopularUniversities() {
  const { data, isError, refetch } = useUniversities({ partners: true })

  return (
    <section aria-label="Popular universities" className="py-12 md:py-20">
      <div className="legacy-container">
        <LegacySectionTitle
          title="Popular Universities"
          subtitle="Explore top universities known for their excellence in various fields and take the first step toward a world-class education."
          className="max-w-2xl"
        />
        {isError && <ContentError what="universities" onRetry={() => void refetch()} />}
        <div className="border-y border-black/10 py-4">
          <ul className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {data?.map((u) => (
              <li key={u.id} className="w-[48%] sm:w-[32%] md:w-auto">
                {u.logo_url ? (
                  <img
                    src={u.logo_url}
                    alt={u.name}
                    loading="lazy"
                    className="mx-auto h-auto max-h-24 w-full object-contain md:h-24 md:w-auto"
                  />
                ) : (
                  <span className="block px-4 py-6 text-center font-medium">{u.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
