import { CalendarDays, Tag } from 'lucide-react'
import { Link } from 'react-router'
import { ImageReveal, Reveal } from '@/components/marketing'
import type { PostDetail } from '../../types'
import { blogCategoryHref, formatPostDate } from '../../utils'
import { AuthorCard } from './AuthorCard'
import { PostComments } from './PostComments'
import { PostTagsAndShare } from './PostTagsAndShare'

/** Featured image, meta line, body, tags/share, author box and comments of one article. */
export function PostArticle({ post }: { post: PostDetail }) {
  return (
    <section aria-label="Article" className="bg-surface py-[30px] md:py-[60px] xl:py-20">
      <div className="container-site">
        {post.image_url && (
          <ImageReveal
            src={post.image_url}
            alt=""
            width={1400}
            height={548}
            loading="eager"
            fetchPriority="high"
            shine
            wrapperClassName="relative mx-auto mb-2.5 max-w-[1280px] overflow-hidden rounded-2xl md:mb-[30px]"
            className="aspect-[1/0.7] w-full rounded-2xl object-cover md:aspect-[1/0.4]"
          />
        )}

        <article className="mx-auto max-w-[1020px]">
          <Reveal delay={250}>
            <ul className="mb-[15px] flex flex-wrap items-center gap-x-[14px] gap-y-2 font-medium text-body md:gap-x-[25px]">
              {post.published_at && (
                <li className="flex items-center gap-2.5 transition-colors hover:text-brand-600">
                  <CalendarDays aria-hidden="true" className="size-4" />
                  <span className="sr-only">Published on </span>
                  <time dateTime={post.published_at}>{formatPostDate(post.published_at)}</time>
                </li>
              )}
              {post.category && (
                <li className="flex items-center gap-2.5 transition-colors hover:text-brand-600">
                  <Tag aria-hidden="true" className="size-4 fill-current" />
                  <span className="sr-only">Category: </span>
                  <Link to={blogCategoryHref(post.category.slug)} rel="category">
                    {post.category.name}
                  </Link>
                </li>
              )}
            </ul>
          </Reveal>

          {post.body && (
            // Body HTML is sanitised server-side (App\Support\ArticleHtml) before it is stored.
            <div
              className="article-body pb-[15px]"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          )}

          <PostTagsAndShare tags={post.tags} title={post.title} />

          {post.author && <AuthorCard author={post.author} />}

          <PostComments slug={post.slug} />
        </article>
      </div>
    </section>
  )
}
