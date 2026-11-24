import type { ReactNode } from 'react'
import { FullPageSpinner } from '@/components/ui/Spinner'

export interface DataTableColumn<T> {
  header: string
  render: (row: T) => ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  rows: T[]
  rowKey: (row: T) => string | number
  isLoading?: boolean
  emptyMessage?: string
}

/** A small hand-rolled list table (the project has no table library) for the admin panel. */
export function DataTable<T>({
  columns,
  rows,
  rowKey,
  isLoading = false,
  emptyMessage = 'Nothing here yet.',
}: DataTableProps<T>) {
  if (isLoading) return <FullPageSpinner />

  if (rows.length === 0) {
    return (
      <p className="rounded-xl bg-white p-8 text-center text-sm text-slate-500 ring-1 ring-slate-200">
        {emptyMessage}
      </p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl bg-white ring-1 ring-slate-200">
      <table className="w-full min-w-[640px] divide-y divide-slate-200 text-sm">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                scope="col"
                className="px-4 py-3 text-left font-semibold text-slate-600"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={rowKey(row)} className="hover:bg-slate-50">
              {columns.map((column) => (
                <td key={column.header} className={column.className ?? 'px-4 py-3 text-slate-700'}>
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
