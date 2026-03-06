import type { HeaderFilterConfig } from '@/types/crudTable.types'

declare module '@tanstack/table-core' {
  // This extends TanStack Table's column meta globally,
  // so `meta.headerFilter` gets autocomplete everywhere (createColumnHelper, ColumnDef, etc.)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<_TData extends RowData, _TValue> {
    headerFilter?: HeaderFilterConfig
  }
}
