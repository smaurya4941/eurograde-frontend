import { useCallback, useState } from 'react'

/** Single-open accordion state. `null` means every item is collapsed. */
export function useAccordion(defaultOpen: number | null = 0) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen)
  const toggle = useCallback(
    (index: number) => setOpenIndex((current) => (current === index ? null : index)),
    [],
  )
  return { openIndex, toggle }
}
