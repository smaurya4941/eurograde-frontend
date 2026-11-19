import { cn } from '@/lib/cn'
import type { PostComment } from '../../types'
import { formatCommentDate } from '../../utils'

/** Deeper replies keep their thread but stop indenting, so text stays readable on phones. */
const MAX_INDENT_DEPTH = 3

export interface ReplyTarget {
  id: number
  authorName: string
}

function Initials({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('')

  return (
    <span
      aria-hidden="true"
      className="flex size-[50px] shrink-0 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white md:size-[60px] md:text-xl"
    >
      {initials || '?'}
    </span>
  )
}

function CommentItem({
  comment,
  depth,
  onReply,
}: {
  comment: PostComment
  depth: number
  onReply: (target: ReplyTarget) => void
}) {
  const name = comment.author_website ? (
    <a
      href={comment.author_website}
      target="_blank"
      rel="nofollow ugc noopener noreferrer"
      className="transition-colors hover:text-brand-600"
    >
      {comment.author_name}
    </a>
  ) : (
    comment.author_name
  )

  return (
    <li id={`comment-${comment.id}`} className="scroll-mt-32">
      <article className="mt-[30px] rounded-[5px] p-[15px]">
        <header className="mb-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b border-line pb-2.5">
          <div className="flex items-center gap-2.5">
            <Initials name={comment.author_name} />
            <p className="text-body">
              <span className="text-lg font-medium text-ink md:text-xl">{name}</span>{' '}
              <span className="text-[15px]">says:</span>
            </p>
          </div>
          {comment.created_at && (
            <time dateTime={comment.created_at} className="w-full text-[15px] text-body sm:w-auto">
              {formatCommentDate(comment.created_at)}
            </time>
          )}
        </header>

        <p className="whitespace-pre-line text-body">“ {comment.body} ”</p>

        <button
          type="button"
          onClick={() => onReply({ id: comment.id, authorName: comment.author_name })}
          aria-label={`Reply to ${comment.author_name}`}
          className="mt-4 text-brand-600 transition-colors hover:text-ink"
        >
          Reply
        </button>
      </article>

      {comment.replies.length > 0 && (
        <ol className={cn(depth < MAX_INDENT_DEPTH && 'ml-5 md:ml-[50px]')}>
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} depth={depth + 1} onReply={onReply} />
          ))}
        </ol>
      )}
    </li>
  )
}

export function CommentList({
  comments,
  onReply,
}: {
  comments: PostComment[]
  onReply: (target: ReplyTarget) => void
}) {
  return (
    <ol>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} depth={1} onReply={onReply} />
      ))}
    </ol>
  )
}
