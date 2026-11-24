import { TaxonomyManager } from '@/components/admin/TaxonomyManager'
import {
  useAdminPostCategories,
  useCreateAdminPostCategory,
  useDeleteAdminPostCategory,
  useUpdateAdminPostCategory,
} from '@/features/admin-post-categories'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function CategoriesPage() {
  usePageTitle('Categories')
  const categories = useAdminPostCategories()
  const create = useCreateAdminPostCategory()
  const update = useUpdateAdminPostCategory()
  const remove = useDeleteAdminPostCategory()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Categories</h1>
      <TaxonomyManager
        singularLabel="category"
        items={categories.data ?? []}
        isLoading={categories.isPending}
        onCreate={(name) => create.mutateAsync({ name })}
        onUpdate={(id, name) => update.mutateAsync({ id, input: { name } })}
        onDelete={(id) => remove.mutateAsync(id)}
      />
    </div>
  )
}
