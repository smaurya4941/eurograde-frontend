import { Counter } from '@/components/marketing'
import { useStat } from '@/features/site-settings'

/** Crimson strip with three counters and the old design's asymmetric rounded corners. */
export function LegacyAboutStats() {
  const stats = [
    { stat: useStat('counselors'), label: 'Counselors' },
    { stat: useStat('students'), label: 'Students studying abroad' },
    { stat: useStat('universities'), label: 'Global universities' },
  ]

  return (
    <section aria-label="EuroGrades in numbers" className="py-8 md:py-12">
      <div className="legacy-container">
        <dl className="mx-auto flex max-w-[1100px] flex-col rounded-tr-[40px] rounded-bl-[40px] bg-legacy px-6 py-4 text-white md:flex-row md:px-12 md:py-8">
          {stats.map(({ stat, label }) => (
            <div
              key={label}
              className="flex flex-1 flex-col border-b border-white/20 py-4 text-center last:border-b-0 md:border-r md:border-b-0 md:py-0 md:last:border-r-0"
            >
              <dd className="order-first text-[40px] leading-tight font-semibold md:text-5xl">
                {stat && (
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix ?? undefined}
                    suffixClassName="ml-0 text-white"
                  />
                )}
              </dd>
              <dt className="text-base">{label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
