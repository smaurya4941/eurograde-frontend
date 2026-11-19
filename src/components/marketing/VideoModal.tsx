import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface VideoModalProps {
  /** YouTube video id, e.g. "9jo51nJrO0k". */
  youtubeId: string
  title: string
  open: boolean
  onClose: () => void
}

/**
 * Lightbox for a YouTube video, built on the native <dialog> element
 * (focus trapping, Escape to close and inert background come for free).
 * The iframe is only mounted while open, so nothing loads until the user asks.
 */
export function VideoModal({ youtubeId, title, open, onClose }: VideoModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      aria-label={title}
      onClose={onClose}
      onClick={(e) => {
        // Clicking the backdrop (the dialog element itself) closes it.
        if (e.target === e.currentTarget) onClose()
      }}
      className="m-auto w-[min(92vw,1100px)] overflow-visible bg-transparent p-0 backdrop:bg-ink/85 backdrop:backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close video"
        className="absolute -top-12 right-0 flex size-10 items-center justify-center rounded-full bg-white text-ink transition-colors hover:bg-brand-600 hover:text-white"
      >
        <X aria-hidden="true" className="size-5" />
      </button>
      {open && (
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="size-full"
          />
        </div>
      )}
    </dialog>
  )
}
