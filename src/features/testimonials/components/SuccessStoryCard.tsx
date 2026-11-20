import { cn } from '@/lib/cn'
import type { SuccessStory } from '../types'

/** Portrait with a navy name pill overlapping its lower edge; the photo zooms on hover. */
export function SuccessStoryCard({ story }: { story: SuccessStory }) {
  return (
    <figure className="group relative">
      <div className="overflow-hidden rounded-[10px] bg-slate-200">
        <img
          src={story.photo_url ?? undefined}
          alt={`${story.name}, studying in ${story.destination}`}
          width={277}
          height={301}
          loading="lazy"
          decoding="async"
          className="aspect-[277/301] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>
      <figcaption className="absolute inset-x-[5%] bottom-2.5 rounded-[28px] bg-ink px-3 py-2.5 text-center text-white shadow-[0_12px_30px_-12px_color-mix(in_srgb,var(--color-ink)_60%,transparent)] xl:rounded-full">
        <span className="block text-sm leading-[1.3] font-bold transition-colors duration-300 group-hover:text-brand-500 sm:text-[15px] xl:my-[5px] xl:text-lg">
          {story.name}
        </span>
        <span className="block text-[13px] leading-snug sm:text-sm xl:text-[15px]">
          {story.destination}
        </span>
      </figcaption>
    </figure>
  )
}

/** Soft blue-to-white tile that staggers the outer mosaic columns (the reference's "blank" image). */
export function StoryTile({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'aspect-[277/301] w-full rounded-[10px] bg-linear-to-b from-[#e2e9fb] to-white/70',
        className,
      )}
    />
  )
}
