import { A11y, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Link } from 'react-router'
import { paths } from '@/app/router/paths'
import { Reveal, SectionHeading } from '@/components/marketing'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { destinations } from '../data/destinations'

export function DestinationsSection() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section
      aria-label="Study destinations"
      className="bg-white pt-20 pb-16 xl:pt-[150px] xl:pb-[80px]"
    >
      <div className="container-site">
        <SectionHeading
          align="center"
          badge="Study Destinations"
          title={[
            { text: 'Explore Top Student Cities In ' },
            { text: 'Germany & Italy', highlight: true },
          ]}
          titleClassName="max-w-[800px]"
          description="Explore, learn, and thrive in the top student cities of Germany and Italy, where world-class education meets opportunity."
        />

        <Reveal className="mt-12">
          <Swiper
            modules={[A11y, Autoplay]}
            loop
            speed={900}
            slidesPerView={2}
            breakpoints={{
              480: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            autoplay={
              reducedMotion
                ? false
                : { delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }
            }
          >
            {destinations.map((d) => (
              <SwiperSlide key={d.name}>
                <Link
                  to={paths.countries}
                  className="group flex flex-col items-center border-r border-line py-2 text-center"
                >
                  <img
                    src={d.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="size-[72px] rounded-full object-cover transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:scale-105"
                  />
                  <span className="mt-4 font-semibold text-ink transition-colors group-hover:text-brand-600">
                    {d.name}
                  </span>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>
      </div>
    </section>
  )
}
