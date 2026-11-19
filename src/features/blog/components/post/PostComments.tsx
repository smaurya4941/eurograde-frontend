import { useRef, useState } from 'react'
import { ContentError, Skeleton } from '@/components/marketing'
import { usePostComments } from '../../hooks'
import { CommentForm } from './CommentForm'
import { CommentList, type ReplyTarget } from './CommentList'

function responsesHeading(total: number): string {
  return total === 1 ? 'One Response' : `${total} Responses`
}

/** Approved comments (threaded) followed by the "Leave a Reply" form. */
export function PostComments({ slug }: { slug: string }) {
  const { data, isPending, isError, refetch } = usePostComments(slug)
  const [replyTo, setReplyTo] = useState<ReplyTarget | null>(null)
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  const startReply = (target: ReplyTarget) => {
    setReplyTo(target)
    // Bring the form into view and put the cursor in the comment box.
    bodyRef.current?.closest('section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    bodyRef.current?.focus({ preventScroll: true })
  }

  return (
    <div className="mt-[30px] md:mt-10">
      {isPending && (
        <div aria-busy="true" aria-label="Loading comments" className="space-y-4">
          <Skeleton className="h-9 w-56" />
          <Skeleton className="h-32" />
        </div>
      )}
      {isError && <ContentError what="comments" onRetry={() => void refetch()} />}

      {data && data.total > 0 && (
        <section aria-labelledby="comments-title">
          <h2 id="comments-title" className="mb-2.5 text-xl font-bold text-ink md:text-[30px]">
            {responsesHeading(data.total)}
          </h2>
          <CommentList comments={data.comments} onReply={startReply} />
        </section>
      )}

      <CommentForm
        slug={slug}
        replyTo={replyTo}
        onCancelReply={() => setReplyTo(null)}
        bodyRef={bodyRef}
      />
    </div>
  )
}
