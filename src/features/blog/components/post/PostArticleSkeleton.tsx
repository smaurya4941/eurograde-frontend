import { Skeleton } from '@/components/marketing'

/** Placeholder matching the article layout while the post loads. */
export function PostArticleSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading article">
      <div className="flex min-h-[340px] items-center justify-center bg-ink md:min-h-[460px] xl:min-h-[600px]">
        <div className="w-full max-w-3xl space-y-5 px-6">
          <Skeleton className="mx-auto h-5 w-72 bg-white/10" />
          <Skeleton className="mx-auto h-12 w-full bg-white/10" />
          <Skeleton className="mx-auto h-12 w-2/3 bg-white/10" />
        </div>
      </div>
      <div className="bg-surface py-[30px] md:py-[60px] xl:py-20">
        <div className="container-site">
          <Skeleton className="mx-auto aspect-[1/0.7] max-w-[1280px] md:aspect-[1/0.4]" />
          <div className="mx-auto mt-[30px] max-w-[1020px] space-y-4">
            <Skeleton className="h-5 w-64 rounded-md" />
            {Array.from({ length: 6 }, (_, i) => (
              <Skeleton key={i} className="h-5 rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
