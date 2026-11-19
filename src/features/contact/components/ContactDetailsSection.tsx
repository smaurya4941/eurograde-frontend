import { Mail, Phone, type LucideIcon } from 'lucide-react'
import globe from '@/assets/images/about/contact-bg-glob.webp'
import contactImg from '@/assets/images/contact/contact-img.webp'
import { paths } from '@/app/router/paths'
import { SectionHeading } from '@/components/marketing'
import { contact } from '@/config/site'
import { ContactForm } from './ContactForm'

/** Fragment of `paths.eligibility`, so the header's "Free Eligibility Check" lands on the form. */
const formAnchor = paths.eligibility.split('#')[1]

interface QuickContact {
  icon: LucideIcon
  /** Small line above the value. */
  label: string
  value: string
  href: string
}

const quickContacts: QuickContact[] = [
  { icon: Phone, label: 'Call Us on', value: contact.phone, href: contact.phoneHref },
  { icon: Mail, label: contact.email, value: 'Send a mail', href: contact.emailHref },
]

function QuickContactLink({ icon: Icon, label, value, href }: QuickContact) {
  return (
    <a href={href} className="group flex items-center gap-[15px] text-white">
      <span className="flex size-[45px] shrink-0 items-center justify-center rounded-full bg-brand-600 transition-colors duration-300 group-hover:bg-white group-hover:text-brand-600">
        <Icon aria-hidden="true" className="size-[18px]" />
      </span>
      <span className="min-w-0">
        <span className="block text-[15px] leading-snug break-words">{label}</span>
        <span className="mt-0.5 block text-lg leading-snug font-bold xl:text-[22px]">{value}</span>
      </span>
    </a>
  )
}

/** "Start Your Visa Application" intro with photo + quick contacts, beside the enquiry form. */
export function ContactDetailsSection() {
  return (
    <section aria-label="Contact us" className="relative overflow-hidden bg-surface section-y">
      <img
        src={globe}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute bottom-0 left-0 hidden w-[49%] max-w-[900px] lg:block"
      />

      <div className="relative container-site grid gap-10 lg:grid-cols-2 lg:gap-[35px]">
        {/* Column stretches to the form's height; the photo fills what the heading leaves. */}
        <div className="flex flex-col">
          <SectionHeading
            badge="Contact Us"
            title={[{ text: 'Let’s Connect And ' }, { text: 'Work Together', highlight: true }]}
            titleClassName="max-w-[620px]"
          />

          <div className="img-shine relative mt-10 min-h-[320px] flex-1 overflow-hidden rounded-2xl">
            <img
              src={contactImg}
              alt="A study abroad counselor reviewing options with a student"
              width={722}
              height={546}
              loading="lazy"
              className="size-full rounded-2xl object-cover lg:absolute lg:inset-0"
            />
            <ul className="absolute right-5 bottom-5 left-5 flex flex-col gap-5 rounded-xl p-[15px] md:right-auto md:w-4/5">
              {quickContacts.map((item) => (
                <li key={item.href}>
                  <QuickContactLink {...item} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ContactForm
          sourcePage="contact"
          title={[{ text: 'Send a ' }, { text: 'Message', highlight: true }]}
          description="Send us a message anytime and our team will get back to you as quickly as possible with the study abroad guidance you need."
          className="h-full scroll-mt-32"
          id={formAnchor}
        />
      </div>
    </section>
  )
}
