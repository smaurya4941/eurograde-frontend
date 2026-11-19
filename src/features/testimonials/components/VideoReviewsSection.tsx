import { Play } from 'lucide-react'
import { useState } from 'react'
import cloudBottom from '@/assets/images/testimonials/cloud-btm.webp'
import { PillLink, Reveal, SectionHeading, VideoModal } from '@/components/marketing'
import { STORY_VIDEO, videoReviewsCopy as copy } from '../data/content'
import { ReviewSlider } from './ReviewSlider'

/** Dark band: centred heading, "View All Reviews" + "Watch Our Story" video, review slider. */
export function VideoReviewsSection() {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <section
      aria-label="What our students say"
      className="bg-ink bg-[length:100%_auto] bg-bottom bg-no-repeat section-y xl:py-[100px]"
      style={{ backgroundImage: `url(${cloudBottom})` }}
    >
      <div className="container-site">
        <SectionHeading
          align="center"
          tone="dark"
          badge={copy.badge}
          title={copy.title}
          description={copy.description}
        />

        <Reveal
          delay={200}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-5"
        >
          <PillLink to={copy.cta.to}>{copy.cta.label}</PillLink>
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            aria-haspopup="dialog"
            className="group inline-flex items-center gap-3 text-lg font-semibold text-white transition-colors duration-300 hover:text-brand-500"
          >
            <span className="relative flex size-[22px] items-center justify-center">
              <span
                aria-hidden="true"
                className="absolute inset-0 animate-ping rounded-full bg-white/40 motion-reduce:animate-none"
              />
              <span className="relative flex size-full items-center justify-center rounded-full bg-white text-ink transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
                <Play aria-hidden="true" className="ml-px size-2.5 fill-current" />
              </span>
            </span>
            Watch Our Story
          </button>
        </Reveal>

        <ReviewSlider
          categories={copy.categories}
          quote="top"
          tone="dark"
          label="student reviews"
          className="mt-10 xl:mt-[70px]"
        />
      </div>

      <VideoModal
        youtubeId={STORY_VIDEO.youtubeId}
        title={STORY_VIDEO.title}
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
      />
    </section>
  )
}
