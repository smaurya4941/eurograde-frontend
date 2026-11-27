import mission1 from '@/assets/images/legacy/mission-1.webp'
import mission2 from '@/assets/images/legacy/mission-2.webp'
import mission3 from '@/assets/images/legacy/mission-3.webp'
import mission4 from '@/assets/images/legacy/mission-4.webp'
import { Reveal } from '@/components/marketing'
import { cn } from '@/lib/cn'

interface Value {
  title: string
  text: string
  image: string
}

const left: Value[] = [
  {
    title: 'Quality Education:',
    text: 'We believe every student deserves the best education. Thus, we’re focused on connecting students with top-ranked institutions (in countries like Italy and Germany) known for academic excellence.',
    image: mission1,
  },
  {
    title: 'Affordability:',
    text: 'We believe education abroad shouldn’t be a luxury, and everyone dreaming to make it big should have access to it. Therefore, we strive to make global education financially accessible through affordable pathways, like public universities.',
    image: mission2,
  },
]

const right: Value[] = [
  {
    title: 'Easy Access:',
    text: 'To handle all the admission do’s and don’ts, we help students get into their dream university. From guidance to admission, we simplify the entire process, ensuring a smooth and hassle-free experience.',
    image: mission3,
  },
  {
    title: 'Student-Centric Guidance:',
    text: 'Your dreams are our priority. This is why we provide personalized support to help you achieve your study abroad goals. You’ve a doubt or a question, we are there to resolve that for you, making sure you know what you’re getting into.',
    image: mission4,
  },
]

function Item({ value, side }: { value: Value; side: 'left' | 'right' }) {
  const isLeft = side === 'left'
  return (
    <Reveal>
      <article className={cn('mb-10 text-left lg:mb-24', isLeft && 'lg:text-right')}>
        <h3
          className={cn(
            'relative mb-2.5 text-[22px] font-semibold text-legacy-text',
            "lg:after:absolute lg:after:top-4 lg:after:h-px lg:after:w-[100px] lg:after:bg-[#d9d9d9] lg:after:content-['']",
            isLeft ? 'lg:after:-right-[22%]' : 'lg:after:-left-[21%]',
          )}
        >
          {value.title}
        </h3>
        <p className={cn('mb-5 max-w-[330px] text-[15px]', isLeft && 'lg:ml-auto')}>{value.text}</p>
        <img
          src={value.image}
          alt=""
          loading="lazy"
          className={cn('h-auto max-w-full', isLeft && 'lg:ml-auto')}
        />
      </article>
    </Reveal>
  )
}

/** "EuroRank’s Mission and Values" two-sided timeline (stacks on mobile). */
export function LegacyMission() {
  return (
    <section aria-label="Mission and values" className="py-12 md:py-20">
      <div className="legacy-container">
        <h2 className="text-center legacy-h2 md:text-[44px]">EuroRank’s Mission and Values</h2>
        <div className="relative grid gap-x-16 py-10 lg:grid-cols-2 lg:py-16">
          <div
            aria-hidden="true"
            className="absolute top-16 bottom-16 left-1/2 hidden w-px bg-[#d9d9d9] lg:block"
          />
          <div className="lg:mt-[90px] lg:pr-6">
            {left.map((v) => (
              <Item key={v.title} value={v} side="left" />
            ))}
          </div>
          <div className="lg:mt-10 lg:pl-6">
            {right.map((v) => (
              <Item key={v.title} value={v} side="right" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
