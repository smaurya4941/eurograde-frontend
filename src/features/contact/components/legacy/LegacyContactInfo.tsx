import callImg from '@/assets/images/legacy/call.webp'
import locationImg from '@/assets/images/legacy/location.webp'
import timeImg from '@/assets/images/legacy/time.webp'
import { useContact } from '@/features/site-settings'

/** Three info cards under the form: address, phones, opening hours. */
export function LegacyContactInfo() {
  const contact = useContact()

  const cards = [
    {
      img: locationImg,
      label: 'Our address',
      body: <span>{contact.address}</span>,
    },
    {
      img: callImg,
      label: 'Phone numbers',
      body: (
        <>
          <a href={contact.phoneHref} className="hover:text-legacy">
            {contact.phone}
          </a>
          {contact.phoneAlt && (
            <>
              <br />
              <a href={contact.phoneAltHref} className="hover:text-legacy">
                {contact.phoneAlt}
              </a>
            </>
          )}
        </>
      ),
    },
    {
      img: timeImg,
      label: 'Opening hours',
      body: (
        <>
          {contact.hours}
          {contact.hoursWeekend && (
            <>
              <br />
              {contact.hoursWeekend}
            </>
          )}
        </>
      ),
    },
  ]

  return (
    <ul className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => (
        <li
          key={c.label}
          className="flex flex-col items-center justify-center gap-6 bg-legacy-soft p-5 text-center"
        >
          <img
            src={c.img}
            alt=""
            width={96}
            height={96}
            loading="lazy"
            className="h-20 w-auto shrink-0"
          />
          <div>
            <span className="sr-only">{c.label}: </span>
            <p className="text-lg leading-[1.8] font-medium text-legacy-text">{c.body}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
