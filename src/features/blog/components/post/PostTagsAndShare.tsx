import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { SocialIcon } from '@/components/icons/SocialIcon'
import type { SocialLink, SocialNetwork } from '@/config/site'
import { useSocials } from '@/features/site-settings'
import type { PostTag } from '../../types'
import { blogTagHref } from '../../utils'

interface ShareTarget {
  network: SocialNetwork
  label: string
  href: string
}

/** Facebook and X get real share links; Instagram/YouTube have no web share, so they link to our profiles. */
function shareTargets(url: string, title: string, socials: SocialLink[]): ShareTarget[] {
  const profile = (network: SocialNetwork) =>
    socials.find((s) => s.network === network)?.href ?? '#'
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)

  return [
    {
      network: 'facebook',
      label: 'Share on Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    },
    { network: 'instagram', label: 'Follow us on Instagram', href: profile('instagram') },
    { network: 'x', label: 'Share on X', href: `https://x.com/intent/post?text=${t}&url=${u}` },
    { network: 'youtube', label: 'Watch us on YouTube', href: profile('youtube') },
  ]
}

function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      // Clipboard blocked (insecure context or permissions): fall back to a prompt.
      window.prompt('Copy this link:', url)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Link copied' : 'Copy link'}
      title={copied ? 'Link copied' : 'Copy link'}
      className="flex text-ink transition-colors duration-300 hover:text-brand-600"
    >
      {copied ? (
        <Check aria-hidden="true" className="size-[18px] text-brand-600" />
      ) : (
        <Copy aria-hidden="true" className="size-[18px]" />
      )}
      <span role="status" className="sr-only">
        {copied ? 'Link copied to clipboard' : ''}
      </span>
    </button>
  )
}

/** Tag pills and share links between the article body and the author box. */
export function PostTagsAndShare({ tags, title }: { tags: PostTag[]; title: string }) {
  const socials = useSocials()
  const url =
    typeof window === 'undefined' ? '' : `${window.location.origin}${window.location.pathname}`

  return (
    <div className="space-y-5 border-y border-line py-6 md:space-y-7 md:py-10">
      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="mr-0.5 text-xl font-bold text-ink">Tags:</span>
          <ul className="contents">
            {tags.map((tag) => (
              <li key={tag.id}>
                <Link
                  to={blogTagHref(tag.slug)}
                  rel="tag"
                  className="inline-block rounded-lg bg-brand-600 px-2 py-1 text-xs leading-[1.6] font-semibold text-white capitalize transition-colors duration-300 hover:bg-ink md:px-[13px] md:text-sm"
                >
                  {tag.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center gap-4">
        <span className="sr-only">Share this article</span>
        <ul className="flex items-center gap-[22px]">
          {shareTargets(url, title, socials).map((target) => (
            <li key={target.network} className="flex">
              <a
                href={target.href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label={target.label}
                title={target.label}
                className="text-ink transition-colors duration-300 hover:text-brand-600"
              >
                <SocialIcon network={target.network} className="size-[18px]" />
              </a>
            </li>
          ))}
          <li className="flex">
            <CopyLinkButton url={url} />
          </li>
        </ul>
      </div>
    </div>
  )
}
