import { SocialIcon } from '@/components/icons/SocialIcon'
import { Reveal } from '@/components/marketing'
import type { SocialNetwork } from '@/config/site'
import type { TeamMember } from '@/features/team'

const networkLabel: Record<SocialNetwork, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  x: 'X',
  youtube: 'YouTube',
}

/** "About the author" box under the article. */
export function AuthorCard({ author }: { author: TeamMember }) {
  return (
    <Reveal>
      <section
        aria-label={`About the author, ${author.name}`}
        className="mt-5 rounded-[10px] bg-zinc-800/5 p-[15px] md:mt-[50px] md:bg-white md:p-[30px]"
      >
        <div className="flex items-center gap-[15px] pb-[15px]">
          {author.photo_url ? (
            <img
              src={author.photo_url}
              alt=""
              width={75}
              height={75}
              loading="lazy"
              className="size-[75px] shrink-0 rounded-full bg-surface object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex size-[75px] shrink-0 items-center justify-center rounded-full bg-brand-600 text-2xl font-bold text-white"
            >
              {author.name.charAt(0)}
            </span>
          )}
          <div>
            <h2 className="text-lg leading-snug font-bold text-ink md:text-[22px]">
              {author.name}
            </h2>
            <p className="text-sm text-body">{author.role}</p>
          </div>
        </div>

        {author.bio && <p className="text-body">{author.bio}</p>}

        {author.socials.length > 0 && (
          <ul className="mt-[15px] flex items-center gap-2.5">
            {author.socials.map((social) => (
              <li key={social.network}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${author.name} on ${networkLabel[social.network]}`}
                  className="flex size-10 items-center justify-center rounded-full bg-brand-600 text-white transition-colors duration-300 hover:bg-ink"
                >
                  <SocialIcon network={social.network} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Reveal>
  )
}
