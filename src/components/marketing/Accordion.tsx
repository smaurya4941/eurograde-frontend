import { useId, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface AccordionItemProps {
  open: boolean
  onToggle: () => void
  /** Renders the clickable header; receives the open state for styling. */
  header: (open: boolean) => ReactNode
  children: ReactNode
  className?: string
  buttonClassName?: string
  panelClassName?: string
}

/**
 * Accessible disclosure item (button + region) with a smooth height animation
 * using the CSS grid `0fr → 1fr` technique, so no measuring is needed.
 */
export function AccordionItem({
  open,
  onToggle,
  header,
  children,
  className,
  buttonClassName,
  panelClassName,
}: AccordionItemProps) {
  const id = useId()
  const buttonId = `${id}-button`
  const panelId = `${id}-panel`

  return (
    <div className={className}>
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className={cn(
            'flex w-full items-center justify-between gap-4 text-left',
            buttonClassName,
          )}
        >
          {header(open)}
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-500 ease-out',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden" inert={!open}>
          <div className={panelClassName}>{children}</div>
        </div>
      </div>
    </div>
  )
}
