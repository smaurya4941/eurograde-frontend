import { useState } from 'react'
import { A11y, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { paths } from '@/app/router/paths'
import serviceBg from '@/assets/images/backgrounds/service-bg.webp'
import {
  ArrowLink,
  ContentError,
  InlineCta,
  Reveal,
  SectionHeading,
  Skeleton,
} from '@/components/marketing'
import { serviceHref, useServices, type Service } from '@/features/services'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ctaAvatars } from '../data/people'

function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl bg-white p-[22px] transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgb(37_99_235/0.6)]">
      <div className="flex items-center gap-3 border-b border-line pb-5">
        <span className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-brand-600 transition-colors duration-500 group-hover:bg-ink">
          <img
            src={service.icon_url ?? undefined}
            alt=""
            aria-hidden="true"
            className="size-7 brightness-0 invert"
          />
        </span>
        <h3 className="text-lg font-bold xl:text-[21px]">{service.title}</h3>
      </div>
      <p className="mt-5 line-clamp-2">{service.excerpt}</p>
      <ArrowLink to={serviceHref(service.slug)} className="mt-5 self-start">
        Read More<span className="sr-only">: {service.title}</span>
      </ArrowLink>
      <div className="img-shine mt-6 overflow-hidden rounded-xl">
        <img
          src={service.image_url ?? undefined}
          alt=""
          loading="lazy"
          className="aspect-[398/317] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </article>
  )
}

function ServicesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = usePrefersReducedMotion()
  const { data: services, isPending, isError, refetch } = useServices()

  if (isPending) {
    return (
      <div
        aria-busy="true"
        aria-label="Loading services"
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-[520px] bg-white/10" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <ContentError what="services" tone="dark" className="mt-12" onRetry={() => void refetch()} />
    )
  }

  return (
    <Reveal className="mt-12">
      <Swiper
        modules={[A11y, Autoplay]}
        loop={services.length > 3}
        speed={800}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        autoplay={
          reducedMotion
            ? false
            : { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }
        }
        onRealIndexChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="overflow-visible! lg:overflow-hidden!"
      >
        {services.map((service) => (
          <SwiperSlide key={service.id} className="h-auto!">
            <ServiceCard service={service} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Progress bar: fills as the carousel advances through the services. */}
      <div className="swiper-progress mt-10" aria-hidden="true">
        <span
          className="swiper-pagination-progressbar-fill transition-transform duration-700"
          style={{ transform: `scaleX(${(activeIndex + 1) / Math.max(services.length, 1)})` }}
        />
      </div>
    </Reveal>
  )
}

export function ServicesSection() {
  return (
    <section
      aria-label="Our services"
      className="relative overflow-hidden bg-ink bg-center bg-no-repeat pt-16 pb-16 md:pt-20 xl:pt-[120px] xl:pb-[130px]"
      style={{ backgroundImage: `url(${serviceBg})` }}
    >
      <div className="container-site">
        <SectionHeading
          align="center"
          tone="dark"
          badge="Our Services"
          title={[
            { text: 'Your Global Education Journey, ' },
            { text: 'Guided By Experts', highlight: true },
          ]}
          titleClassName="max-w-[870px]"
          description="From admission to Germany’s and Italy’s top public universities to IELTS prep and language courses, EuroGrades supports you at every stage of your study abroad journey."
        />

        <ServicesCarousel />

        <InlineCta
          tone="dark"
          avatars={[ctaAvatars.advisor]}
          text="Ready To Start Your Study Abroad Journey?"
          linkLabel="Get Expert Guidance"
          to={paths.contact}
          className="mt-8"
        />
      </div>
    </section>
  )
}
