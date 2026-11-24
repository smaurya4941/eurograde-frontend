import { TaxonomyManager } from '@/components/admin/TaxonomyManager'
import {
  useAdminTags,
  useCreateAdminTag,
  useDeleteAdminTag,
  useUpdateAdminTag,
} from '@/features/admin-tags'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function TagsPage() {
  usePageTitle('Tags')
  const tags = useAdminTags()
  const create = useCreateAdminTag()
  const update = useUpdateAdminTag()
  const remove = useDeleteAdminTag()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Tags</h1>
      <TaxonomyManager
        singularLabel="tag"
        items={tags.data ?? []}
        isLoading={tags.isPending}
        onCreate={(name) => create.mutateAsync({ name })}
        onUpdate={(id, name) => update.mutateAsync({ id, input: { name } })}
        onDelete={(id) => remove.mutateAsync(id)}
      />
    </div>
  )
}
