import { Counter, Reveal } from '@/components/marketing'
import { stats } from '../data/content'

/** Full-width blue band of headline numbers. */
export function StatsStripSection() {
  return (
    <section aria-label="EuroGrades in numbers" className="bg-brand-600 py-12 xl:py-[60px]">
      <dl className="container-site grid gap-8 sm:grid-cols-3 sm:gap-0">
        {stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 120}
            className="flex flex-col-reverse justify-end sm:border-l sm:border-white/20 sm:pl-[50px] sm:first:border-l-0 sm:first:pl-0"
          >
            <dt className="mt-3 text-[15px] font-bold text-white">{stat.label}</dt>
            <dd>
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                className="text-[40px] leading-none font-bold text-white xl:text-[46px]"
                suffixClassName="ml-0 text-white"
              />
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}
