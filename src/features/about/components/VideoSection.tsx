import { Play } from 'lucide-react'
import { useState } from 'react'
import videoBg from '@/assets/images/about/video-bg.webp'
import { Reveal, VideoModal } from '@/components/marketing'
import { ABOUT_VIDEO } from '../data/content'

const RING_TEXT = 'Watch Video • Watch Video • '

/** Full-width photo with a spinning "Watch Video" badge that opens the video lightbox. */
export function VideoSection() {
  const [open, setOpen] = useState(false)

  return (
    <section
      aria-label="Watch our story"
      className="relative flex h-[420px] items-center justify-center overflow-hidden bg-ink bg-cover bg-center md:h-[600px] xl:h-[800px]"
      style={{ backgroundImage: `url(${videoBg})` }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-ink/45" />

      <Reveal variant="zoom-in" className="relative">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-label={`Play video: ${ABOUT_VIDEO.title}`}
          className="group relative flex size-[150px] items-center justify-center rounded-full bg-brand-600 xl:size-[180px]"
        >
          {/* Rotating circular label */}
          <svg
            viewBox="0 0 200 200"
            aria-hidden="true"
            className="absolute inset-0 size-full animate-[spin_12s_linear_infinite] motion-reduce:animate-none"
          >
            <defs>
              <path id="video-ring" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
            </defs>
            <text className="fill-white text-[21px] font-bold tracking-[3px]">
              <textPath href="#video-ring">{RING_TEXT}</textPath>
            </text>
          </svg>
          <span className="relative flex size-[60px] items-center justify-center rounded-full border-[6px] border-brand-600 bg-white text-brand-600 ring-1 ring-white/70 transition-transform duration-500 group-hover:scale-110 xl:size-[74px]">
            <Play aria-hidden="true" className="ml-1 size-6 fill-current" />
          </span>
        </button>
      </Reveal>

      <VideoModal
        youtubeId={ABOUT_VIDEO.youtubeId}
        title={ABOUT_VIDEO.title}
        open={open}
        onClose={() => setOpen(false)}
      />
    </section>
  )
}
