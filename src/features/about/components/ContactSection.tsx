import globe from '@/assets/images/about/contact-bg-glob.webp'
import { Reveal, SectionHeading } from '@/components/marketing'
import { ContactForm } from '@/features/contact'

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-label="Contact us"
      className="relative scroll-mt-28 overflow-hidden bg-surface section-y"
    >
      <img
        src={globe}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute bottom-0 left-0 hidden w-[49%] max-w-[900px] lg:block"
      />

      <div className="relative container-site grid gap-12 lg:grid-cols-2 lg:gap-[50px]">
        <SectionHeading
          badge="Contact Us Today"
          title={[
            { text: 'Professional Support', highlight: true },
            { text: ' Starts With a Conversation' },
          ]}
          titleClassName="max-w-[620px]"
          description="Connect with our experienced consultants to discuss your goals, explore available options, and receive personalized support tailored to your unique needs."
        />
        <Reveal variant="fade-left">
          <ContactForm sourcePage="about" />
        </Reveal>
      </div>
    </section>
  )
}
