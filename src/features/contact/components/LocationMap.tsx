import { useContact } from '@/features/site-settings'

/** Full-width office map shown under the contact section (keyless Google Maps embed). */
export function LocationMap() {
  const contact = useContact()

  return (
    <section aria-label="Office location" className="bg-surface">
      <iframe
        src={contact.mapEmbedUrl}
        title={`Map showing our office at ${contact.address}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-[350px] w-full border-0 md:h-[450px] lg:h-[550px]"
      />
    </section>
  )
}
