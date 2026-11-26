import { CircleCheck } from 'lucide-react'
import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import apostilleImg from '@/assets/images/legacy/popular/aposlite.webp'
import generalImg from '@/assets/images/legacy/popular/attest-certificate.webp'
import { apostilleCountryGroups, authenticationStates } from '../data/meaReference'

type TabId =
  'mea' | 'apostille' | 'general' | 'uae' | 'hrd' | 'hd' | 'embassy' | 'translation' | 'visa'

const tabs: { id: TabId; label: string }[] = [
  { id: 'mea', label: 'MEA Attestation' },
  { id: 'apostille', label: 'MEA Attestation - Apostille' },
  { id: 'general', label: 'MEA Attestation - General' },
  { id: 'uae', label: 'UAE Attestation' },
  { id: 'hrd', label: 'State HRD Authentication' },
  { id: 'hd', label: 'State HD Authentication' },
  { id: 'embassy', label: 'Embassy Legalisation' },
  { id: 'translation', label: 'Foreign Language Translation' },
  { id: 'visa', label: 'VISA Assistance' },
]

const bodyText = 'pb-5 text-[17px] leading-7 tracking-[0.34px] text-legacy-muted'

function PanelHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="pb-[22px] font-work text-2xl font-bold tracking-[0.1px] text-legacy-text uppercase">
      {children}
    </h2>
  )
}

function Lead({ children }: { children: ReactNode }) {
  return <p className={`${bodyText} font-bold text-legacy-text`}>{children}</p>
}

function Point({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <p className={bodyText}>
      {title && <strong className="font-bold text-legacy-text">{title} </strong>}
      {children}
    </p>
  )
}

function ApostilleBody() {
  return (
    <>
      <p className={bodyText}>
        Apostille is done for personal documents like Birth Certificate/Death Certificate/Marriage
        Certificate, Affidavits, Power of Attorney, etc. and educational certificate like degree,
        diploma, matriculation and secondary level certificates etc.
      </p>
      <p className={bodyText}>
        Apostille is acceptable in 105 member-countries of the Hague Convention. So that means! Once
        you get a document apostilled, it will be recognised by the below 105 countries. Thus,
        greatly simplifying the process of attestation by making it needless to get the documents
        attested in each or for each of the countries separately.
      </p>
      <p className={`${bodyText} font-bold text-legacy-text`}>
        The Hague Conference has currently 82 Members: 81 States and 1 Regional Economic Integration
        Organisation. For the dates of membership, please consult the status table of the Statute of
        the Hague Conference.
      </p>
    </>
  )
}

function MeaPanel({ onSelect }: { onSelect: (id: TabId) => void }) {
  return (
    <>
      <PanelHeading>Why MEA Attestation?</PanelHeading>
      <Lead>
        The Ministry of External Affairs All original documents/True copies requiring attestation or
        Apostille should be first authenticated by the designated authorities of the State/Union
        Territory from where the document has been issued.
      </Lead>
      <Point title="Certificate Authentication:">
        In case of personal documents like Birth Certificate/Marriage Certificate etc, Home/General
        Administration Department of the concerned State Government/Union Territory are the
        designated authorities.
      </Point>
      <Point title="State HRD Authentication:">
        In case of educational documents, the documents should first be authenticated by the
        Education Department of the concerned State Government/Union Territory.
      </Point>
      <Point>
        Commercial Documents are to be pre-authenticated by the respective Chambers of Commerce. If
        you have not got them authenticated, need not worry. Each state authentication has different
        requirements &amp; different government bodies that can authenticate your documents. Give us
        a call or mail us or just fill a form on our website and our representative will be happy to
        help you.
      </Point>

      <div className="mt-2 bg-legacy-soft px-5 pt-10 pb-12 md:px-10">
        <h3 className="pb-6 font-work text-2xl leading-snug text-legacy-text md:text-[32px]">
          After State authentication, there are two types of <b>MEA Attestation</b>
        </h3>
        <div className="grid grid-cols-1 border border-slate-200 bg-white sm:grid-cols-2">
          {(
            [
              { id: 'apostille', label: 'MEA Apostille', img: apostilleImg, alt: 'Apostille' },
              {
                id: 'general',
                label: 'MEA General',
                img: generalImg,
                alt: 'Attestation certificate',
              },
            ] as const
          ).map((t) => (
            <div
              key={t.id}
              className="border-slate-200 p-[10px] not-first:border-t sm:not-first:border-t-0 sm:not-first:border-l"
            >
              <button
                type="button"
                onClick={() => onSelect(t.id)}
                className="mb-3 ml-6 text-base text-blue-600 hover:underline"
              >
                {t.label}
              </button>
              <img
                src={t.img}
                alt={t.alt}
                width={220}
                height={200}
                loading="lazy"
                className="h-[200px] w-[220px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function ApostillePanel() {
  return (
    <>
      <PanelHeading>MEA Apostille</PanelHeading>
      <ApostilleBody />
      <img
        src={apostilleImg}
        alt="Apostille certificate"
        width={320}
        height={300}
        loading="lazy"
        className="mb-8 h-auto max-w-full"
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {apostilleCountryGroups.map((group) => (
          <div
            key={group.letter}
            className="min-h-[250px] rounded border border-slate-200 bg-legacy-soft p-[19px] shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)]"
          >
            <span
              aria-hidden="true"
              className="float-right font-serif text-[2em] leading-none text-slate-400"
            >
              {group.letter}
            </span>
            <ul>
              {group.countries.map((country) => (
                <li key={country} className="text-blue-600">
                  {country}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}

function StatesPanel({ title, intro }: { title: string; intro: string }) {
  return (
    <>
      <PanelHeading>{title}</PanelHeading>
      <p className={bodyText}>{intro}</p>
      <p className={bodyText}>
        According to Ministry of External Affairs, the details of the Regional Authentication
        Centres (RACs) in the States/Union Territories from where the documents should first be
        authenticated are given below.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse border border-slate-300 text-left text-[15px]">
          <caption className="border border-slate-300 bg-legacy-soft p-3 text-center font-bold text-legacy-text">
            Regional Authentication Centres (RACs) for States/Union Territories
          </caption>
          <thead className="sr-only">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">State / Union Territory</th>
              <th scope="col">Authority no.</th>
              <th scope="col">Authority</th>
            </tr>
          </thead>
          <tbody>
            {authenticationStates.map((state, si) =>
              state.authorities.map((authority, ai) => (
                <tr key={`${state.name}-${ai}`} className={ai % 2 === 1 ? 'bg-legacy-soft' : ''}>
                  {ai === 0 && (
                    <>
                      <td
                        rowSpan={state.authorities.length}
                        className="w-12 border border-slate-300 bg-white p-3 align-top"
                      >
                        {si + 1}
                      </td>
                      <th
                        scope="row"
                        rowSpan={state.authorities.length}
                        className="w-48 border border-slate-300 bg-white p-3 align-top font-bold"
                      >
                        {state.name}
                      </th>
                    </>
                  )}
                  <td className="w-12 border border-slate-300 p-3 align-top">{ai + 1}</td>
                  <td className="border border-slate-300 p-3 align-top">{authority}</td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

const uaeEducational = [
  'Educational Document needs to be attested by Education Ministry of the concerned state followed by the Ministry of External Affairs of India before visiting the Consular Section. Once the documents are verified & attested, the individual can collect them immediately.',
  'Other Documents (Marriage Certificate, Birth Certificate, affidavit & Experience Certificate etc.) need to be attested by the Ministry of External Affairs of India before visiting the Consular Section. Once the documents are verified & attested, the individual can collect them immediately.',
]
const uaeCommercial = [
  'Commercial Document needs to be attested by the Ministry of External Affairs of India before visiting the Consular Section. Once the documents are verified & attested, the individual can collect them as per the given time.',
  "Documents can be submitted directly by the Authorized Company Employees. Authority letter on the Company Letterhead (with the name of the Employee & Seal of the Company) and the Company ID are required in this case. Please contact the UAE Embassy's Consular Section in case of any questions.",
]
const uaeUsers = ['UAE Nationals', 'Indian Nationals', 'Other Nationals']

const uaePersonal = [
  'Education Document (diplomas, degrees, school certificates, etc.)',
  'Bonafide Certificate',
  'Pre Degree Certificate',
  'National Trade Certificate',
  'Madrasa degrees and certificates',
  'Provisional Certificate',
  'Transfer Certificate',
  'Apprenticeship Certificate',
  'Internship Certificate',
  'Birth Certificate',
  'Death Certificate',
  'Marriage Certificate',
  'Competency Certificate',
  'Training Certificate',
  'Experience Certificate',
  'FIR of loss of passport',
  'Fingerprints',
  'Power of Attorney (Personal)',
  'Phytosanitary Certificate',
  'Financial Statements',
  'Drug Analysis Certificate',
  'Medical Report',
  'Nurse Registration Certificate',
  'Police Character Certificate',
  'Halal Certificate',
  'Health Certificate',
  'Legal Heirship Certificate',
  'Copy of Driving License, Passport, etc.',
]
const uaeCommercialDocs = [
  'Factorization between people, while opening a company',
  'Factorization by taking the product, when sold within the state',
  'Factorization by taking the product, when sold outside the state',
  'Power of attorney to open business within state',
  'Trademark',
  'Modification of share capital',
  'Introduction of a new partner',
  'Franchise - establishing a company',
  'Open a new branch of foreign company in state',
  'Open a new branch of foreign company outside the local state',
  'Business License (where copies are distributed to more than one country to open a branch in every state)',
  'Achievement of the projects that have been completed on the completion of each unit, within the country or outside the country',
  'Company financial budget',
  'Closure of a company',
  'Corporate financial budget of each fiscal year',
  'Tourist Licence Registration',
  'Extraction of Licenses, Appointment of Branch Manager, Opening a Branch, Management of Quotas',
  'Cert. of Membership of the Chambers of Commerce, Minutes of the Meeting of Board of Directors, Memorandum of Association of the Company, a copy of any of the pre-certified agencies listed above',
]

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mb-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[17px] leading-7 text-legacy-muted">
          <CircleCheck aria-hidden="true" className="mt-1 size-5 shrink-0 text-legacy" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function UaePanel() {
  return (
    <>
      <PanelHeading>UAE Attestation</PanelHeading>
      <h3 className="pb-3 text-xl font-bold text-legacy-text">Educational and Other Documents</h3>
      <CheckList items={uaeEducational} />
      <h3 className="pb-3 text-xl font-bold text-legacy-text">Commercial Documents</h3>
      <CheckList items={uaeCommercial} />
      <h3 className="pb-3 text-xl font-bold text-legacy-text">User Category</h3>
      <CheckList items={uaeUsers} />
      <h3 className="pb-3 text-xl font-bold text-legacy-text">Attestation of Documents</h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-[15px]">
          <thead>
            <tr className="border-b-2 border-slate-300">
              <th scope="col" className="w-2/5 p-3">
                Personal Documents
              </th>
              <th scope="col" className="w-3/5 p-3">
                Commercial Documents
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from(
              { length: Math.max(uaePersonal.length, uaeCommercialDocs.length) },
              (_, i) => (
                <tr key={i} className="border-b border-slate-200 odd:bg-black/[0.04]">
                  <td className="p-3 align-top">{uaePersonal[i] ?? ''}</td>
                  <td className="p-3 align-top">{uaeCommercialDocs[i] ?? ''}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

function renderPanel(id: TabId, select: (id: TabId) => void) {
  switch (id) {
    case 'mea':
      return <MeaPanel onSelect={select} />
    case 'apostille':
      return <ApostillePanel />
    case 'general':
      return (
        <>
          <PanelHeading>Normal Attestation</PanelHeading>
          <p className={bodyText}>
            This is done for all the countries which are not a member of Hague Convention and where
            Apostille is not accepted.
          </p>
        </>
      )
    case 'uae':
      return <UaePanel />
    case 'hrd':
      return (
        <StatesPanel
          title="State HRD Authentication"
          intro="State HRD Authentication: Each state authentication has different requirements & different government bodies that can authenticate your documents. Give us a call or mail us or just fill a form on our website and our representative will be happy to help you."
        />
      )
    case 'hd':
      return (
        <StatesPanel
          title="State Home Department Authentication"
          intro="State HD Authentication: Each state authentication has different requirements & different government bodies that can authenticate your documents."
        />
      )
    case 'embassy':
      return (
        <>
          <PanelHeading>Embassy Legalisation</PanelHeading>
          <p className={bodyText}>
            Legalising Indian documents for use in foreign countries is often a time consuming task.
            Many countries now request the apostille and additional embassy legalisation. This
            involves working with the embassies and consulates across India. Experience in
            submitting the documents correctly ensures that the process is completed efficiently
            without delay. Whether you are based in India or living abroad with Indian documents
            that need legalising we can assist you.
          </p>
          <p className={bodyText}>
            Document legalisation varies from one embassy to another which is why our attestation
            service is so popular. Each embassy or consulate has their own prescribed process of
            handling documents. Some documents do not require embassy legalisation and simply
            require the apostille certificate.
          </p>
          <PanelHeading>Dedicated embassy legalisation service</PanelHeading>
          <p className={bodyText}>
            Our embassy legalisation service saves you time researching how to prepare, certify and
            submit documents to the various embassies. Instead of guessing how to legalise your
            documents let our team of experts hand process your order with ease. Our fully inclusive
            service ensures documents are legalised as quickly as possible. Embassies may require
            that your documents are issued with an Indian apostille before they will accept the
            document.
          </p>
          <p className={bodyText}>
            Not all documents will be accepted and it is essential that documents are correctly
            presented to avoid delays. We can assist you with the apostille service if required to
            help speed up processing times. Many embassies insist that documents are processed and
            stamped by the chamber of commerce. Our all inclusive service will ensure that all
            necessary steps are taken to obtain the correct embassy legalisation. Our apostille and
            embassy legalisation service is the simple route to legalising documents for use in
            another country.
          </p>
        </>
      )
    case 'translation':
      return (
        <>
          <PanelHeading>Foreign Language Translation</PanelHeading>
          <p className={bodyText}>
            We also provide translation services. Some attestation and legalisation work requires
            translation of documents into the language of the country to which you are travelling
            (either for a job, education or any other commercial purpose).
          </p>
          <p className={bodyText}>
            We provide professional document translation services for almost all major foreign
            languages like English translation, Japanese translation, Russian translation, Arabic
            translation, Korean translation, Chinese translation, Portuguese translation, Spanish
            translations, French translation, Italian translation, German translation and Indian
            languages like Hindi, Punjabi, Urdu etc. We have certified translators to undertake any
            complex task of translations and provide the said services at all our offices.
          </p>
        </>
      )
    case 'visa':
      return (
        <>
          <PanelHeading>Visa assistance</PanelHeading>
          <p className={bodyText}>
            Travel Visas are required to gain entry to most countries around the world. For
            instance, you will need a visa to USA, Canada, England, China, Australia, Middle East,
            just to name a few of the popular destinations. There are certain countries that simply
            require an available Visa page in your current Passport to be stamped at the airport
            upon arrival, but in most cases one will need to acquire a Travel Visa before even
            departing from India. Many international travelers are often not sure of the
            documentation required to enter a foreign country. Visa is an official entry permit to
            your required destination.
          </p>
          <p className={bodyText}>
            We ensure that the documents submitted are up to date &amp; flawless. To avoid any
            future hassles or last minute issues, clients can rely on our expert guidance and avail
            Visa Assistance from us as we keep them updated with current changes in terms of
            documentation, Visa fees and any other additional documents required as declared by the
            Consulate.
          </p>
        </>
      )
  }
}

/** Vertical tab list + panel, replacing the old Bootstrap `nav-tabs` on mea-attestion.php. */
export function MeaTabs() {
  const [active, setActive] = useState<TabId>('mea')
  const tabRefs = useRef<Partial<Record<TabId, HTMLButtonElement | null>>>({})

  const select = (id: TabId) => setActive(id)

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const step =
      event.key === 'ArrowDown' || event.key === 'ArrowRight'
        ? 1
        : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
          ? -1
          : 0
    if (!step) return
    event.preventDefault()
    const next = tabs[(index + step + tabs.length) % tabs.length]
    if (!next) return
    setActive(next.id)
    tabRefs.current[next.id]?.focus()
  }

  return (
    <section className="py-12 md:py-[100px]">
      <div className="legacy-container">
        <div className="grid gap-8 md:grid-cols-12">
          <div
            role="tablist"
            aria-label="Attestation topics"
            aria-orientation="vertical"
            className="flex flex-col gap-[3px] md:col-span-4 lg:col-span-3"
          >
            {tabs.map((tab, i) => {
              const selected = tab.id === active
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[tab.id] = el
                  }}
                  type="button"
                  role="tab"
                  id={`mea-tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls="mea-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(tab.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`block cursor-pointer px-[25px] text-left text-[13px] leading-[55px] font-bold tracking-[0.3px] uppercase transition-colors ${
                    selected
                      ? 'bg-legacy text-white'
                      : 'bg-legacy-soft text-legacy-text hover:bg-black/10'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
          <div
            role="tabpanel"
            id="mea-panel"
            aria-labelledby={`mea-tab-${active}`}
            tabIndex={0}
            className="min-w-0 focus:outline-none md:col-span-8 md:pl-[30px] lg:col-span-9"
          >
            {renderPanel(active, select)}
          </div>
        </div>
      </div>
    </section>
  )
}
