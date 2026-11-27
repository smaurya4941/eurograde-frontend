import bannerImg from '@/assets/images/legacy/about-bg.webp'
import { LegacyBanner } from '@/components/legacy'
import { useTeamMembers } from '@/features/team'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function TeamPage() {
  usePageTitle('Our Team')
  const { data, isPending, isError } = useTeamMembers()
  const members = data ?? []

  return (
    <div className="legacy-page">
      <LegacyBanner title="Our Team" image={bannerImg} />
      <section className="py-12 md:py-20">
        <div className="legacy-container">
          <h2 className="text-center legacy-h2">Meet Our Counselors</h2>
          {isPending && <p className="mt-8 text-center">Loading…</p>}
          {isError && (
            <p className="mt-8 text-center">Could not load the team. Please try again.</p>
          )}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((m) => (
              <article key={m.id} className="overflow-hidden rounded-xl bg-legacy-soft">
                {m.photo_url && (
                  <img
                    src={m.photo_url}
                    alt={`${m.name}, ${m.role}`}
                    width={410}
                    height={500}
                    loading="lazy"
                    className="aspect-[410/500] w-full object-cover"
                  />
                )}
                <div className="p-5">
                  <h3 className="font-work text-xl font-semibold text-legacy-navy">{m.name}</h3>
                  <p className="mt-1 text-legacy">{m.role}</p>
                  {m.bio && <p className="mt-2 text-legacy-muted">{m.bio}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
