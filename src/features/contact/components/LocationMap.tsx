import { contact } from '@/config/site'

// Keyless Google Maps embed; centred on the office address from the site config.
const mapSrc = `https://maps.google.com/maps?${new URLSearchParams({
  q: contact.address,
  t: 'm',
  z: '14',
  output: 'embed',
  iwloc: 'near',
})}`

/** Full-width office map shown under the contact section. */
export function LocationMap() {
  return (
    <section aria-label="Office location" className="bg-surface">
      <iframe
        src={mapSrc}
        title={`Map showing our office at ${contact.address}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-[350px] w-full border-0 md:h-[450px] lg:h-[550px]"
      />
    </section>
  )
}
