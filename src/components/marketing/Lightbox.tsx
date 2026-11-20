import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef, type KeyboardEvent } from 'react'
import { cn } from '@/lib/cn'

export interface LightboxImage {
  url: string
  alt: string
}

interface LightboxProps {
  images: LightboxImage[]
  /** Index of the image shown, or null when closed. */
  index: number | null
  onIndexChange: (index: number) => void
  onClose: () => void
}

const controlClass =
  'flex size-11 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white'

/**
 * Full-screen photo viewer ("1/2" counter, previous/next, caption), built on the native <dialog>
 * element for focus trapping, Escape to close and an inert background. Arrow keys switch photos.
 */
export function Lightbox({ images, index, onIndexChange, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const open = index !== null
  const count = images.length
  const image = index === null ? undefined : images[index]

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const go = (step: number) => {
    if (index === null || count < 2) return
    onIndexChange((index + step + count) % count)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Photo viewer"
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        // Clicking the dark area (the dialog element itself) closes it.
        if (e.target === e.currentTarget) onClose()
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-black/85 p-0 text-white backdrop:bg-transparent"
    >
      {image && index !== null && (
        <div
          className="flex size-full flex-col items-center justify-center px-4 py-16 sm:px-20"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <p aria-live="polite" className="absolute top-4 left-5 text-sm font-semibold">
            {index + 1}/{count}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close photo viewer"
            className={cn(controlClass, 'absolute top-2 right-3')}
          >
            <X aria-hidden="true" className="size-6" />
          </button>

          <figure className="flex max-h-full flex-col items-center">
            <img
              key={image.url}
              src={image.url}
              alt={image.alt}
              className="animate-lightbox-in max-h-[calc(100dvh-10rem)] max-w-full rounded-2xl object-contain"
            />
            <figcaption className="mt-4 text-center text-sm font-semibold">{image.alt}</figcaption>
          </figure>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous photo"
                className={cn(controlClass, 'absolute top-1/2 left-2 -translate-y-1/2 sm:left-5')}
              >
                <ChevronLeft aria-hidden="true" className="size-7" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next photo"
                className={cn(controlClass, 'absolute top-1/2 right-2 -translate-y-1/2 sm:right-5')}
              >
                <ChevronRight aria-hidden="true" className="size-7" />
              </button>
            </>
          )}
        </div>
      )}
    </dialog>
  )
}
