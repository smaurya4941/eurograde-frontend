import { Check, SquarePen, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { DataTable } from './DataTable'

export interface TaxonomyTerm {
  id: number
  name: string
  slug: string
  posts_count?: number
}

interface TaxonomyManagerProps {
  /** e.g. "category" / "tag", used in placeholders and the delete confirmation. */
  singularLabel: string
  items: TaxonomyTerm[]
  isLoading: boolean
  onCreate: (name: string) => Promise<unknown>
  onUpdate: (id: number, name: string) => Promise<unknown>
  onDelete: (id: number) => Promise<unknown>
}

/** Shared CRUD UI for the simple name+slug taxonomies (post categories, tags). */
export function TaxonomyManager({
  singularLabel,
  items,
  isLoading,
  onCreate,
  onUpdate,
  onDelete,
}: TaxonomyManagerProps) {
  const [newName, setNewName] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingName, setEditingName] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!newName.trim()) return
    setError(null)
    setIsCreating(true)
    try {
      await onCreate(newName.trim())
      setNewName('')
    } catch {
      setError(`Could not create this ${singularLabel}. Check the name and try again.`)
    } finally {
      setIsCreating(false)
    }
  }

  const startEditing = (item: TaxonomyTerm) => {
    setEditingId(item.id)
    setEditingName(item.name)
    setError(null)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditingName('')
  }

  const saveEditing = async (id: number) => {
    if (!editingName.trim()) return
    setError(null)
    setIsSaving(true)
    try {
      await onUpdate(id, editingName.trim())
      setEditingId(null)
    } catch {
      setError(`Could not save this ${singularLabel}. Check the name and try again.`)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (item: TaxonomyTerm) => {
    if (!confirm(`Delete the "${item.name}" ${singularLabel}?`)) return
    setError(null)
    try {
      await onDelete(item.id)
    } catch {
      setError(`Could not delete this ${singularLabel}.`)
    }
  }

  return (
    <div className="space-y-6">
      {error && <Alert variant="error">{error}</Alert>}

      <form onSubmit={handleCreate} className="flex max-w-md gap-2">
        <Input
          aria-label={`New ${singularLabel} name`}
          placeholder={`New ${singularLabel} name`}
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
        <Button type="submit" loading={isCreating}>
          Add
        </Button>
      </form>

      <DataTable
        isLoading={isLoading}
        rows={items}
        rowKey={(item) => item.id}
        emptyMessage={`No ${singularLabel} yet.`}
        columns={[
          {
            header: 'Name',
            render: (item) =>
              editingId === item.id ? (
                <Input
                  autoFocus
                  aria-label="Name"
                  value={editingName}
                  onChange={(event) => setEditingName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') void saveEditing(item.id)
                    if (event.key === 'Escape') cancelEditing()
                  }}
                />
              ) : (
                item.name
              ),
          },
          { header: 'Slug', render: (item) => <span className="text-slate-500">{item.slug}</span> },
          {
            header: 'Posts',
            render: (item) => item.posts_count ?? 0,
          },
          {
            header: '',
            className: 'px-4 py-3 text-right',
            render: (item) =>
              editingId === item.id ? (
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={() => saveEditing(item.id)}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-emerald-700 hover:bg-emerald-50 disabled:opacity-50"
                  >
                    <Check className="size-4" aria-hidden="true" />
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-slate-600 hover:bg-slate-100"
                  >
                    <X className="size-4" aria-hidden="true" />
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => startEditing(item)}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-brand-700 hover:bg-brand-50"
                  >
                    <SquarePen className="size-4" aria-hidden="true" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item)}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                    Delete
                  </button>
                </div>
              ),
          },
        ]}
      />
    </div>
  )
}
